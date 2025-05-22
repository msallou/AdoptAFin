"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { loveYaFont, montserrat } from "@/lib/fonts";
import dynamic from "next/dynamic";
import { useMouse } from "@/context/MouseContext";
import { Send, Instagram, Twitter, Youtube, Fish, Heart, MessageCircle, Medal } from "lucide-react";

// Import new underwater effect components
import { BubblesBackground } from "@/components/effects/BubblesBackground";
import { UnderwaterGlow } from "@/components/effects/UnderwaterGlow";
import { FloatingElements } from "@/components/effects/FloatingElements";

const Scene = dynamic(() => import("@/components/three/Scene"), { ssr: false });

// Consistent ocean-inspired color palette
// const colors = {
//   deepBlue: "#053C5E", // Deep sea blue for backgrounds
//   midBlue: "#0D6E9A", // Mid-tone blue for sections
//   teal: "#1A9AAD", // Teal for accents and buttons
//   brightTeal: "#20E1F0", // Bright teal for highlights and focus elements
//   coral: "#FF8674", // Gentle coral for contrasting accents
//   sand: "#F9F1E6", // Light sand color for text on dark backgrounds
//   white: "#FFFFFF", // Pure white for high contrast elements
//   darkText: "#022B3A", // Very dark blue for text on light backgrounds
//   gradients: {
//     primary: "from-[#053C5E] to-[#0D6E9A]", // Primary background gradient
//     accent: "from-[#1A9AAD] to-[#20E1F0]", // Accent gradient for buttons/highlights
//     overlay: "from-[#053C5E]/80 to-[#0D6E9A]/50", // Overlay gradient for images
//   },
//   transparencies: {
//     light: "bg-white/10", // Light transparent background
//     medium: "bg-white/20", // Medium transparent background
//     dark: "bg-black/30", // Dark transparent overlay
//   }
// };

const transition = {
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.5
};

