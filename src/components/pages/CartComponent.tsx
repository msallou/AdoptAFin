"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/CartContext'; // adjust path if needed
import Image from 'next/image';

export const CartComponent = ({
  isCartOpen,
  setIsCartOpen,
}: {
  isCartOpen: boolean;
  setIsCartOpen: (val: boolean) => void;
}) => {
  const router = useRouter();
  const {
    items: cartItems,
    removeFromCart,
    totalItems
  } = useCart();

  const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
  const [viewingCart, setViewingCart] = useState(false);

  useEffect(() => {
    if (isCartOpen) setViewingCart(true);
  }, [isCartOpen]);

  const handleCheckout = () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    router.push('/adopt/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 right-8 bg-[#111111] rounded-2xl p-6 shadow-2xl border border-[#43d9ff]/20 w-96 z-50"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-medium">Cart Preview</h3>
            <button 
              onClick={() => {
                setIsCartOpen(false);
                setViewingCart(false);
              }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-400 text-center py-4">Your cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3 w-[90%] mx-auto bg-[#222222] rounded-lg p-3 shadow-md border border-[#43d9ff]/20"
                >
                  <Image
                    src={item.icon} // assuming `icon` is the URL like "/fish/picture.png"
                    alt={item.fish}
                    width={50}
                    height={50}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-white text-sm">{item.fish}</p>
                    <p className="text-[#43d9ff] text-sm">
                      ${item.price?.toFixed(2)}
                    </p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              ))
            )}
          </div>
          
          <div className="border-t border-gray-800 pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400">Total</span>
              <span className="text-white font-medium">${total.toFixed(2)}</span>
            </div>
            <button 
              className="block w-full py-3 bg-[#43d9ff] hover:bg-[#3bc8eb] text-white rounded-xl transition-all duration-300 text-sm font-medium text-center"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </motion.div>
      )}

      {/* Floating Cart Button */}
      {!viewingCart && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-8 right-8 bg-[#43d9ff] text-white p-4 rounded-full
                  shadow-lg shadow-[#4CAF50]/20 hover:shadow-[#4CAF50]/30
                  transition-all duration-300 z-40"
        >
          <ShoppingCart onClick={() => setViewingCart(true)} className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-[#4CAF50]
                          rounded-full w-6 h-6 flex items-center justify-center
                          text-sm font-medium">
              {totalItems}
            </span>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default CartComponent;
