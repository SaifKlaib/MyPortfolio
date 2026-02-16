# Bilingual Developer Portfolio Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.
> **Alternative:** Use frontend-design skill for distinctive, production-grade UI implementation.

**Goal:** Build a modern, bilingual (English/Arabic) developer portfolio with dark mode, animations, and placeholder content.

**Architecture:** Next.js 15 App Router with TypeScript, Tailwind CSS for styling, next-intl for i18n with URL-based routing, next-themes for dark mode persistence, Framer Motion for animations. Component-driven architecture with centralized placeholder data.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, next-intl, next-themes, Framer Motion, Vercel (deployment)

---

## Task 1: Project Initialization

**Files:**
- Create: entire Next.js project structure
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `.gitignore`

**Step 1: Create Next.js project with TypeScript and Tailwind**

Run: `npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*" --use-npm`

When prompted:
- Project name: `.` (current directory)
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- `src/` directory: Yes
- App Router: Yes
- Import alias: `@/*`

Expected: Project scaffolded with Next.js 15, TypeScript, Tailwind

**Step 2: Install required dependencies**

Run: `npm install next-intl next-themes framer-motion`

Expected: Dependencies installed successfully

**Step 3: Install dev dependencies**

Run: `npm install -D @types/node @types/react @types/react-dom`

Expected: Type definitions installed

**Step 4: Verify installation**

Run: `npm run dev`

Expected: Dev server starts on http://localhost:3000
Action: Visit browser, see default Next.js page
Action: Stop server (Ctrl+C)

**Step 5: Update .gitignore**

File: `.gitignore`

```gitignore
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

**Step 6: Commit project initialization**

```bash
git add .
git commit -m "feat: initialize Next.js project with TypeScript and Tailwind

- Set up Next.js 15 with App Router
- Configure TypeScript and Tailwind CSS
- Install next-intl, next-themes, framer-motion
- Add comprehensive .gitignore

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 2: Configure Tailwind for Dark Mode and RTL

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

**Step 1: Update Tailwind config for dark mode and RTL**

File: `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-in-out",
        "slide-in": "slide-in 0.5s ease-out",
        "bounce-slow": "bounce 3s infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
```

**Step 2: Update global styles with CSS variables**

File: `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --primary: 197 100% 50%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 10%;
    --card-foreground: 0 0% 98%;
    --primary: 197 100% 50%;
    --primary-foreground: 0 0% 9%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

/* RTL Support */
[dir="rtl"] {
  direction: rtl;
}

[dir="ltr"] {
  direction: ltr;
}

/* Smooth transitions */
* {
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

**Step 3: Test Tailwind configuration**

Run: `npm run dev`

Action: Visit http://localhost:3000
Expected: Page loads with updated styles
Action: Stop server

**Step 4: Commit Tailwind configuration**

```bash
git add tailwind.config.ts src/app/globals.css
git commit -m "feat: configure Tailwind for dark mode and RTL support

- Add dark mode class strategy
- Define CSS variables for theme colors
- Add custom animations (fade-in, slide-in)
- Configure RTL direction support
- Add smooth color transitions

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 3: Set Up i18n Configuration

**Files:**
- Create: `src/i18n/request.ts`
- Create: `src/i18n/routing.ts`
- Create: `messages/en.json`
- Create: `messages/ar.json`
- Create: `src/middleware.ts`

**Step 1: Create i18n routing configuration**

File: `src/i18n/routing.ts`

```typescript
import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'always'
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
```

**Step 2: Create i18n request configuration**

File: `src/i18n/request.ts`

```typescript
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
```

**Step 3: Create English translation file**

File: `messages/en.json`

```json
{
  "nav": {
    "home": "Home",
    "projects": "Projects",
    "about": "About",
    "contact": "Contact"
  },
  "hero": {
    "greeting": "Hi, I'm",
    "title": "Full Stack Developer",
    "subtitle": "I build things that work... most of the time 😄",
    "cta": "View My Work"
  },
  "projects": {
    "title": "Projects",
    "filter": "Filter by technology",
    "viewLive": "Live Demo",
    "viewCode": "View Code",
    "viewCase": "Case Study"
  },
  "about": {
    "title": "About Me",
    "skillsTitle": "Skills & Technologies"
  },
  "contact": {
    "title": "Get In Touch",
    "email": "Email",
    "social": "Social"
  },
  "footer": {
    "rights": "All rights reserved",
    "built": "Built with Next.js & TypeScript"
  },
  "theme": {
    "light": "Light mode",
    "dark": "Dark mode"
  },
  "language": {
    "en": "English",
    "ar": "العربية"
  }
}
```

**Step 4: Create Arabic translation file**

File: `messages/ar.json`

```json
{
  "nav": {
    "home": "الرئيسية",
    "projects": "المشاريع",
    "about": "عني",
    "contact": "اتصل بي"
  },
  "hero": {
    "greeting": "مرحباً، أنا",
    "title": "مطور ويب متكامل",
    "subtitle": "أبني أشياء تعمل... معظم الوقت 😄",
    "cta": "اعرض أعمالي"
  },
  "projects": {
    "title": "المشاريع",
    "filter": "فلتر حسب التقنية",
    "viewLive": "معاينة مباشرة",
    "viewCode": "اعرض الكود",
    "viewCase": "دراسة الحالة"
  },
  "about": {
    "title": "عني",
    "skillsTitle": "المهارات والتقنيات"
  },
  "contact": {
    "title": "تواصل معي",
    "email": "البريد الإلكتروني",
    "social": "وسائل التواصل"
  },
  "footer": {
    "rights": "جميع الحقوق محفوظة",
    "built": "بُني باستخدام Next.js و TypeScript"
  },
  "theme": {
    "light": "الوضع الفاتح",
    "dark": "الوضع الداكن"
  },
  "language": {
    "en": "English",
    "ar": "العربية"
  }
}
```

