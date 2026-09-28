import type { APIRoute } from 'astro'

// robots.txt は astro.config.mjs の site + base から生成する
// （独自ドメインへ移行しても site を変えるだけで Sitemap の URL が追随する）
export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL(`${import.meta.env.BASE_URL.replace(/\/$/, '')}/sitemap-index.xml`, site)
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl.href}\n`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
