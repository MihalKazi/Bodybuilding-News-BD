import type { Metadata } from "next";
import Link from "next/link";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { PageIntro, SectionHeading } from "@/components/ui";
import { hasLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getEvents, t, type Event } from "@/lib/content";
import { alternates, formatDate } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await lang();
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return { title: dict.events.title, description: dict.events.intro, alternates: alternates(locale, "/events") };
}

function EventList({ events, locale, empty }: { events: Event[]; locale: Locale; empty: string }) {
  if (!events.length) return <p className="text-muted">{empty}</p>;
  return (
    <ul className="divide-y divide-line rounded-lg border border-line bg-surface">
      {events.map((e) => (
        <li key={e.slug}>
          <Link
            href={`/${locale}/events/${e.slug}`}
            className="flex flex-col gap-1 p-4 hover:bg-bg sm:flex-row sm:items-center sm:gap-6"
          >
            <time dateTime={e.startDate} className="w-40 shrink-0 text-sm font-semibold uppercase text-accent">
              {formatDate(e.startDate, locale)}
            </time>
            <span className="flex-1">
              <span className="block font-display text-lg font-bold">{t(e.name, locale)}</span>
              <span className="block text-sm text-muted">{t(e.summary, locale)}</span>
            </span>
            <span className="text-sm text-muted">
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
      <PageIntro title={dict.events.title} intro={dict.events.intro} />
      <section className="mb-10">
        <SectionHeading title={dict.events.upcoming} />
        <EventList events={upcoming} locale={locale} empty={dict.events.none} />
      </section>
      <section>
        <SectionHeading title={dict.events.completed} />
        <EventList events={completed} locale={locale} empty={dict.events.none} />
      </section>
    </>
  );
}
