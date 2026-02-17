import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { projects } from '@/lib/data/projects';

interface Props {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, id } = await params;
  const project = projects.find((p) => p.id === Number(id));
  if (!project) return {};
  const lang = locale as 'en' | 'ar';
  return {
    title: project.title[lang],
    description: project.description[lang],
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, id } = await params;
  const t = await getTranslations('projects');

  const project = projects.find((p) => p.id === Number(id));
  if (!project) notFound();

  const lang = locale as 'en' | 'ar';
  const title = project.title[lang];
  const description = project.description[lang];
  const longDescription = project.longDescription[lang];
  const challenge = project.challenge[lang];
  const solution = project.solution[lang];

  // Accent cycles: primary / secondary / accent
  const accentColors = [
    'var(--color-primary)',
    'var(--color-secondary)',
    'var(--color-accent)',
  ];
  const accent = accentColors[(project.id - 1) % accentColors.length];

  return (
    <div className="min-h-screen">
      {/* Hero banner */}
      <div
        className="relative overflow-hidden py-24 md:py-36"
        style={{ background: accent }}
      >
        {/* Large ghost number */}
        <span
          className="absolute inset-0 flex items-center justify-center font-display font-bold select-none pointer-events-none leading-none"
          style={{
            fontSize: 'clamp(12rem, 30vw, 22rem)',
            color: 'transparent',
            WebkitTextStroke: '2px rgba(255,255,255,0.12)',
          }}
          aria-hidden="true"
        >
          {String(project.id).padStart(2, '0')}
        </span>

        <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          {/* Back link */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-sans font-medium mb-10 opacity-70 hover:opacity-100 transition-opacity"
            style={{ color: 'var(--color-primary-foreground)' }}
          >
            <ArrowLeft className="h-4 w-4" />
            {t('backToProjects')}
          </Link>

          {/* Eyebrow */}
          <p
            className="font-sans text-[0.68rem] tracking-[0.28em] uppercase font-bold mb-3"
            style={{ color: 'color-mix(in oklch, var(--color-primary-foreground), transparent 30%)' }}
          >
            {String(project.id).padStart(2, '0')} / Project
          </p>

          {/* Title */}
          <h1
            className="font-display font-bold leading-[0.9] tracking-tight uppercase mb-6"
            style={{
              fontSize: 'clamp(3rem, 9vw, 7.5rem)',
              color: 'var(--color-primary-foreground)',
            }}
          >
            {title}
          </h1>

          {/* Description */}
          <p
            className="font-sans text-base md:text-lg max-w-2xl leading-relaxed mb-8"
            style={{ color: 'color-mix(in oklch, var(--color-primary-foreground), transparent 25%)' }}
          >
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-sans text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  color: 'var(--color-primary-foreground)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-sm font-semibold transition-opacity hover:opacity-90"
                style={{
                  background: 'var(--color-primary-foreground)',
                  color: accent,
                }}
              >
                <ExternalLink className="h-4 w-4" />
                {t('viewLive')}
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-sm font-semibold border transition-opacity hover:opacity-90"
                style={{
                  color: 'var(--color-primary-foreground)',
                  borderColor: 'rgba(255,255,255,0.4)',
                }}
              >
                <Github className="h-4 w-4" />
                {t('viewCode')}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Overview */}
          <div>
            <p
              className="font-sans text-[0.68rem] tracking-[0.28em] uppercase font-bold mb-4"
              style={{ color: accent }}
            >
              {t('overview')}
            </p>
            <p className="font-sans text-base leading-relaxed text-muted-foreground">
              {longDescription}
            </p>
          </div>

          {/* Challenge + Solution */}
          <div className="flex flex-col gap-10">
            <div>
              <p
                className="font-sans text-[0.68rem] tracking-[0.28em] uppercase font-bold mb-4"
                style={{ color: accent }}
              >
                {t('challenge')}
              </p>
              <div
                className="border-l-2 pl-5"
                style={{ borderColor: accent }}
              >
                <p className="font-sans text-base leading-relaxed text-muted-foreground">
                  {challenge}
                </p>
              </div>
            </div>

            <div>
              <p
                className="font-sans text-[0.68rem] tracking-[0.28em] uppercase font-bold mb-4"
                style={{ color: accent }}
              >
                {t('solution')}
              </p>
              <div
                className="border-l-2 pl-5"
                style={{ borderColor: accent }}
              >
                <p className="font-sans text-base leading-relaxed text-muted-foreground">
                  {solution}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
