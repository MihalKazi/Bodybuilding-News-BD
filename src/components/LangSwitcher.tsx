"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeLabels, locales, type Locale } from "@/i18n/config";

export function LangSwitcher({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname() ?? `/${current}`;
  const rest = pathname.replace(/^\/(en|bn)(?=\/|$)/, "");

  return (
    <nav aria-label={label} className="flex gap-1 text-sm">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          hrefLang={l}
          aria-current={l === current ? "true" : undefined}
          className={
            l === current
              ? "rounded px-2 py-1 bg-accent text-accent-ink"
              : "rounded px-2 py-1 text-masthead-ink/80 hover:text-masthead-ink"
          }
        >
          {localeLabels[l]}
        </Link>
      ))}
    </nav>
  );
}
