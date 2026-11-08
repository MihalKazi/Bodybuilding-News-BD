import type { Metadata } from "next";
import Link from "next/link";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { PageTitle, SectionLabel } from "@/components/ui";
import { hasLocale, localeTags, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getEvents, t, type Event } from "@/lib/content";
import { alternates } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await lang();
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return { title: dict.events.title, description: dict.events.intro, alternates: alternates(locale, "/events") };
}

function Ledger({ events, locale }: { events: Event[]; locale: Locale }) {
  const fmt = (d: string, o: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(localeTags[locale], { ...o, timeZone: "Asia/Dhaka" }).format(new Date(d));
  return (
    <ul className="-mt-6">
      {events.map((e) => (
        <li key={e.slug} className="border-b border-line">
          <Link
            href={`/${locale}/events/${e.slug}`}
            className="grid grid-cols-[5rem_1fr] items-baseline gap-x-6 py-6 sm:grid-cols-[7rem_1fr_16rem]"
          >
            <time dateTime={e.startDate} className="font-display text-6xl font-extrabold leading-none sm:text-7xl">
              {fmt(e.startDate, { day: "numeric" })}
            </time>
            <span>
              <span className="block font-display text-sm font-bold uppercase tracking-[0.08em] text-accent">
                {fmt(e.startDate, { month: "long", year: "numeric" })}
              </span>
              <span className="hl mt-1 block text-2xl font-bold">{t(e.name, locale)}</span>
              <span className="mt-1 block text-muted">{t(e.summary, locale)}</span>
            </span>
            <span className="col-start-2 mt-2 text-muted sm:col-start-auto sm:mt-0">
              {t(e.venue, locale)}, {t(e.city, locale)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default async function EventsIndex() {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  const [dict, events] = await Promise.all([getDictionary(locale), getEvents()]);
  const upcoming = events
    .filter((e) => e.status === "upcoming")
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
  const completed = events.filter((e) => e.status === "completed");

  return (
    <>
      <PageTitle title={dict.events.title} intro={dict.events.intro} />
      {events.length === 0 && <p className="text-lg text-muted">{dict.events.none}</p>}
      {upcoming.length > 0 && (
        <section className="mb-16">
          <SectionLabel title={dict.events.upcoming} />
          <Ledger events={upcoming} locale={locale} />
        </section>
      )}
      {completed.length > 0 && (
        <section>
          <SectionLabel title={dict.events.completed} />
          <Ledger events={completed} locale={locale} />
        </section>
      )}
    </>
  );
}
