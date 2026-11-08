import { createClient } from "@sanity/client";
import type { ContentSource } from "./types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const sanityConfigured = Boolean(projectId);

const client = projectId
  ? createClient({ projectId, dataset, apiVersion: "2025-01-01", useCdn: true })
  : null;

// Image projection: resolve the asset to a URL plus intrinsic size.
const image = `image{ "url": asset->url, alt, caption, credit, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height }`;

const queries = {
  articles: `*[_type == "article" && defined(slug.current)] | order(publishedAt desc){
    "slug": slug.current, title, excerpt, body, category, publishedAt,
    "updatedAt": _updatedAt, "author": author->name, sourceName, sourceUrl, ${image}
  }`,
  events: `*[_type == "event" && defined(slug.current)] | order(startDate desc){
    "slug": slug.current, name, summary, description, startDate, endDate,
    venue, city, organiser, status, results, ${image}
  }`,
  athletes: `*[_type == "athlete" && defined(slug.current)] | order(name.en asc){
    "slug": slug.current, name, hometown, division, summary, bio, achievements, featured, ${image}
  }`,
  guides: `*[_type == "guide" && defined(slug.current)] | order(publishedAt desc){
    "slug": slug.current, title, excerpt, body, topic, publishedAt,
    "updatedAt": _updatedAt, ${image}
  }`,
};

const fetchAll = <T,>(query: string) => () => client!.fetch<T[]>(query);

export const sanitySource: ContentSource = {
  articles: fetchAll(queries.articles),
  events: fetchAll(queries.events),
  athletes: fetchAll(queries.athletes),
  guides: fetchAll(queries.guides),
};
