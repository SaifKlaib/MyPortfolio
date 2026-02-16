import { SocialLink } from '../types';

export const SITE_CONFIG = {
  name: {
    en: 'Your Name',
    ar: 'اسمك'
  },
  tagline: {
    en: 'Full Stack Developer',
    ar: 'مطور ويب متكامل'
  },
  email: 'your.email@example.com',
  location: {
    en: 'Your City, Country',
    ar: 'مدينتك، بلدك'
  }
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: 'github'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: 'linkedin'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/yourusername',
    icon: 'twitter'
  },
  {
    name: 'Email',
    url: 'mailto:your.email@example.com',
    icon: 'email'
  }
];

export const NAV_LINKS = [
  { href: '/', labelKey: 'nav.home' },
  { href: '/projects', labelKey: 'nav.projects' },
  { href: '/about', labelKey: 'nav.about' },
  { href: '/contact', labelKey: 'nav.contact' }
];
