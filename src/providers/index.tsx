'use client';

import { ParallaxProvider } from 'react-scroll-parallax';
import { ThemeProvider } from "next-themes";
import { MouseProvider } from '@/context/MouseContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
        <MouseProvider>
          <ParallaxProvider>
            {children}
          </ParallaxProvider>
        </MouseProvider>
    </ThemeProvider>
);
}