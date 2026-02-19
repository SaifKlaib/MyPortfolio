import { Skill } from '../types';

export const skills: Skill[] = [
  // Frontend
  { name: 'React', icon: '⚛️', category: 'frontend' },
  { name: 'Next.js', icon: '▲', category: 'frontend' },
  { name: 'React Native', icon: '📱', category: 'frontend' },
  { name: 'TypeScript', icon: '🔷', category: 'frontend' },
  { name: 'Tailwind CSS', icon: '🎨', category: 'frontend' },
  { name: 'WordPress', icon: '🌐', category: 'frontend' },

  // Backend
  { name: 'Node.js', icon: '🟢', category: 'backend' },
  { name: 'Express', icon: '🚂', category: 'backend' },
  { name: 'Python', icon: '🐍', category: 'backend' },
  { name: 'PostgreSQL', icon: '🐘', category: 'backend' },
  { name: 'MongoDB', icon: '🍃', category: 'backend' },

  // AI & Tools
  { name: 'LangChain', icon: '🔗', category: 'tools' },
  { name: 'RAG', icon: '🧠', category: 'tools' },
  { name: 'AI / ML', icon: '✨', category: 'tools' },
  { name: 'Git', icon: '📦', category: 'tools' },
  { name: 'Vercel', icon: '▲', category: 'tools' },
];
