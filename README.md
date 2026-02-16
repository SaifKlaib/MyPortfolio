# 🎨 Modern Bilingual Developer Portfolio

A stunning, production-ready developer portfolio built with Next.js 15, featuring bilingual support (English/Arabic), dark mode, and smooth animations.

## ✨ Features

- 🌍 **Full Bilingual Support** - English and Arabic with automatic RTL layout
- 🌓 **Dark Mode** - Smooth theme switching with system preference detection
- 🎭 **Distinctive Design** - Eye-catching aesthetics with Syne & Work Sans typography
- ✨ **Fluid Animations** - Framer Motion powered micro-interactions
- 📱 **Fully Responsive** - Mobile-first design that works everywhere
- ⚡ **Lightning Fast** - Optimized with Next.js App Router & Static Generation
- ♿ **Accessible** - WCAG AA compliant with keyboard navigation
- 🎨 **Vibrant Colors** - Electric lime primary, vibrant purple secondary, warm amber accent

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **i18n:** next-intl
- **Theme:** next-themes
- **Icons:** Lucide React
- **Fonts:** Syne (Display) & Work Sans (Body)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Customization

### Update Your Information

1. **Personal Info:** Edit `src/lib/data/constants.ts`
   - Name, email, location
   - Social media links

2. **Projects:** Edit `src/lib/data/projects.ts`
   - Add your real projects
   - Update descriptions in both languages
   - Add project images to `public/images/projects/`

3. **Skills:** Edit `src/lib/data/skills.ts`
   - Add/remove technologies
   - Update icons and categories

4. **Translations:**
   - English: `messages/en.json`
   - Arabic: `messages/ar.json`

### Change Colors

Edit `src/app/globals.css` to customize the color scheme:

```css
:root {
  --primary: 84 81% 44%;      /* Electric Lime */
  --secondary: 262 52% 47%;   /* Vibrant Purple */
  --accent: 32 95% 44%;       /* Warm Amber */
}
```

### Change Fonts

Edit `src/app/layout.tsx` to use different Google Fonts:

```typescript
import { Your_Display_Font, Your_Body_Font } from "next/font/google";
```

## 📁 Project Structure

```
MyPortfolio/
├── src/
│   ├── app/
│   │   ├── [locale]/          # Locale-specific routes
│   │   │   ├── page.tsx       # Home
│   │   │   ├── projects/      # Projects page
│   │   │   ├── about/         # About page
│   │   │   ├── contact/       # Contact page
│   │   │   └── not-found.tsx  # 404 page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── ui/                # UI components
│   │   ├── layout/            # Layout components
│   │   ├── sections/          # Page sections
│   │   └── providers/         # Context providers
│   ├── i18n/                  # i18n configuration
│   ├── lib/
│   │   ├── data/              # Data files
│   │   └── types.ts           # TypeScript types
│   └── middleware.ts          # Next.js middleware
├── messages/                   # Translation files
└── public/                    # Static assets
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import repository on [Vercel](https://vercel.com)
3. Vercel auto-detects Next.js and deploys
4. Add custom domain in project settings

### Environment Variables

No environment variables required for basic functionality.

## 🎯 What Makes This Portfolio Distinctive

### 🎨 Design Choices

- **Typography:** Syne (display) + Work Sans (body) - avoiding generic Inter/Roboto
- **Colors:** Electric lime primary instead of generic cyan/purple
- **Animations:** Spring-based, fluid motion with personality
- **Visual Details:** Floating blobs, gradient meshes, glassmorphism effects
- **Layout:** Asymmetric grid with overlapping elements

### ✨ Special Features

- Animated gradient text
- Floating decorative elements
- Featured project badges
- Rotating skill badge icons
- Glassmorphism hover effects
- Scroll-triggered animations
- Playful 404 page with ghost animation
- Copy-to-clipboard email functionality
- Smooth language/theme switching

## 📝 Future Enhancements

- 📝 Blog with MDX support
- 🔍 Project filtering and search
- 📧 Contact form with email integration
- 📊 Analytics integration
- 💬 Comments system
- 📄 Resume/CV download
- 🎬 More complex animations

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide](https://lucide.dev/)
- Fonts from [Google Fonts](https://fonts.google.com/)

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
