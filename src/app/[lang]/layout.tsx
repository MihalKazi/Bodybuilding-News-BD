import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Hind_Siliguri, Inter } from "next/font/google";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import "../globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { hasLocale, locales, localeTags } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { usingCms } from "@/lib/content";
import { alternates, SITE_URL } from "@/lib/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const barlow = Barlow_Condensed({ variable: "--font-barlow", subsets: ["latin"], weight: ["600", "700", "800"] });
const bangla = Hind_Siliguri({
  variable: "--font-bangla",
  subsets: ["bengali"],
  weight: ["400", "600", "700"],
});

export const viewport: Viewport = { themeColor: "#0e0e0e" };

export function generateStaticParams() {
  return locales.map((l) => ({ lang: l }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await lang();
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: `${dict.site.name} | ${dict.site.tagline}`, template: `%s | ${dict.site.name}` },
    description: dict.site.description,
    alternates: alternates(locale),
    openGraph: {
      siteName: dict.site.name,
      locale: locale === "bn" ? "bn_BD" : "en_US",
      type: "website",
    },
  };
}

async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <html
      lang={localeTags[locale]}
      className={`${inter.variable} ${barlow.variable} ${bangla.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader locale={locale} dict={dict} />
        {!usingCms && (
          <p className="border-b border-line px-4 py-2 text-center text-sm text-muted">{dict.common.sample}</p>
        )}
        <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">{children}</main>
        <SiteFooter locale={locale} dict={dict} year={await currentYear()} />
      </body>
    </html>
  );
}
