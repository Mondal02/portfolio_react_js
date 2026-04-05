import { motion } from "framer-motion";
import { experiences } from "../../data/experience";
import AnimatedWrapper from "../ui/AnimatedWrapper";
import SectionHeading from "../ui/SectionHeading";

function TimelineItem({ experience, index }) {
  const isFirst = index === 0;

  return (
    <AnimatedWrapper animation="fadeUp" delay={index * 0.15}>
      <div className="relative pl-10 pb-12 last:pb-0">
        <motion.div
          animate={{
            boxShadow: [
              `0 0 0 3px ${isFirst ? "rgba(59,130,246,0.2)" : "rgba(139,92,246,0.2)"}`,
              `0 0 0 7px ${isFirst ? "rgba(59,130,246,0.08)" : "rgba(139,92,246,0.08)"}`,
              `0 0 0 3px ${isFirst ? "rgba(59,130,246,0.2)" : "rgba(139,92,246,0.2)"}`,
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className={`absolute left-[-6px] top-1 w-3 h-3 rounded-full border-2 border-white dark:border-dark-900 z-10 ${
            isFirst ? "bg-primary-500" : "bg-accent-500"
          }`}
        />

        <div className="flex flex-wrap items-baseline gap-3 mb-2">
          <h3 className="text-xl font-bold text-dark-900 dark:text-white">
            {experience.role}
          </h3>
          <span
            className={`text-xs font-mono tracking-wider px-2.5 py-0.5 rounded-sm ${
              isFirst
                ? "text-primary-500 bg-primary-500/10"
                : "text-accent-500 bg-accent-500/10"
            }`}
          >
            {experience.company}
          </span>
          <span className="text-xs font-mono text-dark-400 dark:text-dark-500">
            {experience.duration}
          </span>
        </div>

        <p className="text-dark-500 dark:text-dark-400 text-sm leading-relaxed mb-3">
          {experience.description[0]}
        </p>

        {experience.description.length > 1 && (
          <ul className="space-y-1.5 pl-4 mb-4">
            {experience.description.slice(1).map((item, i) => (
              <li
                key={i}
                className="text-sm text-dark-500 dark:text-dark-400 leading-relaxed list-disc marker:text-primary-500"
              >
                {item}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-mono bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 rounded-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </AnimatedWrapper>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-white dark:bg-dark-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Experience"
          subtitle="My professional journey and the roles that shaped my career"
        />

        <div className="max-w-3xl mx-auto relative pl-8">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-accent-500 to-yellow-400" />

          {experiences.map((experience, index) => (
            <TimelineItem
              key={experience.id}
              experience={experience}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
