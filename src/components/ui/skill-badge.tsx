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
      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        type: "spring",
        stiffness: 200,
      }}
      whileHover={{
        scale: 1.1,
        rotate: [0, -5, 5, 0],
        transition: { duration: 0.3 }
      }}
      className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-br from-card to-card/50 border border-border hover:border-primary/50 transition-all cursor-default shadow-sm hover:shadow-md hover:shadow-primary/10"
    >
      <motion.span
        animate={{
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.1,
        }}
        className="text-2xl"
      >
        {skill.icon}
      </motion.span>
      <span className="font-medium text-sm">{skill.name}</span>
    </motion.div>
  );
}
