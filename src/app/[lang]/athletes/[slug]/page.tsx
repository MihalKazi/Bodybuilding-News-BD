import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackLink, JsonLd, Photo, Prose } from "@/components/ui";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAthlete, getAthletes, t, slugParams } from "@/lib/content";
import { alternates, SITE_URL } from "@/lib/site";

export async function generateStaticParams() {
  return slugParams(await getAthletes());
}

export async function generateMetadata({ params }: PageProps<"/[lang]/athletes/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const athlete = await getAthlete(slug);
  if (!hasLocale(lang) || !athlete) return {};
  return {
    title: t(athlete.name, lang),
    description: t(athlete.summary, lang),
    alternates: alternates(lang, `/athletes/${slug}`),
    openGraph: { type: "profile", images: athlete.image ? [athlete.image.url] : undefined },
  };
}

export default async function AthletePage({ params }: PageProps<"/[lang]/athletes/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, athlete] = await Promise.all([getDictionary(lang), getAthlete(slug)]);
  if (!athlete) notFound();

  const name = t(athlete.name, lang)!;
  const achievements = t(athlete.achievements, lang) ?? [];

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: athlete.name.en,
          alternateName: athlete.name.bn,
          description: t(athlete.summary, lang),
          homeLocation: { "@type": "Place", name: athlete.hometown.en },
          nationality: "Bangladesh",
          image: athlete.image?.url,
          url: `${SITE_URL}/${lang}/athletes/${slug}`,
        }}
      />
      <BackLink href={`/${lang}/athletes`} label={dict.athletes.title} />
      <div className={`mt-8 grid gap-10 ${athlete.image ? "md:grid-cols-12" : ""}`}>
        <Photo
          image={athlete.image}
          alt={name}
          priority
          ratio="aspect-[4/5]"
          sizes="(min-width: 768px) 40vw, 100vw"
          className="md:col-span-5"
        />
        <div className={athlete.image ? "md:col-span-7" : "max-w-3xl"}>
          <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.92] sm:text-7xl">{name}</h1>
          <p className="mt-6 text-xl leading-relaxed text-muted">{t(athlete.summary, lang)}</p>
          <dl className="mt-8 grid grid-cols-2 border-y border-line">
            <div className="py-4 pr-4">
              <dt className="text-sm font-semibold text-muted">{dict.athletes.division}</dt>
              <dd className="mt-1 text-lg font-semibold">{t(athlete.division, lang)}</dd>
            </div>
            <div className="border-l border-line py-4 pl-4">
              <dt className="text-sm font-semibold text-muted">{dict.athletes.hometown}</dt>
              <dd className="mt-1 text-lg font-semibold">{t(athlete.hometown, lang)}</dd>
            </div>
          </dl>
          {achievements.length > 0 && (
            <section className="mt-10">
              <h2 className="font-display text-2xl font-bold uppercase">{dict.athletes.achievements}</h2>
              <ul className="mt-3 border-t border-line">
                {achievements.map((a) => (
                  <li key={a} className="border-b border-line py-3 font-semibold">
                    {a}
                  </li>
                ))}
              </ul>
            </section>
          )}
          <div className="mt-10">
            <Prose value={t(athlete.bio, lang)} />
          </div>
        </div>
      </div>
    </article>
  );
}
