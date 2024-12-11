import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Anchor, Ship, Waves, MapPin, Trees, Home } from 'lucide-react';
import { cn } from '../utils/cn';

const features = [
  {
    icon: <Anchor className="w-8 h-8 text-caribbean-500" />,
    title: "Private Marina Access",
    description: "Exclusive dock access for your yacht adventures in the Caribbean waters",
    image: "/images/features/private-marina.jpg"
  },
  {
    icon: <Ship className="w-8 h-8 text-caribbean-500" />,
    title: "Adventure Boat",
    description: "Fully equipped yacht for unforgettable marine experiences and exploration",
    image: "/images/features/adventure-boat.jpg"
  },
  {
    icon: <Waves className="w-8 h-8 text-caribbean-500" />,
    title: "Private Pools",
    description: "Multiple pools with breathtaking ocean views and luxury amenities",
    image: "/images/features/private-pools.jpg"
  },
  {
    icon: <MapPin className="w-8 h-8 text-caribbean-500" />,
    title: "Prime Location",
    description: "Situated in an exclusive area with easy access to Cancún's best attractions",
    image: "/images/features/prime-location.jpg"
  },
  {
    icon: <Trees className="w-8 h-8 text-caribbean-500" />,
    title: "Cozy Garden",
    description: "Beautifully maintained tropical gardens creating a peaceful paradise",
    image: "/images/features/cozy-garden.jpg"
  },
  {
    icon: <Home className="w-8 h-8 text-caribbean-500" />,
    title: "Comfortable Living",
    description: "Spacious rooms with modern amenities and luxurious furnishings",
    image: "/images/features/comfortable-living.jpg"
  }
];

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
}

function Feature({ icon, title, description, image }: FeatureProps) {
  return (
    <div className="text-center flex-shrink-0 w-80 transform hover:scale-105 transition-transform duration-300 px-6 group">
      <div className="bg-caribbean-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-caribbean-200 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-display font-semibold mb-4 text-caribbean-800">{title}</h3>
      <p className="text-caribbean-600">{description}</p>
    </div>
  );
}

export function Features() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const duplicatedFeatures = [...features, ...features];

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
    <section id="experience" className="py-20 bg-gradient-to-b from-white to-caribbean-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-shell-pattern opacity-5"></div>
      <div className="max-w-full mx-auto relative">
        <h2 className="text-4xl font-display font-bold text-center mb-16 text-caribbean-900">
          Experience Luxury & Adventure
        </h2>
        <div 
          className="relative"
          onMouseEnter={() => {
            setIsPaused(true);
          }}
          onMouseLeave={() => {
            setIsPaused(false);
          }}
        >
          <div
            ref={scrollRef}
            className="flex overflow-x-auto pb-8 px-8 space-x-12 scrollbar-hide scroll-smooth"
          >
            {duplicatedFeatures.map((feature, index) => (
              <div key={index} className="transform transition-transform duration-500">
                <Feature
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  image={feature.image}
                />
              </div>
            ))}
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}