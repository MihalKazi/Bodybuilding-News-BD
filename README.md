# bodybuildingnewsbd.com

Bilingual (English / বাংলা) bodybuilding news site for Bangladesh.

- **Web:** Next.js 16 (App Router, Cache Components), Tailwind CSS 4, deployed on Vercel.
- **CMS:** Sanity. Studio lives in [`studio/`](studio/). Without a Sanity project ID the site serves built-in sample content from [`src/lib/content/sample.ts`](src/lib/content/sample.ts).

## Sections

| Route | Content |
| --- | --- |
| `/{en,bn}` | Home: lead story, latest news, upcoming events, featured athletes, guides |
| `/{en,bn}/news/[slug]` | News articles (Bangladesh, International, Competitions) |
| `/{en,bn}/events/[slug]` | Competition calendar and results |
| `/{en,bn}/athletes/[slug]` | Athlete profiles |
| `/{en,bn}/guides/[slug]` | Training and nutrition guides |

`/` redirects to `/bn` or `/en` based on the browser's `Accept-Language` ([`src/proxy.ts`](src/proxy.ts)).
Every page emits canonical + `hreflang` alternates; `/sitemap.xml` lists both languages; articles, events and athletes include JSON-LD.

## Local development

```bash
cp .env.example .env.local   # fill in values when you have them
npm install
npm run dev                  # http://localhost:3000
```

## Connecting Sanity

1. Create a free project at <https://www.sanity.io/manage>. Note the **project ID**. Use dataset `production`.
2. Studio:

   ```bash
   cd studio
   cp .env.example .env      # set SANITY_STUDIO_PROJECT_ID
   npm install
   npm run dev               # http://localhost:3333
   npm run deploy            # hosts the Studio at https://bodybuildingnewsbd.sanity.studio
   ```

3. In Sanity manage → API → CORS origins, add `http://localhost:3000` and `https://bodybuildingnewsbd.com`.
4. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local` and in Vercel.
5. Instant updates on publish: Sanity manage → API → Webhooks → new webhook
   - URL: `https://bodybuildingnewsbd.com/api/revalidate`
   - Method: `POST`, trigger on create/update/delete
   - HTTP header: `Authorization: Bearer <REVALIDATE_SECRET>` (same value as the Vercel env var)

   Without the webhook, content still refreshes within about an hour.

Every translatable field has `en` (required) and `bn` (optional). Missing Bangla falls back to English.

## Deploying to Vercel + Namecheap domain

1. Push this repo to GitHub, then import it at <https://vercel.com/new>.
2. Add environment variables from `.env.example` in Vercel → Settings → Environment Variables.
3. Vercel → Settings → Domains: add `bodybuildingnewsbd.com` and `www.bodybuildingnewsbd.com`.
4. Namecheap → Domain List → Manage → **Advanced DNS**. Remove the default parking records, then add:

   | Type | Host | Value |
   | --- | --- | --- |
   | A Record | `@` | `76.76.21.21` |
   | CNAME Record | `www` | `cname.vercel-dns.com.` |

   Use the exact values Vercel shows on its Domains page if they differ.
5. Wait for DNS to propagate (minutes to a few hours). Vercel issues HTTPS automatically.
6. Submit `https://bodybuildingnewsbd.com/sitemap.xml` in Google Search Console.
