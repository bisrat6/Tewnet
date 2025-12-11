# 🎬 Tewnet - Modern Movie & TV Show Discovery Platform

A beautiful, feature-rich web application for discovering, tracking, and reviewing movies and TV shows. Built with modern web technologies and powered by The Movie Database (TMDB) API.

## 📝 Description

**Tewnet** is a comprehensive movie discovery platform that provides users with an immersive experience for exploring cinematic content. The application features a sleek, modern interface with gradient designs, smooth animations, and responsive layouts. Users can browse trending content, search for movies and TV shows, manage personal favorites and watchlists, rate and review content, and view detailed information about their favorite films.

### Key Features

- 🎯 **Trending Content Carousel** - Discover featured movies and TV shows with stunning hero sections
- 🔍 **Advanced Search** - Search movies and TV shows with real-time filtering
- ⭐ **Personal Collections** - Save favorites and create watchlists
- 📊 **Rating & Reviews** - Rate movies and write personal reviews
- 📱 **Responsive Design** - Fully optimized for mobile, tablet, and desktop
- 🎨 **Modern UI/UX** - Beautiful gradients, smooth animations, and intuitive navigation
- 🎭 **Genre Filtering** - Filter content by genres and categories
- 📈 **User Statistics** - Track your viewing habits and preferences
- 🎬 **Movie Details** - Comprehensive information including cast, trailers, and similar content

## 🚀 Tech Stack

### Core Framework & Language
- **React 18.3.1** - Modern UI library for building interactive interfaces
- **TypeScript 5.8.3** - Type-safe JavaScript for better code quality
- **Vite 5.4.19** - Next-generation frontend build tool for fast development

### Styling & UI Components
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components built on Radix UI
- **Radix UI** - Unstyled, accessible component primitives
  - Accordion, Alert Dialog, Avatar, Checkbox, Dialog, Dropdown Menu
  - Popover, Progress, Radio Group, Select, Slider, Tabs, Toast, Tooltip
- **Framer Motion 12.23.24** - Production-ready motion library for React
- **Lucide React 0.462.0** - Beautiful & consistent icon toolkit
- **Inter Font** - Modern, readable typeface

### State Management & Data Fetching
- **TanStack Query (React Query) 5.83.0** - Powerful data synchronization for React
- **React Router DOM 6.30.1** - Declarative routing for React applications
- **Axios 1.12.2** - Promise-based HTTP client

### Forms & Validation
- **React Hook Form 7.61.1** - Performant forms with easy validation
- **Zod 3.25.76** - TypeScript-first schema validation
- **@hookform/resolvers 3.10.0** - Validation resolver adapters

### UI Libraries & Enhancements
- **Swiper 12.0.2** - Modern touch slider for hero carousels
- **Embla Carousel React 8.6.0** - Lightweight carousel library
- **Recharts 2.15.4** - Composable charting library built on React
- **Sonner 1.7.4** - Beautiful toast notifications
- **next-themes 0.3.0** - Theme management for dark/light modes

### Utilities & Helpers
- **date-fns 3.6.0** - Modern JavaScript date utility library
- **clsx 2.1.1** - Tiny utility for constructing className strings
- **tailwind-merge 2.6.0** - Merge Tailwind CSS classes without style conflicts
- **class-variance-authority 0.7.1** - Variant management for component styling

### Development Tools
- **ESLint 9.32.0** - Pluggable JavaScript linter
- **TypeScript ESLint 8.38.0** - ESLint rules for TypeScript
- **@vitejs/plugin-react-swc 3.11.0** - Fast Refresh with SWC
- **PostCSS 8.5.6** - CSS transformation tool
- **Autoprefixer 10.4.21** - PostCSS plugin to parse CSS and add vendor prefixes

### API Integration
- **The Movie Database (TMDB) API** - Comprehensive movie and TV show database

## 🛠️ Getting Started

### Prerequisites

- **Node.js** 18+ 
- **npm** 9+ (or yarn/pnpm)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tewnet
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   ```

   Or set it directly in your shell:

   **PowerShell (Windows):**
   ```powershell
   $env:VITE_TMDB_API_KEY="YOUR_TMDB_API_KEY"
   ```

   **Bash/Linux/Mac:**
   ```bash
   export VITE_TMDB_API_KEY="YOUR_TMDB_API_KEY"
   ```

   > 💡 Get your free API key from [TMDB](https://www.themoviedb.org/settings/api)

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:8080` (or another port if 8080 is busy)

## 📜 Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Create production build optimized for deployment
- `npm run build:dev` - Create development build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## 📁 Project Structure

```
tewnet/
├── src/
│   ├── components/       # React components
│   │   ├── ui/          # shadcn/ui components
│   │   └── ...          # Feature components
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── config/          # Configuration files
│   └── lib/             # Library utilities
├── public/              # Static assets
├── index.html           # HTML entry point
└── package.json         # Dependencies and scripts
```

## 🎨 Design Features

- **Gradient Backgrounds** - Subtle gradients throughout the UI for visual depth
- **Smooth Animations** - Framer Motion powered transitions and hover effects
- **Responsive Layouts** - Mobile-first design that adapts to all screen sizes
- **Dark Theme** - Beautiful dark color scheme optimized for viewing
- **Accessible Components** - Built with Radix UI for full accessibility support

## 🔧 Configuration

- **TMDB API Configuration**: `src/config/tmdb.ts`
- **Image URL Utilities**: `src/utils/imageUrl.ts`
- **Path Aliases**: `@` points to `src/` (configured in `vite.config.ts` and `tsconfig.json`)

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the comprehensive movie API
- [shadcn](https://ui.shadcn.com/) for the beautiful component library
- All the open-source contributors whose libraries made this project possible
