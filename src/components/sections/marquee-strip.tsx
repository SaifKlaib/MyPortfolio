'use client';

import { LogoLoop } from '@/components/ui/logo-loop';

const techStack = [
  'React', 'TypeScript', 'Next.js', 'Node.js',
  'GraphQL', 'PostgreSQL', 'Docker', 'Tailwind CSS',
  'Vue.js', 'MongoDB', 'AWS', 'Figma',
];

const logos = techStack.map((tech) => ({
  node: (
    <span className="inline-flex items-center gap-3 font-sans text-xs tracking-[0.22em] uppercase font-semibold opacity-85">
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: 'var(--color-accent)' }}
      />
      {tech}
    </span>
  ),
}));

export function MarqueeStrip() {
  return (
    <div
      className="border-y py-4 overflow-hidden select-none"
      style={{
        borderColor: 'var(--color-primary)',
        background: 'var(--color-primary)',
        color: 'var(--color-primary-foreground)',
      }}
    >
      <LogoLoop
        logos={logos}
        speed={80}
        direction="left"
        gap={0}
        logoHeight={14}
        pauseOnHover
        fadeOut
        ariaLabel="Tech stack"
      />
    </div>
  );
}
