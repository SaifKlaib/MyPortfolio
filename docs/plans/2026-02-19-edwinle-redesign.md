# Edwin Le-Inspired Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Apply four edwinle.com-inspired design upgrades: monospace tags, hero name typing animation, navbar mix-blend-mode:difference, and generous spacing throughout.

**Architecture:** All changes are purely presentational — no data model, routing, or API changes. Each task touches one or two files and is independently deployable. The typing animation lives entirely in hero.tsx using Framer Motion's stagger. The blend-mode effect is CSS-only added to the navbar's transparent state.

**Tech Stack:** Next.js App Router, Framer Motion, Tailwind CSS v4, next/font/google (JetBrains Mono), TypeScript

---

## Task 1: Add JetBrains Mono font + apply to tag pills

**Files:**
- Modify: `src/app/[locale]/layout.tsx`
- Modify: `src/app/globals.css`

**Step 1: Add JetBrains Mono via next/font in layout.tsx**

In `src/app/[locale]/layout.tsx`, add the import alongside the existing fonts:

```ts
import { Josefin_Sans, Nunito, JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});
```

Then add `${jetbrainsMono.variable}` to the `<html>` className:

```tsx
className={`${josefinSans.variable} ${nunito.variable} ${jetbrainsMono.variable}`}
```

**Step 2: Wire `--font-mono` into Tailwind theme in globals.css**

Inside `@layer theme { :root { ... } }`, add after the existing font vars:

```css
--font-mono: var(--font-mono), "JetBrains Mono", ui-monospace, monospace;
```

Then add a Tailwind utility mapping at the bottom of the `@layer theme` block (or in base):

```css
@layer base {
  .font-mono { font-family: var(--font-mono); }
}
```

**Step 3: Apply mono font to `.tag-pill` in globals.css**

Find the existing `.tag-pill` rule and add `font-family`:

```css
.tag-pill {
  font-family: var(--font-mono);
  /* existing properties unchanged */
}
```

**Step 4: Verify visually**

Run `npm run dev`, open the home page. Tag pills on project cards should render in a monospace typeface. Check on the /projects page too.

**Step 5: Commit**

```bash
git add src/app/[locale]/layout.tsx src/app/globals.css
git commit -m "feat: add JetBrains Mono font and apply to tag pills"
```

---

## Task 2: Hero name typing animation (one-time, on page load)

**Files:**
- Modify: `src/components/sections/hero.tsx`

**Step 1: Replace the static name `<h1>` with a typing animation**

The current static render:
```tsx
<h1 ...>{name}</h1>
```

Replace the entire `{/* Greeting + Name */}` block with this implementation:

```tsx
{/* Greeting + Name */}
<motion.div variants={item} className="space-y-1">
  <p className="eyebrow">{t('greeting')}</p>
  <h1
    className="font-display font-bold leading-[0.88] tracking-tight uppercase"
    style={{
      fontSize: 'clamp(3.2rem, 11vw, 9.5rem)',
      color: 'var(--color-primary)',
      letterSpacing: '-0.02em',
    }}
  >
    <TypingName name={name} />
  </h1>
</motion.div>
```

**Step 2: Add the `TypingName` component above the `Hero` function in hero.tsx**

```tsx
function TypingName({ name }: { name: string }) {
  const chars = name.split('');
  return (
    <span className="inline-flex flex-wrap">
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.35,
            delay: 0.3 + i * 0.055,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          style={{ display: char === ' ' ? 'inline-block' : undefined, width: char === ' ' ? '0.35em' : undefined }}
        >
          {char}
        </motion.span>
      ))}
      <TypingCursor charCount={chars.length} />
    </span>
  );
}

function TypingCursor({ charCount }: { charCount: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 1, 0] }}
      transition={{
        delay: 0.3 + charCount * 0.055,
        duration: 1.8,
        times: [0, 0.05, 0.5, 0.9, 1],
        ease: 'linear',
      }}
      className="inline-block w-[3px] mx-[2px] rounded-full align-middle"
      style={{
        height: '0.75em',
        background: 'var(--color-primary)',
        marginBottom: '0.1em',
      }}
      aria-hidden="true"
    />
  );
}
```

