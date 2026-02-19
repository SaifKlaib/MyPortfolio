'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, LayoutTemplate } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Project } from '@/lib/types';

// Accent colors cycle through primary / secondary / accent
const accentColors = [
  'var(--color-primary)',
  'var(--color-secondary)',
  'var(--color-accent)',
];

interface ProjectCardProps {
  project: Project;
  index: number;
  showActions?: boolean;
}

export function ProjectCard({ project, index, showActions = false }: ProjectCardProps) {
  const t = useTranslations('projects');
  const title = project.title.en;
  const description = project.description.en;
  const accent = accentColors[index % accentColors.length];

  const CardWrapper = project.liveUrl ? 'a' : 'div';
  const wrapperProps = project.liveUrl
    ? { href: project.liveUrl, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      className="group gradient-border card-lift relative bg-card rounded-[var(--radius)] border border-border overflow-hidden flex flex-col"
    >
      {/* Coloured top strip */}
      <div
        className="h-1.5 w-full flex-shrink-0 transition-all duration-300 group-hover:h-2"
        style={{ background: accent }}
      />

      {/* Thumbnail */}
      <CardWrapper
        {...wrapperProps}
        className="relative aspect-video overflow-hidden block"
        style={!project.thumbnail ? { background: `color-mix(in oklch, ${accent}, var(--color-surface) 90%)` } : undefined}
      >
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div
            className="h-full w-full flex items-center justify-center"
            style={{ background: `color-mix(in oklch, ${accent}, var(--color-surface) 90%)` }}
          >
            <span
              className="font-display font-bold select-none pointer-events-none leading-none"
              style={{
                fontSize: 'clamp(6rem, 15vw, 9rem)',
                color: 'transparent',
                WebkitTextStroke: `1.5px color-mix(in oklch, ${accent}, transparent 60%)`,
              }}
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        )}

        {/* Featured badge */}
        {project.featured && (
          <motion.div
            initial={{ scale: 0, rotate: -12 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.09 + 0.3, type: 'spring', stiffness: 240 }}
            className="absolute top-3 end-3 text-[0.6rem] tracking-[0.2em] uppercase font-sans font-semibold px-2.5 py-1 rounded-full z-10"
            style={{
              background: accent,
              color: index === 2 ? 'var(--color-foreground)' : 'var(--color-primary-foreground)',
            }}
          >
            Featured
          </motion.div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-end justify-start p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10">
          {project.liveUrl && (
            <span className="inline-flex items-center gap-1.5 text-white text-xs font-sans font-semibold">
              <ExternalLink className="h-3.5 w-3.5" />
              {t('viewLive')}
            </span>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 ms-3 text-white text-xs font-sans font-semibold"
            >
              <Github className="h-3.5 w-3.5" />
              {t('viewCode')}
            </a>
          )}
        </div>
      </CardWrapper>

      {/* Content */}
      <div className="p-7 flex flex-col gap-4 flex-1">
        <div className="flex-1">
          <h3
            className="font-display font-bold text-xl leading-tight mb-3 transition-colors duration-200"
            style={{ color: 'var(--color-card-foreground)' }}
          >
            <span className="group-hover:text-[var(--color-primary)] transition-colors duration-200 [transition-property:color]"
              style={{ '--color-primary': accent } as React.CSSProperties}
            >
              {title}
            </span>
          </h3>
          <p className="text-base text-muted-foreground font-sans leading-relaxed">
            {description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        {showActions && (
          <div className="flex gap-2 mt-auto pt-2 border-t border-border">
            <a
              href={`/en/projects/${project.id}`}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-sans font-semibold border border-border bg-surface hover:bg-muted transition-colors"
              style={{ color: 'var(--color-foreground)' }}
            >
              <LayoutTemplate className="h-3.5 w-3.5 shrink-0" />
              View Details
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-sans font-semibold transition-colors"
                style={{
                  background: accent,
                  color: index % 3 === 2 ? 'var(--color-foreground)' : 'var(--color-primary-foreground)',
                }}
              >
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
