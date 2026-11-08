import { article, athlete, author, event, guide } from "./documents";
import { localeBody, localeString, localeStringList, localeText } from "./localized";

export const schemaTypes = [
  localeString,
  localeText,
  localeBody,
  localeStringList,
  author,
  article,
  event,
  athlete,
  guide,
];
