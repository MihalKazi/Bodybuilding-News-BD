import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsList } from "@/components/NewsList";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getArticles, type ArticleCategory } from "@/lib/content";
import { alternates, contactHref, fill } from "@/lib/site";

const categories: ArticleCategory[] = ["bd", "competition", "international"];
const isCategory = (c: string): c is ArticleCategory => (categories as string[]).includes(c);

export function generateStaticParams() {
  return categories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/news/category/[category]">): Promise<Metadata> {
  const { lang, category } = await params;
  if (!hasLocale(lang) || !isCategory(category)) return {};
  const dict = await getDictionary(lang);
  return {
    title: fill(dict.news.inCategory, { category: dict.categories[category] }),
    alternates: alternates(lang, `/news/category/${category}`),
  };
}

export default async function CategoryPage({ params }: PageProps<"/[lang]/news/category/[category]">) {
  const { lang, category } = await params;
  if (!hasLocale(lang) || !isCategory(category)) notFound();
  const [dict, articles] = await Promise.all([getDictionary(lang), getArticles(category)]);
  return (
    <NewsList
      locale={lang}
      dict={dict}
      articles={articles}
      active={category}
      title={dict.categories[category]}
      contactHref={contactHref(lang)}
    />
  );
}
