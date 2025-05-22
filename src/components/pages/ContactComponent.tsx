"use client"

import { Mail, Phone, MapPin, Send, Anchor, Shell, Fish, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "\"As a marine biologist, partnering with this initiative has opened my eyes to the incredible impact community-driven conservation can have on our oceans.\" - Dr. Peter Girguis",
    role: "Marine Biologist, Harvard University",
    year: "2024",
    image: "/contact/peter_girguis.jpeg" // Add image path here
  },
  {
    quote: "\"The dedication to marine conservation here is inspiring. Every day, we're making real progress in protecting these amazing creatures.\" - Abed S.",
    role: "University of Washington, Seattle",
    year: "2024",
    image: "/contact/20250402_193237.jpg" // Add image path here
  },
  {
    quote: "\"The passion and commitment I've witnessed in this community gives me hope for the future of our oceans.\" - Kavini R",
    role: "University of Alabama & Cascadia Professor",
    year: "2024",
    image: "/contact/kavini.jpg" // Add image path here
  }
];
const partnerships = [
  {
    name: "NOAA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/79/NOAA_logo.svg",
    description: "National Oceanic and Atmospheric Administration",
     url: "https://www.noaa.gov/"
  },
  {
    name: "FishBase",
    logo: "/contact/fishbase.png",
    description: "Global Species Database of Fish Species",
    url: "https://fishbase.se/search.php"
  }
];

// Rest of the imports and partnerships remain the same...

export const ContactComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const contactSectionRef = useRef<HTMLDivElement | null>(null);
  const [isHighlighted, setIsHighlighted] = useState(false);

  interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = `mailto:contact@adoptafin.org?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`;
  };

  const scrollToContact = () => {
    if (contactSectionRef.current) {
      contactSectionRef.current.scrollIntoView({
        behavior: 'smooth', 
        block: 'start' 
      });
      
      // Highlight the contact section briefly
      setIsHighlighted(true);
      setTimeout(() => setIsHighlighted(false), 1500);
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#2b3e50] via-[#0e2836] to-[#0c4a6e] bg-opacity-5 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden bg-[#0e243f]">
        <div className="absolute w-full h-full bg-[url('https://images.unsplash.com/photo-1551244072-5d12893278ab?w=1920&q=80')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-[#001f3f]/80  z-0" />
      </div>

      {/* Animated Background Elements - same as original */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* More Fish, Anchors, and Shells */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute left-10 top-1/4"
        >
          <Shell className="w-16 h-16 text-cyan-300/20" />
        </motion.div>
        {/* Other animated elements remain the same... */}
      </div>

      <div className="min-h-screen z-20 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
         
          {/* Team Section */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-4xl md:text-5xl text-white mb-4 drop-shadow-[0px_4px_4px_rgba(0,0,0,0.5)] font-[500]"
            >
              Voices of Our Advocates
            </motion.h1>
          </div>

          {/* Testimonials Grid - MODIFIED to include images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 * index }}
                className="bg-[#1c4d6b] rounded-2xl p-8 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)] backdrop-blur-sm bg-opacity-50"
              >
                <div className="h-full flex flex-col">
                  {/* Add image here */}
                  <div className="mb-4 mx-auto">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#17cc9c]">
                      <Image
                        src={testimonial.image}
                        alt={"author image"}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <p className="text-[#fafafa] italic mb-4">{testimonial.quote}</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-[#17cc9c]">
                      {testimonial.role}, {testimonial.year}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8 md:w-2/3 mx-auto">
              {testimonials.slice(3).map((testimonial, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 * index + 0.6 }}
                  key={index + 3}
                  className="bg-[#1c4d6b] rounded-2xl p-8 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)] backdrop-blur-sm bg-opacity-50"
                >
                  <div className="h-full flex flex-col">
                    {/* Add image here */}
                    <div className="mb-4 mx-auto">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#17cc9c]">
                        <Image
                          src={testimonial.image}
                          alt={"author image"}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <p className="text-[#fafafa] italic mb-4">&quot;{testimonial.quote}&quot;</p>
                    </div>
                    <div className="mt-4">
                      <p className="text-[#17cc9c]">
                        {testimonial.role}, {testimonial.year}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>


         {/* Partnerships Section */}
<div className="mb-20 z-20">
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.4 }}
    className="text-4xl text-white mb-8 text-center font-[400] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.5)]"
  >
    Our Partnerships
  </motion.h2>
  <div className="grid md:grid-cols-2 gap-8">
    {partnerships.map((partner, index) => (
      <motion.a
        key={index}
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        initial="hidden"
        animate="visible"
        variants={fadeInUpVariants}
        transition={{ duration: 0.3, delay: 0.2 * index }}
        className="bg-[#2d73c3] rounded-2xl p-8 shadow-lg backdrop-blur-sm bg-opacity-30 hover:bg-opacity-40 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/20 group"
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 relative flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Image
              src={partner.logo}
              alt={partner.name}
              className="w-full h-full object-contain drop-shadow-md"
              width={96}
              height={96}
            />
          </div>
          <div className="flex-grow">
            <h3 className="text-2xl text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">{partner.name}</h3>
            <p className="text-[#fafafa] group-hover:text-white transition-colors duration-300">{partner.description}</p>
            <div className="mt-3 flex items-center text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="mr-1">Visit website</span>
              <ChevronRight size={16} />
            </div>
          </div>
        </div>
      </motion.a>
    ))}
  </div>
</div>

          {/* Volunteer Section */}
 <motion.div 
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }} // Use `amount` instead of margin
  variants={{
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }}
  className="mb-32"
>
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
    <div className="order-2 lg:order-1">
      <motion.h1 
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
        }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 "
      >
        Want the opportunity to volunteer at Adopt-A-Fin
      </motion.h1>
      <motion.p 
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
        }}
        className="text-lg text-cyan-100 mb-8"
      >
        We are a dedicated organization focused on marine conservation and protection. Join our mission to safeguard ocean life and create sustainable marine ecosystems for future generations.
      </motion.p>
      <motion.button
        onClick={scrollToContact}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center px-8 py-4 bg-cyan-500 text-white rounded-full text-lg font-semibold hover:bg-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        Volunteer now!
        <ChevronRight className="ml-2 h-6 w-6" />
      </motion.button>
    </div>
    <motion.div 
      className="order-1 lg:order-2 relative"
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } }
      }}
    >
      <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
        <Image
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop"
          alt="Marine Conservation Volunteer"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
    </motion.div>
  </div>
