import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import type { Locale } from "@/i18n/config";
import { t, type Body, type Image as Img } from "@/lib/content";
import { jsonLd } from "@/lib/site";

/**
 * A photo in a frame. Renders nothing without a photo: stories without one are
 * laid out as text, never a filler box. `alt=""` marks it decorative when the
 * headline in the same link already names the story.
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
      className={`zoom relative overflow-hidden bg-line ${own ? "" : ratio} ${className}`}
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

/** A captioned news photo: caption and credit sit under the frame, as a newspaper prints them. */
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
        <figcaption className="mt-2 border-b border-line pb-3 text-sm text-muted">
          {caption}
          {caption && image.credit && " "}
          {image.credit && <span className="text-xs uppercase tracking-[0.06em]">© {image.credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}

/** Section label: a heavy rule and the name, set small. Sections differ by layout, not heading chrome. */
export function SectionLabel({ title, href, linkLabel }: { title: string; href?: string; linkLabel?: string }) {
  return (
    <div className="mb-6 flex items-baseline justify-between gap-4 border-t-2 border-ink pt-3">
      <h2 className="font-display text-2xl font-bold uppercase">{title}</h2>
      {href && (
        <Link href={href} className="hl inline-flex min-h-11 items-center text-sm font-semibold">
          {linkLabel}
        </Link>
      )}
    </div>
  );
}

export function PageTitle({ title, intro }: { title: string; intro?: string }) {
  return (
    <header className="mb-10 border-b border-line pb-8">
      <h1 className="font-display text-6xl font-extrabold uppercase leading-[0.9] sm:text-8xl">{title}</h1>
      {intro && <p className="mt-4 max-w-xl text-lg text-muted">{intro}</p>}
    </header>
  );
}

/** A story row: headline, standfirst, then category and date; a thumbnail only when a photo exists. */
export function StoryRow({
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
    <article className="border-b border-line">
      <Link href={href} className="flex gap-6 py-6">
        <div className="min-w-0 flex-1">
          <h3 className="track-tight font-display text-[1.75rem] font-bold leading-[1.05] sm:text-[2rem]">
            <span className="hl">{title}</span>
          </h3>
          {excerpt && <p className="mt-2 max-w-2xl text-muted">{excerpt}</p>}
          {meta && <p className="mt-3 text-sm font-semibold text-accent">{meta}</p>}
        </div>
        <Photo image={image} alt="" ratio="aspect-square" sizes="160px" className="w-24 shrink-0 self-start sm:w-40" />
      </Link>
    </article>
  );
}

/** An honest empty state: what is coming, and how a reader can help fill it. */
export function EmptyState({ title, body, cta, href }: { title: string; body: string; cta?: string; href?: string }) {
  return (
    <section className="max-w-2xl border-t-2 border-ink pt-6">
      <h2 className="font-display text-4xl font-bold leading-[1.0]">{title}</h2>
      <p className="mt-4 text-lg text-muted">{body}</p>
      {cta && href && (
        <Link
          href={href}
          className="mt-6 inline-flex min-h-11 items-center bg-ink px-5 font-display text-lg font-bold uppercase text-bg hover:bg-gold hover:text-gold-ink"
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
    <Link
      href={href}
      className="inline-flex min-h-11 items-center font-display text-base font-bold uppercase text-muted hover:text-ink"
    >
      {label}
    </Link>
  );
}
