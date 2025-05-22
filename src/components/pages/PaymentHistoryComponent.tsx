"use client";

import React from 'react';
import { CircleDollarSign, Gift, Calendar, Clock, DollarSign } from 'lucide-react';
import { PaymentHistory } from '@/lib/types';
import { motion } from 'framer-motion';

function PaymentHistoryComponent({
  paymentHistory = [],
} : {
  paymentHistory: PaymentHistory[];
}) {
  

  const totalAmountPaid = paymentHistory.reduce((total, payment) => 
    total + payment.amountPaid, 0
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-cyan-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl mt-20">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <CircleDollarSign className="w-8 h-8 text-cyan-400" />
            Your Payment History
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-cyan-700/30">
                  <th className="py-4 px-6 text-left text-cyan-300 font-semibold">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Date & Time
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left text-cyan-300 font-semibold">
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4" />
                      Type & Details
                    </div>
                  </th>
                  <th className="py-4 px-6 text-right text-cyan-300 font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.length > 0 ? (
                  paymentHistory.map((payment, index) => {
                    const fishAdopted = typeof payment.fishAdopted === 'string'
                      ? JSON.parse(payment.fishAdopted)
                      : payment.fishAdopted;

                    return (
                      <motion.tr 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="border-b border-cyan-700/30 hover:bg-cyan-500/10 transition-all duration-300 group"
                      >
                        <td className="py-4 px-6 text-cyan-100">
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {new Intl.DateTimeFormat('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              }).format(new Date(payment.purchaseDate))}
                            </span>
                            <span className="text-sm text-cyan-300 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Intl.DateTimeFormat('en-US', {
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true,
                                timeZone: 'PST'
                              }).format(new Date(payment.purchaseDate))}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-cyan-100">
                            <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                              payment.adoptedOrDonated === 'adopted' 
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-purple-500/20 text-purple-300'
                            }`}>
                              {payment.adoptedOrDonated === 'adopted' ? 'Adoption' : 'Donation'}
                            </span>
                            {payment.adoptedOrDonated === 'adopted' && fishAdopted && (
                              <div className="mt-2 space-y-1">
                                {fishAdopted.map((fish: { name: string, quantity: string, price: string }, idx: number) => (
                                  <p key={idx} className="text-sm text-cyan-300">
                                    {fish.name} × {fish.quantity} (${fish.price} each)
                                  </p>
                                ))}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <span className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                            ${payment.amountPaid}
                          </span>
                        </td>
                      </motion.tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-cyan-300">
                      No payment history available.
                    </td>
                  </tr>
                )}
                {paymentHistory.length > 0 && (
                  <tr className="border-t-2 border-cyan-500">
                    <td className="py-6 px-6" colSpan={2}>
                      <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                        <DollarSign className="w-5 h-5" />
                        Total Amount Paid
                      </div>
                    </td>
                    <td className="py-6 px-6 text-right">
                      <span className="text-2xl font-bold text-cyan-400">
                        ${totalAmountPaid.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentHistoryComponent;