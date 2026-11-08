import type { Metadata } from "next";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { Card, Grid, PageIntro } from "@/components/ui";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAthletes, t } from "@/lib/content";
import { alternates } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await lang();
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return { title: dict.athletes.title, description: dict.athletes.intro, alternates: alternates(locale, "/athletes") };
}

export default async function AthletesIndex() {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  const [dict, athletes] = await Promise.all([getDictionary(locale), getAthletes()]);

  return (
    <>
      <PageIntro title={dict.athletes.title} intro={dict.athletes.intro} />
      <Grid>
        {athletes.map((a) => (
          <Card
            key={a.slug}
            href={`/${locale}/athletes/${a.slug}`}
            title={t(a.name, locale)!}
            excerpt={t(a.summary, locale)}
            meta={`${a.division} · ${t(a.hometown, locale)}`}
            image={a.image}
          />
        ))}
      </Grid>
    </>
  );
}
