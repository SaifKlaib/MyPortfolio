'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/data/constants';

// ─── Typing animation (used when no intro) ───────────────────────────────────

function TypingName({ name }: { name: string }) {
  const chars = name.split('');
  return (
    <span className="inline-flex flex-wrap">
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.35,
            delay: 0.3 + i * 0.055,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          style={{ display: char === ' ' ? 'inline-block' : undefined, width: char === ' ' ? '0.35em' : undefined }}
        >
          {char}
        </motion.span>
      ))}
      <TypingCursor charCount={chars.length} />
    </span>
  );
}

function TypingCursor({ charCount }: { charCount: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 1, 0] }}
      transition={{
        delay: 0.3 + charCount * 0.055,
        duration: 1.8,
        times: [0, 0.05, 0.5, 0.9, 1],
        ease: 'linear',
      }}
      className="inline-block w-[3px] mx-[2px] rounded-full align-middle"
      style={{ height: '0.75em', background: 'var(--color-primary)', marginBottom: '0.1em' }}
      aria-hidden="true"
    />
  );
}

// ─── Photo badge ──────────────────────────────────────────────────────────────

function PhotoWithBadge() {
  const locale = useLocale();
  const text = locale === 'ar'
    ? 'متاح للعمل · محفظة أعمال · مطور ويب · '
    : 'Available for Work · Portfolio · Full Stack Dev · ';

  return (
    <div className="relative flex items-center justify-center flex-shrink-0 select-none">
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 310, height: 310,
          background: 'radial-gradient(circle, color-mix(in oklch, var(--color-secondary), transparent 70%) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute"
        style={{ width: 340, height: 340 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <path id="heroCircle" d="M 100,100 m -88,0 a 88,88 0 1,1 176,0 a 88,88 0 1,1 -176,0" />
          </defs>
          <text fontSize="7.5" letterSpacing="3.8" fontWeight="600" style={{ fill: 'var(--color-secondary)', opacity: 0.7 }}>
            <textPath href="#heroCircle">{text.repeat(2)}</textPath>
          </text>
        </svg>
      </motion.div>
      <motion.div
        className="relative rounded-full overflow-hidden"
        style={{ width: 232, height: 232, boxShadow: '0 0 40px color-mix(in oklch, var(--color-primary), transparent 80%)' }}
        whileHover={{ scale: 1.025 }}
        transition={{ duration: 0.35 }}
      >
        <img src="/images/Myimage.jpeg" alt="Saif Klaib" className="w-full h-full object-cover object-top" draggable={false} />
      </motion.div>
      <motion.div
        className="absolute rounded-full"
        style={{ width: 14, height: 14, top: '50%', right: 0, marginTop: -7, background: 'var(--color-secondary)', boxShadow: '0 0 12px var(--color-secondary)' }}
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

interface HeroProps {
  /** Set to true once the intro overlay has finished (or if no intro) */
  introComplete?: boolean;
  /** Skip the TypingName animation — name arrives via layoutId morph from intro */
  skipTyping?: boolean;
}

export function Hero({ introComplete = true, skipTyping = false }: HeroProps) {
  const t = useTranslations('hero');
  const locale = useLocale();
  const name = SITE_CONFIG.name[locale as 'en' | 'ar'];

  // Helper: fade-in transition gated on introComplete
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.75, delay, ease },
  });
  const fadeIn = (delay: number) => ({
    initial: { opacity: 0 },
    animate: introComplete ? { opacity: 1 } : { opacity: 0 },
    transition: { duration: 0.75, delay, ease },
  });

  const handleScrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden flex flex-col justify-center"
      style={{
        background: `
          radial-gradient(ellipse 55% 55% at 90% 5%,  color-mix(in oklch, var(--color-primary),   transparent 82%) 0%, transparent 100%),
          radial-gradient(ellipse 45% 45% at 5%  95%, color-mix(in oklch, var(--color-secondary), transparent 84%) 0%, transparent 100%),
          radial-gradient(ellipse 30% 30% at 50% 45%, color-mix(in oklch, var(--color-accent),    transparent 86%) 0%, transparent 100%),
          var(--color-background)
        `,
      }}
    >
      {/* Dot grid */}
      <div className="bg-dot-grid absolute inset-0 opacity-25 pointer-events-none" aria-hidden="true" />

      {/* Diagonal accent line */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          width: '1px', height: '55%', top: '22%', left: '48%',
          background: 'linear-gradient(180deg, transparent, var(--color-border-strong) 40%, transparent)',
          transform: 'rotate(15deg)', opacity: 0.6,
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-24 items-center">

          {/* Left: text */}
          <div className="space-y-8">

            {/* Available status */}
            <motion.div {...fadeUp(0.05)} className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: 'var(--color-secondary)' }} />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ background: 'var(--color-secondary)' }} />
              </span>
              <span className="text-xs tracking-[0.22em] uppercase font-sans" style={{ color: 'var(--color-muted-foreground)' }}>
                {t('available')}
              </span>
            </motion.div>

            {/* Greeting eyebrow */}
            <motion.p {...fadeUp(0.1)} className="eyebrow">{t('greeting')}</motion.p>

            {/* Name — layoutId target: receives the FLIP morph from IntroScreen */}
            <motion.div layoutId="hero-name">
              <h1
                className="font-display font-bold leading-[0.88] tracking-tight uppercase"
                style={{
                  fontSize: 'clamp(3.2rem, 11vw, 9.5rem)',
                  color: 'var(--color-primary)',
                  letterSpacing: '-0.02em',
                }}
              >
                {skipTyping ? name : <TypingName name={name} />}
              </h1>
            </motion.div>

            {/* Rule */}
            <motion.div {...fadeIn(0.2)} className="rule-gradient" style={{ maxWidth: '28rem' }} />

            {/* Role */}
            <motion.h2
              {...fadeUp(0.25)}
              className="font-display font-semibold leading-snug uppercase tracking-wide"
              style={{ fontSize: 'clamp(1.1rem, 2.8vw, 2.2rem)', color: 'var(--color-foreground)', letterSpacing: '0.04em' }}
            >
              {t('title')}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              {...fadeUp(0.32)}
              className="font-sans leading-relaxed max-w-md"
              style={{ fontSize: '0.95rem', color: 'var(--color-muted-foreground)' }}
            >
              {t('subtitle')}
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.4)} className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-glow group inline-flex items-center gap-2.5 rounded-full font-sans font-semibold text-sm transition-all duration-300 hover:scale-105"
                style={{ background: 'var(--color-primary)', color: 'var(--color-primary-foreground)', padding: '0.875rem 1.75rem' }}
              >
                {t('cta')}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center gap-2 rounded-full font-sans text-sm font-medium transition-all duration-300 hover:scale-105"
                style={{ border: '1.5px solid var(--color-primary)', color: 'var(--color-primary)', padding: '0.875rem 1.75rem' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'color-mix(in oklch, var(--color-primary), transparent 92%)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
              >
                {locale === 'ar' ? 'تواصل معي' : 'Get in Touch'}
              </button>
            </motion.div>
          </div>

          {/* Right: photo — fades in after intro */}
          <motion.div {...fadeIn(0.5)} className="hidden lg:flex justify-center">
            <PhotoWithBadge />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        {...fadeIn(0.9)}
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 transition-colors"
        style={{ color: 'var(--color-muted-foreground)', opacity: 0.7 }}
        aria-label="Scroll down"
      >
        <span className="text-[0.57rem] tracking-[0.24em] uppercase font-sans">Scroll</span>
        <div className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5" style={{ border: '1.5px solid var(--color-border-strong)' }}>
          <div className="w-1 h-1.5 rounded-full scroll-dot" style={{ background: 'var(--color-primary)' }} />
        </div>
      </motion.button>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true" style={{ zIndex: 5 }}>
        <svg viewBox="0 0 1440 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0,36 C240,68 480,8 720,38 C900,58 1200,14 1440,32 L1440,72 L0,72 Z" fill="var(--color-background)" opacity="0.5" />
        </svg>
      </div>
    </section>
  );
}
