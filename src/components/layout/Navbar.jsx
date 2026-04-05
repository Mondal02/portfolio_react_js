import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import ThemeToggle from "../ui/ThemeToggle";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { progress, isScrolled } = useScrollProgress();

  const closeMobile = useCallback(() => setIsMobileOpen(false), []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 dark:bg-dark-950/85 backdrop-blur-xl shadow-sm border-b border-dark-200/50 dark:border-dark-800/50"
          : "bg-transparent"
      }`}
    >
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-500 via-accent-500 to-yellow-400"
        style={{ width: `${progress}%` }}
      />

      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#home"
            className="font-mono text-sm text-primary-500 tracking-wide"
          >
            // moumita.dev
            <span className="animate-pulse">_</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-xs font-mono text-dark-500 dark:text-dark-400 uppercase tracking-widest hover:text-primary-500 dark:hover:text-primary-400 transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-primary-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileOpen((prev) => !prev)}
              className="p-2 rounded-lg text-dark-600 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenuAlt3 className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 dark:bg-dark-950/95 backdrop-blur-lg border-t border-dark-200 dark:border-dark-800 overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className="block px-4 py-2.5 text-sm font-mono text-dark-600 dark:text-dark-300 hover:text-primary-500 dark:hover:text-primary-400 uppercase tracking-wider transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
