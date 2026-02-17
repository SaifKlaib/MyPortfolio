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
    challenge: {
      en: 'Managing complex shared state across the cart, checkout flow, and admin dashboard while keeping inventory in sync with concurrent users placing orders.',
      ar: 'إدارة الحالة المشتركة المعقدة عبر سلة التسوق وعملية الدفع ولوحة الإدارة مع الحفاظ على تزامن المخزون مع طلبات المستخدمين المتزامنة.'
    },
    solution: {
      en: 'Used Redux Toolkit with optimistic updates for instant UI feedback, Stripe webhooks to drive order state transitions server-side, and Next.js ISR to keep product pages fast without stale data.',
      ar: 'استخدمت Redux Toolkit مع التحديثات المتفائلة لاستجابة فورية للواجهة، وخطافات Stripe لإدارة حالة الطلبات من جانب الخادم، وـ ISR في Next.js للحفاظ على سرعة صفحات المنتجات بدون بيانات منتهية الصلاحية.'
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
    challenge: {
      en: 'Keeping board state consistent when multiple users simultaneously create, move, and delete tasks — resolving conflicts without losing any work.',
      ar: 'الحفاظ على اتساق حالة اللوح عندما يقوم عدة مستخدمين في وقت واحد بإنشاء المهام ونقلها وحذفها — وحل التعارضات دون فقدان أي عمل.'
    },
    solution: {
      en: 'Firebase Realtime Database with transaction-based writes and conflict resolution rules; local state mirrors the remote with debounced writes to avoid thrashing the network.',
      ar: 'قاعدة بيانات Firebase الفورية مع عمليات الكتابة القائمة على المعاملات وقواعد حل التعارض؛ الحالة المحلية تعكس البعيدة مع كتابات مؤجلة لتجنب إرهاق الشبكة.'
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
    challenge: {
      en: 'Rendering multi-layer Chart.js visualizations for 7-day forecasts responsively across device sizes without layout jank or reflow.',
      ar: 'تصيير تصورات Chart.js متعددة الطبقات للتوقعات لمدة 7 أيام بشكل متجاوب عبر أحجام الأجهزة المختلفة دون اهتزاز في التخطيط.'
    },
    solution: {
      en: 'Lazy-initialized Chart.js instances, SWR for API response caching with stale-while-revalidate, and a CSS Grid layout that recalculates chart dimensions using ResizeObserver.',
      ar: 'مثيلات Chart.js ذات التهيئة الكسولة، وـ SWR لتخزين استجابات API مؤقتاً، وتخطيط CSS Grid الذي يعيد حساب أبعاد الرسم البياني باستخدام ResizeObserver.'
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
    challenge: {
      en: 'Aggregating and normalizing data from social APIs with different rate limits, authentication flows, and response shapes into a single coherent view.',
      ar: 'تجميع وتطبيع البيانات من واجهات برمجة التطبيقات الاجتماعية ذات حدود المعدل المختلفة وتدفقات المصادقة وأشكال الاستجابة في عرض واحد متسق.'
    },
    solution: {
      en: 'A Node.js adapter layer with per-platform normalizer functions, MongoDB for response caching, and a background queue to refresh stale data without blocking the UI.',
      ar: 'طبقة محول Node.js مع وظائف التطبيع لكل منصة، وـ MongoDB لتخزين الاستجابات مؤقتاً، وطابور خلفي لتحديث البيانات القديمة دون تعطيل واجهة المستخدم.'
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
    challenge: {
      en: 'Building a drag-and-drop canvas that remains responsive with dozens of components at arbitrary positions without degrading scroll and interaction performance.',
      ar: 'بناء لوحة سحب وإفلات تظل سريعة الاستجابة مع عشرات المكونات في مواضع عشوائية دون تدهور أداء التمرير والتفاعل.'
    },
    solution: {
      en: 'React DnD with a virtualized canvas that only renders visible components, Prisma for user-owned template data, and Vercel for zero-config deployments from the builder UI.',
      ar: 'React DnD مع لوحة افتراضية تعرض فقط المكونات المرئية، وـ Prisma لبيانات القوالب المملوكة للمستخدم، وـ Vercel للنشر الفوري من واجهة منشئ القوالب.'
    },
    tags: ['React', 'Next.js', 'Prisma', 'PostgreSQL'],
    thumbnail: '/images/projects/builder.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/username/project',
    featured: true
  }
];