**Step 5: Create middleware for locale detection**

File: `src/middleware.ts`

```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(ar|en)/:path*']
};
```

**Step 6: Commit i18n configuration**

```bash
git add src/i18n/ messages/ src/middleware.ts
git commit -m "feat: configure next-intl for bilingual support

- Set up routing for English and Arabic locales
- Create translation files with initial content
- Add middleware for locale detection
- Configure locale prefix strategy

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 4: Create Placeholder Data

**Files:**
- Create: `src/lib/data/projects.ts`
- Create: `src/lib/data/skills.ts`
- Create: `src/lib/data/constants.ts`
- Create: `src/lib/types.ts`

**Step 1: Create type definitions**

File: `src/lib/types.ts`

```typescript
export interface Project {
  id: number;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  longDescription: {
    en: string;
    ar: string;
  };
  tags: string[];
  thumbnail: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}
```

**Step 2: Create projects data**

File: `src/lib/data/projects.ts`

```typescript
import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: {
      en: 'E-Commerce Platform',
      ar: 'منصة تجارة إلكترونية'
    },
    description: {
      en: 'A full-featured online store with cart, payments, and admin dashboard',
      ar: 'متجر إلكتروني متكامل مع سلة تسوق ومدفوعات ولوحة تحكم'
    },
    longDescription: {
      en: 'Built a complete e-commerce solution with Next.js and Stripe integration. Features include product catalog, shopping cart, secure checkout, order management, and an admin dashboard for inventory management.',
      ar: 'تم بناء حل تجارة إلكترونية متكامل باستخدام Next.js وتكامل Stripe. يتضمن كتالوج منتجات، سلة تسوق، دفع آمن، إدارة الطلبات، ولوحة تحكم للمخزون.'
    },
    tags: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS'],
    thumbnail: '/images/projects/ecommerce.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/username/project',
    featured: true
  },
  {
    id: 2,
    title: {
      en: 'Task Management App',
      ar: 'تطبيق إدارة المهام'
    },
    description: {
      en: 'Collaborative task manager with real-time updates and team features',
      ar: 'مدير مهام تعاوني مع تحديثات فورية وميزات فريق'
    },
    longDescription: {
      en: 'A productivity app for teams with drag-and-drop task organization, real-time collaboration, notifications, and progress tracking. Built with React and Firebase.',
      ar: 'تطبيق إنتاجية للفرق مع تنظيم المهام بالسحب والإفلات، تعاون فوري، إشعارات، وتتبع التقدم. مبني بـ React و Firebase.'
    },
    tags: ['React', 'Firebase', 'Material-UI', 'WebSocket'],
    thumbnail: '/images/projects/tasks.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/username/project',
    featured: true
  },
  {
    id: 3,
    title: {
      en: 'Weather Dashboard',
      ar: 'لوحة معلومات الطقس'
    },
    description: {
      en: 'Beautiful weather app with forecasts and location-based data',
      ar: 'تطبيق طقس جميل مع توقعات وبيانات تعتمد على الموقع'
    },
    longDescription: {
      en: 'An elegant weather application that displays current conditions, hourly and weekly forecasts, with beautiful data visualizations and location search.',
      ar: 'تطبيق طقس أنيق يعرض الظروف الحالية، التوقعات بالساعة والأسبوع، مع تصورات بيانات جميلة وبحث عن المواقع.'
    },
    tags: ['Vue.js', 'OpenWeather API', 'Chart.js', 'CSS3'],
    thumbnail: '/images/projects/weather.jpg',
    liveUrl: 'https://example.com',
    featured: false
  },
  {
    id: 4,
    title: {
      en: 'Social Media Dashboard',
      ar: 'لوحة معلومات وسائل التواصل'
    },
    description: {
      en: 'Analytics dashboard for tracking social media metrics',
      ar: 'لوحة تحليلات لتتبع مقاييس وسائل التواصل الاجتماعي'
    },
    longDescription: {
      en: 'A comprehensive analytics tool that aggregates data from multiple social platforms, providing insights, trends, and performance metrics in real-time.',
      ar: 'أداة تحليلات شاملة تجمع البيانات من منصات اجتماعية متعددة، وتوفر رؤى واتجاهات ومقاييس أداء في الوقت الفعلي.'
    },
    tags: ['Angular', 'D3.js', 'Node.js', 'MongoDB'],
    thumbnail: '/images/projects/social.jpg',
    githubUrl: 'https://github.com/username/project',
    featured: false
  },
  {
    id: 5,
    title: {
      en: 'Portfolio Builder',
      ar: 'منشئ ملف أعمال'
    },
    description: {
      en: 'No-code tool for creating stunning developer portfolios',
      ar: 'أداة بدون كود لإنشاء ملفات أعمال مطورين مذهلة'
    },
    longDescription: {
      en: 'An intuitive portfolio builder that lets developers create and customize their portfolio websites without writing code. Features drag-and-drop interface, templates, and one-click deployment.',
      ar: 'منشئ ملف أعمال بديهي يتيح للمطورين إنشاء وتخصيص مواقع ملفات أعمالهم بدون كتابة كود. يتضمن واجهة سحب وإفلات وقوالب ونشر بنقرة واحدة.'
    },
    tags: ['React', 'Next.js', 'Prisma', 'PostgreSQL'],
    thumbnail: '/images/projects/builder.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/username/project',
    featured: true
  }
];
```

**Step 3: Create skills data**

File: `src/lib/data/skills.ts`

```typescript
import { Skill } from '../types';

