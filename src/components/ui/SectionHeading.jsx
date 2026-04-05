import { memo } from "react";
import AnimatedWrapper from "./AnimatedWrapper";

const SectionHeading = memo(function SectionHeading({
  title,
  subtitle,
  align = "center",
  dark = false,
}) {
  const alignment = align === "center" ? "text-center" : "text-left";

  return (
    <AnimatedWrapper className={`mb-16 ${alignment}`}>
      <h2
        className={`text-3xl md:text-4xl font-bold mb-4 ${
          dark ? "text-white" : "text-dark-900 dark:text-white"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`max-w-2xl mx-auto text-lg ${
            dark ? "text-dark-400" : "text-dark-500 dark:text-dark-400"
          }`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mt-4 h-1 w-20 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </AnimatedWrapper>
  );
});

export default SectionHeading;
