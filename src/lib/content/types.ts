import type { PortableTextBlock } from "@portabletext/react";
import type { Locale } from "@/i18n/config";

/** A field translated per locale. English is required; Bangla falls back to English. */
export type Localized<T> = { en: T; bn?: T };

export type Image = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  /** Shown under the photo. Never guess who is pictured: leave empty when unsure. */
  caption?: Localized<string>;
  credit?: string;
};

export type Body = PortableTextBlock[];

export type ArticleCategory = "bd" | "international" | "competition";
export type GuideTopic = "training" | "nutrition";

export type Article = {
  slug: string;
  title: Localized<string>;
  excerpt: Localized<string>;
  body: Localized<Body>;
  category: ArticleCategory;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  image?: Image;
  sourceName?: string;
  sourceUrl?: string;
};

export type EventResult = { place: number; athlete: string; division: string };

export type Event = {
  slug: string;
  name: Localized<string>;
  summary: Localized<string>;
  description: Localized<Body>;
  startDate: string;
  endDate?: string;
  venue: Localized<string>;
  city: Localized<string>;
  organiser?: string;
  status: "upcoming" | "completed";
  results?: EventResult[];
  image?: Image;
};

export type Athlete = {
  slug: string;
  name: Localized<string>;
  hometown: Localized<string>;
  division: Localized<string>;
  summary: Localized<string>;
  bio: Localized<Body>;
  achievements: Localized<string[]>;
  featured?: boolean;
  image?: Image;
};

export type Guide = {
  slug: string;
  title: Localized<string>;
  excerpt: Localized<string>;
  body: Localized<Body>;
  topic: GuideTopic;
  publishedAt: string;
  updatedAt?: string;
  image?: Image;
};

export type ContentSource = {
  articles(): Promise<Article[]>;
  events(): Promise<Event[]>;
  athletes(): Promise<Athlete[]>;
  guides(): Promise<Guide[]>;
};

export function t<T>(value: Localized<T> | undefined, locale: Locale): T | undefined {
  if (!value) return undefined;
  return value[locale] ?? value.en;
}
