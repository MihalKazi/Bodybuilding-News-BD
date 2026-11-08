"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeLabels, locales, type Locale } from "@/i18n/config";

export function LangSwitcher({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname() ?? `/${current}`;
  const rest = pathname.replace(/^\/(en|bn)(?=\/|$)/, "");

  return (
    <nav aria-label={label} className="flex items-center text-sm">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span aria-hidden className="px-2 text-band-muted">/</span>}
          <Link
            href={`/${l}${rest}`}
            hrefLang={l}
            lang={l}
            aria-current={l === current ? "true" : undefined}
            className={
              l === current
                ? "inline-flex min-h-11 items-center font-semibold text-band-ink"
                : "inline-flex min-h-11 items-center text-band-muted hover:text-band-ink"
            }
          >
            {localeLabels[l]}
          </Link>
        </span>
      ))}
    </nav>
  );
}
