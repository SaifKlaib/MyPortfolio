# BounceCards Projects Feature Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the homepage ProjectsSection with a GSAP-powered BounceCards layout and add static project detail pages at `/projects/[id]`.

**Architecture:** Install GSAP, port the provided BounceCards component to TypeScript/Tailwind, swap it into the homepage, then build a static Next.js detail page per project using `generateStaticParams`. No new routing conventions — just a new `[id]` segment under the existing `[locale]/projects/` path.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS v4, GSAP 3, next-intl v4, Framer Motion (kept for other sections)

---

## Reference

- `src/lib/types.ts` — Project interface
- `src/lib/data/projects.ts` — 5 project entries
- `src/app/[locale]/page.tsx` — home page (has ProjectsSection)
- `src/components/sections/projects-section.tsx` — component to replace
- `src/i18n/routing.ts` — `localePrefix: 'always'`, locales: `['en', 'ar']`
- `messages/en.json` + `messages/ar.json` — i18n copy
- `src/app/globals.css` — design tokens (oklch, Deep Ocean palette)

---

### Task 1: Install GSAP

**Files:**
- Modify: `package.json` (npm install side-effect)

**Step 1: Install GSAP**

```bash
npm install gsap
```

Expected output: `added N packages`

**Step 2: Verify types are included**

GSAP v3 ships its own TypeScript types — no `@types/gsap` needed. Confirm with:

```bash
ls node_modules/gsap/dist/gsap.d.ts
```

Expected: file exists

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add gsap dependency"
```

---

### Task 2: Extend Project type with challenge and solution fields

**Files:**
- Modify: `src/lib/types.ts`

**Step 1: Open `src/lib/types.ts` and add two new fields to the `Project` interface**

Add after `longDescription`:

```typescript
challenge: {
  en: string;
  ar: string;
};
solution: {
  en: string;
  ar: string;
};
```

Full updated interface:

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
  challenge: {
    en: string;
    ar: string;
  };
  solution: {
    en: string;
    ar: string;
  };
  tags: string[];
  thumbnail: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}
```

**Step 2: Check TypeScript still compiles (will fail until Task 3 fills in data)**

```bash
npx tsc --noEmit 2>&1 | head -30
```

Expected: errors about missing `challenge`/`solution` on each project entry — that's fine, fix in Task 3.

**Step 3: Commit**

```bash
git add src/lib/types.ts
git commit -m "feat: extend Project type with challenge and solution fields"
```

---

### Task 3: Add challenge and solution data to all 5 projects

**Files:**
- Modify: `src/lib/data/projects.ts`

