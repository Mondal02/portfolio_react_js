# Moumita's Portfolio

A modern, animated portfolio website built with React.js, showcasing frontend development skills.

## Tech Stack

- **React 19** with React Router v7
- **Tailwind CSS v4** (utility-first styling)
- **Framer Motion** (page and scroll animations)
- **EmailJS** (serverless contact form)
- **Vite** (blazing-fast builds)

## React Skills Demonstrated

- **Context API** -- Theme toggle (dark/light mode)
- **Custom Hooks** -- `useTheme`, `useScrollProgress`, `useLocalStorage`, `useMediaQuery`
- **React.lazy + Suspense** -- Route-level code splitting
- **React Router** -- SPA navigation with 404 handling
- **Intersection Observer** -- Scroll-triggered animations and count-up stats
- **Controlled Components** -- Validated contact form
- **React.memo / useMemo / useCallback** -- Performance optimization
- **Error Boundaries** -- Graceful error handling
- **Framer Motion** -- AnimatePresence, layout animations, whileInView

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
  components/
    layout/      -- Navbar, Footer, ScrollToTop
    sections/    -- Hero, About, Skills, Projects, Experience, Education, Contact
    ui/          -- Button, Card, SectionHeading, AnimatedWrapper, ThemeToggle, ErrorBoundary
  context/       -- ThemeContext (dark/light mode provider)
  hooks/         -- useTheme, useScrollProgress, useLocalStorage, useMediaQuery
  data/          -- All portfolio content (projects, skills, experience, education, social links)
  pages/         -- Home, NotFound
```

## Customization

All personal data lives in `src/data/` -- update these files with your own information:

- `projects.js` -- Your project showcase
- `skills.js` -- Technologies and proficiency levels
- `experience.js` -- Work history
- `education.js` -- Academic background
- `socialLinks.js` -- GitHub, LinkedIn, Twitter, email

## Contact Form Setup (EmailJS)

1. Create an account at [emailjs.com](https://www.emailjs.com/)
2. Create an email service and template
3. Copy `.env.example` to `.env` and fill in your keys
4. On Netlify, add the same keys under **Site settings > Environment variables**

## Deploy to Netlify

1. Push the repo to GitHub
2. Connect the repo in [Netlify](https://app.netlify.com/)
3. Netlify auto-detects settings from `netlify.toml`
4. Add environment variables for EmailJS in Netlify dashboard
5. Deploy!

## License

MIT
