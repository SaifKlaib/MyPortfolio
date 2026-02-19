'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Copy, Check, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG, SOCIAL_LINKS } from '@/lib/data/constants';
import { useState } from 'react';

const iconMap = { github: Github, linkedin: Linkedin, twitter: Twitter, email: Mail };

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
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
    <div className="container mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24">

      {/* Header */}
      <motion.div variants={reveal} initial="hidden" animate="show" className="mb-16 md:mb-20">
        <p className="eyebrow mb-3">Get in touch</p>
        <h1
          className="font-display font-bold leading-[0.9] tracking-tight"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}
        >
          {t('title')}
        </h1>
        <div className="rule-gradient mt-6 max-w-lg" />
        <p className="mt-5 font-display text-2xl md:text-3xl font-light text-muted-foreground">
          {t('subtitle')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6 max-w-4xl">

        {/* Email card */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="group relative p-8 bg-card rounded-[var(--radius)] border border-border hover:border-primary transition-all duration-300 hover:shadow-xl overflow-hidden"
        >
          {/* Background blob */}
          <div
            className="absolute -top-12 -end-12 w-40 h-40 rounded-full pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            style={{ background: 'var(--color-primary)', filter: 'blur(60px)', opacity: 0 }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.08')}
          />

          <div className="relative z-10">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <p className="text-[0.65rem] tracking-[0.2em] uppercase font-sans text-muted-foreground mb-1">
              {t('email')}
            </p>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="font-display text-lg font-semibold text-foreground hover:text-primary transition-colors block mb-5 break-all"
            >
              {SITE_CONFIG.email}
            </a>
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 bg-muted hover:bg-primary hover:text-primary-foreground text-foreground px-5 py-2.5 rounded-full font-sans text-xs font-medium tracking-[0.1em] uppercase transition-all duration-200"
            >
              {copied ? <><Check className="h-3.5 w-3.5" />{t('copied')}</> : <><Copy className="h-3.5 w-3.5" />{t('copy')}</>}
            </button>
          </div>
        </motion.div>

        {/* Social card */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="p-8 bg-card rounded-[var(--radius)] border border-border"
        >
          <p className="text-[0.65rem] tracking-[0.2em] uppercase font-sans text-muted-foreground mb-6">
            {t('social')}
          </p>
          <div className="space-y-3">
            {SOCIAL_LINKS.map((link, index) => {
              const Icon = iconMap[link.icon as keyof typeof iconMap];
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + index * 0.07 }}
                  className="group flex items-center justify-between p-3.5 rounded-[var(--radius)] border border-border hover:border-primary hover:bg-muted transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-all duration-200">
                      {Icon && <Icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary-foreground transition-colors" />}
                    </div>
                    <span className="font-sans text-sm font-medium group-hover:text-primary transition-colors">
                      {link.name}
                    </span>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all -translate-x-1 group-hover:translate-x-0 -translate-y-1 group-hover:translate-y-0 duration-200" />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
