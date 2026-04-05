import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import Button from "../ui/Button";

const roles = [
  "Senior Software Developer",
  "React.js Specialist",
  "React Native Developer",
  "Frontend Engineer",
];

function useTypingAnimation(words, typingSpeed = 100, deletingSpeed = 60, pauseDuration = 1500) {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const animate = useCallback(() => {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      if (displayText.length < currentWord.length) {
        return setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        return setTimeout(() => setIsDeleting(true), pauseDuration);
      }
    } else {
      if (displayText.length > 0) {
        return setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        return undefined;
      }
    }
  }, [displayText, wordIndex, isDeleting, words, typingSpeed, deletingSpeed, pauseDuration]);

  useEffect(() => {
    const timeout = animate();
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [animate]);

  return displayText;
}

function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: 1 + Math.random() * 3,
        duration: 8 + Math.random() * 14,
        delay: Math.random() * 12,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary-500"
          style={{
            left: p.left,
            bottom: -10,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -window.innerHeight],
            x: [0, 20],
            opacity: [0, 0.5, 0.2, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function HeroCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.85, rotate: -2 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      transition={{ duration: 1.2, delay: 0.4, type: "spring", bounce: 0.35 }}
      className="hidden lg:block absolute right-8 xl:right-16 top-1/2 -translate-y-1/2 w-[270px] bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 p-8 text-center shadow-xl dark:shadow-dark-900/40 z-10"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-yellow-400" />

      <motion.div
        animate={{
          boxShadow: [
            "0 0 0 4px rgba(59,130,246,0.1), 0 0 0 8px rgba(59,130,246,0.05)",
            "0 0 0 6px rgba(59,130,246,0.15), 0 0 0 14px rgba(59,130,246,0.06)",
            "0 0 0 4px rgba(59,130,246,0.1), 0 0 0 8px rgba(59,130,246,0.05)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="w-[90px] h-[90px] rounded-full border-[3px] border-primary-500 flex items-center justify-center mx-auto mb-5 bg-primary-500/10"
      >
        <span className="text-2xl font-bold text-primary-500 font-serif">MM</span>
      </motion.div>

      <p className="text-lg font-semibold text-dark-900 dark:text-white mb-1">Moumita Mondal</p>
      <p className="text-xs font-mono text-primary-500 tracking-widest uppercase mb-4">
        Senior Software Developer
      </p>

      <div className="w-10 h-px bg-dark-200 dark:bg-dark-700 mx-auto mb-4" />

      <p className="text-xs font-mono text-dark-500 dark:text-dark-400">07688082653</p>

      <div className="inline-flex items-center gap-1.5 mt-4 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
        <motion.span
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full bg-emerald-500"
        />
        <span className="text-[0.68rem] font-mono text-emerald-600 dark:text-emerald-400">
          Open to opportunities
        </span>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const typedText = useTypingAnimation(roles);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <Particles />

      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="absolute right-[-2rem] top-1/2 -translate-y-1/2 pointer-events-none select-none z-0"
        animate={{ y: ["-50%", "-52%", "-50%"], x: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <span
          className="text-[clamp(8rem,18vw,18rem)] font-serif leading-none"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px rgba(59,130,246,0.06)",
          }}
        >
          MM
        </span>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full relative">
        <div className="max-w-[780px]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-flex items-center gap-2.5 mb-7"
          >
            <motion.span
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary-500"
            />
            <span className="text-xs font-mono text-primary-500 tracking-[0.15em] uppercase">
              Senior Software Developer
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-dark-900 dark:text-white mb-6 leading-[1.08]"
          >
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent italic relative">
              Moumita
              <span className="absolute bottom-[-4px] left-0 right-0 h-[3px] bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
            </span>
            {/* <br />
            Mondal */}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="text-xl sm:text-2xl text-dark-500 dark:text-dark-400 mb-4 h-9"
          >
            <span>{typedText}</span>
            <span className="inline-block w-0.5 h-6 ml-1 bg-primary-500 animate-pulse align-middle" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-dark-500 dark:text-dark-400 text-lg max-w-[500px] mb-10 leading-relaxed"
          >
            A frontend-focused developer specialising in React.js, React
            Native, Angular, Ionic and scalable UI architectures — crafting seamless digital
            experiences that connect people and businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex flex-wrap gap-4"
          >
            <Button href="#projects" size="lg">
              View My Work <FiArrowRight />
            </Button>
            <Button variant="outline" size="lg" href="#contact">
              Get in Touch
            </Button>
          </motion.div>
        </div>
      </div>

      <HeroCard />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-dark-300 dark:border-dark-600 rounded-full flex items-start justify-center p-1.5"
        >
          <motion.div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
