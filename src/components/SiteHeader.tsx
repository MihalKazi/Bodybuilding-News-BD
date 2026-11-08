import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { LangSwitcher } from "./LangSwitcher";

export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const nav = [
    { href: `/${locale}/news`, label: dict.nav.news },
    { href: `/${locale}/events`, label: dict.nav.events },
    { href: `/${locale}/athletes`, label: dict.nav.athletes },
    { href: `/${locale}/guides`, label: dict.nav.guides },
  ];

  return (
    <header className="bg-masthead text-masthead-ink">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href={`/${locale}`} className="font-display text-xl font-bold uppercase tracking-wide sm:text-2xl">
          <span className="text-accent">Bodybuilding</span> News BD
        </Link>
        <LangSwitcher current={locale} label={dict.common.language} />
      </div>
      <nav className="border-t border-white/10">
        <ul className="mx-auto flex max-w-6xl gap-5 overflow-x-auto px-4 py-2 text-sm font-semibold uppercase tracking-wide">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="whitespace-nowrap hover:text-accent">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
