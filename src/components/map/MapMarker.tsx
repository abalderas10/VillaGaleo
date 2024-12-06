import React from 'react';
import { Marker } from '@react-google-maps/api';
import { POIType, PointOfInterest } from './types';
import { getMarkerIcon } from './utils';

interface MapMarkerProps {
  point: PointOfInterest;
  onClick: (point: PointOfInterest) => void;
}

export function MapMarker({ point, onClick }: MapMarkerProps) {
  return (
    <Marker
      position={{ lat: point.position.lat, lng: point.position.lng }}
      icon={{
        url: getMarkerIcon(point.type),
        scaledSize: new google.maps.Size(30, 30)
      }}
      onClick={() => onClick(point)}
      title={point.name}
    />
  );
}