**Step 3: Increase hero internal spacing**

Change `className="space-y-6"` on the left text column div to `className="space-y-8"`.

**Step 4: Verify visually**

Run `npm run dev`. On page load, each character of the name should slide up and fade in sequentially. A blinking cursor should appear at the end then fade out. Hard-refresh to re-trigger. Should work in both English and Arabic locales.

**Step 5: Commit**

```bash
git add src/components/sections/hero.tsx
git commit -m "feat: add character-by-character typing animation to hero name"
```

---

## Task 3: Navbar `mix-blend-mode: difference` in transparent state

**Files:**
- Modify: `src/components/layout/navbar.tsx`

**Step 1: Understand the current transparent vs scrolled states**

The navbar uses `isScrolled` boolean. When `isScrolled = false` (top of page), background is transparent. When `isScrolled = true`, it shows the glassmorphism panel.

The blend-mode effect should only apply when `!isScrolled`.

**Step 2: Apply `mix-blend-mode: difference` to the inner nav content wrapper**

Find the inner `<div className="flex h-16 items-center justify-between gap-8">` and wrap its contents conceptually — but the simplest approach is to apply the blend mode to the logo text and nav links via inline style.

For the **SK monogram text** (the `<span>Saif Klaib</span>`), update its style:

```tsx
style={{
  color: isScrolled ? 'var(--color-foreground)' : 'white',
  mixBlendMode: isScrolled ? 'normal' : 'difference',
}}
```

For the **pill nav container**, add a wrapper style:

```tsx
<div
  className="hidden md:flex items-center gap-1 rounded-full border border-border px-1.5 py-1.5"
  style={{
    background: 'color-mix(in oklch, var(--color-muted), transparent 40%)',
    mixBlendMode: isScrolled ? 'normal' : 'difference',
  }}
>
```

For each **nav link `<Link>`**, update the color when not scrolled:

```tsx
style={{
  color: isScrolled
    ? (isActive ? 'var(--color-primary-foreground)' : 'var(--color-muted-foreground)')
    : 'white',
  background: isActive ? 'var(--color-primary)' : 'transparent',
  fontWeight: isActive ? 600 : 400,
  mixBlendMode: isScrolled ? 'normal' : 'difference',
}}
```

**Step 3: Verify visually**

Run `npm run dev`. At the top of the hero, the navbar text should appear inverted (light on the gradient, dark where the background is lightest). As you scroll down and the glassmorphism kicks in, the nav should return to normal colours.

**Step 4: Commit**

```bash
git add src/components/layout/navbar.tsx
git commit -m "feat: navbar mix-blend-mode difference in transparent state"
```

---

## Task 4: Generous spacing throughout

**Files:**
- Modify: `src/components/sections/featured-projects.tsx`

**Step 1: Increase section padding and header margin**

In `featured-projects.tsx`:

```tsx
// section padding: py-24 md:py-32 → py-32 md:py-48
<section className="container mx-auto px-6 md:px-12 lg:px-16 py-32 md:py-48">

// header bottom margin: mb-14 → mb-20
<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">

// grid gap: gap-10 → gap-12 lg:gap-16
<div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
```

**Step 2: Verify visually**

Run `npm run dev`. The featured projects section should feel much more open with generous whitespace above and below. Cards should have more breathing room between them.

**Step 3: Commit**

```bash
git add src/components/sections/featured-projects.tsx
git commit -m "feat: increase section spacing for featured projects"
```

---

## Done

All four tasks complete. The portfolio now features:
- Monospace JetBrains Mono on all tag pills
- Character-by-character name typing animation on hero load
- `mix-blend-mode: difference` navbar at page top
- Generous Edwin Le-scale spacing on the featured projects section
