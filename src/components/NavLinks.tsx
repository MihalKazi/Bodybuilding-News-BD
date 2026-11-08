"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks({ items, label }: { items: { href: string; label: string }[]; label: string }) {
  const pathname = usePathname() ?? "";
  return (
    <nav aria-label={label}>
      <ul className="flex gap-5 overflow-x-auto font-display text-lg font-bold uppercase tracking-[0.03em] md:gap-7">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-12 items-center whitespace-nowrap border-b-[3px] ${
                  active ? "border-gold text-band-ink" : "border-transparent text-band-muted hover:text-band-ink"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
