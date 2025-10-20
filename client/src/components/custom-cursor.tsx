import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners
    document.addEventListener("mousemove", updateMousePosition);
    
    // Add hover listeners for interactive elements
    const interactiveElements = document.querySelectorAll("a, button, .project-card, [role='button']");
    interactiveElements.forEach(el => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      document.removeEventListener("mousemove", updateMousePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  // Smooth animation for the dot trail
  useEffect(() => {
    const animateDot = () => {
      setDotPosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.1,
        y: prev.y + (mousePosition.y - prev.y) * 0.1
      }));
    };

    const animation = setInterval(animateDot, 16); // ~60fps
    return () => clearInterval(animation);
  }, [mousePosition]);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="custom-cursor fixed w-5 h-5 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
          background: "linear-gradient(45deg, #3B82F6, #8B5CF6)"
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 1
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      />
      
      {/* Dot trail */}
      <motion.div
        className="cursor-dot fixed w-1 h-1 bg-neon-cyan rounded-full pointer-events-none z-[10000]"
        style={{
          left: dotPosition.x - 2,
          top: dotPosition.y - 2
        }}
        animate={{
          scale: isHovering ? 1.5 : 1
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25
        }}
      />
    </>
  );
}