'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { SkillBadge } from '@/components/ui/skill-badge';
import { skills } from '@/lib/data/skills';
import { SITE_CONFIG } from '@/lib/data/constants';
import { Lightbulb } from 'lucide-react';

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
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4">
          <span className="gradient-text">{t('title')}</span>
        </h1>
      </motion.div>

      {/* Content */}
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6"
        >
          <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border border-border">
            <p className="text-lg leading-relaxed mb-4">
              {t('intro1', { name })}
            </p>
            <p className="text-lg leading-relaxed">
              {t('intro2')}
            </p>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-display font-bold mb-8 text-center">
            {t('skillsTitle')}
          </h2>

          <div className="space-y-10">
            {/* Frontend */}
            <div>
              <h3 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-primary">Frontend</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {skillsByCategory.frontend.map((skill, index) => (
                  <SkillBadge key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </div>

            {/* Backend */}
            <div>
              <h3 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <span className="text-secondary">Backend</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {skillsByCategory.backend.map((skill, index) => (
                  <SkillBadge key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <h3 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-accent">Tools & Platforms</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {skillsByCategory.tools.map((skill, index) => (
                  <SkillBadge key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Fun Fact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          <div className="p-8 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 overflow-hidden">
            {/* Decorative elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl"
            />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="h-6 w-6 text-accent" />
                <h3 className="text-xl font-display font-semibold text-accent">
                  {t('funFactTitle')}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {t('funFact')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
