import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackLink, JsonLd, Kicker, Photo, Prose } from "@/components/ui";
import { hasLocale, localeTags } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getEvent, getEvents, t, slugParams } from "@/lib/content";
import { alternates, formatDate } from "@/lib/site";

export async function generateStaticParams() {
  return slugParams(await getEvents());
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
    <article className="mx-auto max-w-4xl">
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
      <BackLink href={`/${lang}/events`} label={dict.events.title} />
      <Kicker className="mt-8">{dates}</Kicker>
      <h1 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.92] sm:text-7xl">{name}</h1>
      <p className="mt-6 text-xl leading-relaxed text-muted">{t(event.summary, lang)}</p>

      <dl className="mt-8 grid border-y border-line sm:grid-cols-2">
        <div className="py-4 pr-4">
          <dt className="font-display text-sm font-bold uppercase tracking-[0.08em] text-muted">{dict.events.venue}</dt>
          <dd className="font-semibold">
            {t(event.venue, lang)}, {t(event.city, lang)}
          </dd>
        </div>
        {event.organiser && (
          <div className="border-t border-line py-4 sm:border-l sm:border-t-0 sm:pl-4">
            <dt className="font-display text-sm font-bold uppercase tracking-[0.08em] text-muted">{dict.events.federation}</dt>
            <dd className="font-semibold">{event.organiser}</dd>
          </div>
        )}
      </dl>

      <Photo image={event.image} alt={name} priority ratio="aspect-[3/2]" sizes="(min-width: 1024px) 896px, 100vw" className="mt-10" />
      <div className="mt-10 max-w-2xl">
        <Prose value={t(event.description, lang)} />
      </div>

      {event.results && event.results.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 border-t-2 border-ink pt-3 font-display text-2xl font-bold uppercase">{dict.events.results}</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[28rem] text-left">
              <thead className="border-b border-ink font-display text-sm uppercase tracking-[0.08em] text-muted">
                <tr>
                  <th className="py-3 pr-4">{dict.events.division}</th>
                  <th className="py-3 pr-4">{dict.events.place}</th>
                  <th className="py-3 pr-4">{dict.events.athlete}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {event.results.map((r) => (
                  <tr key={`${r.division}-${r.place}`}>
                    <td className="py-3 pr-4">{r.division}</td>
                    <td className="py-3 pr-4 font-display text-2xl font-extrabold">{r.place}</td>
                    <td className="py-3 pr-4">{r.athlete}</td>
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
