import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { InteractiveMap } from './map/Map';

export function Location() {
  return (
    <section id="location" className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-shell-pattern opacity-5" />
      
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-caribbean-900 mb-6">
            Paradise Location
          </h2>
          <p className="text-lg text-caribbean-600 max-w-2xl mx-auto">
            Perfectly situated in Cancún's Hotel Zone, with private marina access and
            minutes away from the city's best attractions.
          </p>
        </div>

        <InteractiveMap />

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="bg-caribbean-50 p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-caribbean-500" />
              <h3 className="text-xl font-display font-semibold text-caribbean-900">
                Address
              </h3>
            </div>
            <p className="text-caribbean-700">
              Blvd. Kukulcán Km 7.5,
              <br />
              Zona Hotelera, 77500
              <br />
              Cancún, Q.R., México
            </p>
          </div>

          <div className="bg-caribbean-50 p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <Navigation className="w-6 h-6 text-caribbean-500" />
              <h3 className="text-xl font-display font-semibold text-caribbean-900">
                Getting Here
              </h3>
            </div>
            <ul className="text-caribbean-700 space-y-2">
              <li>• 20 minutes from Cancún International Airport</li>
              <li>• 15 minutes from downtown Cancún</li>
              <li>• Direct access to Marina V&V</li>
              <li>• 5 minutes from Forum Beach</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}