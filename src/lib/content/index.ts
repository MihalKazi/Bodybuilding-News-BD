import { cacheLife, cacheTag } from "next/cache";
import { sampleSource } from "./sample";
import { sanityConfigured, sanitySource } from "./sanity";
import type { ArticleCategory } from "./types";

export * from "./types";
export { sanityConfigured as usingCms };

const source = sanityConfigured ? sanitySource : sampleSource;

/** Tag shared by all CMS content; /api/revalidate invalidates it on publish. */
export const CONTENT_TAG = "content";

/**
 * Cache Components fails the build when generateStaticParams returns [].
 * With an empty CMS, return one placeholder slug; its lookup finds nothing and 404s.
 */
export function slugParams(items: { slug: string }[]) {
  return items.length ? items.map((i) => ({ slug: i.slug })) : [{ slug: "__placeholder__" }];
}

function cached() {
  // Development refreshes almost immediately so new CMS posts show up; production keeps the hourly cache.
  if (process.env.NODE_ENV === "development") cacheLife("seconds");
  else cacheLife("hours");
  cacheTag(CONTENT_TAG);
}

export async function getArticles(category?: ArticleCategory) {
  "use cache";
  cached();
  const all = await source.articles();
  return category ? all.filter((a) => a.category === category) : all;
}

export async function getArticle(slug: string) {
  "use cache";
  cached();
  return (await source.articles()).find((a) => a.slug === slug) ?? null;
}

export async function getEvents() {
  "use cache";
  cached();
  return source.events();
}

export async function getEvent(slug: string) {
  "use cache";
  cached();
  return (await source.events()).find((e) => e.slug === slug) ?? null;
}

export async function getAthletes() {
  "use cache";
  cached();
  return source.athletes();
}

export async function getAthlete(slug: string) {
  "use cache";
  cached();
  return (await source.athletes()).find((a) => a.slug === slug) ?? null;
}

export async function getGuides() {
  "use cache";
  cached();
  return source.guides();
}

export async function getGuide(slug: string) {
  "use cache";
  cached();
  return (await source.guides()).find((g) => g.slug === slug) ?? null;
}
