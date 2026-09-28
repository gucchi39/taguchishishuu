#!/usr/bin/env node
/**
 * public/images 配下の実写真（facility, events）をビルド前に最適化するスクリプト。
 *
 * - 対象: public/images/facility/*.jpg, public/images/events/**\/*.jpg
 *   （public/images/ogp.jpg と works.astro 用の外部画像は対象外）
 * - 長辺が上限（既定 1600px。factory-work-02.jpg のみ 1920px）を超える JPEG を
 *   縮小・再圧縮（quality 80 / mozjpeg / progressive）する。
 * - 再圧縮した結果が元ファイルより大きくなる場合は書き換えない。
 * - 同名の .webp（quality 78）を隣に生成する。
 * - 一度最適化したファイルは manifest（scripts/.optimize-images-manifest.json）に
 *   ハッシュと設定値を記録し、次回実行時は「内容」と「設定」の両方が変わって
 *   いなければ再エンコードしない（JPEG の再圧縮は世代劣化で毎回わずかにサイズが
 *   変わり得るため、これがないと実行するたびにファイルが変化してしまい冪等に
 *   ならない）。長辺上限・品質などの設定を変更した場合は、設定が変わったこと
 *   を manifest が検知して再処理する。
 *
 * 使い方: npm run optimize-images
 */
import { readdir, stat, readFile, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import path from 'node:path'
import sharp from 'sharp'

const projectRoot = path.resolve(import.meta.dirname, '..')
const imagesRoot = path.join(projectRoot, 'public', 'images')
const manifestPath = path.join(import.meta.dirname, '.optimize-images-manifest.json')

// 長辺の上限（px）。既定値は DEFAULT_MAX_EDGE、特定ファイルだけ上書きする。
const DEFAULT_MAX_EDGE = 1600
const MAX_EDGE_OVERRIDES = {
  'facility/factory-work-02.jpg': 1920, // トップのヒーロー背景
}

const JPEG_QUALITY = 80
const WEBP_QUALITY = 78

// スクリプト自体の処理内容（EXIF 回転の適用など）を変えた場合は上げる。
// 上げると、設定値だけでなくスクリプトの処理内容が変わったとみなされ再処理される。
const SCRIPT_VERSION = 2

// manifest でキャッシュ判定に使う設定一式。ここに含めた値を変更すると、
// 内容（ハッシュ）が同じ既存画像でも設定が変わったとみなして再処理される。
const SETTINGS = {
  scriptVersion: SCRIPT_VERSION,
  defaultMaxEdge: DEFAULT_MAX_EDGE,
  maxEdgeOverrides: MAX_EDGE_OVERRIDES,
  jpegQuality: JPEG_QUALITY,
  webpQuality: WEBP_QUALITY,
}
const SETTINGS_JSON = JSON.stringify(SETTINGS)

// 最適化の対象ディレクトリ（ogp.jpg や works 用の外部ダミー画像は含まない）
const TARGET_DIRS = ['facility', 'events']

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex')
}

async function loadManifest() {
  try {
    return JSON.parse(await readFile(manifestPath, 'utf-8'))
  } catch {
    return {}
  }
}

async function saveManifest(manifest) {
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(full)))
    } else if (/\.jpe?g$/i.test(entry.name)) {
      files.push(full)
    }
  }
  return files
}

function formatSize(bytes) {
  return `${(bytes / 1024).toFixed(0)}KB`
}

async function readIfExists(filePath) {
  try {
    return await readFile(filePath)
  } catch {
    return null
  }
}

async function optimizeOne(filePath, manifest) {
  const relPath = path.relative(imagesRoot, filePath).split(path.sep).join('/')
  const webpPath = filePath.replace(/\.jpe?g$/i, '.webp')

  const originalBuffer = await readFile(filePath)
  const originalSize = originalBuffer.byteLength
  const originalHash = sha256(originalBuffer)

  // すでにこのスクリプトで最適化済み（内容が manifest 記録時から変わっていない）なら
  // 再エンコードせずスキップする（冪等性の担保）。設定値も一致している場合のみ有効。
  const cached = manifest[relPath]
  if (cached && cached.jpegHash === originalHash) {
    // 移行措置: 旧 manifest（settings 未記録）のエントリは「現在の設定で処理済み」
    // とみなし、settings を書き足すだけにする。ここで再エンコードすると、
    // 既に最適化済みの JPEG を再圧縮することになり画質が劣化してしまうため行わない。
    if (cached.settings === undefined) {
      manifest[relPath] = { ...cached, settings: SETTINGS_JSON }
      console.log(`${relPath} / ${formatSize(originalSize)} → ${formatSize(originalSize)} [skip（設定情報を追記）]`)
      return
    }

    if (cached.settings === SETTINGS_JSON) {
      const existingWebp = await readIfExists(webpPath)
      const webpHash = existingWebp ? sha256(existingWebp) : null
      if (existingWebp && webpHash === cached.webpHash) {
        console.log(`${relPath} / ${formatSize(originalSize)} → ${formatSize(originalSize)} [skip（最適化済み）]`)
        return
      }
    }
  }

  const maxEdge = MAX_EDGE_OVERRIDES[relPath] ?? DEFAULT_MAX_EDGE
  const metadata = await sharp(originalBuffer).metadata()
  const longEdge = Math.max(metadata.width ?? 0, metadata.height ?? 0)

  // --- JPEG 再圧縮（必要であれば縮小も） ---
  // .rotate() は引数なしで EXIF の Orientation に従って自動回転する。
  // resize より前に適用することで、回転後の向きを基準にリサイズされるようにする。
  let pipeline = sharp(originalBuffer, { failOn: 'none' }).rotate()
  if (longEdge > maxEdge) {
    pipeline = pipeline.resize({
      width: maxEdge,
      height: maxEdge,
      fit: 'inside',
      withoutEnlargement: true,
    })
  }
  const optimizedJpeg = await pipeline
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
    .toBuffer()

  let finalBuffer = originalBuffer
  let action = 'skip（元より縮小せず）'
  if (optimizedJpeg.byteLength < originalSize) {
    await writeFile(filePath, optimizedJpeg)
    finalBuffer = optimizedJpeg
    action = longEdge > maxEdge ? 'resize+recompress' : 'recompress'
  }

  // --- WebP 生成 ---
  // finalBuffer が「再圧縮せずそのまま採用した元 JPEG」の場合でも向きが正しくなるよう、
  // ここでも .rotate() を resize（今回は無し）より前に適用する。
  const webpBuffer = await sharp(finalBuffer).rotate().webp({ quality: WEBP_QUALITY }).toBuffer()
  await writeFile(webpPath, webpBuffer)

  manifest[relPath] = {
    jpegHash: sha256(finalBuffer),
    webpHash: sha256(webpBuffer),
    settings: SETTINGS_JSON,
  }

  console.log(
    `${relPath} / ${formatSize(originalSize)} → ${formatSize(finalBuffer.byteLength)}` +
      ` [${action}]  +webp ${formatSize(webpBuffer.byteLength)}`
  )
}

async function main() {
  const targets = []
  for (const dir of TARGET_DIRS) {
    const full = path.join(imagesRoot, dir)
    try {
      await stat(full)
    } catch {
      continue
    }
    targets.push(...(await walk(full)))
  }

  targets.sort()

  const manifest = await loadManifest()

  console.log(`対象ファイル: ${targets.length}件\n`)
  for (const file of targets) {
    await optimizeOne(file, manifest)
  }
  await saveManifest(manifest)
  console.log('\n完了しました。')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
