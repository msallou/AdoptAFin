import React, { useRef, useMemo } from "react";
import { motion } from "framer-motion";

interface BubblesBackgroundProps {
  density?: number;
  speed?: number;
  section?: string;
}

export function BubblesBackground({ 
  density = 10, 
  speed = 1,
  section = "default"
}: BubblesBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // const [containerHeight, setContainerHeight] = useState<number>(0);

  // Section-specific styles
  const getSectionStyles = () => {
    switch(section) {
      case "hero": return { bubbleColor: "bg-cyan-300/20", yDistance: "-150vh" };
      case "mission": return { bubbleColor: "bg-cyan-400/15", yDistance: "-130vh" };
      case "adoption": return { bubbleColor: "bg-teal-300/15", yDistance: "-140vh" };
      case "newsletter": return { bubbleColor: "bg-blue-300/15", yDistance: "-120vh" };
      default: return { bubbleColor: "bg-white/10", yDistance: "-100vh" };
    }
  };

  const { bubbleColor, yDistance } = getSectionStyles();

  // 💡 Use useMemo to generate bubbles once per mount or if density/speed/section changes
  const bubbleProps = useMemo(() => {
    return Array.from({ length: density }, (_, index) => {
      const size = Math.random() * 40 + 10;
      const left = (index % 5) * 20 + Math.random() * 15;
      const delay = Math.random() * 8;
      const duration = (Math.random() * 15 + 20) / speed;
      const initialScale = Math.random() * 0.3 + 0.7;

      return {
        size,
        left,
        delay,
        duration,
        initialScale,
        opacity: Math.random() * 0.3 + 0.1,
      };
    });
  }, [density, speed]); // Only regenerate when these change

  // // Keep track of height (optional, already there)
  // useEffect(() => {
  //   if (containerRef.current) {
  //     setContainerHeight(containerRef.current.offsetHeight);
  //   }

  //   const handleResize = () => {
  //     if (containerRef.current) {
  //       setContainerHeight(containerRef.current.offsetHeight);
  //     }
  //   };

  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {bubbleProps.map(({ size, left, delay, duration, initialScale, opacity }, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${bubbleColor}`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            bottom: `-${size}px`,
            opacity,
            filter: `blur(${size > 30 ? 3 : 1}px)`
          }}
          initial={{ y: 0, scale: initialScale }}
          animate={{ y: yDistance, scale: initialScale + 0.2 }}
          transition={{
            delay,
            duration,
            repeat: Infinity,
            repeatDelay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}