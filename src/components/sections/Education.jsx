import { FiBookOpen, FiMapPin, FiCalendar, FiAward } from "react-icons/fi";
import { education } from "../../data/education";
import AnimatedWrapper from "../ui/AnimatedWrapper";
import SectionHeading from "../ui/SectionHeading";

function EducationCard({ edu, index }) {
  return (
    <AnimatedWrapper animation="fadeUp" delay={index * 0.15}>
      <div className="relative pl-8 md:pl-12 pb-8 last:pb-0">
        {/* Timeline connector */}
        {index < education.length - 1 && (
          <div className="absolute left-[11px] md:left-[19px] top-8 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-accent-500/50" />
        )}

        {/* Timeline dot */}
        <div className="absolute left-0 md:left-2 top-1 w-6 h-6 rounded-full bg-primary-500 border-4 border-primary-100 dark:border-dark-900 shadow-md flex items-center justify-center">
          <FiBookOpen className="w-2.5 h-2.5 text-white" />
        </div>

        <div className="bg-white dark:bg-dark-800/60 rounded-2xl p-6 border border-dark-100 dark:border-dark-700/50 shadow-sm hover:shadow-md transition-shadow ml-4">
          <div className="flex items-center gap-2 mb-2">
            <FiCalendar className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
              {edu.duration}
            </span>
          </div>

          <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-1">
            {edu.degree}
          </h3>

          <div className="flex items-center gap-2 text-dark-500 dark:text-dark-400 mb-1">
            <FiBookOpen className="w-4 h-4" />
            <span className="text-sm font-medium">{edu.institution}</span>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1 text-dark-400 dark:text-dark-500">
              <FiMapPin className="w-3 h-3" />
              <span className="text-xs">{edu.location}</span>
            </div>
            <div className="flex items-center gap-1 text-accent-600 dark:text-accent-400">
              <FiAward className="w-3 h-3" />
              <span className="text-xs font-semibold">{edu.grade}</span>
            </div>
          </div>

          <p className="text-sm text-dark-600 dark:text-dark-300 leading-relaxed">
            {edu.description}
          </p>
        </div>
      </div>
    </AnimatedWrapper>
  );
}

export default function Education() {
  return (
    <section id="education" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Education"
          subtitle="My academic background and qualifications"
        />

        <div className="max-w-2xl mx-auto">
          {education.map((edu, index) => (
            <EducationCard key={edu.id} edu={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
