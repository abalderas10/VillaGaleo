import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sailboat, 
  Phone, 
  Mail, 
  MapPin, 
  Settings
} from 'lucide-react';
import { cn } from '../utils/cn';

const contactInfo = [
  { icon: Phone, text: '+52 (998) 123-4567', href: 'tel:+529981234567' },
  { icon: Mail, text: 'info@villagaleon.com', href: 'mailto:info@villagaleon.com' },
  { icon: MapPin, text: 'Blvd. Kukulcán Km 7.5, Zona Hotelera', href: '#location' }
];

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-caribbean-900 to-caribbean-950 text-white py-8">
      <div className="absolute inset-0 bg-shell-pattern opacity-[0.02]" />
      
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 group">
              <Sailboat className="w-8 h-8 text-caribbean-300 transform group-hover:-translate-y-1 transition-transform duration-300" />
              <div>
                <span className="block text-xl font-display font-semibold group-hover:text-caribbean-200 transition-colors">
                  VillaGaleon
                </span>
                <span className="text-sm text-caribbean-300">
                  Luxury Caribbean Living
                </span>
              </div>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-6">
              {contactInfo.map((info) => (
                <a
                  key={info.text}
                  href={info.href}
                  className="flex items-center gap-2 text-caribbean-300 hover:text-caribbean-200 
                           transition-colors text-sm"
                >
                  <info.icon className="w-4 h-4" />
                  <span>{info.text}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-caribbean-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <Link 
              to="/admin" 
              className="text-caribbean-800 hover:text-caribbean-700 transition-colors"
              title="Admin Access"
            >
              <Settings className="w-3.5 h-3.5" />
            </Link>
            <p className="text-caribbean-400 text-sm">
              © {new Date().getFullYear()} VillaGaleon. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}