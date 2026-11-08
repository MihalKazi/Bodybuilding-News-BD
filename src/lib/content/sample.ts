/**
 * Placeholder content used until a Sanity project is connected.
 * Every person, event and result here is fictional. Replace via the CMS.
 */
import type { Article, Athlete, Body, ContentSource, Event, Guide } from "./types";

let key = 0;
const p = (...paragraphs: string[]): Body =>
  paragraphs.map((text) => ({
    _type: "block",
    _key: `k${key++}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `s${key++}`, text, marks: [] }],
  }));

const articles: Article[] = [
  {
    slug: "dhaka-classic-registration-opens",
    category: "competition",
    publishedAt: "2026-11-05T09:00:00+06:00",
    author: "Newsroom",
    title: {
      en: "Registration opens for the Dhaka Classic physique championship",
      bn: "ঢাকা ক্লাসিক ফিজিক চ্যাম্পিয়নশিপের নিবন্ধন শুরু",
    },
    excerpt: {
      en: "Athletes can now register for men's bodybuilding, classic physique and women's fitness divisions.",
      bn: "পুরুষ বডিবিল্ডিং, ক্লাসিক ফিজিক ও নারী ফিটনেস বিভাগে এখন নিবন্ধন করা যাচ্ছে।",
    },
    body: {
      en: p(
        "Registration is now open for the Dhaka Classic, a fictional sample event used to preview this site.",
        "Divisions include men's bodybuilding, classic physique, men's physique and women's fitness. Weigh-ins take place the day before the show.",
      ),
      bn: p(
        "ঢাকা ক্লাসিকের নিবন্ধন শুরু হয়েছে। এটি সাইটের প্রিভিউয়ের জন্য তৈরি একটি কাল্পনিক নমুনা ইভেন্ট।",
        "বিভাগগুলোর মধ্যে রয়েছে পুরুষ বডিবিল্ডিং, ক্লাসিক ফিজিক, মেন্স ফিজিক ও নারী ফিটনেস। প্রতিযোগিতার আগের দিন ওজন নেওয়া হবে।",
      ),
    },
  },
  {
    slug: "chattogram-gyms-youth-programme",
    category: "bd",
    publishedAt: "2026-11-02T12:00:00+06:00",
    author: "Newsroom",
    title: {
      en: "Chattogram gyms launch a youth strength programme",
      bn: "চট্টগ্রামের জিমগুলোতে তরুণদের জন্য স্ট্রেংথ প্রোগ্রাম চালু",
    },
    excerpt: {
      en: "A sample story: local gyms team up to coach safe lifting technique for under-18s.",
      bn: "নমুনা সংবাদ: ১৮ বছরের কম বয়সীদের নিরাপদ লিফটিং শেখাতে স্থানীয় জিমগুলো একসঙ্গে কাজ করছে।",
    },
    body: {
      en: p(
        "This is sample content. Several gyms in Chattogram are running weekend sessions focused on technique, mobility and safe progression.",
      ),
      bn: p(
        "এটি নমুনা কনটেন্ট। চট্টগ্রামের কয়েকটি জিম কৌশল, মোবিলিটি ও নিরাপদ অগ্রগতির ওপর সাপ্তাহিক সেশন চালাচ্ছে।",
      ),
    },
  },
  {
    slug: "international-season-roundup",
    category: "international",
    publishedAt: "2026-10-28T18:00:00+06:00",
    author: "Newsroom",
    title: {
      en: "International season roundup: what to watch next",
      bn: "আন্তর্জাতিক মৌসুমের সারসংক্ষেপ: সামনে কী দেখবেন",
    },
    excerpt: {
      en: "A sample roundup of the major international shows coming up this winter.",
      bn: "এই শীতে আসন্ন বড় আন্তর্জাতিক প্রতিযোগিতাগুলোর নমুনা সারসংক্ষেপ।",
    },
    body: {
      en: p("Sample content. Replace this article with real coverage from the CMS."),
      bn: p("নমুনা কনটেন্ট। CMS থেকে আসল সংবাদ দিয়ে এটি বদলে দিন।"),
    },
  },
];

const events: Event[] = [
  {
    slug: "dhaka-classic-2026",
    status: "upcoming",
    startDate: "2026-12-12",
    organiser: "Sample Federation",
    name: { en: "Dhaka Classic 2026", bn: "ঢাকা ক্লাসিক ২০২৬" },
    summary: {
      en: "Open bodybuilding and physique championship (sample event).",
      bn: "উন্মুক্ত বডিবিল্ডিং ও ফিজিক চ্যাম্পিয়নশিপ (নমুনা ইভেন্ট)।",
    },
    description: {
      en: p("Fictional sample event. Add real events in the CMS."),
      bn: p("কাল্পনিক নমুনা ইভেন্ট। CMS-এ আসল ইভেন্ট যোগ করুন।"),
    },
    venue: { en: "Sample Indoor Stadium", bn: "নমুনা ইনডোর স্টেডিয়াম" },
    city: { en: "Dhaka", bn: "ঢাকা" },
  },
  {
    slug: "sylhet-open-2026",
    status: "completed",
    startDate: "2026-09-20",
    organiser: "Sample Federation",
    name: { en: "Sylhet Open 2026", bn: "সিলেট ওপেন ২০২৬" },
    summary: {
      en: "Regional open championship (sample results).",
      bn: "আঞ্চলিক উন্মুক্ত চ্যাম্পিয়নশিপ (নমুনা ফলাফল)।",
    },
    description: {
      en: p("Fictional sample event with placeholder results."),
      bn: p("কাল্পনিক নমুনা ইভেন্ট, ফলাফলগুলোও নমুনা।"),
    },
    venue: { en: "Sample Hall", bn: "নমুনা হল" },
    city: { en: "Sylhet", bn: "সিলেট" },
    results: [
      { place: 1, athlete: "Athlete A", division: "Men's Bodybuilding" },
      { place: 2, athlete: "Athlete B", division: "Men's Bodybuilding" },
      { place: 1, athlete: "Athlete C", division: "Classic Physique" },
    ],
  },
];

const athletes: Athlete[] = [
  {
    slug: "sample-athlete-one",
    featured: true,
    division: "Men's Bodybuilding",
    name: { en: "Sample Athlete One", bn: "নমুনা অ্যাথলেট এক" },
    hometown: { en: "Dhaka", bn: "ঢাকা" },
    summary: {
      en: "Placeholder profile. Replace with a real athlete in the CMS.",
      bn: "নমুনা প্রোফাইল। CMS-এ আসল অ্যাথলেট দিয়ে বদলে দিন।",
    },
    bio: {
      en: p("This is a fictional profile used to preview the athlete page layout."),
      bn: p("অ্যাথলেট পৃষ্ঠার লেআউট দেখাতে এটি একটি কাল্পনিক প্রোফাইল।"),
    },
    achievements: {
      en: ["Sample title 2025", "Sample runner-up 2024"],
      bn: ["নমুনা শিরোপা ২০২৫", "নমুনা রানার-আপ ২০২৪"],
    },
  },
  {
    slug: "sample-athlete-two",
    featured: true,
    division: "Women's Fitness",
    name: { en: "Sample Athlete Two", bn: "নমুনা অ্যাথলেট দুই" },
    hometown: { en: "Rajshahi", bn: "রাজশাহী" },
    summary: {
      en: "Placeholder profile. Replace with a real athlete in the CMS.",
      bn: "নমুনা প্রোফাইল। CMS-এ আসল অ্যাথলেট দিয়ে বদলে দিন।",
    },
    bio: {
      en: p("This is a fictional profile used to preview the athlete page layout."),
      bn: p("অ্যাথলেট পৃষ্ঠার লেআউট দেখাতে এটি একটি কাল্পনিক প্রোফাইল।"),
    },
    achievements: { en: ["Sample title 2026"], bn: ["নমুনা শিরোপা ২০২৬"] },
  },
];

const guides: Guide[] = [
  {
    slug: "progressive-overload-basics",
    topic: "training",
    publishedAt: "2026-10-15T10:00:00+06:00",
    title: { en: "Progressive overload: the basics", bn: "প্রগ্রেসিভ ওভারলোড: মৌলিক ধারণা" },
    excerpt: {
      en: "Add load, reps or sets over time. Track every session.",
      bn: "সময়ের সঙ্গে ওজন, রেপ বা সেট বাড়ান। প্রতিটি সেশন লিখে রাখুন।",
    },
    body: {
      en: p(
        "Muscle grows when training gets gradually harder. Add a little weight, an extra rep or an extra set when the current target feels manageable.",
        "Log every session so progress is measured, not guessed.",
      ),
      bn: p(
        "ট্রেনিং ধীরে ধীরে কঠিন হলে পেশি বাড়ে। বর্তমান লক্ষ্য সহজ মনে হলে একটু ওজন, একটি বাড়তি রেপ বা একটি বাড়তি সেট যোগ করুন।",
        "প্রতিটি সেশন লিখে রাখুন, যাতে অগ্রগতি অনুমান নয়, মাপা যায়।",
      ),
    },
  },
  {
    slug: "protein-on-a-bangladeshi-diet",
    topic: "nutrition",
    publishedAt: "2026-10-01T10:00:00+06:00",
    title: {
      en: "Hitting your protein target on a Bangladeshi diet",
      bn: "বাংলাদেশি খাবারে প্রোটিনের লক্ষ্য পূরণ",
    },
    excerpt: {
      en: "Eggs, fish, chicken, dal and doi: affordable local protein sources.",
      bn: "ডিম, মাছ, মুরগি, ডাল ও দই: সাশ্রয়ী দেশি প্রোটিনের উৎস।",
    },
    body: {
      en: p(
        "Most lifters do well on roughly 1.6–2.2 g of protein per kg of body weight per day.",
        "Spread it across meals. Eggs, fish, chicken, lentils and yoghurt are affordable local options.",
      ),
      bn: p(
        "অধিকাংশ লিফটারের জন্য প্রতিদিন শরীরের প্রতি কেজি ওজনে প্রায় ১.৬–২.২ গ্রাম প্রোটিন যথেষ্ট।",
        "বিভিন্ন বেলায় ভাগ করে খান। ডিম, মাছ, মুরগি, ডাল ও দই সাশ্রয়ী দেশি বিকল্প।",
      ),
    },
  },
];

export const sampleSource: ContentSource = {
  articles: async () => articles,
  events: async () => events,
  athletes: async () => athletes,
  guides: async () => guides,
};
