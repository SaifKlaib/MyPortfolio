'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { Home, Ghost } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className="container mx-auto px-4 py-24 flex items-center justify-center min-h-[70vh]">
      <div className="text-center space-y-8 max-w-2xl">
        {/* Animated 404 with playful ghost */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative"
        >
          <div className="text-[10rem] sm:text-[12rem] md:text-[14rem] font-display font-bold leading-none">
            <motion.span
              animate={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="inline-block gradient-text"
            >
              4
            </motion.span>
            <motion.span
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-block mx-4"
            >
              <Ghost className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 text-primary" />
            </motion.span>
            <motion.span
              animate={{ rotate: [0, 5, -5, 5, 0] }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="inline-block gradient-text"
            >
              4
            </motion.span>
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
        >
          <h1 className="text-3xl sm:text-4xl font-display font-bold">
            {t('title')}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Back Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all glow-effect hover:scale-105"
          >
            <Home className="h-5 w-5" />
            {t('home')}
          </Link>
        </motion.div>

        {/* Fun Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-sm text-muted-foreground"
        >
          {t('message')}
        </motion.p>
      </div>
    </div>
  );
}
