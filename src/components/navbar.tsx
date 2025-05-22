"use client"
import Image from "next/image";

import Link from "next/link";
import { User } from "@supabase/supabase-js";

import { Love_Ya_Like_A_Sister, Montserrat } from "next/font/google";

import { useMouse } from "@/context/MouseContext";

export const loveYaFont = Love_Ya_Like_A_Sister({ subsets: ["latin"], weight: "400" });
export const montserrat = Montserrat({ display: "swap", subsets: ["latin"] });

const Navbar = ({
    user,
    trackMouse
}: {    
    user: User | null   
    trackMouse?: boolean
}) => {
    const { setMouseInfo } = useMouse();

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        setMouseInfo({
            // x: e.clientX,
            y: e.clientY,
        });
    }

  


    return (
        <div className="fixed top-0 w-full z-40 pointer-events-none "
        {...trackMouse ? { onMouseMove: handleMouseEnter } : {}}>
            <nav className="justify-between items-center h-[10vh] py-3 w-full bg-[#023A47] bg-opacity-0 z-10 pointer-events-auto [background:linear-gradient(to_bottom,rgba(10,39,64,1)_0%,rgba(0,66,102,0.7)_60%,rgba(0,66,102,0.6)_70%,rgba(0,66,102,0.2)_100%)] backdrop-filter backdrop-blur-sm">
                <div className="w-full h-full flex items-center justify-between px-14">
                    <div className={`flex items-center justify-center gap-2 drop-shadow-[0px_0px_6px_rgba(234,255,0,0.5)] hover:drop-shadow-[0px_0px_8px_rgba(234,255,0,0.9)] ease-in-out transition-all duration-200 `}>                   
                            <Image src="/logo.png" alt="Adopt-a-Fin Logo" width={70} height={40} />
                            <Link
                                className={`text-white text-[calc(2.5vw-0.2rem)] font-bold ${loveYaFont.className} drop-shadow-[0px_4px_4px_rgba(0,0,0,0.5)] hover:drop-shadow-none ease-in-out transition-all duration-200`}
                                href="/"    
                            >
                                Adopt-a-Fin
                            </Link>
                    </div>
                    <div className="flex-1 w-full flex justify-end gap-10">
                    <div className="relative flex bg-[#1999cc] rounded-full gap-0 hover:bg-[#004c5d] transition-all duration-200 ease-in-out">
                            <div className="w-full relative group text-[calc(1.7vw-0.2rem)]">
                                <div className="absolute -z-10 -inset-0.5 h-full w-full rounded-lg bg-gradient-to-tr from-green-500 to-blue-500 blur opacity-70 group-hover:opacity-100 group-hover:blur-lg transition duration-1000 group-hover:duration-200"></div>
                                <Link
                                href="/donate"
                                className={`block h-full z-10 relative font-bold bg-[#17cc9c] transition-all duration-200 ease-in-out md:hover:scale-105 rounded-full mr-4 text-white px-2 py-2 w-full md:rounded-full`}
                                >
                                    <span className="drop-shadow-[0px_4px_4px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0px_0px_2px_rgba(255,255,255,0.5)] w-full h-full flex justify-center items-center ease-in-out transition-all duration-200">
                                        Donate 
                                    </span>
                                </Link>
                            </div>
                            <Link
                                className={`z-10 text-white font-bold drop-shadow-[0px_4px_4px_rgba(0,0,0,0.5)] hover:drop-shadow-[0px_0px_2px_rgba(255,255,255,0.5)] flex justify-center items-center text-[calc(1.7vw-0.2rem)] ps-2 pe-4 py-1 rounded-full transition-all duration-200 ease-in-out`}
                                href="/adopt"
                            >
                                Adopt
                            </Link>
                        </div>
                        <Link
                            className={`flex items-center text-[#fafafa] text-[calc(1.8vw-0.2rem)] drop-shadow-[0px_4px_4px_rgba(0,0,0,1)] hover:text-white hover:drop-shadow-[0px_0px_4px_#00FF95] ease-in-out transition-all duration-200 ${loveYaFont.className}`}
                            href="/about"
                        >
                            About Us
                        </Link>
                        <Link
                            className={`flex items-center text-[#fafafa] text-[calc(1.8vw-0.2rem)] drop-shadow-[0px_4px_4px_rgba(0,0,0,1)] hover:text-white hover:drop-shadow-[0px_0px_4px_#00FF95] ease-in-out transition-all duration-200 ${loveYaFont.className}`} 
                            href="/contact"
                        >
                            Contact
                        </Link>
                        {user ? (
                            <Link
                                className={`flex items-center text-[#fafafa] text-[calc(1.8vw-0.2rem)] drop-shadow-[0px_4px_4px_rgba(0,0,0,1)] hover:text-white hover:drop-shadow-[0px_0px_4px_#00FF95] ease-in-out transition-all duration-200 ${loveYaFont.className}`}
                                href="/dashboard"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                className={`flex items-center text-[#fafafa] text-[calc(1.8vw-0.2rem)] drop-shadow-[0px_4px_4px_rgba(0,0,0,1)] hover:text-white hover:drop-shadow-[0px_0px_4px_#00FF95] ease-in-out transition-all duration-200 ${loveYaFont.className}`}
                                href="/sign-up"
                            >
                                Join
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;


