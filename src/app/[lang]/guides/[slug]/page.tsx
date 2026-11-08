import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cover, JsonLd, Prose } from "@/components/ui";
import { hasLocale, localeTags } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getGuide, getGuides, t } from "@/lib/content";
import { alternates, formatDate, SITE_URL } from "@/lib/site";

export async function generateStaticParams() {
  return (await getGuides()).map((g) => ({ slug: g.slug }));
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
      <Link href={`/${lang}/guides`} className="text-sm font-semibold text-accent">
        ← {dict.guides.title}
      </Link>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-accent">
        {dict.topics[guide.topic]} · {formatDate(guide.publishedAt, lang)}
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold leading-tight sm:text-5xl">{title}</h1>
      <p className="mt-3 text-lg text-muted">{t(guide.excerpt, lang)}</p>
      <Cover image={guide.image} label={title} className="my-6 aspect-[16/9] rounded-lg" />
      <Prose value={t(guide.body, lang)} />
    </article>
  );
}
