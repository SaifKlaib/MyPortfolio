import { useTranslations } from 'next-intl';
import { ProjectCard } from '@/components/ui/project-card';
import { projects } from '@/lib/data/projects';

export default function ProjectsPage() {
  const t = useTranslations('projects');

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4">
          <span className="gradient-text">{t('title')}</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
