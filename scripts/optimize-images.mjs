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
 *   ハッシュを記録し、次回実行時は内容が変わっていなければ再エンコードしない
 *   （JPEG の再圧縮は世代劣化で毎回わずかにサイズが変わり得るため、これがないと
 *   実行するたびにファイルが変化してしまい冪等にならない）。
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
  // 再エンコードせずスキップする（冪等性の担保）。
  const cached = manifest[relPath]
  if (cached && cached.jpegHash === originalHash) {
    const existingWebp = await readIfExists(webpPath)
    const webpHash = existingWebp ? sha256(existingWebp) : null
    if (existingWebp && webpHash === cached.webpHash) {
      console.log(`${relPath} / ${formatSize(originalSize)} → ${formatSize(originalSize)} [skip（最適化済み）]`)
      return
    }
  }

  const maxEdge = MAX_EDGE_OVERRIDES[relPath] ?? DEFAULT_MAX_EDGE
  const metadata = await sharp(originalBuffer).metadata()
  const longEdge = Math.max(metadata.width ?? 0, metadata.height ?? 0)

  // --- JPEG 再圧縮（必要であれば縮小も） ---
  let pipeline = sharp(originalBuffer, { failOn: 'none' })
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
  const webpBuffer = await sharp(finalBuffer).webp({ quality: WEBP_QUALITY }).toBuffer()
  await writeFile(webpPath, webpBuffer)

  manifest[relPath] = {
    jpegHash: sha256(finalBuffer),
    webpHash: sha256(webpBuffer),
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
