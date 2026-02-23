'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SkillBadge } from '@/components/ui/skill-badge';
import { skills } from '@/lib/data/skills';
import { SITE_CONFIG } from '@/lib/data/constants';

const revealUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  },
});

export function AboutSection() {
  const t = useTranslations('about');
  const name = SITE_CONFIG.name.en;

  // Show a balanced set of skills across categories
  const featuredSkills = skills.slice(0, 10);

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Very subtle teal mesh accent */}
      <div className="bg-ocean-mesh absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true" />
      <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">

      {/* Header */}
      <motion.div
        variants={revealUp()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-16"
      >
        <p className="eyebrow mb-2">02 / About</p>
        <h2
          className="font-display font-bold leading-[0.9] uppercase"
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.01em' }}
        >
          {t('title')}
        </h2>
        <div className="rule-gradient mt-5 max-w-md" />
      </motion.div>

      {/* Text content */}
      <div className="mb-16">
        <motion.div
          variants={revealUp(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-7"
        >
          <p className="font-display text-xl md:text-2xl font-light leading-relaxed">
            {t('intro1', { name })}
          </p>
          <p className="text-sm md:text-base font-sans text-muted-foreground leading-relaxed">
            {t('intro2')}
          </p>

          {/* Philosophy callout */}
          <div
            className="relative p-5 rounded-[var(--radius)] overflow-hidden"
            style={{
              background: 'color-mix(in oklch, var(--color-primary), var(--color-surface) 91%)',
              borderLeft: '3px solid var(--color-secondary)',
              boxShadow: 'inset 0 0 30px color-mix(in oklch, var(--color-accent), transparent 88%)',
            }}
          >
            <p className="text-xl md:text-2xl font-display font-bold text-foreground leading-snug italic">
              {t('philosophy')}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Skills preview */}
      <motion.div
        variants={revealUp(0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-4 mb-6">
          <p className="eyebrow">{t('skillsTitle')}</p>
          <div className="h-px flex-1 bg-border" />
          <button
            onClick={() => {
              // Scroll past projects to a longer about view — or just show all inline
              const el = document.getElementById('about');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-[0.65rem] font-sans tracking-[0.12em] uppercase text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
          >
            All skills
            <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {featuredSkills.map((skill, i) => (
            <SkillBadge key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </motion.div>
      </div>
    </section>
  );
}
