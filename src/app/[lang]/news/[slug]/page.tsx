import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShareBar } from "@/components/ShareBar";
import { BackLink, Figure, JsonLd, Prose, SectionLabel, StoryRow } from "@/components/ui";
import { hasLocale, localeTags } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getArticle, getArticles, t, slugParams } from "@/lib/content";
import { alternates, fill, formatDate, SITE_URL } from "@/lib/site";

export async function generateStaticParams() {
  return slugParams(await getArticles());
}

export async function generateMetadata({ params }: PageProps<"/[lang]/news/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const article = await getArticle(slug);
  if (!hasLocale(lang) || !article) return {};
  return {
    title: t(article.title, lang),
    description: t(article.excerpt, lang),
    alternates: alternates(lang, `/news/${slug}`),
    openGraph: {
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: article.image ? [article.image.url] : undefined,
    },
  };
}

/** Show "updated" only for a real later edit, not the save that published the story. */
function wasUpdated(published: string, updated?: string) {
  return Boolean(updated && Date.parse(updated) - Date.parse(published) > 60 * 60 * 1000);
}

export default async function ArticlePage({ params }: PageProps<"/[lang]/news/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, article, all] = await Promise.all([getDictionary(lang), getArticle(slug), getArticles()]);
  if (!article) notFound();

  const title = t(article.title, lang)!;
  const url = `${SITE_URL}/${lang}/news/${slug}`;
  const category = dict.categories[article.category];
  const related = all.filter((a) => a.category === article.category && a.slug !== slug).slice(0, 3);
  const author = article.author ?? dict.news.staff;

  // One reading column: header, photo and body share the same left and right edges.
  return (
    <article className="mx-auto max-w-3xl">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: title,
          description: t(article.excerpt, lang),
          inLanguage: localeTags[lang],
          datePublished: article.publishedAt,
          dateModified: article.updatedAt ?? article.publishedAt,
          image: article.image ? [article.image.url] : undefined,
          author: { "@type": article.author ? "Person" : "Organization", name: article.author ?? dict.site.name },
          publisher: { "@type": "Organization", name: dict.site.name, url: SITE_URL, logo: `${SITE_URL}/brand/icon-512.png` },
          mainEntityOfPage: url,
          isBasedOn: article.sourceUrl,
        }}
      />
      <BackLink href={`/${lang}/news`} label={dict.news.title} />
      <header className="mt-6">
        <h1 className="track-tight font-display text-5xl font-extrabold leading-[0.98] sm:text-6xl">{title}</h1>
        <p className="mt-5 text-xl leading-relaxed text-muted">{t(article.excerpt, lang)}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-y border-line py-3 text-sm">
          <Link
            href={`/${lang}/news/category/${article.category}`}
            className="hl inline-flex min-h-11 items-center font-display text-base font-bold uppercase text-accent"
          >
            {category}
          </Link>
          <span aria-hidden className="text-line">|</span>
          <span className="font-semibold">{author}</span>
          <span className="text-muted">
            {dict.news.dateline} · <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, lang)}</time>
            {wasUpdated(article.publishedAt, article.updatedAt) && (
              <>
                {" "}
                · {dict.news.updated} <time dateTime={article.updatedAt}>{formatDate(article.updatedAt!, lang)}</time>
              </>
            )}
          </span>
        </div>
      </header>

      <Figure image={article.image} alt={title} locale={lang} sizes="(min-width: 768px) 768px, 100vw" className="mt-8" />

      <div className="mt-8">
        <Prose value={t(article.body, lang)} />
        {article.sourceName && (
          <p className="mt-2 border-t border-line pt-4 text-sm text-muted">
            {dict.news.source}:{" "}
            {article.sourceUrl ? (
              <a href={article.sourceUrl} className="font-semibold text-ink underline underline-offset-2" rel="noopener" target="_blank">
                {article.sourceName}
              </a>
            ) : (
              <span className="font-semibold text-ink">{article.sourceName}</span>
            )}
          </p>
        )}
      </div>

      <div className="mt-10 border-t-2 border-ink pt-5">
        <ShareBar url={url} title={title} labels={{ share: dict.news.share, copyLink: dict.news.copyLink, copied: dict.news.copied }} />
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <SectionLabel
            title={fill(dict.news.moreFrom, { category })}
            href={`/${lang}/news/category/${article.category}`}
            linkLabel={dict.home.viewAll}
          />
          <div className="-mt-6">
            {related.map((a) => (
              <StoryRow
                key={a.slug}
                href={`/${lang}/news/${a.slug}`}
                title={t(a.title, lang)!}
                excerpt={t(a.excerpt, lang)}
                meta={formatDate(a.publishedAt, lang)}
                image={a.image}
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
