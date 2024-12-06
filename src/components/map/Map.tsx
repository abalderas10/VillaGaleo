import React, { useState, useCallback } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { Anchor, UtensilsCrossed, Palmtree, Building2 } from 'lucide-react';
import { MapMarker } from './MapMarker';
import { MapInfoWindow } from './MapInfoWindow';
import { PointOfInterest, POIType } from './types';
import { POINTS_OF_INTEREST } from './data';
import { mapStyles } from './utils';
import { cn } from '../../utils/cn';

const ICON_MAP = {
  attraction: <Anchor className="w-6 h-6 text-caribbean-600" />,
  restaurant: <UtensilsCrossed className="w-6 h-6 text-coral-500" />,
  beach: <Palmtree className="w-6 h-6 text-sand-600" />,
  hotel: <Building2 className="w-6 h-6 text-caribbean-800" />
};

const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: mapStyles
};

export function InteractiveMap() {
  const [selectedPoint, setSelectedPoint] = useState<PointOfInterest | null>(null);
  const [activeType, setActiveType] = useState<POIType | 'all'>('all');

  const filteredPoints = POINTS_OF_INTEREST.filter(point => 
    activeType === 'all' || point.type === activeType
  );

  const handleMarkerClick = useCallback((point: PointOfInterest) => {
    setSelectedPoint(point);
  }, []);

  return (
    <div className="relative h-[600px] w-full rounded-xl overflow-hidden shadow-lg">
      <GoogleMap
        mapContainerClassName="w-full h-full"
        center={{ lat: 21.0683, lng: -86.7829 }}
        zoom={14}
        options={mapOptions}
      >
        {filteredPoints.map((point) => (
          <MapMarker
            key={point.id}
            point={point}
            onClick={handleMarkerClick}
          />
        ))}

        {selectedPoint && (
          <MapInfoWindow
            point={selectedPoint}
            onClose={() => setSelectedPoint(null)}
          />
        )}
      </GoogleMap>

      {/* Filter Controls */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveType('all')}
            className={cn(
              "px-3 py-1 rounded-full text-sm font-medium transition-colors",
              activeType === 'all'
                ? "bg-caribbean-500 text-white"
                : "bg-white text-caribbean-600 hover:bg-caribbean-50"
            )}
          >
            All
          </button>
          {(Object.keys(ICON_MAP) as POIType[]).map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={cn(
                "px-3 py-1 rounded-full text-sm font-medium transition-colors",
                "flex items-center gap-2",
                activeType === type
                  ? "bg-caribbean-500 text-white"
                  : "bg-white text-caribbean-600 hover:bg-caribbean-50"
              )}
            >
              {ICON_MAP[type]}
              <span className="capitalize">{type}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}