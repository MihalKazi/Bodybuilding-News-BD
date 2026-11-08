import Link from "next/link";
import { EmptyState, PageTitle, StoryRow } from "@/components/ui";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { t, type Article, type ArticleCategory } from "@/lib/content";
import { formatDate } from "@/lib/site";

const categories: ArticleCategory[] = ["bd", "competition", "international"];

/** The news index and each category listing share one layout: tabs, then story rows. */
export function NewsList({
  locale,
  dict,
  articles,
  active,
  title,
  intro,
  contactHref,
}: {
  locale: Locale;
  dict: Dictionary;
  articles: Article[];
  active?: ArticleCategory;
  title: string;
  intro?: string;
  contactHref?: string;
}) {
  const tabs = [
    { href: `/${locale}/news`, label: dict.news.all, current: !active },
    ...categories.map((c) => ({ href: `/${locale}/news/category/${c}`, label: dict.categories[c], current: active === c })),
  ];
  return (
    <>
      <PageTitle title={title} intro={intro} />
      <nav aria-label={dict.news.title} className="-mt-4 mb-6">
        <ul className="flex gap-6 overflow-x-auto border-b border-line font-display text-lg font-bold uppercase">
          {tabs.map((tab) => (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={tab.current ? "page" : undefined}
                className={`-mb-px inline-flex min-h-12 items-center whitespace-nowrap border-b-4 ${
                  tab.current ? "border-gold text-ink" : "border-transparent text-muted hover:text-ink"
                }`}
              >
                {tab.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {articles.length === 0 ? (
        <EmptyState title={dict.home.tipTitle} body={dict.home.tipBody} cta={dict.empty.cta} href={contactHref} />
      ) : (
        <div className="max-w-4xl">
          {articles.map((a) => (
            <StoryRow
              key={a.slug}
              href={`/${locale}/news/${a.slug}`}
              title={t(a.title, locale)!}
              excerpt={t(a.excerpt, locale)}
              meta={`${dict.categories[a.category]} · ${formatDate(a.publishedAt, locale)}`}
              image={a.image}
            />
          ))}
        </div>
      )}
    </>
  );
}
