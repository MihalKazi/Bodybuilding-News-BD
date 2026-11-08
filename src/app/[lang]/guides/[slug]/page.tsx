import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackLink, Figure, JsonLd, Prose } from "@/components/ui";
import { hasLocale, localeTags } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getGuide, getGuides, t, slugParams } from "@/lib/content";
import { alternates, formatDate, SITE_URL } from "@/lib/site";

export async function generateStaticParams() {
  return slugParams(await getGuides());
}

export async function generateMetadata({ params }: PageProps<"/[lang]/guides/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const guide = await getGuide(slug);
  if (!hasLocale(lang) || !guide) return {};
  return {
    title: t(guide.title, lang),
    description: t(guide.excerpt, lang),
    alternates: alternates(lang, `/guides/${slug}`),
    openGraph: { type: "article", images: guide.image ? [guide.image.url] : undefined },
  };
}

export default async function GuidePage({ params }: PageProps<"/[lang]/guides/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, guide] = await Promise.all([getDictionary(lang), getGuide(slug)]);
  if (!guide) notFound();

  const title = t(guide.title, lang)!;

  return (
    <article className="mx-auto max-w-3xl">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description: t(guide.excerpt, lang),
          inLanguage: localeTags[lang],
          datePublished: guide.publishedAt,
          dateModified: guide.updatedAt ?? guide.publishedAt,
          image: guide.image ? [guide.image.url] : undefined,
          publisher: { "@type": "Organization", name: dict.site.name, url: SITE_URL },
          mainEntityOfPage: `${SITE_URL}/${lang}/guides/${slug}`,
        }}
      />
      <BackLink href={`/${lang}/guides`} label={dict.guides.title} />
      <header className="mt-6">
        <h1 className="track-tight font-display text-5xl font-extrabold leading-[0.98] sm:text-6xl">{title}</h1>
        <p className="mt-5 text-xl leading-relaxed text-muted">{t(guide.excerpt, lang)}</p>
        <p className="mt-6 border-y border-line py-3 text-sm text-muted">
          <span className="font-display text-base font-bold uppercase text-ink">{dict.topics[guide.topic]}</span> ·{" "}
          <time dateTime={guide.publishedAt}>{formatDate(guide.publishedAt, lang)}</time>
        </p>
      </header>
      <Figure image={guide.image} alt={title} locale={lang} sizes="(min-width: 768px) 768px, 100vw" className="mt-8" />
      <div className="mt-8">
        <Prose value={t(guide.body, lang)} />
      </div>
    </article>
  );
}
