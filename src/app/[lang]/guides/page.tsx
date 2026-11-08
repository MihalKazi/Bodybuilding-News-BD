import type { Metadata } from "next";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { Card, Grid, PageIntro, SectionHeading } from "@/components/ui";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getGuides, t, type GuideTopic } from "@/lib/content";
import { alternates, formatDate } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await lang();
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return { title: dict.guides.title, description: dict.guides.intro, alternates: alternates(locale, "/guides") };
}

const topics: GuideTopic[] = ["training", "nutrition"];

export default async function GuidesIndex() {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  const [dict, guides] = await Promise.all([getDictionary(locale), getGuides()]);

  return (
    <>
      <PageIntro title={dict.guides.title} intro={dict.guides.intro} />
      {topics.map((topic) => {
        const items = guides.filter((g) => g.topic === topic);
        if (!items.length) return null;
        return (
          <section key={topic} className="mb-10">
            <SectionHeading title={dict.topics[topic]} />
            <Grid>
              {items.map((g) => (
                <Card
                  key={g.slug}
                  href={`/${locale}/guides/${g.slug}`}
                  title={t(g.title, locale)!}
                  excerpt={t(g.excerpt, locale)}
                  meta={formatDate(g.publishedAt, locale)}
                  image={g.image}
                />
              ))}
            </Grid>
          </section>
        );
      })}
    </>
  );
}
