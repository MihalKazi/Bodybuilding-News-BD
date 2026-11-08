import { defineField, defineType } from "sanity";

const slug = defineField({
  name: "slug",
  type: "slug",
  options: { source: "title.en", maxLength: 96 },
  validation: (r) => r.required(),
});

const image = defineField({
  name: "image",
  type: "image",
  options: { hotspot: true },
  fields: [{ name: "alt", type: "string", title: "Alt text" }],
});

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [defineField({ name: "name", type: "string", validation: (r) => r.required() })],
});

export const article = defineType({
  name: "article",
  title: "News article",
  type: "document",
  fields: [
    defineField({ name: "title", type: "localeString", validation: (r) => r.required() }),
    slug,
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Bangladesh", value: "bd" },
          { title: "International", value: "international" },
          { title: "Competitions", value: "competition" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "publishedAt", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "author", type: "reference", to: [{ type: "author" }] }),
    image,
    defineField({ name: "excerpt", type: "localeText", validation: (r) => r.required() }),
    defineField({ name: "body", type: "localeBody" }),
  ],
  orderings: [{ title: "Newest", name: "newest", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title.en", subtitle: "category", media: "image" } },
});

export const event = defineType({
  name: "event",
  title: "Competition / event",
  type: "document",
  fields: [
    defineField({ name: "name", type: "localeString", validation: (r) => r.required() }),
    { ...slug, options: { source: "name.en", maxLength: 96 } },
    defineField({
      name: "status",
      type: "string",
      options: { list: ["upcoming", "completed"], layout: "radio" },
      initialValue: "upcoming",
      validation: (r) => r.required(),
    }),
    defineField({ name: "startDate", type: "date", validation: (r) => r.required() }),
    defineField({ name: "endDate", type: "date" }),
    defineField({ name: "venue", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "city", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "organiser", type: "string" }),
    image,
    defineField({ name: "summary", type: "localeText", validation: (r) => r.required() }),
    defineField({ name: "description", type: "localeBody" }),
    defineField({
      name: "results",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "division", type: "string" },
            { name: "place", type: "number" },
            { name: "athlete", type: "string" },
          ],
          preview: { select: { title: "athlete", subtitle: "division" } },
        },
      ],
    }),
  ],
  preview: { select: { title: "name.en", subtitle: "startDate", media: "image" } },
});

export const athlete = defineType({
  name: "athlete",
  title: "Athlete",
  type: "document",
  fields: [
    defineField({ name: "name", type: "localeString", validation: (r) => r.required() }),
    { ...slug, options: { source: "name.en", maxLength: 96 } },
    defineField({ name: "division", type: "string", validation: (r) => r.required() }),
    defineField({ name: "hometown", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    image,
    defineField({ name: "summary", type: "localeText", validation: (r) => r.required() }),
    defineField({ name: "achievements", type: "localeStringList" }),
    defineField({ name: "bio", type: "localeBody" }),
  ],
  preview: { select: { title: "name.en", subtitle: "division", media: "image" } },
});

export const guide = defineType({
  name: "guide",
  title: "Training / nutrition guide",
  type: "document",
  fields: [
    defineField({ name: "title", type: "localeString", validation: (r) => r.required() }),
    slug,
    defineField({
      name: "topic",
      type: "string",
      options: { list: ["training", "nutrition"], layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "publishedAt", type: "datetime", validation: (r) => r.required() }),
    image,
    defineField({ name: "excerpt", type: "localeText", validation: (r) => r.required() }),
    defineField({ name: "body", type: "localeBody" }),
  ],
  preview: { select: { title: "title.en", subtitle: "topic", media: "image" } },
});
