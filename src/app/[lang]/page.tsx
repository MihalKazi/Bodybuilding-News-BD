import Image from "next/image";
import Link from "next/link";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { LogoMark } from "@/components/Logo";
import { GridCard, Photo, SectionLabel, StoryCard, StoryRow } from "@/components/ui";
import { hasLocale, localeTags, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getDictionary } from "@/i18n/dictionaries";
import { getArticles, getAthletes, getEvents, getGuides, t, type Article, type Event } from "@/lib/content";
import { formatDate } from "@/lib/site";

/** Lead story: the photo fills the frame and only the headline sits on it, low, as a caption. */
function Lead({ article, locale }: { article: Article; locale: Locale }) {
  const title = t(article.title, locale)!;
  return (
    <Link
      href={`/${locale}/news/${article.slug}`}
      className={`zoom relative flex w-full overflow-hidden rounded-card bg-band text-band-ink ${
        article.image ? "aspect-[4/3] max-h-[600px] sm:aspect-[16/10]" : "min-h-[280px]"
      }`}
    >
      {article.image && (
        <Image
          src={article.image.url}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 760px, 100vw"
          className="object-cover"
          style={{ objectPosition: "50% 25%" }}
        />
      )}
      {/* Scrim only behind the caption, so faces in the upper part stay clear. */}
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 to-transparent" />
      <span className="relative mt-auto block p-5 sm:p-7">
        <span className="track-tight block max-w-3xl font-display text-2xl font-bold leading-[1.1] sm:text-[2rem]">
          <span className="hl">{title}</span>
        </span>
      </span>
    </Link>
  );
}

