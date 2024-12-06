import React from 'react';
import { BookingForm } from './BookingForm';

interface HeroProps {
  startDate: string;
  endDate: string;
  guests: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onGuestsChange: (guests: string) => void;
}

export function Hero({
  startDate,
  endDate,
  guests,
  onStartDateChange,
  onEndDateChange,
  onGuestsChange,
}: HeroProps) {
  return (
    <header className="relative h-[85vh] bg-gradient-to-b from-caribbean-500/95 to-caribbean-600/90">
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f')] bg-cover bg-center opacity-30"
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