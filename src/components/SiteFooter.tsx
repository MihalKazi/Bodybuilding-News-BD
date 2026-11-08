import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function SiteFooter({ locale, dict, year }: { locale: Locale; dict: Dictionary; year: number }) {
  return (
    <footer className="mt-16 border-t border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:justify-between">
        <div>
          <p className="font-display text-base font-bold uppercase text-ink">{dict.site.name}</p>
          <p>{dict.site.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href={`/${locale}/news`}>{dict.nav.news}</Link>
          <Link href={`/${locale}/events`}>{dict.nav.events}</Link>
          <Link href={`/${locale}/athletes`}>{dict.nav.athletes}</Link>
          <Link href={`/${locale}/guides`}>{dict.nav.guides}</Link>
        </div>
        <p>
          © {year} bodybuildingnewsbd.com. {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
