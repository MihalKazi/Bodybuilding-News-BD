import Link from "next/link";
import { lang } from "next/root-params";
import { defaultLocale, hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function NotFound() {
  const raw = await lang();
  const locale = hasLocale(raw) ? raw : defaultLocale;
  const dict = await getDictionary(locale);
  return (
    <div className="py-16 text-center">
      <h1 className="font-display text-6xl font-extrabold uppercase leading-none">{dict.common.notFound}</h1>
      <p className="mt-3 text-muted">{dict.common.notFoundBody}</p>
      <Link href={`/${locale}`} className="mt-8 inline-flex min-h-11 items-center bg-ink px-6 font-display text-lg font-bold uppercase tracking-[0.04em] text-bg hover:bg-accent hover:text-accent-ink">
        {dict.common.goHome}
      </Link>
    </div>
  );
}
