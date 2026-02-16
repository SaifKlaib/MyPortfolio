import { Skill } from '../types';

export const skills: Skill[] = [
  // Frontend
  { name: 'React', icon: '⚛️', category: 'frontend' },
  { name: 'Next.js', icon: '▲', category: 'frontend' },
  { name: 'TypeScript', icon: '🔷', category: 'frontend' },
  { name: 'Tailwind CSS', icon: '🎨', category: 'frontend' },
  { name: 'Vue.js', icon: '💚', category: 'frontend' },

  // Backend
  { name: 'Node.js', icon: '🟢', category: 'backend' },
  { name: 'Python', icon: '🐍', category: 'backend' },
  { name: 'PostgreSQL', icon: '🐘', category: 'backend' },
  { name: 'MongoDB', icon: '🍃', category: 'backend' },
  { name: 'GraphQL', icon: '◼️', category: 'backend' },

  // Tools
  { name: 'Git', icon: '📦', category: 'tools' },
  { name: 'Docker', icon: '🐳', category: 'tools' },
  { name: 'AWS', icon: '☁️', category: 'tools' },
  { name: 'Vercel', icon: '▲', category: 'tools' },
  { name: 'Figma', icon: '🎨', category: 'tools' }
];