**Step 1: Replace the entire projects array with this updated version**

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
    challenge: {
      en: 'Managing complex shared state across the cart, checkout flow, and admin dashboard while keeping inventory in sync with concurrent users placing orders.',
      ar: 'إدارة الحالة المشتركة المعقدة عبر سلة التسوق وعملية الدفع ولوحة الإدارة مع الحفاظ على تزامن المخزون مع طلبات المستخدمين المتزامنة.'
    },
    solution: {
      en: 'Used Redux Toolkit with optimistic updates for instant UI feedback, Stripe webhooks to drive order state transitions server-side, and Next.js ISR to keep product pages fast without stale data.',
      ar: 'استخدمت Redux Toolkit مع التحديثات المتفائلة لاستجابة فورية للواجهة، وخطافات Stripe لإدارة حالة الطلبات من جانب الخادم، وـ ISR في Next.js للحفاظ على سرعة صفحات المنتجات بدون بيانات منتهية الصلاحية.'
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
    challenge: {
      en: 'Keeping board state consistent when multiple users simultaneously create, move, and delete tasks — resolving conflicts without losing any work.',
      ar: 'الحفاظ على اتساق حالة اللوح عندما يقوم عدة مستخدمين في وقت واحد بإنشاء المهام ونقلها وحذفها — وحل التعارضات دون فقدان أي عمل.'
    },
    solution: {
      en: 'Firebase Realtime Database with transaction-based writes and conflict resolution rules; local state mirrors the remote with debounced writes to avoid thrashing the network.',
      ar: 'قاعدة بيانات Firebase الفورية مع عمليات الكتابة القائمة على المعاملات وقواعد حل التعارض؛ الحالة المحلية تعكس البعيدة مع كتابات مؤجلة لتجنب إرهاق الشبكة.'
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
    challenge: {
      en: 'Rendering multi-layer Chart.js visualizations for 7-day forecasts responsively across device sizes without layout jank or reflow.',
      ar: 'تصيير تصورات Chart.js متعددة الطبقات للتوقعات لمدة 7 أيام بشكل متجاوب عبر أحجام الأجهزة المختلفة دون اهتزاز في التخطيط.'
    },
    solution: {
      en: 'Lazy-initialized Chart.js instances, SWR for API response caching with stale-while-revalidate, and a CSS Grid layout that recalculates chart dimensions using ResizeObserver.',
      ar: 'مثيلات Chart.js ذات التهيئة الكسولة، وـ SWR لتخزين استجابات API مؤقتاً، وتخطيط CSS Grid الذي يعيد حساب أبعاد الرسم البياني باستخدام ResizeObserver.'
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
    challenge: {
      en: 'Aggregating and normalizing data from social APIs with different rate limits, authentication flows, and response shapes into a single coherent view.',
      ar: 'تجميع وتطبيع البيانات من واجهات برمجة التطبيقات الاجتماعية ذات حدود المعدل المختلفة وتدفقات المصادقة وأشكال الاستجابة في عرض واحد متسق.'
    },
    solution: {
      en: 'A Node.js adapter layer with per-platform normalizer functions, MongoDB for response caching, and a background queue to refresh stale data without blocking the UI.',
      ar: 'طبقة محول Node.js مع وظائف التطبيع لكل منصة، وـ MongoDB لتخزين الاستجابات مؤقتاً، وطابور خلفي لتحديث البيانات القديمة دون تعطيل واجهة المستخدم.'
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
    challenge: {
      en: 'Building a drag-and-drop canvas that remains responsive with dozens of components at arbitrary positions without degrading scroll and interaction performance.',
      ar: 'بناء لوحة سحب وإفلات تظل سريعة الاستجابة مع عشرات المكونات في مواضع عشوائية دون تدهور أداء التمرير والتفاعل.'
    },
    solution: {
      en: 'React DnD with a virtualized canvas that only renders visible components, Prisma for user-owned template data, and Vercel for zero-config deployments from the builder UI.',
      ar: 'React DnD مع لوحة افتراضية تعرض فقط المكونات المرئية، وـ Prisma لبيانات القوالب المملوكة للمستخدم، وـ Vercel للنشر الفوري من واجهة منشئ القوالب.'
    },
    tags: ['React', 'Next.js', 'Prisma', 'PostgreSQL'],
    thumbnail: '/images/projects/builder.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/username/project',
    featured: true
  }
];
```

**Step 2: Verify TypeScript compiles with no errors**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no output (no errors)

**Step 3: Commit**

```bash
git add src/lib/types.ts src/lib/data/projects.ts
git commit -m "feat: add challenge and solution fields to Project type and data"
```

---

### Task 4: Create BounceCards component

**Files:**
- Create: `src/components/ui/bounce-cards.tsx`

**Step 1: Create the file with this content**

```typescript
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

interface BounceCardsProps {
  className?: string;
  images: string[];
  hrefs?: string[];
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
}

export default function BounceCards({
  className = '',
  images = [],
  hrefs = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles = [
    'rotate(10deg) translate(-170px)',
    'rotate(5deg) translate(-85px)',
    'rotate(-3deg)',
    'rotate(-10deg) translate(85px)',
    'rotate(2deg) translate(170px)',
  ],
  enableHover = true,
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.card',
        { scale: 0 },
        {
          scale: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay,
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [animationStagger, easeType, animationDelay]);

  const getNoRotationTransform = (transformStr: string) => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');
    } else if (transformStr === 'none') {
      return 'rotate(0deg)';
    } else {
      return `${transformStr} rotate(0deg)`;
    }
  };

  const getPushedTransform = (baseTransform: string, offsetX: number) => {
    const translateRegex = /translate\(([-0-9.]+)px\)/;
    const match = baseTransform.match(translateRegex);
    if (match) {
      const currentX = parseFloat(match[1]);
      const newX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px)`);
    } else {
      return baseTransform === 'none'
        ? `translate(${offsetX}px)`
        : `${baseTransform} translate(${offsetX}px)`;
    }
  };

  const pushSiblings = (hoveredIdx: number) => {
    if (!enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);

    images.forEach((_, i) => {
      const target = q(`.card-${i}`);
      gsap.killTweensOf(target);
      const baseTransform = transformStyles[i] || 'none';

      if (i === hoveredIdx) {
        const noRotationTransform = getNoRotationTransform(baseTransform);
        gsap.to(target, {
          transform: noRotationTransform,
          duration: 0.4,
          ease: 'back.out(1.4)',
          overwrite: 'auto',
        });
      } else {
        const offsetX = i < hoveredIdx ? -160 : 160;
        const pushedTransform = getPushedTransform(baseTransform, offsetX);
        const distance = Math.abs(hoveredIdx - i);
        const delay = distance * 0.05;
        gsap.to(target, {
          transform: pushedTransform,
          duration: 0.4,
          ease: 'back.out(1.4)',
          delay,
          overwrite: 'auto',
        });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);
    images.forEach((_, i) => {
      const target = q(`.card-${i}`);
      gsap.killTweensOf(target);
      const baseTransform = transformStyles[i] || 'none';
      gsap.to(target, {
        transform: baseTransform,
        duration: 0.4,
        ease: 'back.out(1.4)',
        overwrite: 'auto',
      });
    });
  };

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      ref={containerRef}
      style={{ width: containerWidth, height: containerHeight }}
    >
      {images.map((src, idx) => {
        const cardContent = (
          <img
            className="w-full h-full object-cover"
            src={src}
            alt={`project-${idx + 1}`}
          />
        );

        return (
          <div
            key={idx}
            className={`card card-${idx} absolute w-[200px] aspect-square border-[5px] border-white rounded-[25px] overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.2)] ${hrefs[idx] ? 'cursor-pointer' : ''}`}
            style={{ transform: transformStyles[idx] ?? 'none' }}
            onMouseEnter={() => pushSiblings(idx)}
            onMouseLeave={resetSiblings}
          >
            {hrefs[idx] ? (
              <Link href={hrefs[idx]} className="block w-full h-full">
                {cardContent}
              </Link>
            ) : (
              cardContent
            )}
          </div>
        );
      })}
    </div>
  );
}
```

**Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no output

**Step 3: Commit**

```bash
git add src/components/ui/bounce-cards.tsx
git commit -m "feat: add BounceCards GSAP component"
```

---

### Task 5: Create BounceCardsSection (replaces ProjectsSection)

**Files:**
- Create: `src/components/sections/bounce-cards-section.tsx`

**Step 1: Create the file with this content**

This section replicates the visual style of the existing `ProjectsSection` (orange background, wave top edge, same heading pattern) but replaces the grid with BounceCards.

```typescript
'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import BounceCards from '@/components/ui/bounce-cards';
import { projects } from '@/lib/data/projects';

export function BounceCardsSection() {
  const t = useTranslations('projects');
  const locale = useLocale();

  const images = projects.map((p) => p.thumbnail);
  const hrefs = projects.map((p) => `/${locale}/projects/${p.id}`);

  return (
    <section
      id="projects"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'var(--color-primary)' }}
    >
      {/* Wave top edge */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none" aria-hidden="true">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,30 C360,0 720,55 1080,20 C1260,8 1380,42 1440,28 L1440,0 L0,0 Z"
            fill="var(--color-background)"
            opacity="0.4"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          className="mb-14"
        >
          <p
            className="mb-2 font-sans text-[0.68rem] tracking-[0.28em] uppercase font-bold"
            style={{ color: 'var(--color-accent)' }}
          >
            {locale === 'ar' ? '03 / المشاريع' : '03 / Projects'}
          </p>
          <h2
            className="font-display font-bold leading-[0.9] tracking-tight uppercase"
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              color: 'var(--color-primary-foreground)',
              letterSpacing: '-0.01em',
            }}
          >
            {t('title')}
          </h2>
          <div
            className="mt-5 h-0.5 max-w-md rounded-full"
            style={{
              background:
                'linear-gradient(90deg, var(--color-accent), var(--color-secondary-foreground), transparent)',
            }}
          />
          <p
            className="mt-4 text-sm font-sans max-w-lg leading-relaxed"
            style={{
              color: 'color-mix(in oklch, var(--color-primary-foreground), transparent 35%)',
            }}
          >
            {t('subtitle')}
          </p>
        </motion.div>

        {/* BounceCards centered */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          className="flex justify-center"
        >
          <BounceCards
            images={images}
            hrefs={hrefs}
            containerWidth={600}
            containerHeight={340}
            animationDelay={0.3}
            animationStagger={0.08}
            transformStyles={[
              'rotate(10deg) translate(-220px)',
              'rotate(5deg) translate(-110px)',
              'rotate(-3deg)',
              'rotate(-10deg) translate(110px)',
              'rotate(2deg) translate(220px)',
            ]}
          />
        </motion.div>

        {/* View All link */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          className="flex justify-center mt-14"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-sans text-sm font-semibold px-6 py-3 rounded-full border transition-colors"
            style={{
              color: 'var(--color-primary-foreground)',
              borderColor: 'color-mix(in oklch, var(--color-primary-foreground), transparent 60%)',
            }}
          >
            {locale === 'ar' ? 'عرض كل المشاريع' : 'View All Projects'}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no output

**Step 3: Commit**

```bash
git add src/components/sections/bounce-cards-section.tsx
git commit -m "feat: create BounceCardsSection for homepage"
```

---

### Task 6: Swap ProjectsSection for BounceCardsSection on the homepage

**Files:**
- Modify: `src/app/[locale]/page.tsx`

**Step 1: Update the home page**

Replace the current content:

```typescript
import { Hero } from '@/components/sections/hero';
import { MarqueeStrip } from '@/components/sections/marquee-strip';
import { AboutSection } from '@/components/sections/about-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { ContactSection } from '@/components/sections/contact-section';

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
```

With:

```typescript
import { Hero } from '@/components/sections/hero';
import { MarqueeStrip } from '@/components/sections/marquee-strip';
import { AboutSection } from '@/components/sections/about-section';
import { BounceCardsSection } from '@/components/sections/bounce-cards-section';
import { ContactSection } from '@/components/sections/contact-section';

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <AboutSection />
      <BounceCardsSection />
      <ContactSection />
    </>
  );
}
```

**Step 2: Verify the dev server starts without errors**

```bash
npm run dev 2>&1 | head -20
```

Expected: `✓ Ready in Xms`

**Step 3: Commit**

```bash
git add src/app/[locale]/page.tsx
git commit -m "feat: swap ProjectsSection for BounceCardsSection on homepage"
```

---

### Task 7: Add i18n strings for project detail page

**Files:**
- Modify: `messages/en.json`
- Modify: `messages/ar.json`

**Step 1: Add to `messages/en.json` inside the `projects` object**

Add these keys inside the existing `"projects"` block:

```json
"challenge": "The Challenge",
"solution": "The Solution",
"overview": "Overview",
"backToProjects": "Back to Projects",
"notFound": "Project not found"
```

Full updated `projects` block in `en.json`:

```json
"projects": {
  "title": "Projects",
  "eyebrow": "Selected work",
  "subtitle": "Selected work and personal projects",
  "filter": "Filter by technology",
  "viewLive": "Live Demo",
  "viewCode": "Source Code",
  "viewCase": "Case Study",
  "challenge": "The Challenge",
  "solution": "The Solution",
  "overview": "Overview",
  "backToProjects": "Back to Projects",
  "notFound": "Project not found"
}
```

**Step 2: Add to `messages/ar.json` inside the `projects` object**

```json
"challenge": "التحدي",
"solution": "الحل",
"overview": "نظرة عامة",
"backToProjects": "العودة للمشاريع",
"notFound": "المشروع غير موجود"
```

**Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no output

**Step 4: Commit**

```bash
git add messages/en.json messages/ar.json
git commit -m "feat: add project detail i18n strings"
```

---

### Task 8: Create static project detail page

**Files:**
- Create: `src/app/[locale]/projects/[id]/page.tsx`

**Step 1: Create the directory and file**

The file path is `src/app/[locale]/projects/[id]/page.tsx`.

```typescript
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { projects } from '@/lib/data/projects';

