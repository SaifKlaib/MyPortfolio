'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/data/constants';
import { useLocale } from 'next-intl';

export function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const name = SITE_CONFIG.name[locale as 'en' | 'ar'];

  return (
    <section className="container mx-auto px-4 py-24 md:py-32 lg:py-40 relative overflow-hidden">
      {/* Floating decorative elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-10 w-20 h-20 bg-primary/10 rounded-full blur-2xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 left-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"
      />

      <div className="flex flex-col items-center text-center gap-8 relative z-10">
        {/* Greeting with animated sparkle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Available for work</span>
          </motion.div>

          <p className="text-lg text-muted-foreground">
            {t('greeting')} <span className="wave inline-block text-2xl">👋</span>
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold">
            <span className="gradient-text">{name}</span>
          </h1>
        </motion.div>

        {/* Title with subtle animation */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-semibold"
        >
          {t('title')}
        </motion.h2>

        {/* Subtitle with playful touch */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl"
        >
          {t('subtitle')}
        </motion.p>

        {/* CTA Button with glow effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all glow-effect hover:scale-105"
          >
            {t('cta')}
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.div>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
