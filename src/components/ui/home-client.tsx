'use client';

import { useState, useEffect } from 'react';
import { Hero } from '@/components/sections/hero';
import { MarqueeStrip } from '@/components/sections/marquee-strip';
import { AboutSection } from '@/components/sections/about-section';
import { BounceCardsSection } from '@/components/sections/bounce-cards-section';
import { ContactSection } from '@/components/sections/contact-section';
import { IntroScreen } from '@/components/ui/intro-screen';
import { SITE_CONFIG } from '@/lib/data/constants';

export function HomeClient() {
  const name = SITE_CONFIG.name.en;

  // showIntro: the overlay is mounted
  // introComplete: hero content can appear
  const [showIntro, setShowIntro] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);

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
    <>
      {showIntro && (
        <IntroScreen name={name} onComplete={handleIntroComplete} />
      )}
      <Hero
        introComplete={introComplete}
        skipTyping={true}
      />
      <MarqueeStrip />
      <AboutSection />
      <BounceCardsSection />
      <ContactSection />
    </>
  );
}
