import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ExperienceCard } from './ExperienceCard';
import { cn } from '../../utils/cn';

const EXPERIENCES = [
  {
    id: 1,
    title: "Sunset Yacht Experience",
    description: "Sail into the sunset aboard La Donostiarra with champagne and gourmet appetizers",
    image: "https://images.unsplash.com/photo-1514649923863-ceaf75b7ec40?auto=format&fit=crop&w=800&q=80",
    date: "2024-04-15",
    duration: "3 hours",
    price: "$299"
  },
  {
    id: 2,
    title: "Mayan Ruins Adventure",
    description: "Explore ancient Mayan ruins with our expert archaeologist guide",
    image: "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=800&q=80",
    date: "2024-04-16",
    duration: "6 hours",
    price: "$189"
  },
  {
    id: 3,
    title: "Caribbean Snorkeling",
    description: "Discover vibrant coral reefs and tropical marine life",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    date: "2024-04-17",
    duration: "4 hours",
    price: "$129"
  },
  {
    id: 4,
    title: "Luxury Spa Day",
    description: "Indulge in a day of relaxation with our signature spa treatments",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80",
    date: "2024-04-18",
    duration: "5 hours",
    price: "$249"
  }
];

export function InfiniteCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Duplicate items for infinite scroll effect
  const duplicatedExperiences = [...EXPERIENCES, ...EXPERIENCES];

  const scroll = useCallback(() => {
    if (!scrollRef.current || isPaused) return;
    
    const container = scrollRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    if (scrollPosition >= maxScroll / 2) {
      setScrollPosition(0);
      container.scrollTo({ left: 0 });
    } else {
      setScrollPosition(prev => prev + 1);
      container.scrollTo({ left: scrollPosition });
    }
  }, [isPaused, scrollPosition]);

  useEffect(() => {
    const intervalId = setInterval(scroll, 50);
    return () => clearInterval(intervalId);
  }, [scroll]);

  return (
    <section className="py-20 bg-gradient-to-b from-caribbean-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-shell-pattern opacity-5" />
      
      <div className="max-w-7xl mx-auto px-4 relative">
        <h2 className="text-4xl font-display font-bold text-center mb-16 text-caribbean-900">
          Featured Experiences
        </h2>
        
        <div className="relative"
          onMouseEnter={() => {
            setIsPaused(true);
          }}
          onMouseLeave={() => {
            setIsPaused(false);
          }}
        >
          <div
            ref={scrollRef}
            className="flex overflow-x-auto pb-8 px-8 space-x-8 scrollbar-hide scroll-smooth"
          >
            {duplicatedExperiences.map((experience, index) => (
              <div key={`${experience.id}-${index}`} className="flex-shrink-0">
                <ExperienceCard {...experience} />
              </div>
            ))}
          </div>
          
          <div className="absolute left-0 top-0 bottom-8 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-8 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}