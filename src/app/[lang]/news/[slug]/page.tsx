import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cover, JsonLd, Prose } from "@/components/ui";
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
      <Link href={`/${lang}/news`} className="text-sm font-semibold text-accent">
        ← {dict.news.title}
      </Link>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-accent">
        {dict.categories[article.category]} · {formatDate(article.publishedAt, lang)}
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold leading-tight sm:text-5xl">{title}</h1>
      <p className="mt-3 text-lg text-muted">{t(article.excerpt, lang)}</p>
      {article.author && (
        <p className="mt-2 text-sm text-muted">
          {dict.news.by} {article.author}
        </p>
      )}
      <Cover image={article.image} label={title} className="my-6 aspect-[16/9] rounded-lg" />
      <Prose value={t(article.body, lang)} />
    </article>
  );
}
