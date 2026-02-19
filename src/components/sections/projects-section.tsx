'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ProjectCard } from '@/components/ui/project-card';
import { projects } from '@/lib/data/projects';

export function ProjectsSection() {
  const t = useTranslations('projects');

  return (
    <section
      id="projects"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'var(--color-primary)' }}
    >
      {/* Subtle wave top edge */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0,30 C360,0 720,55 1080,20 C1260,8 1380,42 1440,28 L1440,0 L0,0 Z" fill="var(--color-background)" opacity="0.4"/>
        </svg>
      </div>
      <div className="container mx-auto px-6 md:px-12 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="mb-14"
        >
          <p
            className="mb-2 font-sans text-[0.68rem] tracking-[0.28em] uppercase font-bold"
            style={{ color: 'var(--color-accent)' }}
          >
            03 / Projects
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
            style={{ background: 'linear-gradient(90deg, var(--color-accent), var(--color-secondary-foreground), transparent)' }}
          />
          <p
            className="mt-4 text-sm font-sans max-w-lg leading-relaxed"
            style={{ color: 'color-mix(in oklch, var(--color-primary-foreground), transparent 35%)' }}
          >
            {t('subtitle')}
          </p>
        </motion.div>

        {/* All projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
