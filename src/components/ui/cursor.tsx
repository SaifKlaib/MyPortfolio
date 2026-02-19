'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const visibleRef = useRef(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springCfg = { stiffness: 450, damping: 30, mass: 0.5 };
  const springX = useSpring(mouseX, springCfg);
  const springY = useSpring(mouseY, springCfg);

  // Slow ring — trails behind
  const ringCfg = { stiffness: 120, damping: 22, mass: 0.8 };
  const ringX = useSpring(mouseX, ringCfg);
  const ringY = useSpring(mouseY, ringCfg);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 6);
      mouseY.set(e.clientY - 6);
      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isClickable = el.closest('a, button, [role="button"], input, select, textarea, label');
      setIsHovering(!!isClickable);
    };

    const onLeave = () => { visibleRef.current = false; setIsVisible(false); };
    const onEnter = () => { visibleRef.current = true; setIsVisible(true); };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: springX,
          y: springY,
          width: isHovering ? 10 : 6,
          height: isHovering ? 10 : 6,
          marginLeft: isHovering ? -2 : 0,
          marginTop: isHovering ? -2 : 0,
          backgroundColor: isHovering
            ? 'var(--color-primary)'
            : 'var(--color-foreground)',
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.2s, height 0.2s, background-color 0.2s, opacity 0.2s',
          willChange: 'transform',
        }}
      />

      {/* Ring — lags behind */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[9998] hidden md:block"
        style={{
          x: ringX,
          y: ringY,
          marginLeft: isHovering ? -20 : -14,
          marginTop: isHovering ? -20 : -14,
          width: isHovering ? 46 : 34,
          height: isHovering ? 46 : 34,
          borderColor: isHovering
            ? 'var(--color-primary)'
            : 'var(--color-foreground)',
          opacity: isVisible ? 0.35 : 0,
          transition: 'width 0.25s, height 0.25s, margin 0.25s, border-color 0.2s, opacity 0.2s',
          willChange: 'transform',
        }}
      />
    </>
  );
}
