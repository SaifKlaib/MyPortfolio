'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './target-cursor.css';

interface TargetCursorProps {
  targetSelector?: string;
  spinDuration?: number;
  hideDefaultCursor?: boolean;
  hoverDuration?: number;
  parallaxOn?: boolean;
}

export function TargetCursor({
  targetSelector = '.cursor-target',
  spinDuration = 2,
  hideDefaultCursor = true,
  hoverDuration = 0.15,
  parallaxOn = true,
}: TargetCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const small = window.innerWidth <= 768;
    const ua = (navigator.userAgent || navigator.vendor).toLowerCase();
    setIsMobile((touch && small) || /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(ua));
  }, []);

  useEffect(() => {
    if (isMobile === null || isMobile || !cursorRef.current || !dotRef.current) return;

    const cursor = cursorRef.current;
    const dot    = dotRef.current;
    const corners = Array.from(cursor.querySelectorAll<HTMLElement>('.target-cursor-corner'));
    const BORDER = 3;
    const CORNER = 12;

    const originalCursor = document.body.style.cursor;
    if (hideDefaultCursor) document.body.style.cursor = 'none';

    // Center on mount — avoids flash at 0,0
    gsap.set(cursor, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2 });

    // ── quickTo: one persistent tween per property, zero allocation per frame ──
    const moveX = gsap.quickTo(cursor, 'x', { duration: 0.07, ease: 'power3.out' });
    const moveY = gsap.quickTo(cursor, 'y', { duration: 0.07, ease: 'power3.out' });

    // Corner quickTo — parallaxOn adds a gentle lag as the cursor moves inside the target
    const dur = parallaxOn ? 0.16 : 0.06;
    const cqX = corners.map(c => gsap.quickTo(c, 'x', { duration: dur, ease: 'power3.out' }));
    const cqY = corners.map(c => gsap.quickTo(c, 'y', { duration: dur, ease: 'power3.out' }));

    // ── Spin ──
    let spinTl = gsap.timeline({ repeat: -1 })
      .to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' });

    // ── State ──
    let activeTarget: Element | null = null;
    let targetPositions: { x: number; y: number }[] | null = null;
    let currentLeaveHandler: (() => void) | null = null;
    let resumeTimeout: ReturnType<typeof setTimeout> | null = null;
    // Track raw mouse pos so scroll handler doesn't need to query GSAP
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;

    // ── Move — the hot path: just two function calls ──
    const moveHandler = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      moveX(mx);
      moveY(my);
      // Continuously update corner targets while hovering (parallax)
      if (targetPositions) {
        for (let i = 0; i < 4; i++) {
          cqX[i](targetPositions[i].x - mx);
          cqY[i](targetPositions[i].y - my);
        }
      }
    };
    window.addEventListener('mousemove', moveHandler, { passive: true });

    // ── Scroll — check if cursor drifted off target ──
    const scrollHandler = () => {
      if (!activeTarget || !currentLeaveHandler) return;
      const el = document.elementFromPoint(mx, my);
      if (!(el && (el === activeTarget || el.closest(targetSelector) === activeTarget))) {
        currentLeaveHandler();
      }
    };
    window.addEventListener('scroll', scrollHandler, { passive: true });

    // ── Click ──
    const onDown = () => {
      gsap.to(dot,    { scale: 0.55, duration: 0.12, ease: 'power2.out' });
      gsap.to(cursor, { scale: 0.88, duration: 0.12, ease: 'power2.out' });
    };
    const onUp = () => {
      gsap.to(dot,    { scale: 1, duration: 0.32, ease: 'back.out(2.5)' });
      gsap.to(cursor, { scale: 1, duration: 0.32, ease: 'back.out(2)' });
    };
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);

    // ── Enter target ──
    const enterHandler = (e: MouseEvent) => {
      let el = e.target as Element | null;
      let target: Element | null = null;
      while (el && el !== document.body) {
        if (el.matches(targetSelector)) { target = el; break; }
        el = el.parentElement;
      }
      if (!target || target === activeTarget) return;

      if (activeTarget && currentLeaveHandler) {
        activeTarget.removeEventListener('mouseleave', currentLeaveHandler);
        currentLeaveHandler = null;
      }
      if (resumeTimeout) { clearTimeout(resumeTimeout); resumeTimeout = null; }

      activeTarget = target;
      spinTl.pause();
      gsap.set(cursor, { rotation: 0 });

      const rect = target.getBoundingClientRect();
      targetPositions = [
        { x: rect.left  - BORDER,                y: rect.top    - BORDER              },
        { x: rect.right + BORDER - CORNER,        y: rect.top    - BORDER              },
        { x: rect.right + BORDER - CORNER,        y: rect.bottom + BORDER - CORNER     },
        { x: rect.left  - BORDER,                y: rect.bottom + BORDER - CORNER     },
      ];

      // Snap corners to initial target position
      for (let i = 0; i < 4; i++) {
        cqX[i](targetPositions[i].x - mx);
        cqY[i](targetPositions[i].y - my);
      }

      const leaveHandler = () => {
        targetPositions = null;
        activeTarget = null;

        // Return corners to rest (collapsed around dot)
        const rest = [
          { x: -CORNER * 1.5, y: -CORNER * 1.5 },
          { x:  CORNER * 0.5, y: -CORNER * 1.5 },
          { x:  CORNER * 0.5, y:  CORNER * 0.5 },
          { x: -CORNER * 1.5, y:  CORNER * 0.5 },
        ];
        for (let i = 0; i < 4; i++) { cqX[i](rest[i].x); cqY[i](rest[i].y); }

        resumeTimeout = setTimeout(() => {
          if (!activeTarget) {
            spinTl.kill();
            spinTl = gsap.timeline({ repeat: -1 })
              .to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' });
          }
          resumeTimeout = null;
        }, 50);

        target!.removeEventListener('mouseleave', leaveHandler);
        currentLeaveHandler = null;
      };

      currentLeaveHandler = leaveHandler;
      target.addEventListener('mouseleave', leaveHandler);
    };
    window.addEventListener('mouseover', enterHandler as EventListener, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseover', enterHandler as EventListener);
      window.removeEventListener('scroll',    scrollHandler);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      if (activeTarget && currentLeaveHandler) activeTarget.removeEventListener('mouseleave', currentLeaveHandler);
      if (resumeTimeout) clearTimeout(resumeTimeout);
      spinTl.kill();
      document.body.style.cursor = originalCursor;
    };
  }, [isMobile, targetSelector, spinDuration, hideDefaultCursor, hoverDuration, parallaxOn]);

  if (isMobile === null || isMobile) return null;

  return (
    <div ref={cursorRef} className="target-cursor-wrapper">
      <div ref={dotRef} className="target-cursor-dot" />
      <div className="target-cursor-corner corner-tl" />
      <div className="target-cursor-corner corner-tr" />
      <div className="target-cursor-corner corner-br" />
      <div className="target-cursor-corner corner-bl" />
    </div>
  );
}
