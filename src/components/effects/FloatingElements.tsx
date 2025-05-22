import React from "react";
import { motion, TargetAndTransition } from "framer-motion";

interface FloatingElement {
  type: keyof typeof svgPaths;
  position: string;
  width: number;
  height: number;
  animate: TargetAndTransition;
  duration: number;
}

interface FloatingElementsProps {
  section?: "hero" | "mission" | "adoption" | "newsletter";
}

export const FloatingElements: React.FC<FloatingElementsProps> = ({ section = "hero" }) => {
  const elements: Record<string, FloatingElement[]> = {
    hero: [
      {
        type: "seaweed",
        position: "bottom-0 left-10",
        width: 120,
        height: 300,
        animate: {
          rotateZ: [0, 5, 0, -5, 0],
        },
        duration: 8,
      },
      {
        type: "coral",
        position: "bottom-0 right-20",
        width: 180,
        height: 160,
        animate: {
          y: [0, -10, 0],
        },
        duration: 5,
      },
      {
        type: "fish",
        position: "top-1/4 right-1/4",
        width: 80,
        height: 40,
        animate: {
          x: [0, 50, -50, 0],
          y: [0, -20, 20, 0],
        },
        duration: 15,
      },
      {
        type: "greenFish",
        position: "top-3/4 right-1/4",
        width: 80,
        height: 40,
        animate: {
          x: [0, 50, -50, 0],
          y: [0, -20, 20, 0],
        },
        duration: 15,
      },
    ],
    mission: [
      {
        type: "fish-group",
        position: "top-1/3 left-20",
        width: 200,
        height: 100,
        animate: {
          x: [0, 100, 0],
          rotateY: [0, 180, 0],
        },
        duration: 30,
      },
      {
        type: "jellyfish",
        position: "bottom-1/4 right-1/3",
        width: 100,
        height: 140,
        animate: {
          y: [0, -30, 0],
        },
        duration: 10,
      },
    ],
    adoption: [
      {
        type: "turtle",
        position: "top-1/3 right-1/4",
        width: 150,
        height: 120,
        animate: {
          x: [0, -80, 0],
          y: [0, 30, 0],
        },
        duration: 25,
      },
    ],
  };

  const sectionElements = elements[section] || [];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sectionElements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.position} z-[1]`}
          style={{
            width: element.width,
            height: element.height,
          }}
          animate={element.animate}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          {svgPaths[element.type]}
        </motion.div>
      ))}
    </div>
  );
};

const svgPaths = {
  seaweed: (
    <svg viewBox="0 0 100 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50,300 C30,250 70,230 50,180 C30,130 70,110 50,60 C40,30 60,10 50,0" stroke="#1A9AAD" strokeWidth="8" strokeLinecap="round" />
      <path d="M30,300 C10,240 40,220 20,160 C10,120 40,100 20,40" stroke="#1A9AAD" strokeWidth="6" strokeLinecap="round" />
      <path d="M70,300 C90,250 60,230 80,180 C90,150 70,130 90,80" stroke="#1A9AAD" strokeWidth="5" strokeLinecap="round" />
    </svg>
  ),
  coral: (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100,160 C100,120 120,120 120,80 C120,40 140,40 140,0" stroke="#FF8674" strokeWidth="10" strokeLinecap="round" />
      <path d="M100,160 C100,130 80,130 80,100 C80,70 60,70 60,40" stroke="#FF8674" strokeWidth="8" strokeLinecap="round" />
      <path d="M100,160 C100,140 150,140 150,120 C150,100 180,100 180,80" stroke="#FF8674" strokeWidth="12" strokeLinecap="round" />
      <path d="M100,160 C100,140 50,140 50,120 C50,100 20,100 20,80" stroke="#FF8674" strokeWidth="12" strokeLinecap="round" />
    </svg>
  ),
  fish: (
    <svg viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M60,20 C70,10 75,20 60,20 C75,30 70,30 60,20 Z" fill="#20E1F0" />
      <path d="M10,20 C40,0 50,10 60,20 C50,30 40,40 10,20 Z" fill="#20E1F0" />
      <circle cx="50" cy="15" r="3" fill="#053C5E" />
    </svg>
  ),
  greenFish: (
    <svg viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M60,20 C70,10 75,20 60,20 C75,30 70,30 60,20 Z" fill="#42bd5b" />
      <path d="M10,20 C40,0 50,10 60,20 C50,30 40,40 10,20 Z" fill="#42bd5b" />
      <circle cx="50" cy="15" r="3" fill="#053C5E" />
    </svg>
  ),
  "fish-group": (
    <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.7">
        <path d="M160,30 C170,20 175,30 160,30 C175,40 170,40 160,30 Z" fill="#20E1F0" />
        <path d="M110,30 C140,10 150,20 160,30 C150,40 140,50 110,30 Z" fill="#20E1F0" />
        <circle cx="150" cy="25" r="3" fill="#053C5E" />
      </g>
      <g opacity="0.8">
        <path d="M140,50 C150,40 155,50 140,50 C155,60 150,60 140,50 Z" fill="#1A9AAD" />
        <path d="M90,50 C120,30 130,40 140,50 C130,60 120,70 90,50 Z" fill="#1A9AAD" />
        <circle cx="130" cy="45" r="3" fill="#053C5E" />
      </g>
      <g opacity="0.9">
        <path d="M120,70 C130,60 135,70 120,70 C135,80 130,80 120,70 Z" fill="#0D6E9A" />
        <path d="M70,70 C100,50 110,60 120,70 C110,80 100,90 70,70 Z" fill="#0D6E9A" />
        <circle cx="110" cy="65" r="3" fill="#053C5E" />
      </g>
    </svg>
  ),
  jellyfish: (
    <svg viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50,40 C70,40 80,20 50,0 C20,20 30,40 50,40 Z" fill="#1A9AAD" fillOpacity="0.6" />
      <path d="M50,40 C60,40 60,140 50,140 M50,40 C40,40 40,140 50,140" stroke="#1A9AAD" strokeOpacity="0.4" strokeWidth="2" />
      <path d="M30,40 C35,40 35,120 30,120 M70,40 C65,40 65,120 70,120" stroke="#1A9AAD" strokeOpacity="0.4" strokeWidth="2" />
      <path d="M20,40 C25,40 25,100 15,100 M80,40 C75,40 75,100 85,100" stroke="#1A9AAD" strokeOpacity="0.4" strokeWidth="2" />
    </svg>
  ),
  turtle: (
    <svg viewBox="0 0 150 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="75" cy="60" rx="45" ry="35" fill="#1A9AAD" fillOpacity="0.7" />
      <path d="M30,50 C10,40 15,20 30,30" stroke="#1A9AAD" strokeWidth="8" strokeLinecap="round" />
      <path d="M120,50 C140,40 135,20 120,30" stroke="#1A9AAD" strokeWidth="8" strokeLinecap="round" />
      <path d="M40,90 C30,110 35,115 45,100" stroke="#1A9AAD" strokeWidth="8" strokeLinecap="round" />
      <path d="M110,90 C120,110 115,115 105,100" stroke="#1A9AAD" strokeWidth="8" strokeLinecap="round" />
      <path d="M75,95 C65,115 85,115 75,95" stroke="#1A9AAD" strokeWidth="8" strokeLinecap="round" />
      <path d="M60,30 C70,15 80,15 90,30" stroke="#1A9AAD" strokeWidth="8" strokeLinecap="round" />
      <circle cx="65" cy="45" r="3" fill="#053C5E" />
      <circle cx="85" cy="45" r="3" fill="#053C5E" />
    </svg>
  ),
};
