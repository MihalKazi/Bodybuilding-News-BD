import type { Localized } from "@/lib/content/types";

/**
 * Standing newsroom pages. Commitments here are published promises to readers:
 * change them only when the newsroom's practice changes.
 */
export type InfoPage = { title: Localized<string>; paragraphs: Localized<string[]> };

export const infoPages = {
  about: {
    title: { en: "About us", bn: "আমাদের কথা" },
    paragraphs: {
      en: [
        "Bodybuilding News BD reports on bodybuilding and physique sport in Bangladesh: national and district competitions, the federation, the athletes, and the training and nutrition behind them.",
        "We publish in Bangla first, with an English edition for readers abroad.",
      ],
      bn: [
        "বডিবিল্ডিং নিউজ বিডি বাংলাদেশের বডিবিল্ডিং ও ফিজিক খেলার খবর প্রকাশ করে: জাতীয় ও জেলা পর্যায়ের প্রতিযোগিতা, ফেডারেশন, অ্যাথলেট এবং তাঁদের ট্রেনিং ও পুষ্টি।",
        "আমরা প্রথমে বাংলায় প্রকাশ করি; দেশের বাইরের পাঠকদের জন্য রয়েছে ইংরেজি সংস্করণ।",
      ],
    },
  },
  contact: {
    title: { en: "Contact", bn: "যোগাযোগ" },
    paragraphs: {
      en: [
        "Send us results, show dates, story tips and corrections. Include where and when it happened, and how we can reach you.",
      ],
      bn: [
        "প্রতিযোগিতার ফলাফল, তারিখ, খবরের তথ্য ও সংশোধনী আমাদের পাঠান। কোথায় ও কবে ঘটেছে এবং কীভাবে আপনার সঙ্গে যোগাযোগ করা যাবে, তা লিখুন।",
      ],
    },
  },
  "editorial-policy": {
    title: { en: "Editorial policy", bn: "সম্পাদকীয় নীতি" },
    paragraphs: {
      en: [
        "We publish facts we can check. Every story names where its facts come from.",
        "When we rely on another outlet's reporting, we credit it and link to it.",
        "We name the people in a photograph only when we are sure who they are.",
      ],
      bn: [
        "আমরা যাচাই করা যায় এমন তথ্য প্রকাশ করি। প্রতিটি খবরে তথ্যের সূত্র উল্লেখ থাকে।",
        "অন্য কোনো সংবাদমাধ্যমের প্রতিবেদনের ওপর নির্ভর করলে আমরা তাদের নাম ও লিংক দিই।",
        "ছবিতে কে আছেন তা নিশ্চিত হলেই কেবল আমরা তাঁদের নাম লিখি।",
      ],
    },
  },
  corrections: {
    title: { en: "Corrections", bn: "সংশোধনী" },
    paragraphs: {
      en: [
        "When we get something wrong, we fix it and say what changed at the end of the story.",
        "To report an error, contact the newsroom with the link to the story and the correct information.",
      ],
      bn: [
        "কোনো ভুল হলে আমরা তা সংশোধন করি এবং খবরের শেষে কী বদলানো হয়েছে তা জানাই।",
        "ভুল জানাতে খবরের লিংক ও সঠিক তথ্যসহ নিউজরুমে যোগাযোগ করুন।",
      ],
    },
  },
} satisfies Record<string, InfoPage>;

export type InfoSlug = keyof typeof infoPages;
export const infoSlugs = Object.keys(infoPages) as InfoSlug[];
export const isInfoSlug = (s: string): s is InfoSlug => s in infoPages;
