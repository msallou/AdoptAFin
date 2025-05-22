"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fish } from 'lucide-react';
import Image from 'next/image';
import { UsersAdoptedFish } from '@/lib/types';

export const AquaDexComponent = ({
    fishList,
} : {
    fishList: UsersAdoptedFish[] | null
}) => {
    const [selectedFish, setSelectedFish] = useState<UsersAdoptedFish | null>(null);
    
    const InfoRow: React.FC<{ icon: React.ReactNode; label: string; value: string | number }> = ({ icon, label, value }) => (
        <div className="flex items-center gap-3 mb-4 text-gray-200">
        {icon}
        <span className="font-semibold min-w-32">{label}:</span>
        <span>{value}</span>
        </div>
    );
    
    if (!fishList || fishList.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#023A47]">
                <div className="bg-[#034956]/50 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
                    <h1 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
                        <Fish className="w-8 h-8" />
                        AquaDex
                    </h1>
                    <h2>
                        You have no fish in your AquaDex yet. Please adopt some fish to see their details here.
                    </h2>
                    
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-[#023A47] p-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-[#034956]/50 backdrop-blur-lg rounded-3xl p-8 shadow-2xl mt-8">
                    <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
                        <Fish className="w-8 h-8" />
                        AquaDex
                    </h2>
                    
                    <div className="grid grid-cols-12 gap-8">
                        {/* Fish List */}
                        <div className="col-span-4 bg-[#045666]/30 rounded-2xl p-4 max-h-[70vh] overflow-y-auto flex flex-col gap-4">
                            <AnimatePresence>
                                {fishList.map((fish) => (
                                    <motion.div
                                        key={fish.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        onClick={() => setSelectedFish(fish)}
                                        className={`cursor-pointer rounded-xl overflow-hidden transition-all duration-300 min-h-[200px] ${
                                        selectedFish?.id === fish.id ? 'ring-2 ring-cyan-400' : ''
                                        }`}
                                    >
                                        <div className="relative group flex justify-center items-center mb-6 h-full">
                                            <Image
                                                src="/adopt/fish-card-bg.png"
                                                alt="bg"
                                                width={400}
                                                height={400}
                                                className="absolute object-cover w-full h-full rounded-xl z-0"
                                            />
                                            <Image
                                                src={fish.image} 
                                                alt={fish.fish} 
                                                width={350}
                                                height={400}
                                                className="w-full h-48 object-cover z-10 rounded-xl transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                                                <h3 className="text-xl font-bold text-white">{fish.fish}</h3>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
            
                        {/* Fish Details */}
                        <div className="col-span-8 bg-[#045666]/30 rounded-2xl p-6 max-h-[70vh] overflow-y-auto">
                            <AnimatePresence mode="wait">
                                {selectedFish ? (
                                    <motion.div
                                        key={selectedFish.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="h-full"
                                    >
                                        <div className="grid grid-cols-2 gap-8">
                                        <div>
                                            <div className='relative flex justify-center align-center mb-6 h-fit'>
                                                <Image
                                                    src="/adopt/fish-card-bg.png"
                                                    alt={'bg'}
                                                    width={350}
                                                    height={400}
                                                    className="absolute object-cover w-full h-full rounded-xl z-0"
                                                />
                                                <Image
                                                src={selectedFish.image} 
                                                alt={selectedFish.fish} 
                                                width={350}
                                                height={400}
                                                className="object-fit rounded-xl mb-6 z-10"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4 rounded-xl">
                                                </div>
                                            </div>
                                            <h3 className="text-3xl font-bold text-white mb-2">{selectedFish.fish}</h3>
                                            <p className="text-cyan-300 text-lg italic mb-6">{selectedFish.species}</p>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <InfoRow icon={<Fish className="w-4 h-4" />} label="Conservation Status" value={selectedFish.conservationStatus} />
                                            <InfoRow icon={<Fish className="w-4 h-4" />} label="Habitat" value={selectedFish.habitatRange} />
                                            <InfoRow icon={<Fish className="w-4 h-4" />} label="Diet" value={selectedFish.diet} />
                                        </div>
                                        </div>
                    
                                        <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4">
                                        <div className="bg-[#056676]/30 p-4 rounded-xl">
                                            <h4 className="text-lg font-semibold text-cyan-300 mb-3">Physical Characteristics</h4>
                                            <InfoRow icon={<Fish className="w-4 h-4" />} label="Weight" value={selectedFish.weight} />
                                            <InfoRow icon={<Fish className="w-4 h-4" />} label="Length" value={selectedFish.height} />
                                            <InfoRow icon={<Fish className="w-4 h-4" />} label="Color" value={selectedFish.color} />
                                        </div>
                    
                                        <div className="bg-[#056676]/30 p-4 rounded-xl">
                                            <h4 className="text-lg font-semibold text-cyan-300 mb-3">Behavior</h4>
                                            <InfoRow icon={<Fish className="w-4 h-4" />} label="Speed" value={selectedFish.speed} />
                                            <InfoRow icon={<Fish className="w-4 h-4" />} label="Schooling" value={selectedFish.schoolingBehavior} />
                                            <InfoRow icon={<Fish className="w-4 h-4" />} label="Lifespan" value={selectedFish.lifespan} />
                                        </div>
                    
                                        <div className="col-span-2 bg-[#056676]/30 p-4 rounded-xl">
                                            <h4 className="text-lg font-semibold text-cyan-300 mb-3">Interesting Facts</h4>
                                            <ul className="list-disc list-inside text-gray-200 space-y-2">
                                            <li>{selectedFish.fact1}</li>
                                            <li>{selectedFish.fact2}</li>
                                            <li>{selectedFish.fact3}</li>
                                            </ul>
                                        </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="h-full flex items-center justify-center text-gray-400 text-xl"
                                    >
                                        Select a fish from the list to view its details
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
    