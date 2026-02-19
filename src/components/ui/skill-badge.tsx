'use client';

import { motion } from 'framer-motion';
import { Skill } from '@/lib/types';

interface SkillBadgeProps {
  skill: Skill;
  index: number;
}

export function SkillBadge({ skill, index }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.45,
        delay: index * 0.035,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -3, scale: 1.04 }}
      className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-card border border-border rounded-[var(--radius)] hover:border-primary hover:bg-muted transition-all duration-200 cursor-default shadow-sm hover:shadow-md"
    >
      <span className="text-lg leading-none" role="img" aria-label={skill.name}>
        {skill.icon}
      </span>
      <span className="text-xs font-sans font-medium text-muted-foreground group-hover:text-primary">
        {skill.name}
      </span>
    </motion.div>
  );
}
