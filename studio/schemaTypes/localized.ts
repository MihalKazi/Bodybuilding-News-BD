import { defineType } from "sanity";

/**
 * Field-level translations. English is required; Bangla is optional and
 * falls back to English on the site.
 */
const languages = [
  { id: "en", title: "English", required: true },
  { id: "bn", title: "বাংলা (Bangla)", required: false },
];

function localized(name: string, title: string, of: Record<string, unknown>) {
  return defineType({
    name,
    title,
    type: "object",
    fields: languages.map((lang) => ({
      name: lang.id,
      title: lang.title,
      ...of,
      validation: lang.required
        ? (rule: { required: () => unknown }) => rule.required()
        : undefined,
    })) as never,
  });
}

export const localeString = localized("localeString", "Localized string", { type: "string" });
export const localeText = localized("localeText", "Localized text", { type: "text", rows: 3 });
export const localeBody = localized("localeBody", "Localized body", {
  type: "array",
  of: [{ type: "block" }, { type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alt text" }] }],
});
export const localeStringList = localized("localeStringList", "Localized list", {
  type: "array",
  of: [{ type: "string" }],
});
