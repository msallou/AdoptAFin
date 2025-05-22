"use client";

import React, { useState, useEffect } from 'react';
import { CreditCard, ArrowLeft } from 'lucide-react';
import { CheckoutProps, CartItem, GroupedCartItem, CheckoutFormData } from '@/lib/types';
import { adoptFish } from '@/DB-Access/adoptFish';

const CheckoutComponent: React.FC<CheckoutProps> = ({ onBack }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const groupedItems = cartItems.reduce<GroupedCartItem[]>((acc, item) => {
    const existingItem = acc.find(i => i.fish === item.fish);
    if (existingItem) {
      existingItem.quantity += 1;
      return acc;
    }
    return [...acc, { ...item, quantity: 1 }];
  }, []);

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  // Added formatting functions
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ').substr(0, 19) : cleaned;
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  // Added validation function
  const validateCard = () => {
    const newErrors: {[key: string]: string} = {};
    
    // Simple 16-digit card number validation
    const cardNumberClean = formData.cardNumber.replace(/\D/g, '');
    if (!cardNumberClean || cardNumberClean.length !== 16) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Expiry validation (MM/YY format)
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(formData.expiryDate)) {
      newErrors.expiryDate = "Use MM/YY format";
    } else {
      const [month, year] = formData.expiryDate.split('/');
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (expiry < today) {
        newErrors.expiryDate = "Card has expired";
      }
    }

    // CVV validation (3-4 digits)
    if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "CVV must be 3-4 digits";
    }

    // Shipping info validation
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name";
    }
    
    if (!formData.address.trim()) {
      newErrors.address = "Please enter your address";
    }
    
    if (!formData.city.trim()) {
      newErrors.city = "Please enter your city";
    }
    
    if (!formData.state.trim()) {
      newErrors.state = "Please enter your state";
    }
    
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "Please enter your ZIP code";
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = "Please enter a valid ZIP code";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let formattedValue = value;
    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    }
    if (name === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    }
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4); // Changed to allow 4 digits like in the first component
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCard()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate processing
    setTimeout(() => {
      localStorage.removeItem('cartItems');
      adoptFish(groupedItems).catch(err => console.error(err));
      setIsSubmitting(false);
      onBack();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c4a6e] via-[#0369a1] to-[#0c4a6e] text-white relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
      </div>

      <div className="relative z-10 max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className="flex items-center text-cyan-300 hover:text-white mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Fish Adoption
        </button>

        <div
          className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-cyan-200/20"
        >
          <h1 className="text-3xl font-bold text-white mb-8">Complete Your Purchase</h1>

          {/* Order Summary */}
          <div className="mb-10 border-b border-white/20 pb-8">
            <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>
            <div className="space-y-4">
              {groupedItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-cyan-100/10 p-4 rounded-xl">
                  <div className="flex items-center space-x-4">
                    {/* @ts-ignore */}
                    <img src={item.icon} alt={item.fish} className="w-16 h-16 rounded-lg object-cover shadow-sm" />
                    <span className="font-medium text-white">
                      {item.fish} {item.quantity > 1 && `(${item.quantity})`}
                    </span>
                  </div>
                  <span className="text-cyan-300 font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-6 font-semibold text-lg">
                <span className="text-white">Total</span>
                <span className="text-cyan-300">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Shipping Info */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-6">Shipping Information</h2>
                {[['name', 'Full Name'], ['email', 'Email'], ['address', 'Address'], ['city', 'City'], ['state', 'State'], ['zipCode', 'ZIP Code']].map(([field, label]) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-cyan-100 mb-2">{label}</label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      name={field}
                      value={formData[field as keyof CheckoutFormData]}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 bg-white/20 border ${errors[field] ? 'border-red-400' : 'border-cyan-200/20'} text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                    />
                    {errors[field] && <p className="text-red-400 text-sm mt-1">{errors[field]}</p>}
                  </div>
                ))}
              </div>

              {/* Payment Info */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-6">Payment Information</h2>
                <div>
                  <label className="block text-sm font-medium text-cyan-100 mb-2">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 pl-12 bg-white/20 border ${errors.cardNumber ? 'border-red-400' : 'border-cyan-200/20'} text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                    />
                    <CreditCard className="absolute left-4 top-3.5 h-5 w-5 text-cyan-100" />
                    {errors.cardNumber && <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-cyan-100 mb-2">Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      required
                      className={`w-full px-4 py-3 bg-white/20 border ${errors.expiryDate ? 'border-red-400' : 'border-cyan-200/20'} text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                    />
                    {errors.expiryDate && <p className="text-red-400 text-sm mt-1">{errors.expiryDate}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cyan-100 mb-2">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 bg-white/20 border ${errors.cvv ? 'border-red-400' : 'border-cyan-200/20'} text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                    />
                    {errors.cvv && <p className="text-red-400 text-sm mt-1">{errors.cvv}</p>}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full mt-8 bg-gradient-to-r from-cyan-500 to-cyan-700 text-white py-4 px-6 rounded-xl hover:from-cyan-600 hover:to-cyan-800 font-semibold text-lg shadow-lg hover:shadow-xl ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                  Processing...
                </div>
              ) : (
                `Complete Purchase - $${total.toFixed(2)}`
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutComponent;
export { CheckoutComponent };