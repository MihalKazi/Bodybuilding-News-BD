import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/ui";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { t } from "@/lib/content";
import { infoPages, infoSlugs, isInfoSlug } from "@/lib/pages";
import { alternates, CONTACT_EMAIL, FACEBOOK_URL } from "@/lib/site";

export function generateStaticParams() {
  return infoSlugs.map((page) => ({ page }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[page]">): Promise<Metadata> {
  const { lang, page } = await params;
  if (!hasLocale(lang) || !isInfoSlug(page)) return {};
  return { title: t(infoPages[page].title, lang), alternates: alternates(lang, `/${page}`) };
}

export default async function InfoPageView({ params }: PageProps<"/[lang]/[page]">) {
  const { lang, page } = await params;
  if (!hasLocale(lang) || !isInfoSlug(page)) notFound();
  const dict = await getDictionary(lang);
  const info = infoPages[page];

  return (
    <article className="mx-auto max-w-3xl">
      <BackLink href={`/${lang}`} label={dict.nav.home} />
      <h1 className="mt-6 font-display text-6xl font-extrabold leading-[0.95] sm:text-7xl">{t(info.title, lang)}</h1>
      <div className="prose-body mt-8">
        {(t(info.paragraphs, lang) ?? []).map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      {page === "contact" && (CONTACT_EMAIL || FACEBOOK_URL) && (
        <dl className="mt-8 grid border-y border-line sm:grid-cols-2">
          {CONTACT_EMAIL && (
            <div className="py-4 pr-4">
              <dt className="text-sm font-semibold text-muted">{lang === "bn" ? "ইমেইল" : "Email"}</dt>
              <dd className="mt-1 text-lg font-semibold">
                <a href={`mailto:${CONTACT_EMAIL}`} className="hl">
                  {CONTACT_EMAIL}
                </a>
              </dd>
            </div>
          )}
          {FACEBOOK_URL && (
            <div className="border-line py-4 sm:border-l sm:pl-4">
              <dt className="text-sm font-semibold text-muted">{dict.footer.facebook}</dt>
              <dd className="mt-1 text-lg font-semibold">
                <a href={FACEBOOK_URL} className="hl" rel="noopener" target="_blank">
                  {FACEBOOK_URL.replace(/^https?:\/\/(www\.)?/, "")}
                </a>
              </dd>
            </div>
          )}
        </dl>
      )}
    </article>
  );
}
