import type { Metadata } from "next";
import Link from "next/link";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { EmptyState, PageTitle, SectionLabel } from "@/components/ui";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getGuides, t, type GuideTopic } from "@/lib/content";
import { alternates, contactHref } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await lang();
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return { title: dict.guides.title, description: dict.guides.intro, alternates: alternates(locale, "/guides") };
}

const topics: GuideTopic[] = ["training", "nutrition"];

export default async function GuidesIndex() {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  const [dict, guides] = await Promise.all([getDictionary(locale), getGuides()]);

  return (
    <>
      <PageTitle title={dict.guides.title} intro={dict.guides.intro} />
      {guides.length === 0 && (
        <EmptyState title={dict.empty.guidesTitle} body={dict.empty.guidesBody} cta={dict.empty.cta} href={contactHref(locale)} />
      )}
      <div className="grid gap-12 lg:grid-cols-2">
        {topics.map((topic) => {
          const items = guides.filter((g) => g.topic === topic);
          if (!items.length) return null;
          return (
            <section key={topic}>
              <SectionLabel title={dict.topics[topic]} />
              <ul className="-mt-6">
                {items.map((g) => (
                  <li key={g.slug} className="border-b border-line">
                    <Link href={`/${locale}/guides/${g.slug}`} className="block py-5">
                      <span>
                        <span className="hl block font-display text-3xl font-bold leading-tight">{t(g.title, locale)}</span>
                        <span className="mt-1 block text-muted">{t(g.excerpt, locale)}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