export const skills: Skill[] = [
  // Frontend
  { name: 'React', icon: '⚛️', category: 'frontend' },
  { name: 'Next.js', icon: '▲', category: 'frontend' },
  { name: 'TypeScript', icon: '🔷', category: 'frontend' },
  { name: 'Tailwind CSS', icon: '🎨', category: 'frontend' },
  { name: 'Vue.js', icon: '💚', category: 'frontend' },

  // Backend
  { name: 'Node.js', icon: '🟢', category: 'backend' },
  { name: 'Python', icon: '🐍', category: 'backend' },
  { name: 'PostgreSQL', icon: '🐘', category: 'backend' },
  { name: 'MongoDB', icon: '🍃', category: 'backend' },
  { name: 'GraphQL', icon: '◼️', category: 'backend' },

  // Tools
  { name: 'Git', icon: '📦', category: 'tools' },
  { name: 'Docker', icon: '🐳', category: 'tools' },
  { name: 'AWS', icon: '☁️', category: 'tools' },
  { name: 'Vercel', icon: '▲', category: 'tools' },
  { name: 'Figma', icon: '🎨', category: 'tools' }
];
```

**Step 4: Create constants file**

File: `src/lib/data/constants.ts`

```typescript
import { SocialLink } from '../types';

export const SITE_CONFIG = {
  name: {
    en: 'Your Name',
    ar: 'اسمك'
  },
  tagline: {
    en: 'Full Stack Developer',
    ar: 'مطور ويب متكامل'
  },
  email: 'your.email@example.com',
  location: {
    en: 'Your City, Country',
    ar: 'مدينتك، بلدك'
  }
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: 'github'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: 'linkedin'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/yourusername',
    icon: 'twitter'
  },
  {
    name: 'Email',
    url: 'mailto:your.email@example.com',
    icon: 'email'
  }
];

export const NAV_LINKS = [
  { href: '/', labelKey: 'nav.home' },
  { href: '/projects', labelKey: 'nav.projects' },
  { href: '/about', labelKey: 'nav.about' },
  { href: '/contact', labelKey: 'nav.contact' }
];
```

**Step 5: Commit placeholder data**

```bash
git add src/lib/
git commit -m "feat: add placeholder data for projects and skills

- Create TypeScript type definitions
- Add 5 sample projects with bilingual content
- Add skills grouped by category
- Define site constants and social links
- Structure data for easy updates

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 5: Create Root Layout with Theme Provider

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/components/providers/theme-provider.tsx`
- Create: `next-intl.d.ts`

**Step 1: Create theme provider component**

File: `src/components/providers/theme-provider.tsx`

```typescript
'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

**Step 2: Create next-intl type augmentation**

File: `next-intl.d.ts` (in project root)

```typescript
import en from './messages/en.json';

type Messages = typeof en;

declare global {
  interface IntlMessages extends Messages {}
}
```

**Step 3: Update root layout**

File: `src/app/layout.tsx`

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Developer Portfolio",
  description: "A modern bilingual developer portfolio",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

**Step 4: Test layout**

Run: `npm run dev`

Action: Visit http://localhost:3000
Expected: Error about missing locale param (normal, we'll fix with pages)
Action: Stop server

**Step 5: Commit layout updates**

```bash
git add src/app/layout.tsx src/components/providers/ next-intl.d.ts
git commit -m "feat: set up root layout with theme and i18n providers

- Create theme provider wrapper component
- Add type augmentation for next-intl
- Configure root layout with locale support
- Set RTL direction for Arabic
- Enable system theme detection

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 6: Create Theme Toggle Component

**Files:**
- Create: `src/components/ui/theme-toggle.tsx`

**Step 1: Create theme toggle component**

File: `src/components/ui/theme-toggle.tsx`

```typescript
'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = useTranslations('theme');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-muted"
        aria-label="Toggle theme"
      >
        <Sun className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-muted hover:bg-accent transition-colors"
      aria-label={theme === 'dark' ? t('light') : t('dark')}
      title={theme === 'dark' ? t('light') : t('dark')}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}
```

**Step 2: Install lucide-react for icons**

Run: `npm install lucide-react`

Expected: Icons library installed

**Step 3: Commit theme toggle**

```bash
git add src/components/ui/theme-toggle.tsx package.json package-lock.json
git commit -m "feat: add theme toggle component

- Create theme toggle with sun/moon icons
- Handle hydration properly
- Add hover states and transitions
- Use translations for accessibility labels

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 7: Create Language Switcher Component

**Files:**
- Create: `src/components/ui/language-switcher.tsx`

**Step 1: Create language switcher component**

File: `src/components/ui/language-switcher.tsx`

```typescript
'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <button
      onClick={toggleLanguage}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-muted hover:bg-accent transition-colors"
      aria-label={locale === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm font-medium">
        {locale === 'en' ? 'العربية' : 'English'}
      </span>
    </button>
  );
}
```

