// Bangla-first: Bangla is the default edition, English mirrors it.
export const locales = ["bn", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "bn";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** BCP 47 tags used for <html lang>, hreflang and date formatting. */
export const localeTags: Record<Locale, string> = {
  en: "en",
  bn: "bn-BD",
};

export const localeLabels: Record<Locale, string> = {
  en: "English",
  bn: "বাংলা",
};
