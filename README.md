# タグチ刺繍ネーム有限会社 ─ 企業サイト デザインシステム

> 創業65年。茨城県筑西市から、刺繍・プリント加工の品質を届ける。

---

## 1. デザイン原則

### 1-1. ブランドトーン

| キーワード | 意味 |
|---|---|
| **老舗の信頼感** | 65年の歴史、自社工場、安定した品質 |
| **職人の温かみ** | 手仕事の丁寧さ、人の気配が感じられるデザイン |
| **モダンな清潔感** | 余白を活かし、情報を整理して見せる |

**NGトーン：** AI生成感のある汎用イラスト、過剰なアニメーション、原色のべた塗り、
テンプレート感のある構成。「どこかで見たことある」デザインにしない。

### 1-2. ターゲット別の設計方針

| ターゲット | 優先度 | 求める情報 | 設計方針 |
|---|---|---|---|
| BtoB（法人発注者） | ★★★ | 設備・加工能力・料金目安・注文フロー | 数字と図解で即座に判断できる構成 |
| BtoC（個人客） | ★★ | 刺繍の基礎知識・FAQ・注文の流れ | 初心者にもわかる丁寧な説明 |
| 求職者 | ★ | 職場環境・社員の声 | 写真と温かみのあるトーンで訴求 |

---

## 2. カラーパレット

### 2-1. メインカラー：紺（Navy）

企業の信頼感・誠実さを表現する基調色。

```
Navy 950  #0D1B2E   ← 最暗（フッター背景）
Navy 900  #12243D   ← 濃紺（テキスト強調）
Navy 800  #1B365D   ★ メインカラー（ヘッダー、CTA背景）
Navy 700  #234578   ← ホバー状態
Navy 600  #2D5A9E
Navy 500  #3B6FB5
Navy 400  #5A8FCC   ← リンク色
Navy 300  #8CB4E0
Navy 200  #BDDBF2
Navy 100  #E0EDF9   ← 薄い背景帯
Navy 50   #F0F6FC   ← 最明（セクション背景）
```

### 2-2. アクセントカラー：金（Gold）

刺繍糸の艶やかさ・職人技の価値を象徴する差し色。

```
Gold 900  #5C3D0A
Gold 800  #7A520E
Gold 700  #9B6A14
Gold 600  #B8841F   ← CTA ホバー
Gold 500  #C9963A   ★ アクセント（ボタン、アイコン、見出し装飾）
Gold 400  #D4A84E   ← ホバー明
Gold 300  #E0C070   ← 装飾線
Gold 200  #ECD8A0
Gold 100  #F5EBD0   ← 背景アクセント帯
Gold 50   #FBF6EA   ← 最明
```

### 2-3. ニュートラル：ウォーム（Warm）

暖色系のグレーで、冷たさを避けつつ読みやすさを確保。

```
Warm 950  #1A1611
Warm 900  #2C2620   ← 本文テキスト
Warm 800  #3D3530
Warm 700  #564B42   ← 小見出し
Warm 600  #6E6258   ← 補助テキスト
Warm 500  #8A7D72
Warm 400  #A69A90   ← プレースホルダー
Warm 300  #C4BAB2   ← ボーダー
Warm 200  #DDD7D2   ← 薄いボーダー
Warm 100  #EEEBE8   ← 背景帯
Warm 50   #F7F5F3   ← ページ背景（白の代替）
```

### 2-4. 使用ルール

- **背景色の基本：** 白 `#FFFFFF` を主体。セクション交互に `Warm 50` / `Navy 50` を使い分け
- **テキスト on 白背景：** `Warm 900` を基本。薄い色は `Warm 600` まで
- **テキスト on 紺背景：** 白 `#FFFFFF` を基本。薄い色は `Navy 200` まで
- **Gold の使用頻度：** 全体の10%以下。見出し装飾・CTA・アイコンに限定

---

## 3. タイポグラフィ

### 3-1. フォントファミリー

| 用途 | フォント | ウェイト |
|---|---|---|
| **本文** | Noto Sans JP | Regular 400, Medium 500 |
| **見出しアクセント** | Shippori Mincho | SemiBold 600, Bold 700 |
| **太字・強調** | Noto Sans JP | Bold 700 |
| **キャプション** | Noto Sans JP | Light 300 |

### 3-2. フォントサイズ体系

