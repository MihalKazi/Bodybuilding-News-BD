import type { MetadataRoute } from "next";
import { defaultLocale, locales, localeTags } from "@/i18n/config";
import { getArticles, getAthletes, getEvents, getGuides } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

function entry(path: string, lastModified?: string): MetadataRoute.Sitemap {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeTags[l]] = `${SITE_URL}/${l}${path}`;
  languages["x-default"] = `${SITE_URL}/${defaultLocale}${path}`;
  return locales.map((l) => ({
    url: `${SITE_URL}/${l}${path}`,
    lastModified,
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, events, athletes, guides] = await Promise.all([
    getArticles(),
    getEvents(),
    getAthletes(),
    getGuides(),
  ]);

  return [
    ...["", "/news", "/events", "/athletes", "/guides"].flatMap((p) => entry(p)),
    ...articles.flatMap((a) => entry(`/news/${a.slug}`, a.updatedAt ?? a.publishedAt)),
    ...events.flatMap((e) => entry(`/events/${e.slug}`)),
    ...athletes.flatMap((a) => entry(`/athletes/${a.slug}`)),
    ...guides.flatMap((g) => entry(`/guides/${g.slug}`, g.updatedAt ?? g.publishedAt)),
  ];
}