function dayMonth(date: string, locale: Locale) {
  const d = new Date(date);
  const fmt = (o: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(localeTags[locale], { ...o, timeZone: "Asia/Dhaka" }).format(d);
  return { day: fmt({ day: "numeric" }), month: fmt({ month: "short" }) };
}

/** Schedule strip in the ESPN manner: one row per show, date block left. */
function Schedule({ events, locale, dict }: { events: Event[]; locale: Locale; dict: Dictionary }) {
  return (
    <section>
      <SectionLabel title={dict.home.upcoming} href={`/${locale}/events`} linkLabel={dict.home.viewAll} />
      <ul className="grid gap-3 sm:grid-cols-2">
        {events.map((e) => {
          const { day, month } = dayMonth(e.startDate, locale);
          return (
            <li key={e.slug}>
              <Link href={`/${locale}/events/${e.slug}`} className="flex items-center gap-4 rounded-card bg-surface p-3 hover:bg-line">
                <span className="flex w-16 shrink-0 flex-col items-center rounded-[8px] bg-band py-2 text-band-ink">
                  <span className="font-display text-3xl font-extrabold leading-none text-gold tabular-nums">{day}</span>
                  <span className="text-xs font-semibold uppercase text-band-muted">{month}</span>
                </span>
                <span className="min-w-0">
                  <span className="hl block font-display text-2xl font-bold leading-tight">{t(e.name, locale)}</span>
                  <span className="block truncate text-sm text-muted">
                    {t(e.venue, locale)}, {t(e.city, locale)}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default async function Home() {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  const [dict, articles, events, athletes, guides] = await Promise.all([
    getDictionary(locale),
    getArticles(),
    getEvents(),
    getAthletes(),
    getGuides(),
  ]);

  // Lead with the newest story that has a photo (among the latest four), so the front never opens on an empty frame.
  const leadIndex = Math.max(0, articles.slice(0, 4).findIndex((a) => a.image));
  const lead = articles[leadIndex];
  const rest = articles.filter((_, i) => i !== leadIndex);
  // Top block holds the three newest stories (lead + two beside it).
  const side = rest.slice(0, 2);
  // "Latest" lists every story newest first, starting from the newest, so nothing is skipped.
  const latest = articles.slice(0, 9);
  const more = articles.slice(9, 17);
  const upcoming = events
    .filter((e) => e.status === "upcoming")
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .slice(0, 4);
  const featured = (athletes.some((a) => a.featured) ? athletes.filter((a) => a.featured) : athletes).slice(0, 4);
  const meta = (a: Article) => `${dict.categories[a.category]} · ${formatDate(a.publishedAt, locale)}`;

  // Right column: the next two stories; until there are two, real section cards fill the slots.
  const sectionCards = [
    { href: `/${locale}/events`, title: dict.nav.events, meta: dict.events.title },
    { href: `/${locale}/athletes`, title: dict.nav.athletes, meta: dict.athletes.intro },
    { href: `/${locale}/guides`, title: dict.nav.guides, meta: dict.guides.title },
  ].slice(0, Math.max(0, 2 - side.length));
  const strip = [
    { href: `/${locale}/news`, label: dict.nav.news },
    { href: `/${locale}/events`, label: dict.nav.events },
    { href: `/${locale}/athletes`, label: dict.nav.athletes },
    { href: `/${locale}/guides`, label: dict.nav.guides },
  ];

  return (
    <div className="flex flex-col gap-14">
      {lead && (
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.6fr_1fr]">
            <Lead article={lead} locale={locale} />
            <div className="flex flex-col gap-4">
              {side.map((a) => (
                <StoryCard key={a.slug} href={`/${locale}/news/${a.slug}`} title={t(a.title, locale)!} meta={meta(a)} image={a.image} />
              ))}
              {sectionCards.map((c) => (
                <Link key={c.href} href={c.href} className="flex flex-1 gap-4 rounded-card bg-surface p-4 hover:bg-line">
                  <span className="flex aspect-[4/3] w-32 shrink-0 items-center justify-center self-start rounded-[8px] bg-band sm:w-36">
                    <LogoMark className="h-12 w-auto text-gold" />
                  </span>
                  <span className="flex min-w-0 flex-col gap-1.5 py-1">
                    <span className="hl font-display text-2xl font-bold leading-[1.1]">{c.title}</span>
                    <span className="text-sm text-muted">{c.meta}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <nav aria-label={dict.footer.sections} className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {strip.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="flex min-h-16 items-center rounded-card bg-band px-5 font-display text-2xl font-bold uppercase text-band-ink hover:bg-gold hover:text-gold-ink"
              >
                {s.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {latest.length > 0 && (
        <section>
          <SectionLabel title={dict.home.latest} href={`/${locale}/news`} linkLabel={dict.home.viewAll} />
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((a) => (
              <GridCard
                key={a.slug}
                href={`/${locale}/news/${a.slug}`}
                title={t(a.title, locale)!}
                excerpt={t(a.excerpt, locale)}
                meta={meta(a)}
                image={a.image}
              />
            ))}
          </div>
        </section>
      )}

      {more.length > 0 && (
        <section>
          <SectionLabel title={dict.home.moreNews} href={`/${locale}/news`} linkLabel={dict.home.viewAll} />
          <div className="grid gap-x-10 md:grid-cols-2">
            {more.map((a) => (
              <StoryRow
                key={a.slug}
                href={`/${locale}/news/${a.slug}`}
                title={t(a.title, locale)!}
                meta={meta(a)}
                image={a.image}
                compact
              />
            ))}
          </div>
        </section>
      )}

      {upcoming.length > 0 && <Schedule events={upcoming} locale={locale} dict={dict} />}

      {featured.length > 0 && (
        <section>
          <SectionLabel title={dict.home.featuredAthletes} href={`/${locale}/athletes`} linkLabel={dict.home.viewAll} />
          <ul className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {featured.map((a) => {
              const name = t(a.name, locale)!;
              return (
                <li key={a.slug}>
                  <Link href={`/${locale}/athletes/${a.slug}`} className="block">
                    <Photo image={a.image} alt="" ratio="aspect-[4/5]" sizes="(min-width: 1024px) 25vw, 50vw" className="mb-3" />
                    <span className="hl block font-display text-2xl font-bold uppercase leading-none">{name}</span>
                    <span className="mt-1.5 block text-sm text-muted">
                      {t(a.division, locale)} · {t(a.hometown, locale)}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {guides.length > 0 && (
        <section>
          <SectionLabel title={dict.home.guides} href={`/${locale}/guides`} linkLabel={dict.home.viewAll} />
          <div className="grid gap-3 md:grid-cols-2">
            {guides.slice(0, 4).map((g) => (
              <StoryCard
                key={g.slug}
                href={`/${locale}/guides/${g.slug}`}
                title={t(g.title, locale)!}
                meta={dict.topics[g.topic]}
                image={g.image}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
