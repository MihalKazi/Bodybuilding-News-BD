import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { LangSwitcher } from "./LangSwitcher";
import { NavLinks } from "./NavLinks";

export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const nav = [
    { href: `/${locale}/news`, label: dict.nav.news },
    { href: `/${locale}/events`, label: dict.nav.events },
    { href: `/${locale}/athletes`, label: dict.nav.athletes },
    { href: `/${locale}/guides`, label: dict.nav.guides },
  ];

  return (
    <header className="border-b border-band-line bg-band text-band-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-accent focus:px-4 focus:py-3 focus:text-accent-ink"
      >
        {dict.common.skip}
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 border-b border-band-line px-4 text-sm text-band-muted">
        <p className="hidden truncate py-2 sm:block">{dict.site.tagline}</p>
        <div className="ml-auto">
          <LangSwitcher current={locale} label={dict.common.language} />
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <Link href={`/${locale}`} className="inline-flex items-stretch gap-3" aria-label={dict.site.name}>
          <span className="font-display text-4xl font-extrabold uppercase leading-none tracking-[-0.01em] sm:text-6xl">
            Bodybuilding News
          </span>
          <span className="flex items-center bg-accent px-2 font-display text-3xl font-extrabold leading-none text-accent-ink sm:text-5xl">
            BD
          </span>
        </Link>
      </div>
      <div className="mx-auto mt-5 max-w-6xl px-4">
        <NavLinks items={nav} label={dict.nav.home} />
      </div>
    </header>
  );
}
