import React from 'react';
import { Calendar, Users, ChevronRight } from 'lucide-react';
import { cn } from '../utils/cn';

interface BookingFormProps {
  startDate: string;
  endDate: string;
  guests: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onGuestsChange: (guests: string) => void;
}

export function BookingForm({
  startDate,
  endDate,
  guests,
  onStartDateChange,
  onEndDateChange,
  onGuestsChange,
}: BookingFormProps) {
  return (
    <div className="bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg max-w-2xl w-full mx-4 border border-caribbean-200/30">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="flex flex-col">
          <label className="text-caribbean-800 mb-1 flex items-center gap-1 text-xs font-medium">
            <Calendar className="w-4 h-4 text-caribbean-500" />
            Check In
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className={cn(
              "w-full p-2 bg-white rounded-lg border border-caribbean-100",
              "focus:ring-2 focus:ring-caribbean-400 focus:border-transparent",
              "text-caribbean-800 placeholder-caribbean-400"
            )}
            placeholder="dd/mm/aaaa"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-caribbean-800 mb-1 flex items-center gap-1 text-xs font-medium">
            <Calendar className="w-4 h-4 text-caribbean-500" />
            Check Out
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className={cn(
              "w-full p-2 bg-white rounded-lg border border-caribbean-100",
              "focus:ring-2 focus:ring-caribbean-400 focus:border-transparent",
              "text-caribbean-800 placeholder-caribbean-400"
            )}
            placeholder="dd/mm/aaaa"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-caribbean-800 mb-1 flex items-center gap-1 text-xs font-medium">
            <Users className="w-4 h-4 text-caribbean-500" />
            Guests
          </label>
          <select
            value={guests}
            onChange={(e) => onGuestsChange(e.target.value)}
            className={cn(
              "w-full p-2 bg-white rounded-lg border border-caribbean-100",
              "focus:ring-2 focus:ring-caribbean-400 focus:border-transparent",
              "text-caribbean-800"
            )}
          >
            {[1,2,3,4,5,6,7,8].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className={cn(
            "bg-gradient-to-r from-caribbean-500 to-caribbean-600 text-white p-2 rounded-lg",
            "hover:from-caribbean-600 hover:to-caribbean-700 transition-all duration-300",
            "flex items-center justify-center gap-2",
            "font-medium shadow-lg hover:shadow-xl",
            "transform hover:-translate-y-0.5"
          )}
        >
          Check Availability
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}