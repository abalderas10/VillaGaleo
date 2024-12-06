export type POIType = 'hotel' | 'beach' | 'restaurant' | 'attraction';

export interface PointOfInterest {
  id: string;
  name: string;
  type: POIType;
  position: {
    lat: number;
    lng: number;
  };
  description: string;
  website?: string;
}