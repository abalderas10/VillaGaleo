import { POIType } from './types';

export function getMarkerIcon(type: POIType): string {
  const iconColor = type === 'hotel' ? '124f62' :
                   type === 'beach' ? 'c69162' :
                   type === 'restaurant' ? 'ff3d2e' :
                   '0891ae';

  return `data:image/svg+xml,${encodeURIComponent(`
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15" r="15" fill="white"/>
      <circle cx="15" cy="15" r="12" fill="#${iconColor}"/>
    </svg>
  `)}`;
}

export const mapStyles = [
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#a3ccff' }]
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#f5f5f5' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  }
];