**Step 2: Commit language switcher**

```bash
git add src/components/ui/language-switcher.tsx
git commit -m "feat: add language switcher component

- Create toggle between English and Arabic
- Maintain current page when switching
- Use globe icon with language label
- Add hover states and transitions

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 8: Create Navbar Component

**Files:**
- Create: `src/components/layout/navbar.tsx`

**Step 1: Create navbar component**

File: `src/components/layout/navbar.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/data/constants';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold hover:text-primary transition-colors">
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-accent transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium hover:text-primary transition-colors px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
```

**Step 2: Commit navbar**

```bash
git add src/components/layout/navbar.tsx
git commit -m "feat: add responsive navbar component

- Create navbar with logo and navigation links
- Add theme toggle and language switcher
- Implement mobile hamburger menu
- Add hover states and transitions
- Use sticky positioning with backdrop blur

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 9: Create Footer Component

**Files:**
- Create: `src/components/layout/footer.tsx`

**Step 1: Create footer component**

File: `src/components/layout/footer.tsx`

```typescript
import { useTranslations } from 'next-intl';
import { SOCIAL_LINKS } from '@/lib/data/constants';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail
};

export function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((link) => {
              const Icon = iconMap[link.icon as keyof typeof iconMap];
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-muted hover:bg-accent hover:text-primary transition-colors"
                  aria-label={link.name}
                >
                  {Icon && <Icon className="h-5 w-5" />}
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="flex flex-col items-center md:items-end gap-1 text-sm text-muted-foreground">
            <p>© {currentYear} Portfolio. {t('rights')}.</p>
            <p>{t('built')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

**Step 2: Commit footer**

```bash
git add src/components/layout/footer.tsx
git commit -m "feat: add footer component with social links

- Create footer with social media icons
- Add copyright and tech stack info
- Use icon mapping for dynamic rendering
- Add hover states and transitions
- Responsive layout (stack on mobile)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 10: Create Locale Layout Template

**Files:**
- Create: `src/app/[locale]/layout.tsx`
- Delete: `src/app/page.tsx` (will be moved to locale folder)

**Step 1: Create locale layout**

File: `src/app/[locale]/layout.tsx`

```typescript
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function LocaleLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
```

**Step 2: Delete old page**

Run: `rm src/app/page.tsx`

Expected: File removed

**Step 3: Test layout structure**

Run: `npm run dev`

Action: Visit http://localhost:3000
Expected: Redirects to /en, shows navbar and footer (no content yet)
Action: Visit http://localhost:3000/ar
Expected: Same but in RTL mode
Action: Stop server

**Step 4: Commit locale layout**

```bash
git add src/app/[locale]/layout.tsx
git rm src/app/page.tsx
git commit -m "feat: add locale-specific layout template

- Create layout with navbar and footer
- Set up flex container for sticky footer
- Remove default page.tsx
- Prepare structure for locale-specific pages

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 11: Create Hero Section Component

**Files:**
- Create: `src/components/sections/hero.tsx`

**Step 1: Create hero section**

File: `src/components/sections/hero.tsx`

```typescript
'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/data/constants';
import { useLocale } from 'next-intl';

