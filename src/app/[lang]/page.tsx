import Link from "next/link";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { Photo, SectionLabel, StoryRow } from "@/components/ui";
import { hasLocale, localeTags, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getDictionary } from "@/i18n/dictionaries";
import { getArticles, getAthletes, getEvents, getGuides, t, type Article, type Event } from "@/lib/content";
import { contactHref, formatDate } from "@/lib/site";

function Lead({ article, locale, dict }: { article: Article; locale: Locale; dict: Dictionary }) {
  const title = t(article.title, locale)!;
  const href = `/${locale}/news/${article.slug}`;
  const meta = (
    <p className="mt-5 text-sm font-semibold text-accent">
      {dict.categories[article.category]} · {formatDate(article.publishedAt, locale)}
    </p>
  );

  if (!article.image) {
    // No photo: the headline carries the top of the page on its own.
    return (
      <Link href={href} className="block border-b border-line pb-10">
        <h1 className="track-tight max-w-5xl font-display text-6xl font-extrabold leading-[0.95] sm:text-8xl">
          <span className="hl">{title}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted">{t(article.excerpt, locale)}</p>
        {meta}
      </Link>
    );
  }

  return (
    <Link href={href} className="grid grid-cols-1 gap-8 border-b border-line pb-10 lg:grid-cols-12">
      <Photo image={article.image} alt="" priority ratio="aspect-[4/3]" className="lg:col-span-7" />
      <div className="flex min-w-0 flex-col justify-end lg:col-span-5">
        <h1 className="track-tight font-display text-5xl font-extrabold leading-[0.98] sm:text-6xl">
          <span className="hl">{title}</span>
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">{t(article.excerpt, locale)}</p>
        {meta}
      </div>
    </Link>
  );
}

function dayMonth(date: string, locale: Locale) {
  const d = new Date(date);
  const fmt = (o: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(localeTags[locale], { ...o, timeZone: "Asia/Dhaka" }).format(d);
  return { day: fmt({ day: "numeric" }), month: fmt({ month: "short", year: "numeric" }) };
}

function EventsBand({ events, locale, dict }: { events: Event[]; locale: Locale; dict: Dictionary }) {
  return (
    <section className="bg-band px-5 py-10 text-band-ink sm:px-10">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2 className="font-display text-5xl font-extrabold uppercase">{dict.home.upcoming}</h2>
        <Link href={`/${locale}/events`} className="hl inline-flex min-h-11 items-center text-sm font-semibold text-band-muted hover:text-band-ink">
          {dict.home.viewAll}
        </Link>
      </div>
      <ul>
        {events.map((e) => {
          const { day, month } = dayMonth(e.startDate, locale);
          return (
            <li key={e.slug} className="border-t border-band-line">
              <Link href={`/${locale}/events/${e.slug}`} className="grid grid-cols-[5rem_1fr] items-baseline gap-x-6 py-5 sm:grid-cols-[7rem_1fr_auto]">
                <span className="font-display text-7xl font-extrabold leading-none text-gold tabular-nums">{day}</span>
                <span>
                  <span className="block text-sm font-semibold text-band-muted">{month}</span>
                  <span className="hl mt-1 block font-display text-3xl font-bold">{t(e.name, locale)}</span>
                </span>
                <span className="col-start-2 text-band-muted sm:col-start-auto">
                  {t(e.venue, locale)}, {t(e.city, locale)}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** When the front page is thin, ask readers for the news instead of leaving blank paper. */
function TipPanel({ dict, href }: { dict: Dictionary; href?: string }) {
  return (
    <section className="grid gap-6 border-t-2 border-ink pt-6 lg:grid-cols-12">
      <h2 className="font-display text-5xl font-extrabold leading-[0.95] lg:col-span-5">{dict.home.tipTitle}</h2>
      <div className="lg:col-span-7">
        <p className="max-w-xl text-lg text-muted">{dict.home.tipBody}</p>
        {href && (
          <Link
            href={href}
            className="mt-6 inline-flex min-h-11 items-center bg-ink px-5 font-display text-lg font-bold uppercase text-bg hover:bg-gold hover:text-gold-ink"
          >
            {dict.empty.cta}
          </Link>
        )}
      </div>
    </section>
  );
}

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
  const upcoming = events
    .filter((e) => e.status === "upcoming")
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .slice(0, 4);
  const featured = (athletes.some((a) => a.featured) ? athletes.filter((a) => a.featured) : athletes).slice(0, 4);

  return (
    <div className="flex flex-col gap-16">
      {lead && <Lead article={lead} locale={locale} dict={dict} />}

      {(rest.length > 0 || guides.length > 0) && (
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {rest.length > 0 && (
            <section className={guides.length ? "lg:col-span-8" : "lg:col-span-12"}>
              <SectionLabel title={dict.home.moreNews} href={`/${locale}/news`} linkLabel={dict.home.viewAll} />
              <div className="-mt-6">
                {rest.slice(0, 6).map((a) => (
                  <StoryRow
                    key={a.slug}
                    href={`/${locale}/news/${a.slug}`}
                    title={t(a.title, locale)!}
                    excerpt={t(a.excerpt, locale)}
                    meta={`${dict.categories[a.category]} · ${formatDate(a.publishedAt, locale)}`}
                    image={a.image}
                  />
                ))}
              </div>
            </section>
          )}

          {guides.length > 0 && (
            <section className={rest.length ? "lg:col-span-4" : "lg:col-span-12"}>
              <SectionLabel title={dict.home.guides} href={`/${locale}/guides`} linkLabel={dict.home.viewAll} />
              <ul className="-mt-2">
                {guides.slice(0, 5).map((g) => (
                  <li key={g.slug} className="border-b border-line">
                    <Link href={`/${locale}/guides/${g.slug}`} className="block py-4">
                      <span className="hl block font-display text-2xl font-bold leading-tight">{t(g.title, locale)}</span>
                      <span className="mt-1 block text-sm font-semibold text-accent">{dict.topics[g.topic]}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}

      {upcoming.length > 0 && <EventsBand events={upcoming} locale={locale} dict={dict} />}

      {featured.length > 0 && (
        <section>
          <SectionLabel title={dict.home.featuredAthletes} href={`/${locale}/athletes`} linkLabel={dict.home.viewAll} />
          <ul className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
            {featured.map((a) => {
              const name = t(a.name, locale)!;
              return (
                <li key={a.slug}>
                  <Link href={`/${locale}/athletes/${a.slug}`} className="block">
                    <Photo image={a.image} alt="" ratio="aspect-[4/5]" sizes="(min-width: 1024px) 25vw, 50vw" className="mb-3" />
                    <span className="hl block font-display text-3xl font-bold uppercase leading-none">{name}</span>
                    <span className="mt-2 block text-sm text-muted">
                      {t(a.division, locale)} · {t(a.hometown, locale)}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {articles.length < 4 && <TipPanel dict={dict} href={contactHref(locale)} />}
    </div>
  );
}
