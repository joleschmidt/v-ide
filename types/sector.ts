export type WildernessLevel = 1 | 2 | 3 | 4 | 5;

export type FirePermission = 
  | "NO_FIRE" 
  | "GAS_ONLY" 
  | "FIRE_BOWL" 
  | "OPEN_FIRE";

export type WaterAvailability = 
  | "NONE" 
  | "NATURAL_SOURCE" 
  | "PROVIDED";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface FuzzyLocation {
  center: Coordinates;
  radiusKm: number; // Default 2km for public view
}

export interface Sector {
  id: string;
  landownerId: string;
  
  // Display Info
  name: string;
  description: string;
  images: string[];
  
  // Location
  exactLocation: Coordinates;     // Only visible after booking
  fuzzyLocation: FuzzyLocation;   // Public view
  
  // Characteristics
  wildernessLevel: WildernessLevel;
  firePermission: FirePermission;
  waterAvailability: WaterAvailability;
  
  // Amenities
  hasToilet: boolean;
  byotMandatory: boolean;         // Auto-set if hasToilet = false
  maxOperators: number;           // Usually 1-4
  
  // Status
  isActive: boolean;
  blockedDates: string[];         // ISO date strings
  
  // Pricing
  pricePerNight: number;          // EUR
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}

export interface SectorPreview {
  id: string;
  name: string;
  wildernessLevel: WildernessLevel;
  firePermission: FirePermission;
  pricePerNight: number;
  imageUrl: string;
  fuzzyLocation: FuzzyLocation;
}

