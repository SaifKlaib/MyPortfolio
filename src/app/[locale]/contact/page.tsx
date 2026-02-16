'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Copy, Check } from 'lucide-react';
import { SITE_CONFIG, SOCIAL_LINKS } from '@/lib/data/constants';
import { useState } from 'react';

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail
};

export default function ContactPage() {
  const t = useTranslations('contact');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(SITE_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4">
          <span className="gradient-text">{t('title')}</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </motion.div>

      {/* Contact Methods */}
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Email Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="p-8 rounded-2xl border border-border bg-gradient-to-br from-card to-card/50 relative overflow-hidden group hover:border-primary/50 transition-all"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"
          />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Mail className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-display font-semibold">{t('email')}</h2>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-lg text-primary hover:underline font-medium break-all"
              >
                {SITE_CONFIG.email}
              </a>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-medium transition-all border border-primary/20 hover:border-primary/40"
                aria-label={t('copy')}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    {t('copied')}
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    {t('copy')}
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-8 rounded-2xl border border-border bg-gradient-to-br from-card to-card/50"
        >
          <h2 className="text-2xl font-display font-semibold mb-6">{t('social')}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SOCIAL_LINKS.map((link, index) => {
              const Icon = iconMap[link.icon as keyof typeof iconMap];
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/50 bg-gradient-to-br from-background to-card hover:bg-primary/5 transition-all group"
                >
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    {Icon && <Icon className="h-5 w-5 text-primary group-hover:text-primary-foreground" />}
                  </div>
                  <span className="font-medium group-hover:text-primary transition-colors">
                    {link.name}
                  </span>
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Playful Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center p-8 rounded-2xl bg-gradient-to-br from-accent/10 to-secondary/10 border border-border"
        >
          <p className="text-lg leading-relaxed">
            {t('playfulMessage')}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
