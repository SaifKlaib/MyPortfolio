'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Copy, Check, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG, SOCIAL_LINKS } from '@/lib/data/constants';
import { useState } from 'react';

const iconMap = { github: Github, linkedin: Linkedin, twitter: Twitter, email: Mail };

export function ContactSection() {
  const t = useTranslations('contact');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(SITE_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Teal mesh background */}
      <div className="bg-ocean-mesh absolute inset-0 opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="mb-14"
      >
        <p className="eyebrow mb-2">04 / Contact</p>
        <h2
          className="font-display font-bold leading-[0.9] uppercase"
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.01em' }}
        >
          {t('title')}
        </h2>
        <div className="rule-gradient mt-5 max-w-md" />
        <p className="mt-4 font-display text-xl md:text-2xl font-light text-muted-foreground">
          {t('subtitle')}
        </p>
      </motion.div>

      {/* Contact grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">

        {/* Email card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="group relative p-7 bg-card rounded-[var(--radius)] border border-border hover:border-primary card-lift overflow-hidden"
        >
          <div
            className="absolute -top-12 -end-12 w-36 h-36 rounded-full pointer-events-none opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500"
            style={{ background: 'var(--color-primary)', filter: 'blur(50px)' }}
            aria-hidden="true"
          />
          <div className="relative z-10">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center mb-5"
              style={{ background: 'color-mix(in oklch, var(--color-primary), transparent 88%)' }}
            >
              <Mail className="h-4.5 w-4.5 text-primary" style={{ width: 18, height: 18 }} />
            </div>
            <p className="text-[0.62rem] tracking-[0.2em] uppercase font-sans text-muted-foreground mb-1">
              {t('email')}
            </p>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="font-display text-base font-semibold text-foreground hover:text-primary transition-colors block mb-5 break-all"
            >
              {SITE_CONFIG.email}
            </a>
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-sans text-xs font-medium tracking-[0.1em] uppercase transition-all duration-200 hover:scale-105"
              style={{
                background: 'var(--color-muted)',
                color: 'var(--color-foreground)',
              }}
            >
              {copied
                ? <><Check style={{ width: 13, height: 13 }} />{t('copied')}</>
                : <><Copy style={{ width: 13, height: 13 }} />{t('copy')}</>
              }
            </button>
          </div>
        </motion.div>

        {/* Social links card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="p-7 bg-card rounded-[var(--radius)] border border-border"
        >
          <p className="text-[0.62rem] tracking-[0.2em] uppercase font-sans text-muted-foreground mb-5">
            {t('social')}
          </p>
          <div className="space-y-2.5">
            {SOCIAL_LINKS.map((link, index) => {
              const Icon = iconMap[link.icon as keyof typeof iconMap];
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + index * 0.06 }}
                  className="group flex items-center justify-between p-3 rounded-[var(--radius)] border border-border hover:border-primary hover:bg-muted transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 group-hover:bg-primary"
                      style={{ background: 'var(--color-muted)' }}
                    >
                      {Icon && (
                        <Icon
                          className="transition-colors duration-200 group-hover:text-primary-foreground text-muted-foreground"
                          style={{ width: 14, height: 14 }}
                        />
                      )}
                    </div>
                    <span className="font-sans text-sm font-medium group-hover:text-primary transition-colors">
                      {link.name}
                    </span>
                  </div>
                  <ArrowUpRight
                    className="text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all -translate-x-1 group-hover:translate-x-0 -translate-y-1 group-hover:translate-y-0 duration-200"
                    style={{ width: 14, height: 14 }}
                  />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
