import { SocialLink } from '../types';

export const SITE_CONFIG = {
  name: {
    en: 'Saif Klaib',
    ar: 'سيف كليب'
  },
  tagline: {
    en: 'Full Stack Developer',
    ar: 'مطور ويب متكامل'
  },
  email: 'seefemad10@gmail.com',
  location: {
    en: 'Riyadh, Saudi Arabia',
    ar: 'الرياض، المملكة العربية السعودية'
  }
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/SaifKlaib',
    icon: 'github'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/saif-klaib-0b4527248',
    icon: 'linkedin'
  },
  {
    name: 'Email',
    url: 'mailto:seefemad10@gmail.com',
    icon: 'email'
  }
];

export const NAV_LINKS = [
  { href: '/', labelKey: 'nav.home', section: 'home' },
  { href: '/#about', labelKey: 'nav.about', section: 'about' },
  { href: '/#projects', labelKey: 'nav.projects', section: 'projects' },
  { href: '/#contact', labelKey: 'nav.contact', section: 'contact' },
];
