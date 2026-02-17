import { Hero } from '@/components/sections/hero';
import { MarqueeStrip } from '@/components/sections/marquee-strip';
import { AboutSection } from '@/components/sections/about-section';
import { BounceCardsSection } from '@/components/sections/bounce-cards-section';
import { ContactSection } from '@/components/sections/contact-section';

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <AboutSection />
      <BounceCardsSection />
      <ContactSection />
    </>
  );
}
