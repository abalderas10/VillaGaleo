import React from 'react';
import { InfoWindow } from '@react-google-maps/api';
import { PointOfInterest } from './types';
import { cn } from '../../utils/cn';

interface MapInfoWindowProps {
  point: PointOfInterest;
  onClose: () => void;
}

export function MapInfoWindow({ point, onClose }: MapInfoWindowProps) {
  return (
    <InfoWindow
      position={point.position}
      onCloseClick={onClose}
    >
      <div className={cn(
        "p-3 min-w-[200px] max-w-[300px]",
        "bg-white rounded-lg shadow-sm"
      )}>
        <h3 className="text-lg font-display font-semibold text-caribbean-900 mb-2">
          {point.name}
        </h3>
        <p className="text-sm text-caribbean-600 mb-2">
          {point.description}
        </p>
        {point.website && (
          <a
            href={point.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-caribbean-500 hover:text-caribbean-600 underline"
          >
            Visit Website
          </a>
        )}
      </div>
    </InfoWindow>
  );
}