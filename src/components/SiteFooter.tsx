import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { contactHref, FACEBOOK_URL } from "@/lib/site";
import { LogoMark } from "./Logo";

export function SiteFooter({ locale, dict, year }: { locale: Locale; dict: Dictionary; year: number }) {
  const sections = [
    { href: `/${locale}/news`, label: dict.nav.news },
    { href: `/${locale}/events`, label: dict.nav.events },
    { href: `/${locale}/athletes`, label: dict.nav.athletes },
    { href: `/${locale}/guides`, label: dict.nav.guides },
  ];
  const contact = contactHref(locale);
  const site = [
    { href: `/${locale}/about`, label: dict.footer.about },
    ...(contact ? [{ href: contact, label: dict.footer.contact }] : []),
    { href: `/${locale}/editorial-policy`, label: dict.footer.policy },
    { href: `/${locale}/corrections`, label: dict.footer.corrections },
  ];
  const link = "inline-flex min-h-11 items-center text-band-muted hover:text-band-ink";

  return (
    <footer className="mt-24 border-t-[3px] border-gold bg-band text-band-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link href={`/${locale}`} className="inline-flex items-center gap-3" aria-label={dict.site.name}>
            <LogoMark className="h-10 w-auto text-gold" />
            <span className="font-display text-2xl font-extrabold uppercase leading-none">
              Bodybuilding News <span className="text-gold">BD</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-band-muted">{dict.site.description}</p>
        </div>
        <nav aria-label={dict.footer.sections} className="md:col-span-3">
          <h2 className="font-display text-base font-bold uppercase text-band-ink">{dict.footer.sections}</h2>
          <ul className="mt-2">
            {sections.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={dict.footer.site} className="md:col-span-4">
          <h2 className="font-display text-base font-bold uppercase text-band-ink">{dict.footer.site}</h2>
          <ul className="mt-2">
            {site.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
            {FACEBOOK_URL && (
              <li>
                <a href={FACEBOOK_URL} className={link} rel="noopener" target="_blank">
                  {dict.footer.facebook}
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-8">
        <p className="border-t border-band-line pt-6 text-sm text-band-muted">
          © {year} bodybuildingnewsbd.com · {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
