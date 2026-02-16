'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Sparkles } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const locale = useLocale();
  const t = useTranslations('projects');
  const title = project.title[locale as 'en' | 'ar'];
  const description = project.description[locale as 'en' | 'ar'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative rounded-2xl border border-border bg-card overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
    >
      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold backdrop-blur-sm"
          >
            <Sparkles className="h-3 w-3" />
            Featured
          </motion.div>
        </div>
      )}

      {/* Thumbnail with gradient overlay */}
      <div className="relative w-full h-48 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 overflow-hidden">
        {/* Placeholder with animated pattern */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="text-8xl opacity-20"
          >
            🎨
          </motion.div>
        </motion.div>

        {/* Hover overlay with glassmorphism */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent backdrop-blur-sm flex items-center justify-center gap-3"
        >
          {project.liveUrl && (
            <motion.a
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ scale: 1.1, y: 0, opacity: 1 }}
              whileTap={{ scale: 0.95 }}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-4 w-4" />
              {t('viewLive')}
            </motion.a>
          )}
          {project.githubUrl && (
            <motion.a
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ scale: 1.1, y: 0, opacity: 1 }}
              whileTap={{ scale: 0.95 }}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-card/90 text-foreground rounded-lg hover:bg-card transition-colors font-medium border border-border"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="h-4 w-4" />
              {t('viewCode')}
            </motion.a>
          )}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Tags with stagger animation */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-primary/5 to-transparent rounded-tl-full" />
    </motion.div>
  );
}