export function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const name = SITE_CONFIG.name[locale as 'en' | 'ar'];

  return (
    <section className="container mx-auto px-4 py-24 md:py-32">
      <div className="flex flex-col items-center text-center gap-8">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4"
        >
          <p className="text-lg text-muted-foreground">
            {t('greeting')} <span className="wave inline-block">👋</span>
          </p>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            {name}
          </h1>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl md:text-4xl font-semibold"
        >
          {t('title')}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-2xl"
        >
          {t('subtitle')}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 text-lg font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {t('cta')}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 2: Add wave animation to globals.css**

File: `src/app/globals.css` (append to end)

```css
/* Wave animation */
.wave {
  animation: wave 2s ease-in-out infinite;
  transform-origin: 70% 70%;
}

@keyframes wave {
  0%, 100% {
    transform: rotate(0deg);
  }
  10%, 30% {
    transform: rotate(14deg);
  }
  20%, 40% {
    transform: rotate(-8deg);
  }
  50% {
    transform: rotate(10deg);
  }
  60% {
    transform: rotate(-4deg);
  }
  70% {
    transform: rotate(6deg);
  }
  80% {
    transform: rotate(0deg);
  }
}
```

**Step 3: Commit hero section**

```bash
git add src/components/sections/hero.tsx src/app/globals.css
git commit -m "feat: add hero section with animations

- Create hero with gradient text effect
- Add staggered fade-in animations
- Include wave emoji animation
- Add CTA button to projects
- Use translations for all text

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 12: Create Home Page

**Files:**
- Create: `src/app/[locale]/page.tsx`

**Step 1: Create home page**

File: `src/app/[locale]/page.tsx`

```typescript
import { Hero } from '@/components/sections/hero';

export default function HomePage() {
  return (
    <div>
      <Hero />
    </div>
  );
}
```

**Step 2: Test home page**

Run: `npm run dev`

Action: Visit http://localhost:3000
Expected: See hero section with animations, navbar, footer
Action: Toggle theme (light/dark)
Expected: Smooth transition between themes
Action: Switch language (EN/AR)
Expected: Content changes, layout flips to RTL for Arabic
Action: Stop server

**Step 3: Commit home page**

```bash
git add src/app/[locale]/page.tsx
git commit -m "feat: create home page with hero section

- Set up home page route
- Include hero section component
- Test theme and language switching
- Verify animations work

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 13: Create Project Card Component

**Files:**
- Create: `src/components/ui/project-card.tsx`

**Step 1: Create project card component**

File: `src/components/ui/project-card.tsx`

```typescript
'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Project } from '@/lib/types';
import Image from 'next/image';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const locale = useLocale();
  const t = useTranslations('projects');
  const title = project.title[locale as 'en' | 'ar'];
  const description = project.description[locale as 'en' | 'ar'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group relative rounded-lg border bg-card overflow-hidden transition-shadow hover:shadow-lg"
    >
      {/* Thumbnail */}
      <div className="relative w-full h-48 bg-muted">
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          {/* Placeholder - replace with actual image when available */}
          <span className="text-6xl">🖼️</span>
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-4 w-4" />
              {t('viewLive')}
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="h-4 w-4" />
              {t('viewCode')}
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
```

**Step 2: Commit project card**

```bash
git add src/components/ui/project-card.tsx
git commit -m "feat: add project card component with hover effects

- Create card with thumbnail placeholder
- Add hover overlay with action buttons
- Display title, description, and tags
- Add lift animation on hover
- Use bilingual content from project data

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 14: Create Projects Page

**Files:**
- Create: `src/app/[locale]/projects/page.tsx`

**Step 1: Create projects page**

File: `src/app/[locale]/projects/page.tsx`

```typescript
import { useTranslations } from 'next-intl';
import { ProjectCard } from '@/components/ui/project-card';
import { projects } from '@/lib/data/projects';

export default function ProjectsPage() {
  const t = useTranslations('projects');

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A showcase of my work and side projects
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
```

**Step 2: Test projects page**

Run: `npm run dev`

Action: Visit http://localhost:3000/en/projects
Expected: See grid of 5 project cards with animations
Action: Hover over cards
Expected: Cards lift up, overlay appears with buttons
Action: Switch to Arabic
Expected: RTL layout, Arabic text
Action: Stop server

**Step 3: Commit projects page**

```bash
git add src/app/[locale]/projects/page.tsx
git commit -m "feat: create projects page with grid layout

- Add projects page with header
- Display project cards in responsive grid
- Show all placeholder projects
- Add scroll-triggered animations
- Test bilingual content

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 15: Create Skill Badge Component

**Files:**
- Create: `src/components/ui/skill-badge.tsx`

**Step 1: Create skill badge component**

File: `src/components/ui/skill-badge.tsx`

```typescript
'use client';

import { motion } from 'framer-motion';
import { Skill } from '@/lib/types';

interface SkillBadgeProps {
  skill: Skill;
  index: number;
}

export function SkillBadge({ skill, index }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-muted hover:border-primary transition-colors cursor-default"
    >
      <span className="text-2xl">{skill.icon}</span>
      <span className="font-medium">{skill.name}</span>
    </motion.div>
  );
}
```

**Step 2: Commit skill badge**

```bash
git add src/components/ui/skill-badge.tsx
git commit -m "feat: add skill badge component with animations

- Create badge with icon and name
- Add staggered entrance animation
- Add hover scale and rotate effect
- Use border color change on hover
- Include delay based on index

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 16: Create About Page

**Files:**
- Create: `src/app/[locale]/about/page.tsx`

**Step 1: Create about page**

File: `src/app/[locale]/about/page.tsx`

```typescript
'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { SkillBadge } from '@/components/ui/skill-badge';
import { skills } from '@/lib/data/skills';
import { SITE_CONFIG } from '@/lib/data/constants';

export default function AboutPage() {
  const t = useTranslations('about');
  const locale = useLocale();
  const name = SITE_CONFIG.name[locale as 'en' | 'ar'];

  const skillsByCategory = {
    frontend: skills.filter(s => s.category === 'frontend'),
    backend: skills.filter(s => s.category === 'backend'),
    tools: skills.filter(s => s.category === 'tools')
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>
      </motion.div>

      {/* About Content */}
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="prose dark:prose-invert max-w-none"
        >
          <p className="text-lg leading-relaxed">
            Hi! I'm {name}, a passionate full-stack developer who loves building
            beautiful and functional web applications. I enjoy solving complex
            problems and creating delightful user experiences.
          </p>
          <p className="text-lg leading-relaxed">
            When I'm not coding, you can find me exploring new technologies,
            contributing to open source, or enjoying a good cup of coffee ☕
          </p>
        </motion.div>

        {/* Skills Section */}
        <div>
          <h2 className="text-2xl font-bold mb-8">{t('skillsTitle')}</h2>

          {/* Frontend */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">Frontend</h3>
            <div className="flex flex-wrap gap-3">
              {skillsByCategory.frontend.map((skill, index) => (
                <SkillBadge key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>

          {/* Backend */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">Backend</h3>
            <div className="flex flex-wrap gap-3">
              {skillsByCategory.backend.map((skill, index) => (
                <SkillBadge key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">Tools & Platforms</h3>
            <div className="flex flex-wrap gap-3">
              {skillsByCategory.tools.map((skill, index) => (
                <SkillBadge key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Fun Fact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-6 rounded-lg bg-accent border border-muted"
        >
          <h3 className="text-lg font-semibold mb-2">🎯 Fun Fact</h3>
          <p className="text-muted-foreground">
            I once spent 3 hours debugging a problem, only to realize I had a typo
            in a variable name. Classic developer moment! 😅
          </p>
        </motion.div>
      </div>
    </div>
  );
}
```

**Step 2: Test about page**

Run: `npm run dev`

Action: Visit http://localhost:3000/en/about
Expected: See introduction, skills grouped by category with staggered animations
Action: Hover over skill badges
Expected: Badges scale and rotate slightly
Action: Switch to Arabic
Expected: RTL layout with proper text alignment
Action: Stop server

**Step 3: Commit about page**

```bash
git add src/app/[locale]/about/page.tsx
git commit -m "feat: create about page with skills showcase

- Add about page with introduction
- Display skills grouped by category
- Add staggered animations for skill badges
- Include fun fact section
- Use client component for animations

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 17: Create Contact Page

**Files:**
- Create: `src/app/[locale]/contact/page.tsx`

**Step 1: Create contact page**

File: `src/app/[locale]/contact/page.tsx`

```typescript
'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Copy, Check } from 'lucide-react';
import { SITE_CONFIG, SOCIAL_LINKS } from '@/lib/data/constants';
import { useState } from 'react';

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail
};

export default function ContactPage() {
  const t = useTranslations('contact');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(SITE_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Let's work together on your next project
        </p>
      </motion.div>

      {/* Contact Methods */}
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-6 rounded-lg border bg-card"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            {t('email')}
          </h2>
          <div className="flex items-center justify-between gap-4">
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-lg text-primary hover:underline"
            >
              {SITE_CONFIG.email}
            </a>
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              aria-label="Copy email"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-6 rounded-lg border bg-card"
        >
          <h2 className="text-xl font-semibold mb-4">{t('social')}</h2>
          <div className="grid grid-cols-2 gap-4">
            {SOCIAL_LINKS.map((link, index) => {
              const Icon = iconMap[link.icon as keyof typeof iconMap];
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 p-4 rounded-lg border hover:border-primary hover:bg-accent transition-colors"
                >
                  {Icon && <Icon className="h-6 w-6 text-primary" />}
                  <span className="font-medium">{link.name}</span>
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Playful Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center p-6 rounded-lg bg-accent"
        >
          <p className="text-lg">
            📬 I usually respond within 24 hours (unless I'm debugging something...
            then it might be 48 😄)
          </p>
        </motion.div>
      </div>
    </div>
  );
}
```

**Step 2: Test contact page**

Run: `npm run dev`

Action: Visit http://localhost:3000/en/contact
Expected: See email section and social links with animations
Action: Click "Copy" button
Expected: Email copied to clipboard, button shows "Copied!" briefly
Action: Click social links
Expected: Open in new tabs
Action: Switch to Arabic
Expected: RTL layout
Action: Stop server

**Step 3: Commit contact page**

```bash
git add src/app/[locale]/contact/page.tsx
git commit -m "feat: create contact page with social links

- Add contact page with email and social sections
- Implement copy-to-clipboard functionality
- Add staggered animations for social links
- Include playful message section
- Add hover effects on social cards

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 18: Create Custom 404 Page

**Files:**
- Create: `src/app/[locale]/not-found.tsx`

**Step 1: Create 404 page**

File: `src/app/[locale]/not-found.tsx`

```typescript
'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-6">
        {/* 404 Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-9xl font-bold"
        >
          <motion.span
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="inline-block"
          >
            4
          </motion.span>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="inline-block text-primary"
          >
            0
          </motion.span>
          <motion.span
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="inline-block"
          >
            4
          </motion.span>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-2"
        >
          <h1 className="text-3xl font-bold">Lost in Code</h1>
          <p className="text-xl text-muted-foreground">
            This page doesn't exist... yet! 🚀
          </p>
        </motion.div>

        {/* Back Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-lg font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Link>
        </motion.div>

        {/* Fun Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-sm text-muted-foreground"
        >
          (Don't worry, we all take wrong turns sometimes 😄)
        </motion.p>
      </div>
    </div>
  );
}
```

**Step 2: Test 404 page**

Run: `npm run dev`

Action: Visit http://localhost:3000/en/non-existent-page
Expected: See animated 404 page with playful message
Action: Watch animations
Expected: Numbers wiggle and scale in sequence
Action: Click "Back to Home"
Expected: Navigate to home page
Action: Stop server

**Step 3: Commit 404 page**

```bash
git add src/app/[locale]/not-found.tsx
git commit -m "feat: create custom 404 page with animations

- Add playful 404 page with animated numbers
- Include wiggle and scale effects
- Add back to home button
- Include fun error message
- Match overall site design

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 19: Add Metadata and SEO

**Files:**
- Modify: `src/app/[locale]/layout.tsx`
- Create: `public/favicon.ico` (placeholder)

**Step 1: Update layout with metadata**

File: `src/app/[locale]/layout.tsx`

Replace the entire file with:

```typescript
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import type { Metadata } from 'next';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
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

export default function LocaleLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
```

**Step 2: Create placeholder favicon**

Run: `touch public/favicon.ico`

Expected: Empty favicon file created (user can replace later)

**Step 3: Test metadata**

Run: `npm run dev`

Action: Visit page and view source (Ctrl+U)
Expected: See meta tags for SEO, OpenGraph, Twitter Card
Action: Stop server

**Step 4: Commit metadata updates**

```bash
git add src/app/[locale]/layout.tsx public/favicon.ico
git commit -m "feat: add metadata and SEO configuration

- Add generateMetadata for locale-specific SEO
- Configure OpenGraph and Twitter Card tags
- Add keywords and descriptions
- Set up robots meta tags
- Create placeholder favicon

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 20: Add README and Documentation

**Files:**
- Create: `README.md`
- Create: `public/images/projects/.gitkeep`

**Step 1: Create README**

File: `README.md`

```markdown
# Developer Portfolio

A modern, bilingual (English/Arabic) developer portfolio built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 🌍 **Bilingual Support** - Full English and Arabic translations with RTL layout
- 🌓 **Dark Mode** - Toggle between light and dark themes (persists across sessions)
- ✨ **Smooth Animations** - Framer Motion animations throughout
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- ⚡ **Fast Performance** - Optimized with Next.js App Router and static generation
- ♿ **Accessible** - WCAG AA compliant with keyboard navigation
- 🎨 **Modern Design** - Eye-catching, playful, and professional

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **i18n:** next-intl
- **Theme:** next-themes
- **Icons:** Lucide React
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd MyPortfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Customization

### Update Content

1. **Personal Information:**
   - Edit `src/lib/data/constants.ts` for name, email, social links

2. **Projects:**
   - Edit `src/lib/data/projects.ts` to add/update your projects
   - Add project images to `public/images/projects/`

3. **Skills:**
   - Edit `src/lib/data/skills.ts` to modify your skill set

4. **Translations:**
   - Edit `messages/en.json` for English content
   - Edit `messages/ar.json` for Arabic content

### Add Project Images

Replace placeholder images by adding your images to `public/images/projects/` and updating the `thumbnail` path in the project data.

### Change Colors

Modify the color scheme in `src/app/globals.css` by updating the CSS variables:

```css
:root {
  --primary: 197 100% 50%; /* Change primary color */
  --background: 0 0% 100%; /* Change background */
  /* ... other colors */
}
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Next.js and deploy
5. Configure your custom domain in Vercel dashboard

### Environment Variables

No environment variables are required for basic functionality. If you add a contact form later, you'll need to add email service API keys.

## Project Structure

```
MyPortfolio/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── [locale]/          # Locale-specific routes
│   │   │   ├── page.tsx       # Home page
│   │   │   ├── projects/      # Projects page
│   │   │   ├── about/         # About page
│   │   │   └── contact/       # Contact page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── ui/               # UI components
│   │   ├── layout/           # Layout components
│   │   └── sections/         # Page sections
│   ├── i18n/                 # i18n configuration
│   ├── lib/                  # Utilities and data
│   │   └── data/             # Placeholder data
│   └── middleware.ts         # Next.js middleware
├── messages/                  # Translation files
├── public/                    # Static assets
└── docs/                     # Documentation

```

## Future Enhancements

This portfolio is built to be easily extensible. Consider adding:

- 📝 Blog with MDX support
- 🔍 Project filtering and search
- 📧 Contact form with email integration
- 📊 Analytics (Vercel Analytics, Google Analytics)
- 🎬 More complex animations and interactions
- 💬 Comments system
- 📄 Resume/CV download

## License

MIT License - feel free to use this portfolio for your own projects!

## Support

If you encounter any issues or have questions, please open an issue in the repository.

---

Built with ❤️ using Next.js and TypeScript
```

**Step 2: Create images directory**

Run: `mkdir -p public/images/projects && touch public/images/projects/.gitkeep`

Expected: Directory created with placeholder file

**Step 3: Commit documentation**

```bash
git add README.md public/images/
git commit -m "docs: add comprehensive README and project structure

- Create detailed README with setup instructions
- Document customization options
- Add deployment guide for Vercel
- Include project structure overview
- List future enhancement ideas
- Create images directory for project thumbnails

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 21: Final Testing and Verification

**Files:**
- None (testing only)

**Step 1: Run full build**

Run: `npm run build`

Expected: Build completes successfully with no errors

**Step 2: Test production build**

Run: `npm start`

Expected: Production server starts

**Step 3: Test all pages in both languages**

Action: Visit and verify each page in English:
- http://localhost:3000/en (home with hero)
- http://localhost:3000/en/projects (5 project cards)
- http://localhost:3000/en/about (skills grouped by category)
- http://localhost:3000/en/contact (email and social links)
- http://localhost:3000/en/404 (custom 404)

Expected: All pages load correctly with animations

**Step 4: Test all pages in Arabic**

Action: Visit and verify each page in Arabic:
- http://localhost:3000/ar (RTL layout)
- http://localhost:3000/ar/projects (RTL grid)
- http://localhost:3000/ar/about (RTL skills)
- http://localhost:3000/ar/contact (RTL content)

Expected: Proper RTL layout, Arabic text displays correctly

**Step 5: Test theme switching**

Action: Toggle dark/light mode on each page
Expected: Smooth transitions, colors change properly, preference persists

**Step 6: Test language switching**

Action: Switch language on each page
Expected: Language changes, stays on same page, layout flips for Arabic

**Step 7: Test mobile responsiveness**

Action: Resize browser to mobile width or use dev tools
Expected: Mobile menu appears, layout stacks properly, cards responsive

**Step 8: Test animations**

Action: Scroll through pages, hover over elements
Expected: Smooth scroll animations, hover effects work, no jank

**Step 9: Stop server**

Run: Ctrl+C

Expected: Server stops

**Step 10: No commit (testing only)**

---

## Task 22: Prepare for Deployment

**Files:**
- Create: `.env.example`
- Update: `package.json` (add scripts if needed)

**Step 1: Create environment example file**

File: `.env.example`

```
# No environment variables required for basic functionality
# Add your environment variables here as you expand features

# Example for future contact form:
# EMAIL_SERVICE_API_KEY=your_key_here
# SMTP_HOST=smtp.example.com
# SMTP_PORT=587
```

**Step 2: Verify package.json scripts**

File: `package.json` (verify these scripts exist)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

**Step 3: Create deployment checklist**

File: `docs/DEPLOYMENT.md`

```markdown
# Deployment Checklist

## Pre-Deployment

- [ ] Update personal information in `src/lib/data/constants.ts`
- [ ] Add real project data to `src/lib/data/projects.ts`
- [ ] Add project images to `public/images/projects/`
- [ ] Update favicon in `public/`
- [ ] Test all pages in both languages
- [ ] Test theme switching
- [ ] Test mobile responsiveness
- [ ] Run production build: `npm run build`
- [ ] Verify Lighthouse scores

## Vercel Deployment

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project"
4. Import your GitHub repository
5. Configure project:
   - Framework Preset: Next.js (auto-detected)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)
6. Click "Deploy"
7. Wait for deployment (usually 1-2 minutes)
8. Visit your deployed site

## Custom Domain Setup

1. In Vercel dashboard, go to your project
2. Navigate to Settings → Domains
3. Add your custom domain
4. Follow DNS configuration instructions:
   - Add A record: `76.76.21.21`
   - Or add CNAME record: `cname.vercel-dns.com`
5. Wait for DNS propagation (up to 48 hours, usually much faster)
6. Enable HTTPS (automatic with Vercel)

## Post-Deployment

- [ ] Test deployed site in both languages
- [ ] Verify custom domain works
- [ ] Test on multiple devices
- [ ] Submit sitemap to Google Search Console (optional)
- [ ] Set up analytics (optional)

## Updating the Site

1. Make changes locally
2. Test: `npm run dev`
3. Build: `npm run build`
4. Commit and push to GitHub
5. Vercel automatically redeploys

## Troubleshooting

- **Build fails:** Check build logs in Vercel dashboard
- **404 on deployed site:** Clear cache and redeploy
- **Styles not loading:** Verify Tailwind config and global CSS
- **i18n not working:** Check middleware configuration
```

**Step 4: Commit deployment files**

```bash
git add .env.example docs/DEPLOYMENT.md
git commit -m "docs: add deployment configuration and checklist

- Create environment variables example file
- Add comprehensive deployment guide
- Include Vercel setup instructions
- Add custom domain configuration steps
- Create troubleshooting section

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 23: Create Final Build and Tag

**Files:**
- None (Git operations only)

**Step 1: Verify all commits**

Run: `git log --oneline`

Expected: See all commits from this implementation plan

**Step 2: Create production build**

Run: `npm run build`

Expected: Build completes successfully, no warnings

**Step 3: Tag the release**

```bash
git tag -a v1.0.0 -m "Release v1.0.0: Initial bilingual developer portfolio

Features:
- Bilingual support (English/Arabic with RTL)
- Dark mode with persistence
- Animated hero, projects, about, and contact pages
- Responsive design with mobile menu
- 5 placeholder projects with full data structure
- Skills showcase grouped by category
- Custom 404 page
- SEO optimization with metadata
- Ready for Vercel deployment

Tech stack: Next.js 15, TypeScript, Tailwind CSS, next-intl, next-themes, Framer Motion"
```

**Step 4: Verify tag**

Run: `git tag -l -n9 v1.0.0`

Expected: See tag with full message

**Step 5: Ready for deployment**

The portfolio is now complete and ready to:
1. Push to GitHub: `git push origin main --tags`
2. Deploy to Vercel
3. Configure custom domain
4. Update content with real data

---

## Implementation Complete! 🎉

### What We Built

A modern, bilingual developer portfolio with:
- ✅ Full English/Arabic support with RTL
- ✅ Dark/light mode with smooth transitions
- ✅ Animated hero section with playful elements
- ✅ Projects showcase with 5 placeholder projects
- ✅ About page with categorized skills
- ✅ Contact page with copy-to-clipboard
- ✅ Custom 404 page with animations
- ✅ Responsive design (mobile-first)
- ✅ SEO optimization
- ✅ Accessible (keyboard nav, screen readers)
- ✅ Ready for Vercel deployment

### Next Steps for User

1. **Customize Content:**
   - Update personal info in `src/lib/data/constants.ts`
   - Add real projects to `src/lib/data/projects.ts`
   - Update skills in `src/lib/data/skills.ts`
   - Add project images to `public/images/projects/`

2. **Deploy:**
   - Follow `docs/DEPLOYMENT.md` for Vercel setup
   - Configure custom domain
   - Test deployed site

3. **Future Enhancements:**
   - Add blog with MDX
   - Implement contact form
   - Add project filtering/search
   - Integrate analytics
   - Add more animations and interactions

### Project Statistics

- **Total Tasks:** 23
- **Total Files Created:** ~35
- **Lines of Code:** ~2000+
- **Languages:** English, Arabic
- **Themes:** Light, Dark
- **Pages:** 5 (Home, Projects, About, Contact, 404)
- **Components:** 10+

The portfolio is production-ready and can be deployed immediately!
