import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cover, JsonLd, Prose } from "@/components/ui";
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
    <article className="mx-auto max-w-4xl">
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
      <Link href={`/${lang}/athletes`} className="text-sm font-semibold text-accent">
        ← {dict.athletes.title}
      </Link>
      <div className="mt-4 grid gap-8 md:grid-cols-[280px_1fr]">
        <Cover image={athlete.image} label={name} className="aspect-[3/4] rounded-lg" />
        <div>
          <h1 className="font-display text-3xl font-bold sm:text-5xl">{name}</h1>
          <p className="mt-3 text-lg text-muted">{t(athlete.summary, lang)}</p>
          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-lg border border-line bg-surface p-4">
            <div>
              <dt className="text-xs uppercase text-muted">{dict.athletes.division}</dt>
              <dd className="font-semibold">{athlete.division}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase text-muted">{dict.athletes.hometown}</dt>
              <dd className="font-semibold">{t(athlete.hometown, lang)}</dd>
            </div>
          </dl>
          {achievements.length > 0 && (
            <section className="mt-6">
              <h2 className="mb-2 font-display text-xl font-bold uppercase">{dict.athletes.achievements}</h2>
              <ul className="list-disc pl-5">
                {achievements.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </section>
          )}
          <div className="mt-6">
            <Prose value={t(athlete.bio, lang)} />
          </div>
        </div>
      </div>
    </article>
  );
}
