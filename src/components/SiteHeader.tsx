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
    <header className="sticky top-0 z-40 border-b-[3px] border-gold bg-band text-band-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:px-4 focus:py-3 focus:text-gold-ink"
      >
        {dict.common.skip}
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:h-[72px]">
        <Link href={`/${locale}`} className="inline-flex shrink-0 items-center gap-2.5" aria-label={dict.site.name}>
          <LogoMark className="h-8 w-auto text-gold sm:h-11" />
          <span className="font-display text-[1.35rem] font-extrabold uppercase leading-none sm:text-[2rem]">Bodybuilding News</span>
          <span className="rounded-[4px] bg-gold px-1.5 py-0.5 font-display text-xl font-extrabold leading-none text-gold-ink sm:text-2xl">
            BD
          </span>
        </Link>
        <div className="ml-6 hidden md:block">
          <NavLinks items={nav} label={dict.nav.home} />
        </div>
        <div className="ml-auto hidden items-center gap-4 text-sm md:flex">
          <span className="hidden text-band-muted xl:inline">{today}</span>
          <LangSwitcher current={locale} label={dict.common.language} />
        </div>
        <div className="ml-auto md:hidden">
          <LangSwitcher current={locale} label={dict.common.language} compact />
        </div>
      </div>
      {/* Phones: sections get their own row under the logo. */}
      <div className="border-t border-band-line px-4 md:hidden">
        <NavLinks items={nav} label={dict.nav.home} />
      </div>
    </header>
  );
}
