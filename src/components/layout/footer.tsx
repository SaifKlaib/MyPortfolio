'use client';

import { SOCIAL_LINKS } from '@/lib/data/constants';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const iconMap = { github: Github, linkedin: Linkedin, twitter: Twitter, email: Mail };

export function Footer() {

  return (
    <footer style={{ background: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}>
      {/* Wave top — transitions from the contact section */}
      <div className="pointer-events-none overflow-hidden" aria-hidden="true" style={{ marginTop: '-1px' }}>
        <svg
          viewBox="0 0 1440 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,28 C480,56 960,0 1440,28 L1440,0 L0,0 Z"
            fill="var(--color-background)"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-16 py-10">
        <div className="flex items-center justify-center">
          {/* Social icons */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((link) => {
              const Icon = iconMap[link.icon as keyof typeof iconMap];
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{
                    border: '1.5px solid color-mix(in oklch, var(--color-primary-foreground), transparent 65%)',
                    color: 'color-mix(in oklch, var(--color-primary-foreground), transparent 35%)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = 'var(--color-accent)';
                    el.style.color = 'var(--color-accent)';
                    el.style.background = 'color-mix(in oklch, var(--color-accent), transparent 90%)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = 'color-mix(in oklch, var(--color-primary-foreground), transparent 65%)';
                    el.style.color = 'color-mix(in oklch, var(--color-primary-foreground), transparent 35%)';
                    el.style.background = 'transparent';
                  }}
                >
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
