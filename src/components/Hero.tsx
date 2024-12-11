import React, { useState, useEffect } from 'react';
import { BookingForm } from './BookingForm';

interface HeroProps {
  startDate: string;
  endDate: string;
  guests: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onGuestsChange: (guests: string) => void;
}

const images = ['/images/home1.jpg', '/images/boat1.jpg', '/images/pool1.jpg'];

export function Hero({
  startDate,
  endDate,
  guests,
  onStartDateChange,
  onEndDateChange,
  onGuestsChange,
}: HeroProps) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative h-[85vh] bg-gradient-to-b from-caribbean-500/95 to-caribbean-600/90">
      <div
        className={`absolute inset-0 bg-[url('${images[currentImage]}')] bg-cover bg-center opacity-30`}
      />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-[calc(85vh-80px)] text-white text-center px-4 space-y-6">
        <h1 className="font-display text-4xl md:text-5xl font-medium tracking-normal mb-2 max-w-xl leading-tight text-white/95">
          Your Paradise Retreat
        </h1>
        <p className="font-sans text-sm md:text-base mb-8 max-w-lg text-white/80 tracking-wider uppercase">
          Luxury Caribbean Living & Yacht Adventures
        </p>
        
        <div className="w-full max-w-3xl">
          <BookingForm
            startDate={startDate}
            endDate={endDate}
            guests={guests}
            onStartDateChange={onStartDateChange}
            onEndDateChange={onEndDateChange}
            onGuestsChange={onGuestsChange}
          />
        </div>
      </div>
    </header>
  );
}