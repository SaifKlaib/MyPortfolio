'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/data/constants';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const sections = ['home', 'about', 'projects', 'contact'];
    const observers: IntersectionObserver[] = [];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [isHome]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, section: string | null) => {
    if (!section) return;
    if (isHome) {
      e.preventDefault();
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleHireClick = () => {
    if (isHome) {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'border-b shadow-[0_1px_24px_rgba(0,0,0,0.06)]'
          : 'border-b border-transparent'
      }`}
      style={{
        borderColor: isScrolled ? 'var(--color-border)' : 'transparent',
        background: isScrolled
          ? 'color-mix(in oklch, var(--color-background), transparent 5%)'
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
      }}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex h-16 items-center justify-between gap-8">

          {/* Monogram logo */}
          <a
            href="#home"
            onClick={(e) => {
              if (isHome) { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
            }}
            className="flex-shrink-0 group flex items-center gap-2.5"
            aria-label="Saif Klaib — Home"
          >
            <span
              className="flex items-center justify-center w-9 h-9 rounded-xl font-display font-bold text-sm transition-all duration-300 group-hover:scale-105"
              style={{
                background: 'var(--color-primary)',
                color: 'var(--color-primary-foreground)',
                letterSpacing: '0.04em',
              }}
            >
              SK
            </span>
            <span
              className="hidden sm:block font-display font-bold text-xs tracking-[0.14em] uppercase transition-colors duration-200"
              style={{ color: 'var(--color-foreground)' }}
            >
              Saif Klaib
            </span>
          </a>

          {/* Desktop nav — pill indicator */}
          <div className="hidden md:flex items-center gap-1 rounded-full border border-border px-1.5 py-1.5"
            style={{ background: 'color-mix(in oklch, var(--color-muted), transparent 40%)' }}
          >
            {NAV_LINKS.map((link) => {
              const isActive = isHome && activeSection === (link.section ?? 'home');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.section)}
                  className="relative px-4 py-1.5 rounded-full font-sans text-xs tracking-[0.12em] uppercase transition-colors duration-200"
                  style={{
                    color: isActive ? 'var(--color-primary-foreground)' : 'var(--color-muted-foreground)',
                    background: isActive ? 'var(--color-primary)' : 'transparent',
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'var(--color-primary)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{t(link.labelKey)}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <LanguageSwitcher />

            {/* Hire Me CTA — desktop */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleHireClick}
              className="hidden md:inline-flex items-center font-sans text-xs font-semibold tracking-[0.1em] uppercase px-4 py-2 rounded-full transition-all duration-200"
              style={{
                background: 'var(--color-primary)',
                color: 'var(--color-primary-foreground)',
              }}
            >
              {locale === 'ar' ? 'تواصل معي' : 'Hire Me'}
            </motion.button>

            {/* Mobile hamburger */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-9 h-9 rounded-xl border flex items-center justify-center transition-colors"
              style={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-foreground)',
              }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isMenuOpen ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden border-t"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div className="py-5 flex flex-col gap-1">
                {NAV_LINKS.map((link, index) => {
                  const isActive = isHome && activeSection === (link.section ?? 'home');
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.055, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={link.href}
                        onClick={(e) => { handleNavClick(e, link.section); setIsMenuOpen(false); }}
                        className="flex items-center gap-4 px-3 py-2.5 rounded-xl transition-colors"
                        style={{
                          background: isActive ? 'color-mix(in oklch, var(--color-primary), transparent 88%)' : 'transparent',
                          color: isActive ? 'var(--color-primary)' : 'var(--color-muted-foreground)',
                        }}
                      >
                        <span
                          className="font-display text-[0.6rem] font-bold w-5 text-right flex-shrink-0"
                          style={{ color: 'color-mix(in oklch, var(--color-primary), transparent 40%)' }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="font-sans text-xs tracking-[0.16em] uppercase font-medium">
                          {t(link.labelKey)}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Hire Me in mobile menu */}
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.055 }}
                  className="pt-3 px-3"
                >
                  <button
                    onClick={() => { handleHireClick(); setIsMenuOpen(false); }}
                    className="w-full font-sans text-xs font-semibold tracking-[0.1em] uppercase py-3 rounded-xl transition-all"
                    style={{
                      background: 'var(--color-primary)',
                      color: 'var(--color-primary-foreground)',
                    }}
                  >
                    {locale === 'ar' ? 'تواصل معي' : 'Hire Me'}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
