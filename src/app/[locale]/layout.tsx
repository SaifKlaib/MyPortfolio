import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CustomCursor } from '@/components/ui/cursor';
import type { Metadata } from 'next';
import { Josefin_Sans, Nunito, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

// Josefin Sans — geometric art-deco display, elegant uppercase
const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "600", "700"],
});

// Nunito — warm rounded sans-serif, friendly and highly readable
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// JetBrains Mono — monospaced font for tag pills and code elements
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: {
      default: 'Developer Portfolio',
      template: '%s | Portfolio'
    },
    description:
      locale === 'ar'
        ? 'مطور ويب متكامل — أبني تجارب رقمية دقيقة وأنيقة'
        : 'Full Stack Developer — building precise, thoughtful digital experiences',
    keywords: ['portfolio', 'developer', 'web development', 'react', 'next.js', 'typescript'],
    authors: [{ name: 'Saif Klaib' }],
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      title: 'Developer Portfolio',
      description: 'Full Stack Developer Portfolio',
      siteName: 'Developer Portfolio'
    },
    robots: { index: true, follow: true }
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html
      lang={locale}
      dir={direction}
      suppressHydrationWarning
      className={`${josefinSans.variable} ${nunito.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <CustomCursor />
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
