import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, projectCategories } from "../../data/projects";
import AnimatedWrapper from "../ui/AnimatedWrapper";
import SectionHeading from "../ui/SectionHeading";

function ProjectCard({ project, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group bg-white dark:bg-dark-800/60 border border-dark-100 dark:border-dark-700/50 p-8 relative overflow-hidden transition-all duration-400 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-2xl hover:shadow-primary-500/12 hover:border-primary-500/25"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/[0.03] to-accent-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary-500 to-accent-500 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400" />

      <div className="relative z-10">
        <span className="text-xs font-mono text-primary-500 tracking-wider opacity-70 mb-3 block">
          // 0{index + 1}
        </span>

        <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-3">
          {project.title}
        </h3>

        <p className="text-sm text-dark-500 dark:text-dark-400 leading-relaxed mb-5">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-mono text-primary-500 bg-primary-50 dark:bg-primary-950/30 border border-primary-200 dark:border-primary-800/50 tracking-wide transition-colors hover:bg-primary-500 hover:text-white hover:border-primary-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = useMemo(
    () =>
      activeCategory === "all"
        ? projects
        : projects.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
  }, []);

  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Projects"
          subtitle="A selection of projects that showcase my skills and experience"
        />

        <AnimatedWrapper className="flex justify-center gap-2 mb-12 flex-wrap">
          {projectCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 cursor-pointer ${
                activeCategory === category
                  ? "bg-primary-600 text-white shadow-lg shadow-primary-500/25"
                  : "bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-700"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </AnimatedWrapper>

        <motion.div
          layout
          className="grid sm:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
