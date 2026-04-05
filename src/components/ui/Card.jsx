import { memo } from "react";
import { motion } from "framer-motion";

const Card = memo(function Card({ children, className = "", hover = true }) {
  return (
    <motion.div
      whileHover={hover ? { y: -5 } : undefined}
      className={`bg-white dark:bg-dark-800/80 rounded-xl border border-dark-200 dark:border-dark-700 shadow-sm hover:shadow-xl dark:shadow-dark-900/20 transition-shadow duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
});

export default Card;
