import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: {
      en: 'E-Commerce Platform',
      ar: 'منصة تجارة إلكترونية'
    },
    description: {
      en: 'A full-featured online store with cart, payments, and admin dashboard',
      ar: 'متجر إلكتروني متكامل مع سلة تسوق ومدفوعات ولوحة تحكم'
    },
    longDescription: {
      en: 'Built a complete e-commerce solution with Next.js and Stripe integration. Features include product catalog, shopping cart, secure checkout, order management, and an admin dashboard for inventory management.',
      ar: 'تم بناء حل تجارة إلكترونية متكامل باستخدام Next.js وتكامل Stripe. يتضمن كتالوج منتجات، سلة تسوق، دفع آمن، إدارة الطلبات، ولوحة تحكم للمخزون.'
    },
    tags: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS'],
    thumbnail: '/images/projects/ecommerce.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/username/project',
    featured: true
  },
  {
    id: 2,
    title: {
      en: 'Task Management App',
      ar: 'تطبيق إدارة المهام'
    },
    description: {
      en: 'Collaborative task manager with real-time updates and team features',
      ar: 'مدير مهام تعاوني مع تحديثات فورية وميزات فريق'
    },
    longDescription: {
      en: 'A productivity app for teams with drag-and-drop task organization, real-time collaboration, notifications, and progress tracking. Built with React and Firebase.',
      ar: 'تطبيق إنتاجية للفرق مع تنظيم المهام بالسحب والإفلات، تعاون فوري، إشعارات، وتتبع التقدم. مبني بـ React و Firebase.'
    },
    tags: ['React', 'Firebase', 'Material-UI', 'WebSocket'],
    thumbnail: '/images/projects/tasks.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/username/project',
    featured: true
  },
  {
    id: 3,
    title: {
      en: 'Weather Dashboard',
      ar: 'لوحة معلومات الطقس'
    },
    description: {
      en: 'Beautiful weather app with forecasts and location-based data',
      ar: 'تطبيق طقس جميل مع توقعات وبيانات تعتمد على الموقع'
    },
    longDescription: {
      en: 'An elegant weather application that displays current conditions, hourly and weekly forecasts, with beautiful data visualizations and location search.',
      ar: 'تطبيق طقس أنيق يعرض الظروف الحالية، التوقعات بالساعة والأسبوع، مع تصورات بيانات جميلة وبحث عن المواقع.'
    },
    tags: ['Vue.js', 'OpenWeather API', 'Chart.js', 'CSS3'],
    thumbnail: '/images/projects/weather.jpg',
    liveUrl: 'https://example.com',
    featured: false
  },
  {
    id: 4,
    title: {
      en: 'Social Media Dashboard',
      ar: 'لوحة معلومات وسائل التواصل'
    },
    description: {
      en: 'Analytics dashboard for tracking social media metrics',
      ar: 'لوحة تحليلات لتتبع مقاييس وسائل التواصل الاجتماعي'
    },
    longDescription: {
      en: 'A comprehensive analytics tool that aggregates data from multiple social platforms, providing insights, trends, and performance metrics in real-time.',
      ar: 'أداة تحليلات شاملة تجمع البيانات من منصات اجتماعية متعددة، وتوفر رؤى واتجاهات ومقاييس أداء في الوقت الفعلي.'
    },
    tags: ['Angular', 'D3.js', 'Node.js', 'MongoDB'],
    thumbnail: '/images/projects/social.jpg',
    githubUrl: 'https://github.com/username/project',
    featured: false
  },
  {
    id: 5,
    title: {
      en: 'Portfolio Builder',
      ar: 'منشئ ملف أعمال'
    },
    description: {
      en: 'No-code tool for creating stunning developer portfolios',
      ar: 'أداة بدون كود لإنشاء ملفات أعمال مطورين مذهلة'
    },
    longDescription: {
      en: 'An intuitive portfolio builder that lets developers create and customize their portfolio websites without writing code. Features drag-and-drop interface, templates, and one-click deployment.',
      ar: 'منشئ ملف أعمال بديهي يتيح للمطورين إنشاء وتخصيص مواقع ملفات أعمالهم بدون كتابة كود. يتضمن واجهة سحب وإفلات وقوالب ونشر بنقرة واحدة.'
    },
    tags: ['React', 'Next.js', 'Prisma', 'PostgreSQL'],
    thumbnail: '/images/projects/builder.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/username/project',
    featured: true
  }
];
