'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { ProjectCard } from '@/components/ui/project-card';
import { projects } from '@/lib/data/projects';

export function FeaturedProjects() {
  const t = useTranslations('projects');
  const featured = projects.filter(p => p.featured);

  return (
    <section className="container mx-auto px-6 md:px-12 lg:px-16 py-32 md:py-48">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow mb-2">{t('eyebrow')}</p>
          <h2
            className="font-display font-bold leading-tight tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            {t('title')}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-sans text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            {t('viewLive') === 'Live Demo' ? 'View All Projects' : 'عرض كل المشاريع'}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {featured.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
