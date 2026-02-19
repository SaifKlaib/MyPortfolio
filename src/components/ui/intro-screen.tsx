'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface IntroScreenProps {
  name: string;
  onComplete: () => void;
}

function IntroChar({ char, index }: { char: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.2 + index * 0.04,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      style={{
        display: char === ' ' ? 'inline-block' : undefined,
        width: char === ' ' ? '0.32em' : undefined,
      }}
    >
      {char}
    </motion.span>
  );
}

function IntroCursor({ charCount }: { charCount: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 1, 0] }}
      transition={{
        delay: 0.2 + charCount * 0.04 + 0.1,
        duration: 1.0,
        times: [0, 0.05, 0.5, 0.9, 1],
        ease: 'linear',
      }}
      aria-hidden="true"
      className="inline-block rounded-sm align-middle"
      style={{
        width: '3px',
        height: '0.78em',
        background: 'var(--color-primary)',
        marginLeft: '4px',
        marginBottom: '0.08em',
      }}
    />
  );
}

export function IntroScreen({ name, onComplete }: IntroScreenProps) {
  const [visible, setVisible] = useState(true);
  const chars = name.split('');
  const EXIT_DURATION = 0.5;

  useEffect(() => {
    // Last char lands at: 0.2 + (n-1)*0.04 + 0.3
    const typingEnd = 0.2 + (chars.length - 1) * 0.04 + 0.3;
    // Cursor fades at: typingEnd + 0.1 + 1.0
    const cursorEnd = typingEnd + 0.1 + 1.0;
    // Brief hold after cursor
    const holdEnd = cursorEnd + 0.2;

    // Trigger exit animation
    const hideTimer = setTimeout(() => setVisible(false), holdEnd * 1000);
    // Call onComplete after exit animation finishes
    const doneTimer = setTimeout(onComplete, (holdEnd + EXIT_DURATION) * 1000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(doneTimer);
    };
  }, [chars.length]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro-overlay"
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background: 'var(--color-background)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_DURATION, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="font-display font-bold uppercase inline-flex flex-wrap items-baseline select-none pointer-events-none"
            style={{
              fontSize: 'clamp(3.2rem, 11vw, 9.5rem)',
              color: 'var(--color-primary)',
              letterSpacing: '-0.02em',
              lineHeight: 0.88,
            }}
          >
            {chars.map((char, i) => (
              <IntroChar key={i} char={char} index={i} />
            ))}
            <IntroCursor charCount={chars.length} />
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