export function HomeComponent() {
  const { mouseInfo, setMouseInfo } = useMouse();
  const { y } = mouseInfo;
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  // const [currentSection, setCurrentSection] = useState("hero");
  const currentSection = "hero";


  const handleSubscribe = () => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (isValid) {
      setSubscribed(true);
      setError(false);
      setTimeout(() => setSubscribed(false), 3000);
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };
  
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const { clientY } = e;
    setMouseInfo({ y: clientY });
  }, [setMouseInfo]);

  const adoptionFeatures = [
    {
      icon: Fish,
      title: "Personal Connection",
      description: "Follow your adopted fish's journey through regular updates and tracking, creating a meaningful bond with marine life.",
      color: "from-teal-400/20 to-cyan-400/20",
      iconColor: "text-cyan-300"
    },
    {
      icon: Heart,
      title: "Direct Impact",
      description: "Your adoption directly funds protection programs, habitat restoration, and research initiatives for marine species.",
      color: "from-teal-400/20 to-cyan-400/20",
      iconColor: "text-cyan-300"
    },
    {
      icon: MessageCircle,
      title: "Learning Journey",
      description: "Receive exclusive content about your fish's species, behavior, and the challenges they face in the wild.",
      color: "from-teal-400/20 to-cyan-400/20",
      iconColor: "text-cyan-300"
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  // Added consistent button styles for reuse with underwater effects
  const PrimaryButton = ({ 
      children, 
      href, 
      className = "" 
    } : {
      children: React.ReactNode;
      href: string;
      className?: string;
  }) => (
    <motion.a
      href={href}
      className={`relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-400 to-cyan-400 text-deepBlue font-semibold rounded-full shadow-lg hover:shadow-cyan-400/20 group overflow-hidden ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <span className="group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-2 z-10">
        {children}
      </span>
    </motion.a>
  );


  return (
    <div onMouseMove={onMouseMove} className="bg-gradient-to-b from-midBlue to-deepBlue text-sand">
      {/* Background elements */}
      <Image 
        src="/landing.png"
        alt="Landing"
        width={1000}
        height={500}
        className="absolute w-full h-full -z-20 animate-blur-out blur-sm opacity-40"
      />
      <div className="absolute h-screen w-full bg-gradient-to-b from-transparent to-deepBlue/80" />
      {/* <div className="absolute w-full h-full inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent bg-[1500px_100%] animate-shimmer pointer-events-none -z-10" /> */}

      {/* Global underwater effects */}
      {/* Only show ONE set of bubbles based on current scroll section */}
        {currentSection && (
          <BubblesBackground 
            density={
              currentSection === "hero" ? 15 : 0
              // currentSection === "mission" ? 30 :
              // currentSection === "adoption" ? 20 :
              // currentSection === "newsletter" ? 8 : 10
            }
            speed={
              currentSection === "hero" ? 1 : 0
              // currentSection === "mission" ? 0.5 :
              // currentSection === "adoption" ? 0.6 :
              // currentSection === "newsletter" ? 0.4 : 1
            }
            section={currentSection}
          />
        )}


      <main className="min-h-screen flex-col relative overflow-hidden">
        {/* Hero Section */}
        <div className="w-full h-screen lg:grid lg:grid-cols-5 lg:ps-40 lg:pe-20 pb-16 pt-28 relative">
          <UnderwaterGlow />  
          <FloatingElements section="hero" />

          <div className="h-full flex flex-col justify-center gap-10 lgmax:px-20 col-span-2">
            <motion.h1
              className={`text-5xl leading-tight lgmax:text-center lgmax:px-10 ${loveYaFont.className} text-white drop-shadow-lg`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{...transition, duration: 0.4, delay: 0.1}}
            >
              Protecting <br />marine life, <br />
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent drop-shadow-md">
                one fin at a <br /> time
              </span>
            </motion.h1>
            
            <motion.p 
              className={`text-xl ps-8 ${loveYaFont.className} text-cyan-100 drop-shadow-md`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{...transition, duration: 0.3, delay: 0.4}}
            >
              Explore how you can save <br /> sealife by adopting fish
            </motion.p>
            
            <motion.span 
              className={`flex w-full justify-start gap-5 pt-4 ${montserrat.className}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{duration: 0.3, delay: 0.7}}
            >
              <motion.button 
                className="group flex text-white text-lg font-bold rounded-full hover:scale-105 transition-all duration-300 drop-shadow-lg"
              >
                <motion.a href="/about">
                  <span className="relative">
                    <span className="absolute w-full h-full bg-cyan-400/30 left-0 top-0 rounded-full animate-ping-small -z-10" />
                    <span className="bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full flex justify-center items-center shadow-lg shadow-cyan-500/20 text-deepBlue px-5 py-3 relative overflow-hidden">
                      Learn More
                    </span>
                  </span>
                </motion.a>
              </motion.button>
              
              <motion.a 
                className="group flex text-white text-lg font-bold hover:scale-105 transition-all duration-300 drop-shadow-lg relative overflow-hidden"
                href="/adopt"
                // onMouseEnter={addRippleEffect}
              >
                <span className="bg-deepBlue/80 border border-cyan-500/30 px-5 py-3 rounded-full flex justify-center items-center shadow-md text-cyan-300">
                  Adopt
                </span>
              </motion.a>
            </motion.span>
          </div>

          <div className="col-span-3 w-full h-full flex justify-center">
            <div className="w-full h-full">
              <div 
                className="w-full h-full drop-shadow-2xl transition-all duration-1000"
                style={{
                  translate: `0 ${(y-500)/10}px`,
                }}
              >
                <Scene y={y} />
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="min-h-screen bg-gradient-to-b from-midBlue to-deepBlue flex items-center justify-center py-20 relative overflow-hidden">
          <UnderwaterGlow />
          <FloatingElements section="mission" />

          <motion.div 
            className="absolute inset-0 opacity-15"
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1551244072-5d12893278ab"
              alt="Ocean Background"
              width={1000}
              height={500}
              className="w-full h-full object-cover blur-sm"
            />
          </motion.div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="lg:grid lg:grid-cols-2 lg:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Image
                  src="https://images.unsplash.com/photo-1544551763-46a013bb70d5"
                  alt="Ocean Life"
                  width={1000}
                  height={500}
                  className="w-full h-[600px] object-cover rounded-2xl shadow-2xl mb-10 lg:mb-0 hover:scale-105 transition-transform duration-500"
                />
                
                <motion.div
                  className="absolute bottom-6 right-6 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-2xl px-8 py-4 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <p className="text-deepBlue text-4xl font-bold font-montserrat">15+</p>
                  <p className="text-deepBlue font-montserrat">Years Protecting Oceans</p>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="lg:pl-8"
              >
                <h2 className={`text-4xl lg:text-5xl font-bold mb-8 ${loveYaFont.className} bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent`}>
                  Our Mission
                </h2>
                
                <p className="text-xl mb-6 text-cyan-100">
                  We&apos;re dedicated to protecting the world&apos;s oceans through education, conservation, and direct action. Our mission is to ensure the health and sustainability of marine ecosystems for generations to come.
                </p>

                <ul className="space-y-4 mb-8">
                  {[
                    "Protecting endangered marine species through research and advocacy",
                    "Restoring damaged coral reefs and critical ocean habitats",
                    "Educating communities about sustainable ocean practices",
                    "Fighting plastic pollution and industrial waste in our waters"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <span className="bg-gradient-to-r from-teal-400 to-cyan-400 p-1 rounded-full mr-3 mt-1">
                        <Medal size={16} className="text-deepBlue" />
                      </span>
                      <span className="text-cyan-100">{item}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <PrimaryButton href="/about">
                  Learn About Our Work <Medal size={16} />
                </PrimaryButton>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Adoption Section */}
        <div className="min-h-screen bg-gradient-to-b from-midBlue to-deepBlue py-20 relative overflow-hidden">
          <UnderwaterGlow />
          <FloatingElements section="adoption" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${loveYaFont.className} bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent`}>
                Adopt a Fish
              </h2>
              <p className="text-xl max-w-3xl mx-auto text-cyan-100">
                Make a personal connection with marine life by adopting a fish. Your contribution helps protect their habitat and funds critical conservation work.
              </p>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            >
              {adoptionFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`bg-gradient-to-br ${feature.color} backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/10 hover:shadow-cyan-400/10 hover:scale-105 transition-all duration-300`}
                >
                  <div className={`p-4 rounded-full bg-gradient-to-r from-teal-400/30 to-cyan-400/30 w-16 h-16 flex items-center justify-center mb-6 ${feature.iconColor}`}>
                    <feature.icon size={32} />
                  </div>
                  <h3 className={`text-2xl font-bold mb-4 text-white ${loveYaFont.className}`}>{feature.title}</h3>
                  <p className="text-cyan-100">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <div className="text-center">
              <PrimaryButton href="/adopt" className="mx-auto">
                Adopt Now <Fish size={18} />
              </PrimaryButton>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="min-h-screen bg-gradient-to-b from-midBlue to-deepBlue flex items-center py-20 relative overflow-hidden">
          <FloatingElements section="newsletter" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-12 lg:mb-0"
              >
                <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${loveYaFont.className} bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent`}>
                  Stay Connected
                </h2>
                <p className="text-xl mb-8 text-cyan-100">
                  Sign up for our newsletter to get updates on our conservation efforts, upcoming events, and ways you can help protect marine life.
                </p>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold mb-4 text-white">Follow Our Journey</h3>
                  <div className="flex space-x-4">
                    {[
                      { icon: Instagram, href: "#" },
                      { icon: Twitter, href: "#" },
                      { icon: Youtube, href: "#" }
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        className="w-12 h-12 bg-deepBlue/80 rounded-full flex items-center justify-center text-cyan-300 hover:text-white hover:bg-gradient-to-r hover:from-teal-400 hover:to-cyan-400 transition-all duration-300"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                      >
                        <social.icon size={24} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-teal-400/10 to-cyan-400/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/10"
              >
                <h3 className={`text-2xl font-bold mb-6 text-white ${loveYaFont.className}`}>Join Our Newsletter</h3>
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="w-full px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                    />
                  </div>
                  
                  <button
                    onClick={handleSubscribe}
                    className="w-full bg-gradient-to-r from-teal-400 to-cyan-400 text-deepBlue font-semibold rounded-full px-6 py-3 hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-300 flex items-center justify-center space-x-2 relative overflow-hidden"
                  >
                    <span>Subscribe</span>
                    <Send size={18} />
                  </button>
                  
                  {subscribed && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-green-400 text-center"
                    >
                      Thank you for subscribing!
                    </motion.p>
                  )}
                  
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-center"
                    >
                      Please enter a valid email address.
                    </motion.p>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-deepBlue/80 backdrop-blur-md border-t border-white/10 py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className={`text-xl font-bold mb-4 text-white ${loveYaFont.className}`}>Oceanic</h3>
              <p className="text-cyan-100 mb-6">
                Protecting marine life, one fin at a time.
              </p>
            </div>
            
            {[
              {
                title: "About",
                links: ["Our Mission", "Team", "Partners", "Impact Report"]
              },
              {
                title: "Get Involved",
                links: ["Adopt a Fish", "Volunteer", "Donate", "Corporate Partners"]
              },
              {
                title: "Resources",
                links: ["Blog", "Research", "Educational Materials", "Contact Us"]
              }
            ].map((column, index) => (
              <div key={index}>
                <h3 className={`text-xl font-bold mb-4 text-white ${loveYaFont.className}`}>{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-cyan-100 hover:text-cyan-300 transition-colors duration-300">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
            <p className="text-cyan-100 mb-4 md:mb-0">
              © 2025 Adopt-a-Fin. All rights reserved.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-cyan-100 hover:text-cyan-300 transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-cyan-100 hover:text-cyan-300 transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-cyan-100 hover:text-cyan-300 transition-colors duration-300">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}