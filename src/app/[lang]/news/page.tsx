import type { Metadata } from "next";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { NewsList } from "@/components/NewsList";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getArticles } from "@/lib/content";
import { alternates, contactHref } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await lang();
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return { title: dict.news.title, description: dict.news.intro, alternates: alternates(locale, "/news") };
}

export default async function NewsIndex() {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  const [dict, articles] = await Promise.all([getDictionary(locale), getArticles()]);
  return (
    <NewsList
      locale={locale}
      dict={dict}
      articles={articles}
      title={dict.news.title}
      intro={dict.news.intro}
      contactHref={contactHref(locale)}
    />
  );
}
