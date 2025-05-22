"use client"

import { useEffect, useState } from "react";
import { BannerLayer, ParallaxBanner } from "react-scroll-parallax";

export const AuthBackground = () => {
    useEffect(() => {
        const message = localStorage.getItem("redirectMessage");
        if (message) {
            alert(message); // Show the alert dialog
            localStorage.removeItem("redirectMessage"); // Clear the message after displaying it
        }
      }, []);
    
        const videos = [
            {
                src: "/auth/auth1.mp4",
                opacity: 0.15,
            },
            {
                src: "/auth/auth2.mp4",
                opacity: 0.15,
            },
            {
                src: "/auth/auth3.mp4",
                opacity: 0.15,
            },
        ];
    
      const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
      const [isFading, setIsFading] = useState(false);
      // const [loaded, setLoaded] = useState(false);
    
      // useEffect(() => {
      //   setTimeout(() => {
      //     setLoaded(true);
      //   }, 1);
      // }, []);
    
      useEffect(() => {
        const intervalId = setInterval(() => {
          setIsFading(true);
          setTimeout(() => {
            setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
            setIsFading(false);
          }, 300);
        }, 5000);
    
        return () => {
          clearInterval(intervalId);
        };
      }, [videos.length]);
    
      const background: BannerLayer = {
        scale: [1.2, 1, 'easeOutCubic'],
        style: {
          filter: `brightness(${videos[currentVideoIndex].opacity}) blur(2px)`,
        },
        children: (
          <video
            src={videos[currentVideoIndex].src}
            className={`w-full h-full object-cover ${
              isFading ? 'opacity-0' : 'opacity-100'
            } transition-all duration-300 ease-in-out`}
            autoPlay
            muted
          />
        ),
        expanded: false,
        shouldAlwaysCompleteAnimation: true,
      };
      return (
        <ParallaxBanner layers={[background]} style={{ height: '100vh' }} />
    )
}