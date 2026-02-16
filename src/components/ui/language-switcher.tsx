'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:border-primary bg-card hover:bg-primary/10 transition-colors"
      aria-label={locale === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      <Globe className="h-4 w-4 text-primary" />
      <span className="text-sm font-medium">
        {locale === 'en' ? 'العربية' : 'English'}
      </span>
    </motion.button>
  );
}
