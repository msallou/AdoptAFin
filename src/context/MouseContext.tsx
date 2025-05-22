"use client";

import { createContext, useContext, useState } from "react";

export type MouseInfo = { y: number };

type MouseContextType = {
  mouseInfo: MouseInfo;
  setMouseInfo: (info: MouseInfo) => void;
};

// Create context with default values to prevent undefined errors
export const MouseContext = createContext<MouseContextType | undefined>(
  undefined
);

export function MouseProvider({ children }: { children: React.ReactNode }) {
    const [mouseInfo, setMouseInfo] = useState<MouseInfo>({ y: 0 });

    return (
        <MouseContext.Provider value={{ 
            mouseInfo,
            setMouseInfo,

        }}>
            {children}
        </MouseContext.Provider>
    );
}

export const useMouse = () => {
  const context = useContext(MouseContext);
  if (context === undefined) {
    throw new Error("useMouse must be used within a MouseProvider");
  }
  return context;
};