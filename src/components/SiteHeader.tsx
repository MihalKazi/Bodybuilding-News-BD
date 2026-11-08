import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { LangSwitcher } from "./LangSwitcher";
import { LogoMark } from "./Logo";
import { NavLinks } from "./NavLinks";

export function SiteHeader({ locale, dict, today }: { locale: Locale; dict: Dictionary; today: string }) {
  const nav = [
    { href: `/${locale}/news`, label: dict.nav.news },
    { href: `/${locale}/events`, label: dict.nav.events },
    { href: `/${locale}/athletes`, label: dict.nav.athletes },
    { href: `/${locale}/guides`, label: dict.nav.guides },
  ];

  return (
    <header className="border-b-[3px] border-gold bg-band text-band-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:px-4 focus:py-3 focus:text-gold-ink"
      >
        {dict.common.skip}
      </a>
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between gap-4 border-b border-band-line text-sm text-band-muted">
          <p className="truncate py-2">
            <span className="text-band-ink">{dict.news.dateline}</span> · {today}
          </p>
          <LangSwitcher current={locale} label={dict.common.language} />
        </div>
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 pt-6">
          <Link href={`/${locale}`} className="inline-flex items-center gap-3 sm:gap-4" aria-label={dict.site.name}>
            <LogoMark className="h-11 w-auto shrink-0 text-gold sm:h-16" />
            <span className="font-display text-[2rem] font-extrabold uppercase leading-none sm:text-6xl">Bodybuilding News</span>
            <span className="flex items-center self-stretch bg-gold px-2 font-display text-3xl font-extrabold leading-none text-gold-ink sm:text-5xl">
              BD
            </span>
          </Link>
          <p className="hidden max-w-xs pb-1 text-right text-sm text-band-muted lg:block">{dict.site.tagline}</p>
        </div>
        <div className="mt-5">
          <NavLinks items={nav} label={dict.nav.home} />
        </div>
      </div>
    </header>
  );
}
