import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackLink, JsonLd, Kicker, Photo, Prose } from "@/components/ui";
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
    <article>
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
      <header className="mx-auto max-w-4xl">
        <BackLink href={`/${lang}/guides`} label={dict.guides.title} />
        <Kicker className="mt-8">{dict.topics[guide.topic]}</Kicker>
        <h1 className="mt-3 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.01em] sm:text-6xl">
          {title}
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-muted">{t(guide.excerpt, lang)}</p>
        <p className="mt-6 border-t border-line pt-4 text-sm text-muted">
          <time dateTime={guide.publishedAt}>{formatDate(guide.publishedAt, lang)}</time>
        </p>
      </header>
      <Photo
        image={guide.image}
        alt={title}
        priority
        ratio="aspect-[3/2]"
        sizes="(min-width: 1024px) 1024px, 100vw"
        className="mx-auto mt-10 max-w-5xl"
      />
      <div className="mx-auto mt-10 max-w-2xl">
        <Prose value={t(guide.body, lang)} />
      </div>
    </article>
  );
}
