"use client";

import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading process (e.g., fetching data)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust the duration as needed

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  if (!isLoading) {
    return null; // Hide the loading screen when done
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#023A47] z-50">
      {/* Background Blur */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      {/* Loader Container */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-4">
        {/* Animated Spinner */}
        <div className="w-20 h-20 relative">
          <div className="absolute inset-0 border-4 border-transparent border-t-[#00FF95] rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-5 h-5 bg-[#00FF95] rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-scale"></div>
        </div>

        {/* Loading Text */}
        <p className="text-white text-lg font-bold tracking-wider animate-pulse">
          LOADING...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;