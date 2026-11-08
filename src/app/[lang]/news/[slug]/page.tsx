import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackLink, JsonLd, Kicker, Photo, Prose } from "@/components/ui";
import { hasLocale, localeTags } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getArticle, getArticles, t, slugParams } from "@/lib/content";
import { alternates, formatDate, SITE_URL } from "@/lib/site";

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

export default async function ArticlePage({ params }: PageProps<"/[lang]/news/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, article] = await Promise.all([getDictionary(lang), getArticle(slug)]);
  if (!article) notFound();

  const title = t(article.title, lang)!;

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
          author: article.author ? { "@type": "Person", name: article.author } : undefined,
          publisher: { "@type": "Organization", name: dict.site.name, url: SITE_URL },
          mainEntityOfPage: `${SITE_URL}/${lang}/news/${slug}`,
        }}
      />
      <BackLink href={`/${lang}/news`} label={dict.news.title} />
      <header className="mt-8">
        <Kicker>{dict.categories[article.category]}</Kicker>
        <h1 className="mt-3 text-4xl font-extrabold leading-[1.08] tracking-[-0.025em] sm:text-5xl">{title}</h1>
        <p className="mt-5 text-xl leading-relaxed text-muted">{t(article.excerpt, lang)}</p>
        <p className="mt-6 flex flex-wrap gap-x-2 border-y border-line py-3 text-sm text-muted">
          {article.author && (
            <span>
              {dict.news.by} <span className="font-semibold text-ink">{article.author}</span> ·
            </span>
          )}
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, lang)}</time>
        </p>
      </header>
      <Photo
        image={article.image}
        alt={title}
        priority
        natural
        sizes="(min-width: 768px) 768px, 100vw"
        className="mt-8"
      />
      <div className="mt-8">
        <Prose value={t(article.body, lang)} />
      </div>
    </article>
  );
}
