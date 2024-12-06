import React from 'react';
import { Anchor, Users, Gauge, Compass } from 'lucide-react';
import { cn } from '../utils/cn';

const BOAT_IMAGES = {
  main: "https://drive.google.com/uc?export=view&id=1ge1eh2Xek_YM-HF04knZgXzxIVw7J9ic",
  detail1: "https://drive.google.com/uc?export=view&id=1ISvd4GXz6sLdaNzIFP1GR3vYUYIHZIwz",
  detail2: "https://drive.google.com/uc?export=view&id=1w3oe5TSVyWSLZS_GweiyUPkOapvM_u2J",
  detail3: "https://drive.google.com/uc?export=view&id=1W34U6mCiswxkybf9nBXR7xb6-YSeJnh4"
};

const specs = [
  {
    icon: <Gauge className="w-6 h-6 text-caribbean-500" />,
    title: "Motor",
    description: "Outboard Engine"
  },
  {
    icon: <Users className="w-6 h-6 text-caribbean-500" />,
    title: "Capacity",
    description: "8 Passengers + Crew"
  },
  {
    icon: <Compass className="w-6 h-6 text-caribbean-500" />,
    title: "Navigation",
    description: "Full Equipment"
  },
  {
    icon: <Anchor className="w-6 h-6 text-caribbean-500" />,
    title: "Private Dock",
    description: "Direct Access"
  }
];

export function Boat() {
  return (
    <section id="boat" className="py-20 bg-gradient-to-b from-white to-caribbean-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-wave-pattern opacity-5" />
      
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-caribbean-900 mb-6">
            La Donostiarra
          </h2>
          <p className="text-lg text-caribbean-600 max-w-2xl mx-auto">
            Experience the Caribbean waters aboard our premium vessel, perfect for unforgettable adventures
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* Main Large Image */}
          <div className="lg:col-span-2 aspect-[16/9] overflow-hidden rounded-2xl shadow-lg">
            <img
              src={BOAT_IMAGES.main}
              alt="La Donostiarra Main View"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          {/* Side Images */}
          <div className="flex flex-col gap-6">
            <div className="aspect-square overflow-hidden rounded-2xl shadow-lg">
              <img
                src={BOAT_IMAGES.detail1}
                alt="La Donostiarra Detail"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl shadow-lg">
              <img
                src={BOAT_IMAGES.detail2}
                alt="La Donostiarra Interior"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specs.map((spec, index) => (
            <div 
              key={index}
              className={cn(
                "bg-white/80 backdrop-blur p-6 rounded-xl shadow-lg",
                "transform hover:-translate-y-1 transition-all duration-300",
                "group cursor-pointer border border-caribbean-100"
              )}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-caribbean-50 rounded-lg group-hover:bg-caribbean-100 transition-colors">
                  {spec.icon}
                </div>
                <h3 className="text-xl font-display font-semibold text-caribbean-900">
                  {spec.title}
                </h3>
              </div>
              <p className="text-caribbean-600">
                {spec.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-caribbean-600 max-w-3xl mx-auto">
            La Donostiarra offers the perfect blend of comfort and adventure. 
            With its reliable outboard engine, spacious deck, and experienced crew, 
            you'll explore the stunning Caribbean waters in style and safety. 
            Available for private tours, fishing trips, and sunset cruises.
          </p>
          <button className={cn(
            "mt-8 px-8 py-3 bg-caribbean-500 text-white rounded-full",
            "hover:bg-caribbean-600 transition-all duration-300",
            "font-medium shadow-lg hover:shadow-xl",
            "transform hover:-translate-y-0.5"
          )}>
            Book a Trip
          </button>
        </div>
      </div>
    </section>
  );
}