import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function SiteFooter({ locale, dict, year }: { locale: Locale; dict: Dictionary; year: number }) {
  const links = [
    { href: `/${locale}/news`, label: dict.nav.news },
    { href: `/${locale}/events`, label: dict.nav.events },
    { href: `/${locale}/athletes`, label: dict.nav.athletes },
    { href: `/${locale}/guides`, label: dict.nav.guides },
  ];
  return (
    <footer className="mt-24 bg-band text-band-ink">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <p className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-7xl">
            Bodybuilding
            <br />
            News <span className="text-accent">BD</span>
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1 font-display text-lg font-bold uppercase tracking-[0.04em]">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-11 items-center text-band-muted hover:text-band-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-10 border-t border-band-line pt-6 text-sm text-band-muted">
          © {year} bodybuildingnewsbd.com · {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
