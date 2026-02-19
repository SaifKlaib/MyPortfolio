import { useTranslations } from 'next-intl';
import { ProjectCard } from '@/components/ui/project-card';
import { projects } from '@/lib/data/projects';

export default function ProjectsPage() {
  const t = useTranslations('projects');

  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24">

      {/* Header */}
      <div className="mb-16 md:mb-20">
        <p className="eyebrow rise mb-3">{t('eyebrow')}</p>
        <h1
          className="font-display font-bold leading-[0.9] tracking-tight rise rise-1"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}
        >
          {t('title')}
        </h1>
        <div className="rule-gradient mt-6 max-w-lg rise rise-2" />
        <p className="mt-5 text-sm text-muted-foreground font-sans rise rise-3">
          {t('subtitle')}
        </p>
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} showActions />
        ))}
      </div>
    </div>
  );
}
