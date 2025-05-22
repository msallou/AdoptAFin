"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Fish, Anchor, Shell, Users, DollarSign, Target, ArrowRight } from 'lucide-react';
import MiniMapComponent from './MiniMapComponent';
import { PaymentHistory } from '@/lib/types';
import Link from 'next/link';

export const DashboardComponent = ({
  paymentHistory = [],
  fishAdopted = 0,
  amountDonated = 0
} : {
  paymentHistory: PaymentHistory[]
  fishAdopted: number
  amountDonated: number
  
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const targetDonation = 1000;


  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0c4a6e] via-[#0369a1] to-[#0c4a6e] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [-10, 10, -10]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute right-20 top-1/3"
        >
          <Anchor className="w-20 h-20 text-cyan-300/20" />
        </motion.div>
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute left-1/4 bottom-1/4"
        >
          <Fish className="w-24 h-24 text-cyan-300/20" />
        </motion.div>
        <motion.div
          animate={{
            x: [-30, 30, -30],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 14, repeat: Infinity }}
          className="absolute left-2/3 top-1/3"
        >
          <Fish className="w-20 h-20 text-cyan-300/30" />
        </motion.div>
        <motion.div
          animate={{
            y: [0, -40, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 9, repeat: Infinity }}
          className="absolute right-1/4 top-20"
        >
          <Shell className="w-12 h-12 text-cyan-300/30" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to Your Dashboard</h1>
          <p className="text-cyan-100 text-lg">Track your impact and manage your aquatic friends</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Fish Adopted Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-cyan-200/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-100 text-sm">Fish Adopted</p>
                <h3 className="text-3xl font-bold text-white">{fishAdopted}</h3>
              </div>
              <Users className="w-10 h-10 text-cyan-300" />
            </div>
          </motion.div>

          {/* Amount Donated Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-cyan-200/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-100 text-sm">Amount Donated</p>
                <h3 className="text-3xl font-bold text-white">${amountDonated}</h3>
              </div>
              <DollarSign className="w-10 h-10 text-cyan-300" />
            </div>
          </motion.div>

          {/* Donation Goal Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-cyan-200/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-cyan-100 text-sm">Donation Goal</p>
                <h3 className="text-3xl font-bold text-white">${targetDonation}</h3>
              </div>
              <Target className="w-10 h-10 text-cyan-300" />
            </div>
            <div className="w-full bg-cyan-900/50 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((amountDonated ?? 0) / targetDonation) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="bg-cyan-400 h-2 rounded-full"
              />
            </div>
          </motion.div>
        </div>

        <div className="flex justify-between items-stretch w-full">
          {/* Left Side (Did You Know?) */}
          <div className="flex flex-col gap-8 w-[49%]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-cyan-200/20 flex-grow"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Did You Know?</h2>
              <p className="text-cyan-100">
                Clownfish form a symbiotic relationship with sea anemones, using them for protection and shelter while helping to protect the anemone from predators.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-cyan-200/20 flex-grow"
            >
              <div className="flex justify-center">
                <div className='flex items-center gap-4 mb-4 w-full'>
                  <h2 className="text-2xl font-bold text-white">Map Preview</h2>
                  <Link
                    href="/dashboard/my-fish" 
                    className="group flex items-center gap-2 px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
                  >
                    View your full interactive map
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
              {/* <div className="w-full h-[40vh] border-2 overflow-hidden"> */}
                <MiniMapComponent />
              {/* </div> */}
            </motion.div>
          </div>

          {/* Right Side (Payment History) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-cyan-200/20 w-[49%]"
          >
              <h2 className="text-2xl font-bold text-white mb-4">Your Payment History</h2>
            <div className='max-h-[60vh] overflow-y-auto'>
              {paymentHistory.length > 0 ? (
                <>
                <ul className="space-y-4">
                  {paymentHistory.map((payment, index) => {
                    // Parse fishAdopted if it's a string
                    const fishAdopted = typeof payment.fishAdopted === 'string'
                      ? JSON.parse(payment.fishAdopted)
                      : payment.fishAdopted;

                    return (
                      <li key={index} className="flex items-center justify-between bg-cyan-900/50 rounded-lg p-4">
                        <div>
                          <p className="text-cyan-100">
                            Date: {new Intl.DateTimeFormat('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true,
                              timeZone: 'PST'
                            }).format(new Date(payment.purchaseDate))}
                          </p>
                          <p className="text-cyan-200">
                            {payment.adoptedOrDonated === "adopted" ? "Adopted Fish:" : "Donated"}
                          </p>
                          {payment.adoptedOrDonated === "adopted" && (
                            <div>
                              {fishAdopted.map((fish: { name: string; quantity: number; price: number }, idx: number) => (
                                <p key={idx} className="text-cyan-200">
                                  - {fish.name} (x{fish.quantity}, ${fish.price} each)
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                        <p className="text-white text-xl">${payment.amountPaid}</p>
                      </li>
                    );
                  })}
                </ul>
                  </>
              ) : (
                <p className="text-cyan-100">No payment history available.</p>
              )}
            </div>
            {paymentHistory.length > 0 && (
                  <div className="mt-8 flex justify-center">
                    <Link
                      href="/dashboard/payment-history" 
                      className="group flex items-center gap-2 px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
                    >
                      View your full payment history
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
              )}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
