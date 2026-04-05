import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ringRef = useRef({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    setIsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  useEffect(() => {
    let animId;
    const animate = () => {
      ringRef.current.x += (mousePos.x - ringRef.current.x) * 0.12;
      ringRef.current.y += (mousePos.y - ringRef.current.y) * 0.12;
      setRingPos({ x: ringRef.current.x, y: ringRef.current.y });
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [mousePos]);

  useEffect(() => {
    const interactiveEls = document.querySelectorAll(
      "a, button, .project-card, .stat-box, .skill-tag, .skill-group, input, textarea, [role='button']"
    );
    const onEnter = () => setIsHovering(true);
    const onLeave = () => setIsHovering(false);

    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  const isTouchDevice =
    typeof window !== "undefined" && "ontouchstart" in window;
  if (isTouchDevice) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-primary-500 pointer-events-none z-[9999] mix-blend-multiply dark:mix-blend-screen"
        animate={{
          x: mousePos.x - (isHovering ? 10 : 6),
          y: mousePos.y - (isHovering ? 10 : 6),
          width: isHovering ? 20 : 12,
          height: isHovering ? 20 : 12,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "tween", duration: 0.05 }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-primary-500/50 pointer-events-none z-[9998]"
        animate={{
          x: ringPos.x - (isHovering ? 25 : 18),
          y: ringPos.y - (isHovering ? 25 : 18),
          width: isHovering ? 50 : 36,
          height: isHovering ? 50 : 36,
          opacity: isVisible ? 0.5 : 0,
        }}
        transition={{ type: "tween", duration: 0.15 }}
      />
    </>
  );
}
