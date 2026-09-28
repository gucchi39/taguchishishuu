# タグチ刺繡ネーム コーポレートサイト

## 技術スタック
- Astro 6 + Tailwind CSS 4
- Cloudflare Pagesでホスティング

## Git ワークフロー（必須）
- 作業開始時は必ず `git pull origin main` で最新を取得
- キリの良い単位で commit する
- 作業終了時は必ず `git push` する
- コミットメッセージは日本語でOK

## 応答ルール
- 応答は日本語で
- 技術説明は非エンジニアにも分かるレベルで

## 安全運用
- `git push -f` や `rm -rf` など破壊的操作は事前に確認を取る
- `.env` や秘密鍵は絶対に commit しない

## 作業完了時の報告（必須）
- commit & push が終わったら、**毎回必ず**公開URLを提示する: https://gucchi39.github.io/taguchishishuu/
- 公開URLに反映されるのは main ブランチのみ（GitHub Actions が main への push で自動デプロイ）。作業ブランチで push した場合は「main に取り込むと反映される」旨と PR の URL を併記する

## 運用メモ
- 問い合わせフォームの送信先メール: irai@ekinosoba.co.jp
- かんたん見積もり（src/pages/_estimate.astro）と作品集（src/pages/_works.astro）は準備が整うまで一時非公開。公開時はファイル名の先頭の `_` を外し、Header/Footer のリンクを戻す
- 休業日は src/data/calendar.ts、お客様の声・取引先・働く人の声は src/data/trust.ts を編集するだけで反映される
- 写真を追加したら `npm run optimize-images` を実行する
- robots.txt は `/taguchishishuu/robots.txt` に出力されるが、GitHub Pages のプロジェクトサイトではクローラーに読まれない（オリジン直下でないため）。sitemap は Search Console に直接登録する。独自ドメインへ移行すればそのまま有効になる
- 営業カレンダー（/calendar）は休業日データ投入後に Footer の企業情報へリンクを追加する