interface Props {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, id } = await params;
  const project = projects.find((p) => p.id === Number(id));
  if (!project) return {};
  const lang = locale as 'en' | 'ar';
  return {
    title: project.title[lang],
    description: project.description[lang],
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, id } = await params;
  const t = await getTranslations('projects');

  const project = projects.find((p) => p.id === Number(id));
  if (!project) notFound();

  const lang = locale as 'en' | 'ar';
  const title = project.title[lang];
  const description = project.description[lang];
  const longDescription = project.longDescription[lang];
  const challenge = project.challenge[lang];
  const solution = project.solution[lang];

  // Accent cycles: primary / secondary / accent
  const accentColors = [
    'var(--color-primary)',
    'var(--color-secondary)',
    'var(--color-accent)',
  ];
  const accent = accentColors[(project.id - 1) % accentColors.length];

  return (
    <div className="min-h-screen">
      {/* Hero banner */}
      <div
        className="relative overflow-hidden py-24 md:py-36"
        style={{ background: accent }}
      >
        {/* Large ghost number */}
        <span
          className="absolute inset-0 flex items-center justify-center font-display font-bold select-none pointer-events-none leading-none"
          style={{
            fontSize: 'clamp(12rem, 30vw, 22rem)',
            color: 'transparent',
            WebkitTextStroke: '2px rgba(255,255,255,0.12)',
          }}
          aria-hidden="true"
        >
          {String(project.id).padStart(2, '0')}
        </span>

        <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          {/* Back link */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-sans font-medium mb-10 opacity-70 hover:opacity-100 transition-opacity"
            style={{ color: 'var(--color-primary-foreground)' }}
          >
            <ArrowLeft className="h-4 w-4" />
            {t('backToProjects')}
          </Link>

          {/* Eyebrow */}
          <p
            className="font-sans text-[0.68rem] tracking-[0.28em] uppercase font-bold mb-3"
            style={{ color: 'color-mix(in oklch, var(--color-primary-foreground), transparent 30%)' }}
          >
            {String(project.id).padStart(2, '0')} / Project
          </p>

          {/* Title */}
          <h1
            className="font-display font-bold leading-[0.9] tracking-tight uppercase mb-6"
            style={{
              fontSize: 'clamp(3rem, 9vw, 7.5rem)',
              color: 'var(--color-primary-foreground)',
            }}
          >
            {title}
          </h1>

          {/* Description */}
          <p
            className="font-sans text-base md:text-lg max-w-2xl leading-relaxed mb-8"
            style={{ color: 'color-mix(in oklch, var(--color-primary-foreground), transparent 25%)' }}
          >
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-sans text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  color: 'var(--color-primary-foreground)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-sm font-semibold transition-opacity hover:opacity-90"
                style={{
                  background: 'var(--color-primary-foreground)',
                  color: accent,
                }}
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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-sm font-semibold border transition-opacity hover:opacity-90"
                style={{
                  color: 'var(--color-primary-foreground)',
                  borderColor: 'rgba(255,255,255,0.4)',
                }}
              >
                <Github className="h-4 w-4" />
                {t('viewCode')}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Overview */}
          <div>
            <p
              className="font-sans text-[0.68rem] tracking-[0.28em] uppercase font-bold mb-4"
              style={{ color: accent }}
            >
              {t('overview')}
            </p>
            <p className="font-sans text-base leading-relaxed text-muted-foreground">
              {longDescription}
            </p>
          </div>

          {/* Challenge + Solution */}
          <div className="flex flex-col gap-10">
            <div>
              <p
                className="font-sans text-[0.68rem] tracking-[0.28em] uppercase font-bold mb-4"
                style={{ color: accent }}
              >
                {t('challenge')}
              </p>
              <div
                className="border-l-2 pl-5"
                style={{ borderColor: accent }}
              >
                <p className="font-sans text-base leading-relaxed text-muted-foreground">
                  {challenge}
                </p>
              </div>
            </div>

            <div>
              <p
                className="font-sans text-[0.68rem] tracking-[0.28em] uppercase font-bold mb-4"
                style={{ color: accent }}
              >
                {t('solution')}
              </p>
              <div
                className="border-l-2 pl-5"
                style={{ borderColor: accent }}
              >
                <p className="font-sans text-base leading-relaxed text-muted-foreground">
                  {solution}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no output

**Step 3: Run the dev server and manually navigate to `/en/projects/1`**

```bash
npm run dev
```

Open browser to `http://localhost:3000/en/projects/1` — should show the E-Commerce Platform detail page.

**Step 4: Commit**

```bash
git add src/app/[locale]/projects/[id]/page.tsx
git commit -m "feat: add static project detail page with challenge/solution layout"
```

---

## Summary

After all tasks complete:

1. `gsap` installed
2. `Project` type has `challenge` + `solution` fields, all 5 projects populated
3. `BounceCards` component at `src/components/ui/bounce-cards.tsx` — GSAP elastic bounce, clickable cards
4. `BounceCardsSection` at `src/components/sections/bounce-cards-section.tsx` — orange bg, wave edge, section heading, BounceCards, "View All" link
5. Homepage uses `BounceCardsSection` instead of `ProjectsSection`
6. Detail pages at `/[locale]/projects/[id]` — hero banner + overview + challenge/solution grid
7. Both `en` and `ar` i18n strings updated

**Note on images:** The project thumbnails are referenced as `/images/projects/*.jpg`. Until real screenshots are placed in `/public/images/projects/`, the cards will show broken image icons. Drop in real screenshots to complete the visual.
