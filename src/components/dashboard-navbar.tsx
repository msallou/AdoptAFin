"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { signOutAction } from '@/app/actions';
import { 
  Fish, 
  Heart, 
  DollarSign, 
  History, 
  Settings, 
  Book, 
  LogOut,
  Home,
  BarChart,
  
} from 'lucide-react';
import Image from 'next/image';

function Sidebar() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setIsVisible(true);
    setCurrentUrl(window.location.href); // Get the current URL
    console.log(currentUrl)
  }, [currentUrl]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    ...(currentUrl !== "http://localhost:3000/dashboard" ? [{ icon: BarChart, label: "Dashboard", href: "/dashboard" }] : []),
    { icon: Fish, label: "Your Fish", href: "/dashboard/my-fish" },
    { icon: Heart, label: "Adopt", href: "/adopt" },
    { icon: DollarSign, label: "Donate", href: "/donate" },
    { icon: History, label: "Payment History", href: "/dashboard/payment-history" },
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: Book, label: "AquaDex", href: "/dashboard/aquadex", badge: "New" },
  ];  

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -150 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#1A9A91] to-[#203E3F] fixed z-10">
      {/* Sidebar */}
      <nav 
        className="w-64 relative bg-[#0f172a]/90 backdrop-blur-lg border-r border-white/10"
        style={{
          // backgroundImage: 'url("https://images.unsplash.com/photo-1682687220742-aba13b6e50ba")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-[#0f172a]/85 backdrop-blur-sm" />
        <div className="h-full flex flex-col relative z-10">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
            transition={{ duration: 0.6 }}
            className="p-6 border-b border-white/10"
          >
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="Adopt-a-Fin Logo" width={40} height={40} />
              <h1 className="text-xl font-bold text-white/90 bg-clip-text bg-gradient-to-r from-[#00FF95] to-[#00BFFF] drop-shadow-[0px_0px_6px_rgba(234,255,0,0.5)] hover:drop-shadow-[0px_0px_8px_rgba(234,255,0,0.9)] ease-in-out transition-all duration-200">
                Adopt-a-Fin
              </h1>
            </div>
          </motion.div>

          {/* Menu Sections */}
          <motion.div 
            className="flex-1 py-8 flex flex-col gap-3"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <div className="px-3">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-6 px-3">
                General
              </h2>
              <div className="flex flex-col gap-4">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    variants={itemVariants}
                    className="flex items-center gap-3 px-3 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 relative group"
                    whileHover={{ x: 4 }}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="absolute right-3 px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    <div className="absolute left-0 w-1 h-full bg-cyan-400 rounded-r opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sign Out Button */}
          <div className='sticky bottom-0'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="p-4 border-t border-white/10"
            >
              <form onSubmit={async (e) => {e.preventDefault(); await signOutAction();}}>
                <motion.button
                  type="submit"
                  className="flex items-center gap-3 w-full px-3 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                  whileHover={{ x: 4 }}
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </motion.button>
              </form>
            </motion.div>
          </div>

        </div>
      </nav>

    </div>
  );
}

export default Sidebar;