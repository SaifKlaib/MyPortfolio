import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: {
      en: 'Global Investment Summit',
      ar: 'قمة الاستثمار العالمية'
    },
    description: {
      en: 'Official summit website for global investors and international delegates',
      ar: 'الموقع الرسمي للقمة الاستثمارية العالمية للمستثمرين والوفود الدولية'
    },
    longDescription: {
      en: 'Designed and built the official web presence for a large-scale international investment summit. The site handles event registration, sponsor showcases, speaker profiles, agenda management, and multilingual content for a global audience.',
      ar: 'تصميم وبناء الموقع الرسمي لقمة استثمارية دولية واسعة النطاق. يدير الموقع تسجيل الفعاليات، وعروض الرعاة، وملفات المتحدثين، وإدارة جداول الأعمال، والمحتوى متعدد اللغات للجمهور العالمي.'
    },
    challenge: {
      en: 'Delivering a high-performance, bilingual event site under a tight deadline while handling complex dynamic content such as live schedules, sponsor tiers, and delegate registration.',
      ar: 'تسليم موقع فعالية ثنائي اللغة عالي الأداء في ظل موعد نهائي ضيق مع التعامل مع محتوى ديناميكي معقد مثل الجداول الزمنية المباشرة وطبقات الرعاة وتسجيل المندوبين.'
    },
    solution: {
      en: 'Built on WordPress with Elementor for rapid visual assembly, custom PHP modules for registration logic, and ACF for structured multilingual content management.',
      ar: 'بُني على WordPress مع Elementor للتجميع البصري السريع، وموديولات PHP مخصصة لمنطق التسجيل، وـ ACF لإدارة المحتوى متعدد اللغات بشكل منظم.'
    },
    tags: ['WordPress', 'Elementor', 'PHP', 'ACF'],
    thumbnail: '/images/projects/gis.jpg',
    featured: true
  },
  {
    id: 2,
    title: {
      en: 'Rep By Rep',
      ar: 'Rep By Rep'
    },
    description: {
      en: 'Full-stack fitness tracking platform with workout logging and progress analytics',
      ar: 'منصة متكاملة لتتبع اللياقة البدنية مع تسجيل التمارين وتحليلات التقدم'
    },
    longDescription: {
      en: 'A full-stack fitness application where users log workouts rep by rep, track personal records, and visualize long-term progress. Features include custom workout plans, exercise libraries, and a real-time dashboard.',
      ar: 'تطبيق لياقة بدنية متكامل يمكن المستخدمين من تسجيل التمارين تكراراً بتكرار، وتتبع الأرقام القياسية الشخصية، وتصور التقدم على المدى البعيد. يتضمن خطط تمرين مخصصة ومكتبات تمارين ولوحة تحكم في الوقت الفعلي.'
    },
    challenge: {
      en: 'Structuring a flexible data model that supports hundreds of exercise variations, nested sets/reps, and per-user progress history without degrading query performance as data grows.',
      ar: 'هيكلة نموذج بيانات مرن يدعم مئات أنواع التمارين، والمجموعات والتكرارات المتداخلة، وتاريخ التقدم لكل مستخدم دون تدهور أداء الاستعلام مع نمو البيانات.'
    },
    solution: {
      en: 'MongoDB document model for nested workout sessions, Express REST API with JWT auth, and a React frontend with context-based state management and Chart.js for progress visualization.',
      ar: 'نموذج مستند MongoDB لجلسات التمرين المتداخلة، وـ Express REST API مع مصادقة JWT، وواجهة أمامية React مع إدارة الحالة القائمة على Context وـ Chart.js لتصور التقدم.'
    },
    tags: ['Node.js', 'Express', 'MongoDB', 'React'],
    thumbnail: '/images/projects/repbyrep.jpg',
    liveUrl: 'https://repbyrep.com',
    featured: true
  },
  {
    id: 3,
    title: {
      en: 'B&S — Bsinve',
      ar: 'B&S — Bsinve'
    },
    description: {
      en: 'Corporate investment consultancy website with lead generation and service showcase',
      ar: 'موقع شركة استشارات استثمارية مع توليد عملاء محتملين وعرض الخدمات'
    },
    longDescription: {
      en: 'Built the full web presence for Bsinve, an investment consultancy firm. The site presents services, team profiles, and case studies while funneling visitors into a lead capture and consultation booking flow.',
      ar: 'بناء الحضور الكامل على الويب لشركة Bsinve للاستشارات الاستثمارية. يعرض الموقع الخدمات والملفات الشخصية للفريق ودراسات الحالة مع توجيه الزوار إلى نظام التقاط العملاء المحتملين وحجز الاستشارات.'
    },
    challenge: {
      en: 'Creating a professional, trust-building design that converts visitors into consultation leads while maintaining fast load times on shared hosting infrastructure.',
      ar: 'إنشاء تصميم احترافي يبني الثقة ويحول الزوار إلى عملاء محتملين للاستشارة مع الحفاظ على أوقات تحميل سريعة على بنية الاستضافة المشتركة.'
    },
    solution: {
      en: 'WordPress and Elementor for visual flexibility, custom PHP contact and booking forms with email automation, and performance optimization via caching and image compression plugins.',
      ar: 'WordPress وElementor للمرونة البصرية، ونماذج اتصال وحجز PHP مخصصة مع أتمتة البريد الإلكتروني، وتحسين الأداء عبر إضافات التخزين المؤقت وضغط الصور.'
    },
    tags: ['WordPress', 'Elementor', 'PHP'],
    thumbnail: '/images/projects/bsinve.jpg',
    liveUrl: 'https://bsinve.com',
    featured: true
  },
  {
    id: 4,
    title: {
      en: 'Art Muse',
      ar: 'آرت ميوز'
    },
    description: {
      en: 'Creative portfolio and gallery website for artists — currently in development',
      ar: 'موقع محفظة أعمال وغاليري إبداعي للفنانين — قيد التطوير حالياً'
    },
    longDescription: {
      en: 'An immersive art portfolio and gallery platform being built with Framer. Focuses on cinematic scroll animations, full-screen image showcases, and a clean editorial aesthetic that lets the artwork speak for itself.',
      ar: 'منصة محفظة أعمال فنية وغاليري غامرة تُبنى باستخدام Framer. تركز على رسوم متحركة سينمائية عند التمرير، وعروض صور بملء الشاشة، وجمالية تحريرية نظيفة تتيح للعمل الفني أن يتحدث عن نفسه.'
    },
    challenge: {
      en: 'Achieving fluid, cinematic transitions between gallery pieces without sacrificing accessibility or mobile performance.',
      ar: 'تحقيق انتقالات سلسة وسينمائية بين القطع الفنية دون التضحية بإمكانية الوصول أو الأداء على الهاتف المحمول.'
    },
    solution: {
      en: 'Framer\'s native animation engine with scroll-linked effects, lazy-loaded high-resolution images, and reduced-motion overrides for accessibility compliance.',
      ar: 'محرك الرسوم المتحركة الأصلي لـ Framer مع تأثيرات مرتبطة بالتمرير، وصور عالية الدقة محملة بشكل كسول، وتجاوزات للحركة المخفضة للامتثال لمعايير إمكانية الوصول.'
    },
    tags: ['Framer', 'UI Design', 'Animation'],
    thumbnail: '/images/projects/artmuse.jpg',
    featured: true
  },
  {
    id: 5,
    title: {
      en: 'Brilla',
      ar: 'بريلا'
    },
    description: {
      en: 'Cross-platform mobile app — currently in development',
      ar: 'تطبيق جوال متعدد المنصات — قيد التطوير حالياً'
    },
    longDescription: {
      en: 'Brilla is a cross-platform mobile application being developed with React Native and a Node.js backend. The app is currently in active development with core features being built and tested.',
      ar: 'Brilla تطبيق جوال متعدد المنصات يتم تطويره باستخدام React Native وخادم خلفي Node.js. التطبيق في طور التطوير النشط مع بناء الميزات الأساسية واختبارها.'
    },
    challenge: {
      en: 'Maintaining a single codebase that delivers a native-feeling experience on both iOS and Android while keeping the backend API flexible enough to evolve with the product.',
      ar: 'الحفاظ على قاعدة كود واحدة تقدم تجربة تشبه التطبيق الأصلي على كل من iOS وAndroid مع الحفاظ على مرونة واجهة برمجة التطبيقات الخلفية بما يكفي للتطور مع المنتج.'
    },
    solution: {
      en: 'React Native with Expo for cross-platform consistency, Node.js REST API with modular route structure, and a feature-flag system to gate in-progress functionality during development.',
      ar: 'React Native مع Expo لاتساق المنصات المتعددة، وـ Node.js REST API ببنية مسار معيارية، ونظام علامات الميزات للتحكم في الوظائف قيد التطوير.'
    },
    tags: ['React Native', 'Node.js', 'Expo'],
    thumbnail: '/images/projects/brilla.jpg',
    featured: true
  },
  {
    id: 6,
    title: {
      en: 'AI RAG Chatbot',
      ar: 'روبوت محادثة RAG بالذكاء الاصطناعي'
    },
    description: {
      en: 'Retrieval-Augmented Generation chatbot that answers questions from a custom knowledge base',
      ar: 'روبوت محادثة RAG يجيب على الأسئلة من قاعدة معرفة مخصصة'
    },
    longDescription: {
      en: 'An AI-powered chatbot built on the RAG (Retrieval-Augmented Generation) pattern. Ingests documents into a vector store, retrieves the most relevant context at query time, and feeds it to an LLM to generate accurate, grounded answers — eliminating hallucinations on domain-specific topics.',
      ar: 'روبوت محادثة مدعوم بالذكاء الاصطناعي مبني على نمط RAG (التوليد المعزز بالاسترداد). يستوعب المستندات في مخزن متجهات، ويسترد السياق الأكثر صلة عند الاستعلام، ويغذيه إلى نموذج لغوي كبير لتوليد إجابات دقيقة ومستندة — مما يقضي على الهلوسة في المواضيع الخاصة بالمجال.'
    },
    challenge: {
      en: 'Ensuring the model answers strictly from the provided knowledge base without hallucinating, while keeping retrieval fast enough for a real-time chat experience.',
      ar: 'ضمان إجابة النموذج بشكل صارم من قاعدة المعرفة المقدمة دون هلوسة، مع الحفاظ على سرعة الاسترداد كافية لتجربة محادثة في الوقت الفعلي.'
    },
    solution: {
      en: 'Python pipeline with LangChain for orchestration, FAISS vector store for similarity search, and a prompt engineering layer that constrains the LLM to retrieved context only.',
      ar: 'خط أنابيب Python مع LangChain للتنسيق، ومخزن متجهات FAISS للبحث بالتشابه، وطبقة هندسة الأوامر التي تقيد النموذج اللغوي الكبير بالسياق المسترد فقط.'
    },
    tags: ['Python', 'LangChain', 'FAISS', 'AI / ML'],
    thumbnail: '/images/projects/ragchatbot.jpg',
    featured: false
  }
];
