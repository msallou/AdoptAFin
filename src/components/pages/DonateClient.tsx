"use client";
import React, { useState, useEffect } from 'react';
import { Fish, Waves, Heart, Sparkles, Anchor, Shell } from 'lucide-react';
import { registerDonation } from '@/db-access/registerDonation';

function App() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [donationPicked, setDonationPicked] = useState(false);
  const [paymentProcessed, setPaymentProcessed] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [bubbles, setBubbles] = useState<Array<{ id: number; left: number; duration: number }>>([]);
  const [swimmingFish, setSwimmingFish] = useState<Array<{ id: number; top: number; direction: 'left' | 'right'; delay: number; size: number }>>([]);

  const presetAmounts = [5, 10, 25, 50, 100];

  const validateCard = () => {
    const newErrors: {[key: string]: string} = {};
    
    // Simple 16-digit card number validation
    const cardNumberClean = cardNumber.replace(/\D/g, '');
    if (!cardNumberClean || cardNumberClean.length !== 16) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    // Name validation
    if (!cardName.trim()) {
      newErrors.cardName = "Please enter the cardholder's name";
    }

    // Expiry validation (MM/YY format)
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(cardExpiry)) {
      newErrors.cardExpiry = "Use MM/YY format";
    } else {
      const [month, year] = cardExpiry.split('/');
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (expiry < today) {
        newErrors.cardExpiry = "Card has expired";
      }
    }

    // CVV validation (3-4 digits)
    if (!/^\d{3,4}$/.test(cardCVV)) {
      newErrors.cardCVV = "CVV must be 3-4 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    const num = parseInt(rawValue);
    setAmount(isNaN(num) ? "" : new Intl.NumberFormat().format(num));
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ').substr(0, 19) : cleaned;
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const createBubble = () => {
    const newBubble = {
      id: Date.now(),
      left: Math.random() * 100,
      duration: 3 + Math.random() * 4
    };
    setBubbles(prev => [...prev, newBubble]);
    setTimeout(() => {
      setBubbles(prev => prev.filter(b => b.id !== newBubble.id));
    }, newBubble.duration * 1000);
  };

  const createSwimmingFish = () => {
    const direction: 'left' | 'right' = Math.random() > 0.5 ? 'left' : 'right';
    const newFish = {
      id: Date.now(),
      top: 20 + Math.random() * 60,
      direction,
      delay: Math.random() * 2,
      size: 12 + Math.random() * 24
    };
    setSwimmingFish(prev => [...prev, newFish]);
    setTimeout(() => {
      setSwimmingFish(prev => prev.filter(f => f.id !== newFish.id));
    }, 20000);
  };

  useEffect(() => {
    for (let i = 0; i < 3; i++) {
      createSwimmingFish();
    }
    
    const bubbleInterval = setInterval(createBubble, 2000);
    const fishInterval = setInterval(createSwimmingFish, 5000);
    
    return () => {
      clearInterval(bubbleInterval);
      clearInterval(fishInterval);
    };
  }, []);

  const handlePayment = () => {
    if (!validateCard()) {
      return;
    }
    
    setIsSubmitting(true);
    setPaymentProcessed(true);
    
    setTimeout(() => {
      setCardNumber("");
      setCardName("");
      setCardExpiry("");
      setCardCVV("");
      setMessage(`Thank you for your generous donation of $${amount}! 🐋`);
      setDonationPicked(false);
      setPaymentProcessed(false);
      setIsSubmitting(false);
      setAmount("");
      
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }, 2000);

    registerDonation(parseInt(amount.replace(/,/g, "")))
  };

  const handleDonate = () => {
    const raw = parseInt(amount.replace(/,/g, ""));
    if (raw > 0) {
      setDonationPicked(true);
    } else {
      setMessage("Please enter a valid amount 🐠");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handlePresetAmount = (preset: number) => {
    setAmount(new Intl.NumberFormat().format(preset));
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#001F3F]">
      {/* Swimming Fish */}
      {swimmingFish.map(fish => (
        <div
          key={fish.id}
          className={`absolute pointer-events-none ${
            fish.direction === 'left' ? 'animate-swim-left' : 'animate-swim-right'
          }`}
          style={{
            top: `${fish.top}%`,
            left: fish.direction === 'left' ? '100%' : '-10%',
            animationDelay: `${fish.delay}s`,
            transform: `scale(${fish.size / 16})`,
            opacity: 0.8
          }}
        >
          <div className="animate-wiggle">
            <Fish 
              className={`w-8 h-8 ${
                fish.direction === 'left' ? 'scale-x-[-1]' : ''
              } text-cyan-300 drop-shadow-glow transition-colors duration-300`} 
            />
          </div>
        </div>
      ))}

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-10 top-1/4 animate-float-slow">
          <Shell className="w-16 h-16 text-cyan-300/40" />
        </div>
        <div className="absolute left-20 top-1/3 animate-sway-slow">
          <Anchor className="w-20 h-20 text-cyan-300/30" />
        </div>
        <div className="absolute left-8 bottom-1/4 animate-float-slow" style={{ animationDelay: '-2s' }}>
          <Fish className="w-14 h-14 text-cyan-300/40 scale-x-[-1]" />
        </div>
        <div className="absolute right-12 top-1/3 animate-float-slow" style={{ animationDelay: '-3s' }}>
          <Shell className="w-18 h-18 text-cyan-300/40" />
        </div>
        <div className="absolute right-24 top-1/2 animate-sway-slow" style={{ animationDelay: '-1s' }}>
          <Anchor className="w-16 h-16 text-cyan-300/30" />
        </div>
        <div className="absolute right-10 bottom-1/3 animate-float-slow" style={{ animationDelay: '-4s' }}>
          <Fish className="w-16 h-16 text-cyan-300/40" />
        </div>
      </div>

      {/* Bubbles */}
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="absolute bottom-0 rounded-full bg-white/20 w-4 h-4 blur-sm"
          style={{
            left: `${bubble.left}%`,
            animation: `rise ${bubble.duration}s ease-in forwards`
          }}
        />
      ))}

      <div className="absolute inset-0 shimmer pointer-events-none" />

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-10">
        {!donationPicked && (
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-3xl max-w-md w-full p-8 text-white space-y-8 animate-fadeIn">
            <div className="flex justify-center">
              <div className="relative animate-float-slow mt-6">
                <Fish className="w-16 h-16 text-cyan-300 drop-shadow-glow animate-wiggle" />
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-pulse" />
              </div>
            </div>

            <div className="space-y-4 text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Save Our Oceans
              </h1>
              <p className="text-white/80">
                Your donation helps protect marine life and preserve ocean ecosystems for future generations.
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-5 gap-2">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handlePresetAmount(preset)}
                    className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors border border-white/10 text-white font-medium hover:scale-105 transform duration-200"
                  >
                    ${preset}
                  </button>
                ))}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <span className="text-white/70 text-lg">$</span>
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  value={amount}
                  onChange={handleInputChange}
                  className="w-full pl-8 pr-4 py-4 rounded-2xl text-xl text-white bg-white/10 placeholder-white/50 outline-none focus:ring-4 focus:ring-cyan-400/30 transition-all duration-300 backdrop-blur-md border border-white/10"
                  placeholder="Enter amount"
                />
              </div>

              <button
                onClick={handleDonate}
                disabled={isSubmitting}
                className={`group w-full relative overflow-hidden bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg hover:scale-[1.02] transform ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? 'Processing...' : <>Proceed to Payment</>}
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-blue-400 to-cyan-400 transition-transform duration-300" />
              </button>
            </div>
          </div>
        )}

        {donationPicked && (
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-3xl max-w-md w-full p-8 text-white space-y-8 animate-slideIn">
            <div className="flex justify-center">
              <div className="relative animate-float-slow mt-6">
                <Fish className="w-16 h-16 text-cyan-300 drop-shadow-glow animate-wiggle" />
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-pulse" />
              </div>
            </div>

            <div className="space-y-4 text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Complete Your Donation
              </h1>
              <p className="text-white/80">
                Amount: ${amount}
              </p>
            </div>

            <div className="space-y-6">
              <div className="relative flex flex-col gap-4">
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    maxLength={19}
                    className={`w-full pl-8 pr-4 py-3 rounded-2xl text-lg text-white bg-white/10 placeholder-white/50 outline-none focus:ring-4 focus:ring-cyan-400/30 transition-all duration-300 backdrop-blur-md border ${errors.cardNumber ? 'border-red-400' : 'border-white/10'}`}
                    placeholder="Card Number"
                  />
                  {errors.cardNumber && <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className={`w-full pl-8 pr-4 py-3 rounded-2xl text-lg text-white bg-white/10 placeholder-white/50 outline-none focus:ring-4 focus:ring-cyan-400/30 transition-all duration-300 backdrop-blur-md border ${errors.cardName ? 'border-red-400' : 'border-white/10'}`}
                    placeholder="Name on Card"
                  />
                  {errors.cardName && <p className="text-red-400 text-sm mt-1">{errors.cardName}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                      maxLength={5}
                      className={`w-full pl-8 pr-4 py-3 rounded-2xl text-lg text-white bg-white/10 placeholder-white/50 outline-none focus:ring-4 focus:ring-cyan-400/30 transition-all duration-300 backdrop-blur-md border ${errors.cardExpiry ? 'border-red-400' : 'border-white/10'}`}
                      placeholder="MM/YY"
                    />
                    {errors.cardExpiry && <p className="text-red-400 text-sm mt-1">{errors.cardExpiry}</p>}
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      value={cardCVV}
                      onChange={(e) => setCardCVV(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      maxLength={4}
                      className={`w-full pl-8 pr-4 py-3 rounded-2xl text-lg text-white bg-white/10 placeholder-white/50 outline-none focus:ring-4 focus:ring-cyan-400/30 transition-all duration-300 backdrop-blur-md border ${errors.cardCVV ? 'border-red-400' : 'border-white/10'}`}
                      placeholder="CVV"
                    />
                    {errors.cardCVV && <p className="text-red-400 text-sm mt-1">{errors.cardCVV}</p>}
                  </div>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={isSubmitting}
                className={`group w-full relative overflow-hidden bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg hover:scale-[1.02] transform ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {paymentProcessed ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                      Processing...
                    </div>
                  ) : (
                    <>Donate Now <Heart className="w-5 h-5 group-hover:animate-beat" /></>
                  )}
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-blue-400 to-cyan-400 transition-transform duration-300" />
              </button>
            </div>
          </div>
        )}

        {message && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-lg shadow-2xl rounded-2xl px-8 py-4 text-2xl animate-messagePopup">
            <p className="flex items-center gap-2">{message}</p>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <Waves className="w-full h-24 text-white/5" />
      </div>
    </div>
  );
}

export default App;