import { useTranslations } from 'next-intl';
import { SOCIAL_LINKS } from '@/lib/data/constants';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail
};

export function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((link) => {
              const Icon = iconMap[link.icon as keyof typeof iconMap];
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border hover:border-primary hover:bg-primary/10 hover:text-primary transition-all hover:scale-110"
                  aria-label={link.name}
                >
                  {Icon && <Icon className="h-5 w-5" />}
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="flex flex-col items-center md:items-end gap-1 text-sm text-muted-foreground">
            <p>© {currentYear} Portfolio. {t('rights')}.</p>
            <p className="text-xs">{t('built')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
