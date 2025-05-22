"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export const AuthTabs = ({ path }: { path: "login" | "register" }) => {
    const router = useRouter();
    const [side, setSide] = useState<"left" | "right">(path === "login" ? "left" : "right");

    const buttonClicked = (side: string) => {
        if (path === "login" && side === "left") {
            setSide("right");
            setTimeout(() => {
                router.push("/sign-up");
            }, 300);
        } else if (path === "register" && side === "right") {
            setSide("left");
            setTimeout(() => {
                router.push("/sign-in");
            }, 300);
        }
    };

    return (
        <div className="relative w-full flex gap-2 bg-black bg-opacity-40 px-2 py-2 rounded-lg justify-between items-center h-12">
            {/* Sliding Indicator */}
            <div 
                className={`absolute top-2 left-0 h-[70%] w-[48%] bg-gray-800 rounded-lg transition-transform duration-300 ease-in-out ${
                    side === "right" ? "translate-x-[105%]" : "translate-x-2"
                }`}
            />
            
            {/* Buttons */}
            <button onClick={() => buttonClicked("right")} className="w-full h-full flex justify-center items-center text-center px-5 py-1 rounded-lg z-10">
                Sign In
            </button>
            <button onClick={() => buttonClicked("left")} className="w-full flex justify-center items-center text-center px-5 py-1 rounded-lg z-10">
                Sign Up
            </button>
        </div>
    );
};