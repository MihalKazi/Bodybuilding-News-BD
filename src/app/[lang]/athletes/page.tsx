import type { Metadata } from "next";
import Link from "next/link";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { EmptyState, PageTitle, Photo } from "@/components/ui";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAthletes, t } from "@/lib/content";
import { alternates, contactHref } from "@/lib/site";

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
      <PageTitle title={dict.athletes.title} intro={dict.athletes.intro} />
      {athletes.length === 0 && (
        <EmptyState title={dict.empty.athletesTitle} body={dict.empty.athletesBody} cta={dict.empty.cta} href={contactHref(locale)} />
      )}
      <ul className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {athletes.map((a) => {
          const name = t(a.name, locale)!;
          return (
            <li key={a.slug} className={a.image ? "" : "border-t-2 border-ink pt-3"}>
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
    </>
  );
}
