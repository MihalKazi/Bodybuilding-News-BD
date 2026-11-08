import type { Metadata, Viewport } from "next";
import { Anek_Bangla, Barlow, Barlow_Condensed, Hind_Siliguri } from "next/font/google";
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

// One family: Barlow for reading and UI, Barlow Condensed for display.
const barlowText = Barlow({ variable: "--font-text", subsets: ["latin", "latin-ext"], weight: ["400", "500", "600", "700"] });
const barlow = Barlow_Condensed({ variable: "--font-barlow", subsets: ["latin"], weight: ["600", "700", "800"] });
const anek = Anek_Bangla({ variable: "--font-anek", subsets: ["bengali"], axes: ["wdth"] });
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

/** Today's date in Dhaka for the masthead, refreshed hourly. */
async function today(locale: string) {
  "use cache";
  cacheLife("hours");
  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <html
      lang={localeTags[locale]}
      className={`${barlowText.variable} ${barlow.variable} ${anek.variable} ${bangla.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader locale={locale} dict={dict} today={await today(localeTags[locale])} />
        {!usingCms && (
          <p className="border-b border-line px-4 py-2 text-center text-sm text-muted">{dict.common.sample}</p>
        )}
        <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">{children}</main>
        <SiteFooter locale={locale} dict={dict} year={await currentYear()} />
      </body>
    </html>
  );
}
