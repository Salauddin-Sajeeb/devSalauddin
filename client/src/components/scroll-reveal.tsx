import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export function ScrollReveal({ 
  children, 
  delay = 0, 
  direction = "up",
  className = ""
}: ScrollRevealProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up": return { opacity: 0, y: 50 };
      case "down": return { opacity: 0, y: -50 };
      case "left": return { opacity: 0, x: -50 };
      case "right": return { opacity: 0, x: 50 };
      default: return { opacity: 0, y: 50 };
    }
  };

  const getFinalPosition = () => {
    switch (direction) {
      case "up":
      case "down": 
        return { opacity: 1, y: 0 };
      case "left":
      case "right": 
        return { opacity: 1, x: 0 };
      default: 
        return { opacity: 1, y: 0 };
    }
  };

  return (
    <motion.div
      className={className}
      initial={getInitialPosition()}
      whileInView={getFinalPosition()}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: "easeOut"
      }}
      viewport={{ 
        once: true,
        margin: "-50px"
      }}
    >
      {children}
    </motion.div>
  );
}