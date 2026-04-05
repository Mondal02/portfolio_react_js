import { motion } from "framer-motion";
import { FiGithub } from "react-icons/fi";
import { skillCategories } from "../../data/skills";
import AnimatedWrapper from "../ui/AnimatedWrapper";
import SectionHeading from "../ui/SectionHeading";

const tagVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.3, ease: "easeOut" },
  }),
};

function SkillTag({ name, index }) {
  return (
    <motion.span
      custom={index}
      variants={tagVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ y: -3, scale: 1.05 }}
      className="inline-block px-3 py-1.5 text-xs font-mono bg-dark-100 dark:bg-dark-800/60 text-dark-600 dark:text-dark-300 border border-dark-200 dark:border-dark-700 tracking-wide cursor-default transition-colors hover:bg-primary-500 hover:text-white hover:border-primary-500 dark:hover:bg-primary-500 dark:hover:text-white dark:hover:border-primary-500"
    >
      {name}
    </motion.span>
  );
}

function SkillGroup({ category, delay }) {
  return (
    <AnimatedWrapper animation="fadeUp" delay={delay}>
      <div className="group h-full bg-white dark:bg-dark-800/40 border border-dark-100 dark:border-dark-700/50 p-6 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:bg-primary-50/50 hover:border-primary-500/30 dark:hover:bg-primary-950/30 dark:hover:border-primary-500/30">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-400" />

        <h3 className="text-xs font-mono text-primary-500 uppercase tracking-[0.12em] mb-4 pb-3 border-b border-dark-100 dark:border-dark-700">
          {category.title}
        </h3>

        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill, i) => (
            <SkillTag key={skill} name={skill} index={i} />
          ))}
        </div>

        {category.link && (
          <a
            href={category.link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-4 text-xs font-mono text-primary-400 hover:text-primary-300 transition-colors"
          >
            <FiGithub className="w-3.5 h-3.5" />
            {category.link.label}
          </a>
        )}
      </div>
    </AnimatedWrapper>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-20 bg-dark-900 dark:bg-dark-950 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "radial-gradient(rgba(59,130,246,0.08) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          title="Skills"
          subtitle="The tools and technologies I use to bring ideas to life"
          dark
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((category, index) => (
            <SkillGroup
              key={category.title}
              category={category}
              delay={index * 0.05}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
