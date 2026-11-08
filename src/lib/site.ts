import type { Metadata } from "next";
import { defaultLocale, locales, localeTags, type Locale } from "@/i18n/config";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bodybuildingnewsbd.com";

/** Canonical + hreflang alternates for a path that exists in every locale. `path` starts with "/" or is "". */
export function alternates(locale: Locale, path = ""): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeTags[l]] = `/${l}${path}`;
  languages["x-default"] = `/${defaultLocale}${path}`;
  return { canonical: `/${locale}${path}`, languages };
}

export function formatDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(localeTags[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date(value));
}

/** Serialise JSON-LD safely for a <script> tag. */
export function jsonLd(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
