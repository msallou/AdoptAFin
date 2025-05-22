"use client"

import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowRight, Droplet, Fish, Globe, Heart, Users, Waves, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const AboutUsComponent = () => {
  const containerRef = useRef(null);
  // const { scrollYProgress } = useScroll({
  //   target: containerRef,
  //   offset: ["start start", "end end"]
  // });

  // const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  // const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  interface Solution {
    id: number;
    title: string;
    description: string;
    image: string;
    image2: string;
    icon: JSX.Element;
    source: string;
    sourceUrl: string;
    details: string;
  }

  interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }

  const Card: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({ children, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
  
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl overflow-hidden cursor-pointer border border-cyan-500/20 shadow-lg transition-all duration-300 ${
          isHovered ? 'shadow-cyan-500/30 border-cyan-500/40' : ''
        }`}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  };
  
  const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-gradient-to-br from-[#0b1d40] to-[#163470] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-cyan-500/20"
            onClick={e => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const [selectedProblem, setSelectedProblem] = useState<number | null>(null);
  const [selectedSolution, setSelectedSolution] = useState<number | null>(null);

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

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: { 
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const problems = [
    {
      title: "Sound Pollution",
      description: "Industrial activities and shipping create harmful underwater noise that disorients marine life.",
      image: "/about/SoundPollution.png",
      details: "The natural environments of oceans have been swamped by artificial noises originating from oil exploration activities merged with sonar systems and wind farms and heavy boat activities. Arising sound pollution from these activities disrupts marine animals to a severe degree particularly among species that depend on acoustic communication for survival. The oceanic inhabitants rely heavily on sound signals to express themselves and locate food sources while they use it for ocean navigation. The continuous industrial sounds generate confusion along with stress as well as physical damage to marine life. Natural habitats gradually drive animals to leave their native territories while disrupting their fundamental biological operations which endangers whole species together with their ecosystems."
    },
    {
      title: "Trash Pollution",
      description: "Plastic pollution and debris threaten marine ecosystems and food chains.",
      image: "/about/TrashPollution.jpg",
    details: "Ocean waters keep getting piled up with plastic trash along with other waste materials. Sea pollution annually receives massive tons of garbage which disrupts marine animals' natural movements while causing damage to delicate oceanic habitats. Plastic debris deceives animals who consume it and the resulting harm leads to fatal injuries for them. Ocean waste accumulation creates toxic contamination which threatens the health of marine organisms as well as human beings in food chains. The improper management of waste combined with insufficient ocean cleaning initiatives will sustain problems which will permanently harm marine habitats.",
    },
    {
      title: "Oil Spills",
      description: "Oil spills devastate marine habitats and require years of recovery efforts.",
      image: "/about/oilspill.jpg",
      details: "The marine environment faces its greatest danger from oil spills. Oil polluting waters causes widespread harm by layering itself over plants, coastlines, and animals. Marine life suffer from toxic water and receives significant harm as thousands of species become endangered because of these pollution events, which also diminish coastal communities' economic base. Restoration from an oil spill requires multiple years, with some lasting from decades, and biodiversity destruction start to become the norm. Effective regulations, increased public awareness, and swift accessibility to emergency services serve as the best way to preserve ocean biodiversity and ecosystem integrity from oil spills."
    }
  ];

  const solutions: Solution[] = [
    {
      id: 1,
      title: "How Bubble Curtains Suppress Sound Pollution",
      description: "Advanced technology reducing underwater noise pollution by over 90%",
      image: "/about/bubbleSound.jpg",
      image2: "/about/bubbleSound3.jpg",
      icon: <Waves className="w-8 h-8" />,
      source: "BBC | How bubble curtains protect porpoises from wind farm noise",
      sourceUrl: "https://www.bbc.com/future/article/20231106-the-big-bubble-curtains-protecting-porpoises-from-wind-farm-noise",
      details: "Using bubble curtains provides an efficient method to reduce noise pollution in underwater realms from activities including pile driving and seismic surveys and offshore drilling operations. Simple perforated hoses release compressed air into the seabed which generates a continuous bubble wall that interferes and absorbs sound waves."
    },
    {
      id: 2,
      title: "How Bubble Curtains Contain Trash Pollution",
      description: "Innovative systems to contain and collect marine debris",
      image: "/about/bubbleT.png",
      image2: "/about/bubbleT2.png",
      icon: <Fish className="w-8 h-8" />,
      source: "BubbleTubing | Control of Debris",
      sourceUrl: "https://bubbletubing.com/bubble-tubings-solutions/bubble-curtain-with-bubble-tubing/control-of-plastic-debris/",
      details: "Upward water flow generated by bubble curtains provides protection to marine zones from drifting debris. Marine trash and plastic waste management programs from this method safeguard natural environments while also boosting waste collection performance. Through its operation this method develops a pollution-free environment and maintains good ocean health with no threatening structures for marine species."
    },
    {
      id: 3,
      title: "How Bubble Curtains Contain Oil Spills",
      description: "Rapid response systems to contain and manage oil spills",
      image: "/about/oilSpill1.png",
      image2: "/about/oilSpill1.png",
      icon: <Droplet className="w-8 h-8" />,
      source: "BubbleTubing | Oil Spill Management",
      sourceUrl: "https://bubbletubing.com/bubble-tubings-solutions/bubble-curtain-with-bubble-tubing/oil-spill-management/",
      details: "Bubble curtains serve as protective barriers situated around oil spills which contain the spill and facilitate easier cleanup operations. Through its protective position around oil spills Bubble curtains shield surrounding marine environments and enhance oil recovery efficiency by presenting a non-aggressive solution for managing contaminated areas."
    }
  ];



  const scrollToProblem = () => {
    const problemSection = document.getElementById("problem-section");
    if (problemSection) {
        const yOffset = -150;
        const yPosition = problemSection.getBoundingClientRect().top + yOffset;
        window.scrollTo({ top: yPosition, behavior: "smooth" })
    }
}

  return (
    
    <div className="relative w-full overflow-hidden bg-[#001F3F]">
      <div ref={containerRef} className="relative min-h-screen">
        <motion.div className="relative w-full h-full min-h-screen">
          <div className="absolute inset-0 overflow-hidden">
            <Image
                src="/about/aboutBG.png"
                alt="Underwater Scene"
                width={1920}
                height={1080}
                className="object-cover w-full h-full scale-105 transform transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-[#001F3F]/40" />
          </div>

          <motion.div className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 py-20 z-10 pb-10">
            <motion.h1
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#A4F5EB] drop-shadow-[0_0_30px_rgba(199,222,245,0.8)] mb-2"
            >
              About Adopt-a-Fin
            </motion.h1>

            <motion.p
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              className="mt-6 text-lg md:text-xl lg:text-2xl text-white max-w-3xl leading-relaxed drop-shadow-[10px_2px_8px_rgba(54,137,216,0.8)]"
            >
Adopt-A-Fin is a student organization dedicated to protecting marine life from problems such as pollution, oil spills, and dangerous sounds. Users can purchase virtual fish, track real-life fish migration patterns, learn about the fish, and support a healthier marine ecosystem—proceeds from the organization fund bubble curtains to fight these issues. 

</motion.p>

            <motion.div 
              className="mt-12 flex flex-wrap gap-6 justify-center"
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="px-10 py-4 text-xl bg-gradient-to-r from-[#273e68] to-[#16519a] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <Link href={"/donate"}>
                  Make a Difference
                </Link>
              </motion.button>
              <motion.button
                variants={buttonVariants}
                onClick={scrollToProblem}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="px-10 py-4 text-xl bg-gradient-to-r from-[#68E6FF] to-[#89EEFF] text-[#001F3F] font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(11,29,64,0.3)_80%,rgba(11,29,64,1)_100%)] opacity-100 pointer-events-none" />
        </motion.div>
      </div>

      <div ref={ref} className="relative bg-[#0b1d40] py-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto text-center mb-16 flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#A4F5EB] mb-5" id='problem-section'>
              What Are We Solving?
            </h2>
            <div className="space-y-6 text-xl text-gray-300 text-center">
              <p>
              Plastic waste, oil spills, and underwater noise are putting ocean life at risk—polluting habitats, breaking food chains, and confusing marine animals. Adopt-A-Fin works to protect sea life by educating people, raising money, and building partnerships to keep our oceans healthy for the future.
              </p>
              
            </div>
          </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 w-[80%] ml-auto mr-auto">
            {problems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-[#163470]/50 rounded-xl overflow-hidden shadow-xl `transition-all duration-300 cursor-pointer hover:scale-105`"
                onClick={() => setSelectedProblem(index)}
              >
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#A4F5EB] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-300">
                    {item.description}
                  </p>
                  <motion.button
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    className="mt-4 px-4 py-2 text-sm bg-gradient-to-r from-[#273e68] to-[#16519a] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
                    >
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          <Dialog.Root open={selectedProblem !== null} onOpenChange={() => setSelectedProblem(null)}>
            <Dialog.Portal>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-black/90 backdrop-blur-sm z-30"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
                    <Dialog.Content className="fixed left-[50%] top-[52%] z-50 max-h-[80vh] w-[90vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-[#0b1d40] p-6 shadow-lg overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="relative p-8"
                        >

                        <Dialog.Close className="absolute right-2 top-2 rounded-sm opacity-70 transition-opacity hover:opacity-100">
                        <X className="h-6 w-6 text-gray-300 z-10" />
                        </Dialog.Close>

                        {selectedProblem !== null && (
                        <div className="overflow-y max-h-[calc(85vh-1rem)] pt-2">
                            <div className="relative h-80 w-full rounded-lg overflow-hidden mb-6">
                            <Image
                                src={problems[selectedProblem].image}
                                alt={problems[selectedProblem].title}
                                width={800}
                                height={500}
                                className="w-full h-full object-cover"
                            />
                            </div>
                            <Dialog.Title className="text-3xl font-bold text-[#A4F5EB] mb-4">
                              <h1 className="leading-relaxed"> {problems[selectedProblem].title} </h1>
                            
                            </Dialog.Title>
                            <Dialog.Description className="text-gray-300 space-y-4 ">
                            <p className="text-xl leading-relaxed ">{problems[selectedProblem].details}</p>
                            </Dialog.Description>
                        </div>
                        )}
                        </motion.div>
                    </Dialog.Content>

                </motion.div>
            </Dialog.Portal>
          </Dialog.Root>


          <div className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8 }}
              className="md:text-5xl text-[#A4F5EB] text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-cyan-500 flex flex-col items-center"
            >
              Our Innovative Solutions!
              <div className="max-w-4xl space-y-6 text-xl text-gray-300 text-center font-normal mt-6">
              <p>
              Adopt-A-Fin lets people “adopt” a digital fish to help fund bubble curtain technology. These curtains cut underwater noise, trap oil spills, and push plastic away from marine habitats. Every adoption supports cleaner oceans and helps protect sea life from growing environmental threats.
              </p>
              
            </div>
            
            </motion.h2>

            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
            >
              {solutions.map((solution, index) => (
                <motion.div
                  key={solution.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <Card onClick={() => setSelectedSolution(index)}>
                    <div className="relative h-48">
                      <img
                        src={solution.image}
                        alt={solution.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-2 bg-cyan-500/20 rounded-lg">
                          {solution.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-cyan-300">{solution.title}</h3>
                      </div>
                      <p className="text-cyan-100">{solution.description}</p>
                      <button className="flex items-center gap-2 mt-4 text-cyan-300 hover:text-cyan-400 transition-colors">
                        Learn More <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-cyan-500"
                >
                  How YOU Can Contribute!
                </motion.h2>

                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl p-8 border border-cyan-500/20 shadow-lg">
                  <p className="text-xl mb-8 text-cyan-100">
                    Through Adopt-A-Fin, users login to our dashboard, giving them the ability to choose through a catalogue of digital fish and purchase them to help save ocean life.
                  </p>

                  <div className="bg-gradient-to-br from-[#163470]/70 to-[#0b1d40]/70 rounded-xl p-6 space-y-4 border border-cyan-500/10">
                    <div className="space-y-6">
                      {[
                        {
                          step: "1",
                          title: "Login & Access Dashboard",
                          description: "Sign in and navigate to your dashboard."
                        },
                        {
                          step: "2",
                          title: "Select a Fish",
                          description: "Click \"Adopt\" to view fish info and their many details."
                        },
                        {
                          step: "3",
                          title: "Choose Your Fish",
                          description: "Choose from a plethora of fish and finalize the adoption process."
                        },
                        {
                          step: "4",
                          title: "Go Look at Your Fish",
                          description: "Return to your dashboard and click on \"Aquadex\" to view your fish details."
                        },
                        {
                          step: "5",
                          title: "Track Your Fish",
                          description: "Use the map under \"Your Fish\" to monitor adopted fish in real time"
                        }
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 bg-cyan-500/10 rounded-lg">
                          <span className="flex-shrink-0 w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center font-bold text-cyan-300">
                            {item.step}
                          </span>
                          <div>
                            <h3 className="font-semibold text-cyan-300">{item.title}</h3>
                            <p className="text-cyan-100">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-cyan-500"
                >
                  Our Impact
                </motion.h2>

                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl p-8 border border-cyan-500/20 shadow-lg">
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    {[
                      { icon: Globe, number: "10+", label: "Ocean Projects" },
                      { icon: Users, number: "1k+", label: "Active Users" },
                      { icon: Heart, number: "2k+", label: "Fish Adopted" }
                    ].map((stat, index) => (
                      <div key={index} className="text-center p-4 bg-cyan-500/10 rounded-lg">
                        <stat.icon className="w-12 h-12 mx-auto mb-2 text-cyan-300" />
                        <div className="text-3xl font-bold mb-1 text-cyan-300">{stat.number}</div>
                        <div className="text-cyan-100">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        title: "Global Reach",
                        description: "Our initiatives span across multiple continents, protecting marine ecosystems worldwide through local partnerships and community engagement."
                      },
                      {
                        title: "Conservation Success",
                        description: "Through our adoption program, we've helped protect endangered species and restore damaged marine habitats across the globe."
                      },
                      {
                        title: "Education Impact",
                        description: "Our platform has educated thousands about marine conservation, inspiring the next generation of ocean advocates."
                      }
                    ].map((item, index) => (
                      <div key={index} className="p-4 bg-cyan-500/10 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2 text-cyan-300">{item.title}</h3>
                        <p className="text-cyan-100">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          isOpen={selectedProblem !== null}
          onClose={() => setSelectedProblem(null)}
        >
          {selectedProblem !== null && (
            <motion.div 
              className="p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-cyan-300">{problems[selectedProblem].title}</h2>
                <button 
                  onClick={() => setSelectedProblem(null)}
                  className="p-2 hover:bg-cyan-500/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-cyan-300" />
                </button>
              </div>
              <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                <img
                  src={problems[selectedProblem].image}
                  alt={problems[selectedProblem].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <p className="text-lg leading-relaxed text-cyan-100">
                {problems[selectedProblem].details}
              </p>
            </motion.div>
          )}
        </Modal>

        <Modal
          isOpen={selectedSolution !== null}
          onClose={() => setSelectedSolution(null)}
        >
          {selectedSolution !== null && (
            <motion.div 
              className="p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-cyan-300">{solutions[selectedSolution].title}</h2>
                <button 
                  onClick={() => setSelectedSolution(null)}
                  className="p-2 hover:bg-cyan-500/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-cyan-300" />
                </button>
              </div>
              <a
                href={solutions[selectedSolution].sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-cyan-500/20 text-cyan-300 text-sm px-4 py-2 rounded-full mb-6 hover:bg-cyan-500/30 transition-colors"
              >
                Source: {solutions[selectedSolution].source}
              </a>
              <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                <img
                  src={solutions[selectedSolution].image2}
                  alt={solutions[selectedSolution].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <p className="text-lg leading-relaxed text-cyan-100">
                {solutions[selectedSolution].details}
              </p>
            </motion.div>
          )}
        </Modal>
      </div>
    </div>
  );
};