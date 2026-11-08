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
      <h1 className="font-display text-4xl font-bold uppercase">{dict.common.notFound}</h1>
      <p className="mt-3 text-muted">{dict.common.notFoundBody}</p>
      <Link href={`/${locale}`} className="mt-6 inline-block rounded bg-accent px-5 py-2 font-semibold text-accent-ink">
        {dict.common.goHome}
      </Link>
    </div>
  );
}
