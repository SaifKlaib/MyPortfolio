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
            containerWidth={720}
            containerHeight={340}
            animationDelay={0.3}
            animationStagger={0.07}
            transformStyles={[
              'rotate(10deg) translate(-260px)',
              'rotate(6deg) translate(-155px)',
              'rotate(2deg) translate(-52px)',
              'rotate(-4deg) translate(52px)',
              'rotate(-9deg) translate(155px)',
              'rotate(3deg) translate(260px)',
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
