import { useEffect, useRef, useState, useCallback } from "react";
import { FiCode, FiBriefcase, FiAward, FiLayers } from "react-icons/fi";
import AnimatedWrapper from "../ui/AnimatedWrapper";
import SectionHeading from "../ui/SectionHeading";

const stats = [
  { icon: FiCode, value: 5, suffix: "+", label: "Years of Experience" },
  { icon: FiLayers, value: 7, suffix: "+", label: "Projects Delivered" },
  { icon: FiAward, value: 10, suffix: "+", label: "Technologies Used" },
  { icon: FiBriefcase, value: 2, suffix: "", label: "Companies Worked At" },
];

function useCountUp(target, duration = 1600) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  const startCounting = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);

    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  }, [target, duration, hasStarted]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startCounting();
      },
      { threshold: 0.5 }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [startCounting]);

  return { count, ref };
}

function StatCard({ icon: Icon, value, suffix, label, delay }) {
  const { count, ref } = useCountUp(value);

  return (
    <AnimatedWrapper animation="scaleUp" delay={delay}>
      <div
        ref={ref}
        className="group p-6 bg-white dark:bg-dark-800/50 border border-dark-100 dark:border-dark-700/50 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-500/10 hover:border-primary-500/20"
      >
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        <Icon className="w-6 h-6 text-primary-500 mb-3" />
        <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent mb-1">
          {count}
          {suffix}
        </div>
        <div className="text-xs font-mono text-dark-500 dark:text-dark-400 uppercase tracking-wider">
          {label}
        </div>
      </div>
    </AnimatedWrapper>
  );
}

export default function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-dark-900 relative overflow-hidden">
      <div className="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.04),transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="About Me"
          subtitle="Get to know me and what drives my passion for development"
        />

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start mb-16">
          <AnimatedWrapper animation="fadeRight">
            <div className="space-y-5 text-dark-600 dark:text-dark-300 leading-relaxed">
              <p>
                I&apos;m a Senior Software Developer with a strong focus on
                frontend engineering and UI/UX-driven development. I specialise
                in building scalable, performant applications using modern
                JavaScript frameworks like React.js, Next.js, Angular, and
                React Native.
              </p>
              <p>
                My experience spans marketplace platforms, mobile applications,
                insurance tech, and AI-powered recruitment tools — working
                across agile teams to deliver high-quality products that make a
                real impact.
              </p>
              <p>
                I care deeply about clean code, intuitive interfaces, and
                seamless integrations between frontend and backend systems.
                Outside of work, I enjoy exploring new technologies and
                contributing to meaningful projects.
              </p>
            </div>
          </AnimatedWrapper>

          <AnimatedWrapper animation="fadeLeft" delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <StatCard key={stat.label} {...stat} delay={index * 0.1} />
              ))}
            </div>
          </AnimatedWrapper>
        </div>
      </div>
    </section>
  );
}
