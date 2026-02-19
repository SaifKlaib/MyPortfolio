'use client';

import { useState, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Hero } from '@/components/sections/hero';
import { MarqueeStrip } from '@/components/sections/marquee-strip';
import { AboutSection } from '@/components/sections/about-section';
import { BounceCardsSection } from '@/components/sections/bounce-cards-section';
import { ContactSection } from '@/components/sections/contact-section';
import { IntroScreen } from '@/components/ui/intro-screen';
import { SITE_CONFIG } from '@/lib/data/constants';

export function HomeClient() {
  const locale = useLocale();
  const name = SITE_CONFIG.name[locale as 'en' | 'ar'];

  // showIntro: the overlay is mounted
  // introComplete: hero content can appear
  // fromIntro: this session started with the intro (hero name comes via layoutId)
  const [showIntro, setShowIntro] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [fromIntro, setFromIntro] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem('portfolio-intro-shown');
    if (!seen) {
      sessionStorage.setItem('portfolio-intro-shown', '1');
      setShowIntro(true);
      setFromIntro(true);
      // introComplete stays false — hero content hidden until intro finishes
    } else {
      // Returning visitor: no intro, show hero immediately
      setIntroComplete(true);
    }
  }, []);

  // Prevent scroll during intro
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showIntro]);

  const handleIntroComplete = () => {
    setIntroComplete(true);
    setShowIntro(false);
  };

  return (
    <MotionConfig
      transition={{
        layout: {
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
      }}
    >
      {showIntro && (
        <IntroScreen name={name} onComplete={handleIntroComplete} />
      )}
      <Hero
        introComplete={introComplete}
        skipTyping={fromIntro}
      />
      <MarqueeStrip />
      <AboutSection />
      <BounceCardsSection />
      <ContactSection />
    </MotionConfig>
  );
}
