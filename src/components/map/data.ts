import { PointOfInterest } from './types';

export const POINTS_OF_INTEREST: PointOfInterest[] = [
  {
    id: 'villagaleon',
    name: 'VillaGaleon',
    type: 'hotel',
    position: { lat: 21.0683, lng: -86.7829 },
    description: 'Your luxury gateway to Caribbean adventures',
    website: 'https://villagaleon.com'
  },
  {
    id: 'playa-forum',
    name: 'Playa Forum',
    type: 'beach',
    position: { lat: 21.1289, lng: -86.7452 },
    description: 'Pristine white sand beach with crystal clear waters'
  },
  {
    id: 'la-habichuela',
    name: 'La Habichuela Sunset',
    type: 'restaurant',
    position: { lat: 21.1376, lng: -86.7461 },
    description: 'Fine dining with Caribbean flavors',
    website: 'https://lahabichuela.com'
  },
  {
    id: 'marina-vv',
    name: 'Marina V&V',
    type: 'attraction',
    position: { lat: 21.0685, lng: -86.7825 },
    description: 'Private marina access for yacht adventures'
  }
];