</motion.div>    
          
          {/* Contact Section - Enhanced with animation and a ref for scrolling */}
          <motion.div 
            ref={contactSectionRef}
            className={`rounded-2xl p-6 transition-all duration-500 ${isHighlighted ? 'ring-4 ring-cyan-400 shadow-lg shadow-cyan-400/50' : ''}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            id="contact"
          >
            <div className="text-center mb-16 z-10">
              <motion.h2 
                className="text-4xl md:text-5xl text-[#0FF0FC] font-[500] mb-4 drop-shadow-[0px_0px_4px_#0FF0FC]"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Get in Touch
              </motion.h2>
              <motion.p 
                className="text-[#fafafa] text-lg max-w-2xl mx-auto relative"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Have questions about marine life conservation or want to learn more about our adoption program? We&apos;d love to hear from you!
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div 
                className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 drop-shadow-[0px_0px_10px_#0ff0fc30] hover:drop-shadow-[0px_0px_20px_rgba(15,240,252,0.6)] transition-all duration-300 ease-in-out"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-white mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#17cc9c] transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#17cc9c] transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-white mb-2">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#17cc9c] transition-all"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-white mb-2">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#17cc9c] transition-all"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#17cc9c] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#14b589] transition-all duration-200 ease-in-out shadow-lg hover:shadow-xl"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Send Message
                      <Send size={20} />
                    </span>
                  </motion.button>
                </form>
              </motion.div>

              <motion.div 
                className="space-y-8"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div 
                  className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 drop-shadow-[0px_0px_10px_#0ff0fc30] hover:drop-shadow-[0px_0px_20px_rgba(15,240,252,0.6)] transition-all duration-300 ease-in-out"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-2xl text-white font-bold mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    <motion.div 
                      className="flex items-center gap-4"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="bg-cyan-500/20 p-3 rounded-full">
                        <Mail className="text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Email</p>
                        <a href="mailto:contact@adoptafin.org" className="text-cyan-300 hover:text-cyan-400 transition-colors">
                          contact@adoptafin.org
                        </a>
                      </div>
                    </motion.div>
                    <motion.div 
                      className="flex items-center gap-4"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="bg-cyan-500/20 p-3 rounded-full">
                        <Phone className="text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Phone</p>
                        <a href="tel:+14253548582" className="text-cyan-300 hover:text-cyan-400 transition-colors">
                          +1 (425)-354-8582
                        </a>
                      </div>
                    </motion.div>
                    <motion.div 
                      className="flex items-center gap-4"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="bg-cyan-500/20 p-3 rounded-full">
                        <MapPin className="text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Location</p>
                        <p className="text-[#fafafa]">4430 Strumme Rd, Bothell, 98012
                          <br />Washington</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 drop-shadow-[0px_0px_10px_#0ff0fc30] hover:drop-shadow-[0px_0px_20px_rgba(15,240,252,0.6)] transition-all duration-300 ease-in-out"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-2xl text-white font-bold mb-4">Office Hours</h3>
                  <div className="space-y-2">
                    <p className="text-cyan-300">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-cyan-300">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="text-cyan-300">Sunday: Closed</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      </div>
    </>
  );
}

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};