"use client"

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaChevronDown, FaChevronLeft } from 'react-icons/fa';
import { FishProps } from '@/lib/types';
import CartComponent from './CartComponent';
import { FishCard } from '@/components/fish-card';
import { useCart } from '@/lib/CartContext';
import { toast } from '@/hooks/use-toast';

export const AdoptComponent = ({
  fish,
  featuredFish
}: {
  fish: FishProps[] | null;
  featuredFish: (FishProps | null)[] | null;
}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [page, setPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { items: cartItems, addToCart, removeFromCart } = useCart();

  const scrollToFish = () => {
    const fishCard = document.getElementById('fish-card');
    if (fishCard) {
      const yOffset = -200;
      const yPosition = fishCard.getBoundingClientRect().top + yOffset;
      window.scrollTo({ top: yPosition, behavior: "smooth" });
    }
  };

  const handleAddToCart = (fish: FishProps, buttonElement: HTMLButtonElement) => {
    if (fish.adopted) {
      toast({
        title: "Fish is already adopted",
        variant: "destructive",
      });
      return;
    }

    if (cartItems.some(item => item.fish === fish.fish)) {
      toast({
        title: "This fish is already in the cart",
        variant: "destructive",
      });
      return;
    }

    addToCart({
      id: fish.id,
      fish: fish.fish,
      icon: fish.image,
      price: fish.price,
    });

    buttonElement.innerHTML = "Added!";
    setTimeout(() => {
      buttonElement.innerHTML = `Add to Cart - $${fish.price}`;
    }, 1000);
  };

  const filteredFish = fish ?? [];

  return (
    <>
      <CartComponent
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
      />

      <div className="relative h-[220vh] bg-cover bg-center bg-no-repeat bg-[url('/adopt/image.png')] animate-pulse-bg">
        <div ref={containerRef} className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_40%,rgba(0,0,0,0.6)_80%)] pointer-events-none"></div>

        <div className="flex flex-col items-center justify-between h-full backdrop-blur-[4px] z-10">
          <div className="w-full h-full flex flex-col items-center justify-start">
            <div className='h-[50vh] w-full flex flex-col items-center justify-start gap-28 pt-32'>
              <div className="w-[40vw] flex flex-col items-start justify-start gap-5 drop-shadow-[0px_2px_4px_rgba(0,0,0,0.5)]">
                <motion.span className="text-7xl font-bold"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Adopt-Your-Fin
                </motion.span>
                <motion.p className="text-2xl"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  A place to find your next aquatic friend — explore, adopt, and make a splash.
                </motion.p>
              </div>
              <motion.button className='animate-bounce drop-shadow-[0px_2px_4px_rgba(0,0,0,0.5)] hover:drop-shadow-none transition-all' onClick={scrollToFish}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <FaChevronDown size={20} />
              </motion.button>
            </div>

            <div className='pt-20 pb-10 w-full flex flex-col items-center justify-center gap-40'>
              <motion.h1 className='text-4xl font-[500]'
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Our Featured Fish
              </motion.h1>
            </div>

            <div className="w-full flex items-start justify-center gap-5">
              {featuredFish && featuredFish.map((f, i) => (
                f && (
                  <FishCard
                    key={i}
                    f={f}
                    i={i}
                    inView={true}
                    handleAddToCart={handleAddToCart}
                  />
                )
              ))}
            </div>
          </div>

          <div ref={ref} className="flex flex-col h-full pt-20">
            <motion.h1
              className='text-4xl self-center font-[500]'
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              View our fish
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-start pt-10">
              {filteredFish.slice((page - 1) * 8, page * 8).map((f, i) => (
                <FishCard
                  key={f.id}
                  f={f}
                  i={i}
                  inView={inView}
                  handleAddToCart={handleAddToCart}
                />
              ))}
            </div>

            <div className="flex items-center justify-center pt-10 gap-9">
              <FaChevronLeft
                size={20}
                className={`text-white cursor-pointer hover:text-[#5bd0e4] transition-all ease-in-out duration-300 ${page === 1 ? "opacity-0 pointer-events-none" : ""}`}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              />
              <span className="text-white text-2xl">{page}</span>
              <FaChevronLeft
                size={20}
                className={`text-white rotate-180 cursor-pointer hover:text-[#5bd0e4] transition-all ease-in-out duration-300 ${(page > Math.ceil(filteredFish.length / 8) - 1) ? "opacity-0 pointer-events-none" : ""}`}
                onClick={() => setPage((prev) => prev + 1)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdoptComponent;
