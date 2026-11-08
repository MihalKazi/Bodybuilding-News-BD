import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import type { Body, Image as Img } from "@/lib/content";
import { jsonLd } from "@/lib/site";

export function Cover({ image, label, className = "" }: { image?: Img; label: string; className?: string }) {
  if (image?.url) {
    return (
      <div className={`relative overflow-hidden bg-line ${className}`}>
        <Image
          src={image.url}
          alt={image.alt ?? label}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }
  // No image yet: branded placeholder so layouts keep their shape.
  return (
    <div
      aria-hidden
      className={`flex items-end bg-gradient-to-br from-masthead via-neutral-800 to-accent p-4 ${className}`}
    >
      <span className="font-display text-sm uppercase tracking-widest text-white/70">BBN BD</span>
    </div>
  );
}

export function Card({
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
    <article className="group flex flex-col overflow-hidden rounded-lg border border-line bg-surface">
      <Link href={href} className="flex flex-1 flex-col">
        <Cover image={image} label={title} className="aspect-[16/9]" />
        <div className="flex flex-1 flex-col gap-2 p-4">
          {meta && <p className="text-xs font-semibold uppercase tracking-wide text-accent">{meta}</p>}
          <h3 className="font-display text-lg font-bold leading-snug group-hover:text-accent">{title}</h3>
          {excerpt && <p className="text-sm text-muted">{excerpt}</p>}
        </div>
      </Link>
    </article>
  );
}

export function SectionHeading({ title, href, linkLabel }: { title: string; href?: string; linkLabel?: string }) {
  return (
    <div className="mb-4 flex items-end justify-between border-b-4 border-accent pb-2">
      <h2 className="font-display text-2xl font-bold uppercase">{title}</h2>
      {href && (
        <Link href={href} className="text-sm font-semibold text-accent hover:underline">
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}

export function PageIntro({ title, intro }: { title: string; intro?: string }) {
  return (
    <header className="mb-8">
      <h1 className="font-display text-3xl font-bold uppercase sm:text-4xl">{title}</h1>
      {intro && <p className="mt-2 max-w-2xl text-muted">{intro}</p>}
    </header>
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

export function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}
