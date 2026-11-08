import Link from "next/link";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { Card, Cover, Grid, SectionHeading } from "@/components/ui";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getArticles, getAthletes, getEvents, getGuides, t } from "@/lib/content";
import { formatDate } from "@/lib/site";

export default async function Home() {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  const [dict, articles, events, athletes, guides] = await Promise.all([
    getDictionary(locale),
    getArticles(),
    getEvents(),
    getAthletes(),
    getGuides(),
  ]);

  const [lead, ...rest] = articles;
  const upcoming = events.filter((e) => e.status === "upcoming").slice(0, 3);
  const featured = athletes.filter((a) => a.featured).slice(0, 3);

  return (
    <div className="flex flex-col gap-12">
      {lead && (
        <section className="grid overflow-hidden rounded-lg border border-line bg-surface lg:grid-cols-2">
          <Cover image={lead.image} label={t(lead.title, locale)!} className="aspect-[16/10] lg:aspect-auto lg:min-h-80" />
          <div className="flex flex-col justify-center gap-3 p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">
              {dict.categories[lead.category]} · {formatDate(lead.publishedAt, locale)}
            </p>
            <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
              <Link href={`/${locale}/news/${lead.slug}`} className="hover:text-accent">
                {t(lead.title, locale)}
              </Link>
            </h1>
            <p className="text-muted">{t(lead.excerpt, locale)}</p>
          </div>
        </section>
      )}

      <section>
        <SectionHeading title={dict.home.latest} href={`/${locale}/news`} linkLabel={dict.home.viewAll} />
        <Grid>
          {rest.slice(0, 6).map((a) => (
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
      </section>

      <div className="grid gap-12 lg:grid-cols-3">
        <section className="lg:col-span-1">
          <SectionHeading title={dict.home.upcoming} href={`/${locale}/events`} linkLabel={dict.home.viewAll} />
          <ul className="divide-y divide-line rounded-lg border border-line bg-surface">
            {upcoming.length === 0 && <li className="p-4 text-muted">{dict.events.none}</li>}
            {upcoming.map((e) => (
              <li key={e.slug}>
                <Link href={`/${locale}/events/${e.slug}`} className="block p-4 hover:bg-bg">
                  <p className="text-xs font-semibold uppercase text-accent">{formatDate(e.startDate, locale)}</p>
                  <p className="font-display text-lg font-bold">{t(e.name, locale)}</p>
                  <p className="text-sm text-muted">{t(e.city, locale)}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="lg:col-span-2">
          <SectionHeading title={dict.home.featuredAthletes} href={`/${locale}/athletes`} linkLabel={dict.home.viewAll} />
          <div className="grid gap-5 sm:grid-cols-2">
            {featured.map((a) => (
              <Card
                key={a.slug}
                href={`/${locale}/athletes/${a.slug}`}
                title={t(a.name, locale)!}
                excerpt={t(a.summary, locale)}
                meta={a.division}
                image={a.image}
              />
            ))}
          </div>
        </section>
      </div>

      <section>
        <SectionHeading title={dict.home.guides} href={`/${locale}/guides`} linkLabel={dict.home.viewAll} />
        <Grid>
          {guides.slice(0, 3).map((g) => (
            <Card
              key={g.slug}
              href={`/${locale}/guides/${g.slug}`}
              title={t(g.title, locale)!}
              excerpt={t(g.excerpt, locale)}
              meta={dict.topics[g.topic]}
              image={g.image}
            />
          ))}
        </Grid>
      </section>
    </div>
  );
}