| レベル | デスクトップ | モバイル | 行間 | 用途 |
|---|---|---|---|---|
| Display | 48px (3rem) | 32px (2rem) | 1.2 | ヒーローキャッチコピー |
| H1 | 40px (2.5rem) | 28px (1.75rem) | 1.3 | ページタイトル |
| H2 | 32px (2rem) | 24px (1.5rem) | 1.3 | セクション見出し |
| H3 | 24px (1.5rem) | 20px (1.25rem) | 1.4 | サブセクション |
| H4 | 20px (1.25rem) | 18px (1.125rem) | 1.5 | カード見出し |
| Body | 16px (1rem) | 16px (1rem) | 1.8 | 本文 |
| Small | 14px (0.875rem) | 14px (0.875rem) | 1.6 | キャプション、注釈 |
| XSmall | 12px (0.75rem) | 12px (0.75rem) | 1.5 | ラベル |

### 3-3. 見出しスタイルルール

- **H2（セクション見出し）：** `Shippori Mincho SemiBold` + Gold アンダーライン装飾
- **H3以下：** `Noto Sans JP Medium / Bold`
- **英語併記：** 見出し上部に小さく英語を添える（`Small` サイズ、`Warm 500`、Noto Sans JP Light）

```html
<!-- 見出しパターン例 -->
<div>
  <span class="text-sm text-warm-500 font-light tracking-widest uppercase">Service</span>
  <h2 class="heading-accent text-2xl md:text-[2rem] text-navy-800 mt-1">
    <span class="gold-underline">加工サービス</span>
  </h2>
</div>
```

---

## 4. スペーシング

### 4-1. セクション間

| 区分 | デスクトップ | モバイル |
|---|---|---|
| セクション間 | 80px (5rem) | 48px (3rem) |
| セクション内ブロック間 | 48px (3rem) | 32px (2rem) |
| 要素間（カード間など） | 24px (1.5rem) | 16px (1rem) |

### 4-2. コンテンツ幅

| レイアウト | 最大幅 | 用途 |
|---|---|---|
| Full | 100% | ヒーロー、画像帯 |
| Wide | 1200px | 一般コンテンツ |
| Narrow | 800px | テキスト主体（ブログ、FAQ） |

```html
<div class="mx-auto max-w-[1200px] px-4 md:px-8">
  <!-- Wide コンテンツ -->
</div>
```

---

## 5. コンポーネントスタイル

### 5-1. ボタン

| タイプ | 背景 | テキスト | ホバー | 用途 |
|---|---|---|---|---|
| Primary | Navy 800 | 白 | Navy 700 | CTA（お問い合わせ、見積もり依頼） |
| Accent | Gold 500 | Navy 950 | Gold 600 | 特に目立たせたいCTA |
| Secondary | 透明 + Navy 800 border | Navy 800 | Navy 50 背景 | 補助アクション |
| Ghost | 透明 | Navy 600 | underline | テキストリンク風 |

**共通スタイル：**
```
padding: 12px 32px (py-3 px-8)
border-radius: 4px (rounded)
font-weight: 500
font-size: 15px
letter-spacing: 0.05em
transition: all 0.2s ease
```

**ホバーエフェクト：** 背景色の変化 + 微小な `translateY(-1px)` + `shadow-sm`

### 5-2. カード

```
背景: 白
角丸: 8px (rounded-lg)
影: shadow-sm → ホバーで shadow-md
ボーダー: 1px Warm 200
パディング: 24px (p-6)
画像角丸: 上部のみ 8px
```

**ホバー：** `transform: translateY(-2px)` + `shadow-md` + `border-color: Gold 300`

### 5-3. セクション背景パターン

```
パターンA: 白背景（デフォルト）
パターンB: Warm 50 (#F7F5F3) 背景
パターンC: Navy 50 (#F0F6FC) 背景
パターンD: Navy 800 (#1B365D) 背景 + 白テキスト（CTA帯）
パターンE: Gold 50 (#FBF6EA) 背景（アクセント帯）
```

交互に使い分けることでリズムを作る。連続して同じ背景色を使わない。

### 5-4. 数字強調ブロック（設備台数、実績など）

```html
<div class="text-center">
  <span class="heading-accent text-4xl md:text-5xl text-navy-800">32</span>
  <span class="text-gold-500 text-2xl ml-1">台</span>
  <p class="text-warm-600 text-sm mt-1">刺繍機保有台数</p>
</div>
```

