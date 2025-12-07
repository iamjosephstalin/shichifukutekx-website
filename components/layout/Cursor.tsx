import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Cursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const cursorSize = isHovered ? 60 : 15;
  
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  }

  const smoothOptions = {damping: 20, stiffness: 300, mass: 0.5}
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions)
  }

  const manageMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    mouse.x.set(clientX - cursorSize / 2);
    mouse.y.set(clientY - cursorSize / 2);
  }

  useEffect(() => {
    window.addEventListener("mousemove", manageMouseMove);
    
    // Add hover listeners to interactive elements
    const handleMouseOver = () => setIsHovered(true);
    const handleMouseOut = () => setIsHovered(false);
    
    const elements = document.querySelectorAll("a, button, .interactive");
    elements.forEach(el => {
      el.addEventListener("mouseenter", handleMouseOver);
      el.addEventListener("mouseleave", handleMouseOut);
    });

    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      elements.forEach(el => {
        el.removeEventListener("mouseenter", handleMouseOver);
        el.removeEventListener("mouseleave", handleMouseOut);
      });
    }
  }); // Run on every render to pick up new elements

  return (
    <motion.div 
      className="fixed top-0 left-0 bg-white rounded-full mix-blend-difference pointer-events-none z-[9999]"
      style={{
        left: smoothMouse.x, 
        top: smoothMouse.y,
        width: cursorSize,
        height: cursorSize
      }}
      animate={{
        width: cursorSize,
        height: cursorSize
      }}
    />
  );
}

export default Cursor;