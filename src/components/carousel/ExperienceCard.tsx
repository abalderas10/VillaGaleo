import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../../utils/cn';

interface ExperienceCardProps {
  title: string;
  description: string;
  image: string;
  date: string;
  duration: string;
  price: string;
}

export function ExperienceCard({
  title,
  description,
  image,
  date,
  duration,
  price
}: ExperienceCardProps) {
  return (
    <div className={cn(
      "w-[350px] bg-white rounded-xl overflow-hidden shadow-lg",
      "transform transition-all duration-500",
      "hover:shadow-xl hover:-translate-y-1"
    )}>
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full">
          <span className="text-caribbean-900 font-semibold">{price}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-display font-bold text-caribbean-900 mb-2">
          {title}
        </h3>
        <p className="text-caribbean-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-caribbean-500">
            <Calendar className="w-4 h-4" />
            <span>{format(new Date(date), 'MMM d')}</span>
          </div>
          <div className="flex items-center gap-2 text-caribbean-500">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}