---

## 6. 画像の扱い

### 6-1. プレースホルダー

開発段階ではpicsum.photosを使用：

```html
<!-- 16:9 横長 -->
<img src="https://picsum.photos/800/450?random=1" alt="プレースホルダー" />

<!-- 1:1 正方形（サンプル写真など） -->
<img src="https://picsum.photos/400/400?random=2" alt="プレースホルダー" />

<!-- ヒーロー（フルワイド） -->
<img src="https://picsum.photos/1600/600?random=3" alt="プレースホルダー" />
```

### 6-2. 画像スタイルルール

- **角丸：** `rounded-lg` (8px) を基本
- **オーバーレイ：** ヒーロー画像には紺色の半透明オーバーレイ `bg-navy-800/60`
- **オブジェクトフィット：** `object-cover` を基本
- **アスペクト比：** `aspect-video` (16:9)、`aspect-square` (1:1) で統一

---

## 7. アニメーション

### 7-1. 基本方針

- **控えめで上品に。** 動きは「気づくか気づかないか」程度
- トリガーは **スクロールインビュー** のみ。自動ループアニメーションは使わない
- `prefers-reduced-motion` を尊重

### 7-2. スクロールフェードイン

```css
.js-fade-in {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.js-fade-in.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

- IntersectionObserver で `.is-visible` を付与（threshold: 0.1）
- 一度表示されたら解除（再トリガーしない）
- セクション単位、またはカードグループ単位で適用

### 7-3. ホバーアニメーション

```css
transition: all 0.2s ease;
/* ボタン: translateY(-1px) + shadow */
/* カード: translateY(-2px) + shadow-md */
/* リンク: color change + underline */
```

### 7-4. ページ遷移

- Astro の View Transitions を使用（`<ViewTransitions />` コンポーネント）
- `fade` トランジションを基本とし、0.2s 程度

---

## 8. レスポンシブ設計

### 8-1. ブレークポイント

| 名前 | 幅 | 用途 |
|---|---|---|
| sm | 640px | スマートフォン横持ち |
| md | 768px | タブレット |
| lg | 1024px | 小型デスクトップ |
| xl | 1280px | デスクトップ |

### 8-2. モバイルファースト原則

- 基本スタイルはモバイル向けに記述
- `md:` 以上でデスクトップ向けに拡張
- ナビゲーションは `md:` 未満でハンバーガーメニュー

### 8-3. グリッドパターン

```
カード2列: grid grid-cols-1 md:grid-cols-2 gap-6
カード3列: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
カード4列: grid grid-cols-2 md:grid-cols-4 gap-4   ← 数字ブロック向け
2カラム:  grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12
サイドバー: grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8
```

---

## 9. アクセシビリティ

- コントラスト比: WCAG AA 準拠（4.5:1 以上）
- フォーカスリング: `focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2`
- alt テキスト: すべての画像に設定
- セマンティック HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` を適切に使用
- `prefers-reduced-motion: reduce` でアニメーション無効化

---

## 10. ファイル構成

```
src/
├── components/
│   ├── Header.astro          # グローバルヘッダー
│   ├── Footer.astro          # グローバルフッター
│   ├── Hero.astro             # ヒーローセクション
│   ├── SectionHeading.astro   # 共通セクション見出し
│   ├── Card.astro             # 汎用カード
│   ├── NumberBlock.astro      # 数字強調ブロック
│   ├── CTABand.astro          # CTA帯コンポーネント
│   └── ContactForm.astro      # お問い合わせフォーム
├── layouts/
│   └── Layout.astro           # 共通レイアウト
├── pages/
│   ├── index.astro            # トップページ
│   ├── about.astro            # 会社案内
│   ├── service.astro          # 加工サービス
│   ├── flow.astro             # ご注文の流れ
│   ├── guide.astro            # 刺繍ガイド（BtoC向け）
│   ├── facility.astro         # 設備紹介
│   ├── recruit.astro          # 採用情報
│   ├── faq.astro              # よくある質問
│   └── contact.astro          # お問い合わせ
└── styles/
    └── global.css             # Tailwind + カスタムCSS
```

---

## 11. 開発コマンド

```sh
npm run dev       # 開発サーバー起動 (localhost:4321)
npm run build     # 本番ビルド
npm run preview   # ビルドプレビュー
```
