import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Anchor, UtensilsCrossed, Palmtree, Building2 } from 'lucide-react';
import { cn } from '../utils/cn';

interface Point {
  id: string;
  name: string;
  category: 'attraction' | 'restaurant' | 'beach' | 'hotel';
  position: google.maps.LatLngLiteral;
  description: string;
}

const POINTS_OF_INTEREST: Point[] = [
  {
    id: 'villagaleon',
    name: 'VillaGaleon',
    category: 'hotel',
    position: { lat: 21.0683, lng: -86.7829 },
    description: 'Your luxury gateway to Caribbean adventures'
  },
  {
    id: 'marina',
    name: 'Marina V&V',
    category: 'attraction',
    position: { lat: 21.0685, lng: -86.7825 },
    description: 'Private marina access for your yacht adventures'
  },
  {
    id: 'playa-forum',
    name: 'Playa Forum',
    category: 'beach',
    position: { lat: 21.0729, lng: -86.7712 },
    description: 'Pristine white sand beach with crystal clear waters'
  },
  {
    id: 'restaurant-puerto',
    name: 'Puerto Madero',
    category: 'restaurant',
    position: { lat: 21.0716, lng: -86.7735 },
    description: 'Fine dining with ocean views'
  }
];

const ICON_MAP = {
  attraction: <Anchor className="w-6 h-6 text-caribbean-600" />,
  restaurant: <UtensilsCrossed className="w-6 h-6 text-coral-500" />,
  beach: <Palmtree className="w-6 h-6 text-sand-600" />,
  hotel: <Building2 className="w-6 h-6 text-caribbean-800" />
};

const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#a3ccff' }]
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [{ color: '#f5f5f5' }]
    }
  ]
};

export function InteractiveMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);

  const center = { lat: 21.0683, lng: -86.7829 };

  if (!isLoaded) {
    return (
      <div className="h-[600px] w-full flex items-center justify-center bg-caribbean-50">
        <div className="text-caribbean-600">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="relative h-[600px] w-full">
      <GoogleMap
        zoom={14.5}
        center={center}
        mapContainerClassName="w-full h-full rounded-xl"
        options={mapOptions}
      >
        {POINTS_OF_INTEREST.map((point) => (
          <Marker
            key={point.id}
            position={point.position}
            onClick={() => setSelectedPoint(point)}
            icon={{
              url: `data:image/svg+xml,${encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="white"/>
                  <circle cx="12" cy="12" r="10" fill="${point.category === 'hotel' ? '#0d5f74' : 
                    point.category === 'attraction' ? '#0891ae' : 
                    point.category === 'beach' ? '#c69162' : '#ff3d2e'}"/>
                </svg>
              `)}`,
              scaledSize: new google.maps.Size(32, 32),
              anchor: new google.maps.Point(16, 16)
            }}
          />
        ))}

        {selectedPoint && (
          <InfoWindow
            position={selectedPoint.position}
            onCloseClick={() => setSelectedPoint(null)}
          >
            <div className="p-2 min-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                {ICON_MAP[selectedPoint.category]}
                <h3 className="text-lg font-display font-semibold text-caribbean-900">
                  {selectedPoint.name}
                </h3>
              </div>
              <p className="text-sm text-caribbean-600">
                {selectedPoint.description}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
        <h4 className="font-display font-semibold text-caribbean-900 mb-2">
          Points of Interest
        </h4>
        <div className="space-y-2">
          {Object.entries(ICON_MAP).map(([category, icon]) => (
            <div key={category} className="flex items-center gap-2">
              {icon}
              <span className="text-sm capitalize text-caribbean-700">
                {category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}