import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cover, JsonLd, Prose } from "@/components/ui";
import { hasLocale, localeTags } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getEvent, getEvents, t } from "@/lib/content";
import { alternates, formatDate } from "@/lib/site";

export async function generateStaticParams() {
  return (await getEvents()).map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/events/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const event = await getEvent(slug);
  if (!hasLocale(lang) || !event) return {};
  return {
    title: t(event.name, lang),
    description: t(event.summary, lang),
    alternates: alternates(lang, `/events/${slug}`),
  };
}

export default async function EventPage({ params }: PageProps<"/[lang]/events/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, event] = await Promise.all([getDictionary(lang), getEvent(slug)]);
  if (!event) notFound();

  const name = t(event.name, lang)!;
  const dates = event.endDate
    ? `${formatDate(event.startDate, lang)} – ${formatDate(event.endDate, lang)}`
    : formatDate(event.startDate, lang);

  return (
    <article className="mx-auto max-w-3xl">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SportsEvent",
          name,
          description: t(event.summary, lang),
          inLanguage: localeTags[lang],
          startDate: event.startDate,
          endDate: event.endDate ?? event.startDate,
          sport: "Bodybuilding",
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          location: {
            "@type": "Place",
            name: event.venue.en,
            address: { "@type": "PostalAddress", addressLocality: event.city.en, addressCountry: "BD" },
          },
          organizer: event.organiser ? { "@type": "Organization", name: event.organiser } : undefined,
          image: event.image ? [event.image.url] : undefined,
        }}
      />
      <Link href={`/${lang}/events`} className="text-sm font-semibold text-accent">
        ← {dict.events.title}
      </Link>
      <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-accent">{dates}</p>
      <h1 className="mt-2 font-display text-3xl font-bold sm:text-5xl">{name}</h1>
      <p className="mt-3 text-lg text-muted">{t(event.summary, lang)}</p>

      <dl className="mt-6 grid gap-4 rounded-lg border border-line bg-surface p-4 sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase text-muted">{dict.events.venue}</dt>
          <dd className="font-semibold">
            {t(event.venue, lang)}, {t(event.city, lang)}
          </dd>
        </div>
        {event.organiser && (
          <div>
            <dt className="text-xs uppercase text-muted">{dict.events.federation}</dt>
            <dd className="font-semibold">{event.organiser}</dd>
          </div>
        )}
      </dl>

      <Cover image={event.image} label={name} className="my-6 aspect-[16/9] rounded-lg" />
      <Prose value={t(event.description, lang)} />

      {event.results && event.results.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 font-display text-2xl font-bold uppercase">{dict.events.results}</h2>
          <div className="overflow-x-auto rounded-lg border border-line">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface text-xs uppercase text-muted">
                <tr>
                  <th className="p-3">{dict.events.division}</th>
                  <th className="p-3">{dict.events.place}</th>
                  <th className="p-3">{dict.events.athlete}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {event.results.map((r) => (
                  <tr key={`${r.division}-${r.place}`}>
                    <td className="p-3">{r.division}</td>
                    <td className="p-3 font-bold">{r.place}</td>
                    <td className="p-3">{r.athlete}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </article>
  );
}
