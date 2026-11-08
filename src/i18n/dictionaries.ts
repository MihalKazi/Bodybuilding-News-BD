import "server-only";
import type { Locale } from "./config";

const dictionaries = {
  en: () => import("./en.json").then((m) => m.default),
  bn: () => import("./bn.json").then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["en"]>>;

export const getDictionary = (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
