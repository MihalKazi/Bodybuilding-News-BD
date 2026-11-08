import type { Metadata } from "next";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { Card, Grid, PageIntro } from "@/components/ui";
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
      <PageIntro title={dict.news.title} intro={dict.news.intro} />
      <Grid>
        {articles.map((a) => (
          <Card
            key={a.slug}
            href={`/${locale}/news/${a.slug}`}
            title={t(a.title, locale)!}
            excerpt={t(a.excerpt, locale)}
            meta={`${dict.categories[a.category]} · ${formatDate(a.publishedAt, locale)}`}
            image={a.image}
          />
        ))}
      </Grid>
    </>
  );
}
