import { useState, useEffect } from "react";

export function useCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const checkIfHovering = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, [role='button']");
      setIsHovering(!!isInteractive);
    };

    document.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseover", checkIfHovering);
    document.addEventListener("mouseout", checkIfHovering);

    return () => {
      document.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseover", checkIfHovering);
      document.removeEventListener("mouseout", checkIfHovering);
    };
  }, []);

  return { mousePosition, isHovering };
}
