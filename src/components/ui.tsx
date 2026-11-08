import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import type { Locale } from "@/i18n/config";
import { t, type Body, type Image as Img } from "@/lib/content";
import { jsonLd } from "@/lib/site";
import { LogoMark } from "./Logo";

/**
 * A photo in a rounded frame. Renders nothing without a photo: stories without
 * one fall back to a text layout, never a filler box. `alt=""` marks it
 * decorative when the headline in the same link already names the story.
 */
export function Photo({
  image,
  alt,
  ratio = "aspect-[3/2]",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  className = "",
  focus = "50% 35%",
  natural = false,
}: {
  image?: Img;
  alt: string;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  focus?: string;
  /** Keep the photo's own shape (capped at 4:5 portrait) instead of cropping to `ratio`. */
  natural?: boolean;
}) {
  if (!image?.url) return null;
  const own = natural && image.width && image.height ? Math.max(image.width / image.height, 0.8) : null;
  return (
    <div
      className={`zoom relative overflow-hidden rounded-card bg-line ${own ? "" : ratio} ${className}`}
      style={own ? { aspectRatio: own } : undefined}
    >
      <Image
        src={image.url}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ objectPosition: focus }}
      />
    </div>
  );
}

/** A captioned news photo: caption and credit sit under the frame. */
export function Figure({
  image,
  alt,
  locale,
  sizes,
  className = "",
}: {
  image?: Img;
  alt: string;
  locale: Locale;
  sizes: string;
  className?: string;
}) {
  if (!image?.url) return null;
  const caption = t(image.caption, locale);
  return (
    <figure className={className}>
      <Photo image={image} alt={image.alt ?? alt} priority natural sizes={sizes} />
      {(caption || image.credit) && (
        <figcaption className="mt-2 text-sm text-muted">
          {caption}
          {caption && image.credit && " "}
          {image.credit && <span className="text-xs uppercase tracking-[0.06em]">© {image.credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}

/** Section heading with an optional "view all" link; a short gold bar marks the start. */
export function SectionLabel({ title, href, linkLabel }: { title: string; href?: string; linkLabel?: string }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <h2 className="flex items-center gap-3 font-display text-3xl font-bold uppercase leading-none">
        <span aria-hidden className="h-7 w-1.5 rounded-full bg-gold" />
        {title}
      </h2>
      {href && (
        <Link href={href} className="inline-flex min-h-11 items-center text-sm font-semibold text-muted hover:text-ink">
          {linkLabel}
        </Link>
      )}
    </div>
  );
}

export function PageTitle({ title, intro }: { title: string; intro?: string }) {
  return (
    <header className="mb-8 border-b border-line pb-6">
      <h1 className="font-display text-5xl font-extrabold uppercase leading-none sm:text-6xl">{title}</h1>
      {intro && <p className="mt-3 max-w-xl text-lg text-muted">{intro}</p>}
    </header>
  );
}

/** Compact horizontal card: small square thumbnail left (logo tile when there is no photo), headline and meta right. */
export function StoryCard({
  href,
  title,
  meta,
  image,
}: {
  href: string;
  title: string;
  meta?: string;
  image?: Img;
}) {
  return (
    <Link href={href} className="flex items-center gap-4 rounded-card bg-surface p-3 hover:bg-line">
      {image ? (
        <Photo image={image} alt="" ratio="aspect-square" sizes="96px" className="w-20 shrink-0 sm:w-24" focus="50% 25%" />
      ) : (
        <span aria-hidden className="flex aspect-square w-20 shrink-0 items-center justify-center rounded-card bg-band sm:w-24">
          <LogoMark className="h-9 w-auto text-gold" />
        </span>
      )}
      <span className="flex min-w-0 flex-col justify-center gap-1.5">
        <span className="hl track-tight font-display text-xl font-bold leading-[1.15] sm:text-[1.4rem]">{title}</span>
        {meta && <span className="text-sm text-muted">{meta}</span>}
      </span>
    </Link>
  );
}

/** Grid card: photo on top, headline, standfirst and meta below. */
export function GridCard({
  href,
  title,
  excerpt,
  meta,
  image,
}: {
  href: string;
  title: string;
  excerpt?: string;
  meta?: string;
  image?: Img;
}) {
  return (
    <article>
      <Link href={href} className="group flex h-full flex-col gap-3">
        {image ? (
          <Photo image={image} alt="" ratio="aspect-[16/10]" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
        ) : (
          // Same frame as a photo so grid rows stay aligned; the brand mark marks a text-only story.
          <span aria-hidden className="flex aspect-[16/10] items-center justify-center rounded-card bg-band">
            <LogoMark className="h-16 w-auto text-gold" />
          </span>
        )}
        <h3 className="track-tight font-display text-[1.65rem] font-bold leading-[1.1]">
          <span className="hl">{title}</span>
        </h3>
        {excerpt && <p className="text-muted">{excerpt}</p>}
        {meta && <p className="mt-auto text-sm font-semibold text-muted">{meta}</p>}
      </Link>
    </article>
  );
}

/** A list row for index pages: headline and standfirst, thumbnail right when a photo exists. */
export function StoryRow({
  href,
  title,
  excerpt,
  meta,
  image,
  compact = false,
}: {
  href: string;
  title: string;
  excerpt?: string;
  meta?: string;
  image?: Img;
  /** Denser row for secondary lists: smaller headline and thumbnail. */
  compact?: boolean;
}) {
  return (
    <article className="border-b border-line">
      <Link href={href} className={`flex ${compact ? "gap-4 py-4" : "gap-6 py-6"}`}>
        <div className="min-w-0 flex-1">
          <h3
            className={`track-tight font-display font-bold ${
              compact ? "text-xl leading-[1.15] sm:text-[1.4rem]" : "text-[1.75rem] leading-[1.08] sm:text-[2rem]"
            }`}
          >
            <span className="hl">{title}</span>
          </h3>
          {excerpt && <p className="mt-2 max-w-2xl text-muted">{excerpt}</p>}
          {meta && <p className={`${compact ? "mt-2" : "mt-3"} text-sm font-semibold text-muted`}>{meta}</p>}
        </div>
        <Photo
          image={image}
          alt=""
          ratio="aspect-[4/3]"
          sizes="200px"
          className={`shrink-0 self-start ${compact ? "w-24 sm:w-32" : "w-28 sm:w-48"}`}
        />
      </Link>
    </article>
  );
}

/** An honest empty state: what is coming, and how a reader can help fill it. */
export function EmptyState({ title, body, cta, href }: { title: string; body: string; cta?: string; href?: string }) {
  return (
    <section className="max-w-2xl rounded-card bg-surface p-8">
      <h2 className="font-display text-3xl font-bold leading-[1.05]">{title}</h2>
      <p className="mt-3 text-lg text-muted">{body}</p>
      {cta && href && (
        <Link
          href={href}
          className="mt-6 inline-flex min-h-11 items-center rounded-full bg-ink px-6 font-display text-lg font-bold uppercase text-bg hover:bg-gold hover:text-gold-ink"
        >
          {cta}
        </Link>
      )}
    </section>
  );
}

export function Prose({ value }: { value?: Body }) {
  if (!value?.length) return null;
  return (
    <div className="prose-body">
      <PortableText value={value} />
    </div>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(data)} />;
}

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-muted hover:text-ink">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M15 18l-6-6 6-6" />
      </svg>
      {label}
    </Link>
  );
}
