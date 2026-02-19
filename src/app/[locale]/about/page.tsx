'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { SkillBadge } from '@/components/ui/skill-badge';
import { skills } from '@/lib/data/skills';
import { SITE_CONFIG } from '@/lib/data/constants';

const sectionReveal = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  },
};

export default function AboutPage() {
  const t = useTranslations('about');
  const name = SITE_CONFIG.name.en;

  const skillsByCategory = {
    frontend: skills.filter(s => s.category === 'frontend'),
    backend:  skills.filter(s => s.category === 'backend'),
    tools:    skills.filter(s => s.category === 'tools'),
  };

  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24 space-y-24">

      {/* ─── Header ─── */}
      <motion.div
        variants={sectionReveal}
        initial="hidden"
        animate="show"
      >
        <p className="eyebrow mb-3">Who I Am</p>
        <h1
          className="font-display font-bold leading-[0.9] tracking-tight"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}
        >
          {t('title')}
        </h1>
        <div className="rule-gradient mt-6 max-w-lg" />
      </motion.div>

      {/* ─── Bio grid ─── */}
      <motion.div
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
      >
        <p className="font-display text-xl md:text-2xl font-light leading-relaxed text-foreground">
          {t('intro1', { name })}
        </p>

        <div className="space-y-8">
          <p className="text-sm md:text-base font-sans text-muted-foreground leading-relaxed">
            {t('intro2')}
          </p>

          {/* Philosophy card */}
          <div className="relative p-6 rounded-[var(--radius)] bg-card border border-border overflow-hidden">
            {/* Corner blob */}
            <div
              className="absolute -top-10 -end-10 w-32 h-32 rounded-full pointer-events-none"
              style={{
                background: 'var(--color-primary)',
                filter: 'blur(48px)',
                opacity: 0.1,
              }}
            />
            <p className="eyebrow mb-3">{t('philosophyTitle')}</p>
            <p className="text-sm font-sans text-foreground leading-relaxed italic font-light">
              {t('philosophy')}
            </p>
          </div>
        </div>
      </motion.div>

      {/* ─── Skills ─── */}
      <motion.div
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-4 mb-12">
          <p className="eyebrow">{t('skillsTitle')}</p>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="space-y-12">

          {/* Frontend */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0" />
              <span className="font-sans text-xs tracking-[0.18em] uppercase text-primary font-semibold">
                Frontend
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {skillsByCategory.frontend.map((skill, i) => (
                <SkillBadge key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </div>

          {/* Backend */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-2.5 h-2.5 rounded-full bg-secondary flex-shrink-0" />
              <span className="font-sans text-xs tracking-[0.18em] uppercase text-secondary font-semibold">
                Backend
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {skillsByCategory.backend.map((skill, i) => (
                <SkillBadge key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-2.5 h-2.5 rounded-full bg-accent flex-shrink-0" />
              <span className="font-sans text-xs tracking-[0.18em] uppercase text-muted-foreground font-semibold">
                Tools &amp; Platforms
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {skillsByCategory.tools.map((skill, i) => (
                <SkillBadge key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
