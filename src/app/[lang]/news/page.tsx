import type { Metadata } from "next";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { PageTitle, StoryRow } from "@/components/ui";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getArticles, t } from "@/lib/content";
import { alternates, formatDate } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await lang();
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return { title: dict.news.title, description: dict.news.intro, alternates: alternates(locale, "/news") };
}

export default async function NewsIndex() {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  const [dict, articles] = await Promise.all([getDictionary(locale), getArticles()]);

  return (
    <>
      <PageTitle title={dict.news.title} intro={dict.news.intro} />
      <div className="-mt-6 max-w-4xl">
        {articles.map((a) => (
          <StoryRow
            key={a.slug}
            href={`/${locale}/news/${a.slug}`}
            kicker={dict.categories[a.category]}
            title={t(a.title, locale)!}
            excerpt={t(a.excerpt, locale)}
            meta={formatDate(a.publishedAt, locale)}
            image={a.image}
          />
        ))}
      </div>
    </>
  );
}
