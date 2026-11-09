/**
 * お問い合わせフォームの送信設定
 *
 * Formspree（https://formspree.io）のフォームID（https://formspree.io/f/〇〇〇〇 の〇〇〇〇の部分）を入れると、
 * お客様のメールアプリを使わず、その場で送信できるようになります。
 * 空のあいだは、これまでどおりお客様のメールアプリを開く方式で動きます。
 *
 * ※仕事のお問い合わせ・採用のお問い合わせは、同じ1つの Formspree フォームで受け取ります。
 *   届いたメールの件名（【Webお問い合わせ】／【採用のお問い合わせ】）で見分けられます。
 */
export const formspreeId = ''

/** 送信先（Formspree 登録アドレス／メールアプリ方式の宛先） */
export const contactEmail = 'irai@ekinosoba.co.jp'
