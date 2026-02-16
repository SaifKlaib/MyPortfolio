import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import type { Metadata } from 'next';
import { Syne, Work_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

// Distinctive typography choices
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: {
      default: 'Developer Portfolio | Modern Bilingual Portfolio',
      template: '%s | Developer Portfolio'
    },
    description:
      locale === 'ar'
        ? 'ملف أعمال مطور ويب متكامل - مشاريع حديثة وتقنيات متطورة'
        : 'Full Stack Developer Portfolio - Modern projects and cutting-edge technologies',
    keywords: ['portfolio', 'developer', 'web development', 'react', 'next.js', 'typescript'],
    authors: [{ name: 'Your Name' }],
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      title: 'Developer Portfolio',
      description: 'A modern bilingual developer portfolio',
      siteName: 'Developer Portfolio'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Developer Portfolio',
      description: 'A modern bilingual developer portfolio'
    },
    robots: {
      index: true,
      follow: true
    }
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
    <html lang={locale} dir={direction} suppressHydrationWarning className={`${syne.variable} ${workSans.variable}`}>
      <body className="font-sans">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col relative">
              {/* Background decoration */}
              <div className="fixed inset-0 -z-10 bg-grid-pattern opacity-20" />
              <div className="fixed inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

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
