import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import type { Body, Image as Img } from "@/lib/content";
import { jsonLd } from "@/lib/site";

/**
 * A photo in a fixed-ratio frame. Renders nothing without a photo:
 * stories without one are laid out as text, never a filler box.
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
        alt={image.alt ?? alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ objectPosition: focus }}
      />
    </div>
  );
}

/** Small uppercase label above a headline: category, topic or date. */
export function Kicker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-display text-sm font-bold uppercase tracking-[0.08em] text-accent ${className}`}>{children}</p>
  );
}

/** Section label: a short rule and the name, set small. Sections differ by layout, not by heading chrome. */
export function SectionLabel({ title, href, linkLabel }: { title: string; href?: string; linkLabel?: string }) {
  return (
    <div className="mb-6 flex items-baseline justify-between gap-4 border-t-2 border-ink pt-3">
      <h2 className="font-display text-2xl font-bold uppercase tracking-[0.02em]">{title}</h2>
      {href && (
        <Link href={href} className="hl text-sm font-semibold">
          {linkLabel}
        </Link>
      )}
    </div>
  );
}

export function PageTitle({ title, intro }: { title: string; intro?: string }) {
  return (
    <header className="mb-10 border-b border-line pb-8">
      <h1 className="font-display text-5xl font-bold uppercase leading-[0.95] tracking-[-0.01em] sm:text-7xl">{title}</h1>
      {intro && <p className="mt-4 max-w-xl text-lg text-muted">{intro}</p>}
    </header>
  );
}

/** A story row: headline and excerpt, a thumbnail on the right only when a photo exists. */
export function StoryRow({
  href,
  kicker,
  title,
  excerpt,
  meta,
  image,
}: {
  href: string;
  kicker?: string;
  title: string;
  excerpt?: string;
  meta?: string;
  image?: Img;
}) {
  return (
    <article className="border-b border-line">
      <Link href={href} className="flex gap-6 py-6">
        <div className="min-w-0 flex-1">
          {kicker && <Kicker className="mb-2">{kicker}</Kicker>}
          <h3 className="text-xl font-bold leading-snug tracking-[-0.01em] sm:text-2xl">
            <span className="hl">{title}</span>
          </h3>
          {excerpt && <p className="mt-2 max-w-2xl text-muted">{excerpt}</p>}
          {meta && <p className="mt-3 text-sm text-muted">{meta}</p>}
        </div>
        <Photo image={image} alt={title} ratio="aspect-square" sizes="160px" className="w-28 shrink-0 sm:w-40" />
      </Link>
    </article>
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
    <Link href={href} className="font-display text-sm font-bold uppercase tracking-[0.08em] text-muted hover:text-ink">
      {label}
    </Link>
  );
}
