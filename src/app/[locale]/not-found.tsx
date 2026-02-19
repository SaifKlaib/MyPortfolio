'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-16 py-24 min-h-[75vh] flex flex-col justify-center relative overflow-hidden">

      {/* Background blob */}
      <div
        className="blob-1 absolute pointer-events-none rounded-full"
        aria-hidden="true"
        style={{
          width: 500,
          height: 500,
          top: -150,
          right: -150,
          background: 'var(--color-primary)',
          filter: 'blur(120px)',
          opacity: 0.09,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        {/* Giant 404 */}
        <p
          className="font-display font-bold leading-none mb-6 select-none"
          style={{
            fontSize: 'clamp(8rem, 30vw, 20rem)',
            color: 'transparent',
            WebkitTextStroke: '2px var(--color-border)',
          }}
          aria-hidden="true"
        >
          404
        </p>

        <div className="rule-gradient mb-8 max-w-md" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-3 max-w-lg mb-10"
        >
          <h1 className="font-display font-bold text-3xl md:text-4xl">
            {t('title')}
          </h1>
          <p className="text-muted-foreground text-sm font-sans leading-relaxed">
            {t('subtitle')}
          </p>
          <p className="text-xs text-muted-foreground font-sans">
            {t('message')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Link
            href="/"
            className="btn-glow group inline-flex items-center gap-2.5 bg-primary text-primary-foreground px-7 py-3.5 rounded-full font-sans font-semibold text-sm hover:bg-primary/90 transition-all duration-300 hover:scale-105"
          >
            {t('home')}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
