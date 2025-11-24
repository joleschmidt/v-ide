import type { FirePermission, WaterAvailability, WildernessLevel } from "@/types/sector";

// Tactical Vocabulary (No welcoming language)
export const TACTICAL_COPY = {
  // Auth
  LOGIN: "Systemzugang",
  LOGOUT: "Trennen",
  REGISTER: "Operator registrieren",
  
  // Map
  MAP_TITLE: "Gebietssuche",
  LOADING_SECTORS: "Gebiete scannen...",
  NO_SECTORS: "Keine aktiven Gebiete",
  
  // Booking
  BOOK_NOW: "Buchen",
  CONFIRM_BOOKING: "Buchung bestätigen",
  BOOKING_SUCCESS: "Gebiet reserviert",
  
  // Waiver
  SIGN_WAIVER: "Bedingungen akzeptieren",
  WAIVER_REQUIRED: "Rechtliche Vereinbarung erforderlich",
  
  // Dashboard
  COMMAND_CENTER: "Kommandostelle",
  SECTOR_VERIFIED: "Gebiet verifiziert",
  COORDINATES_CONFIRMED: "Koordinaten bestätigt",
  
  // Status
  ACTIVE: "Aktiv",
  INACTIVE: "Offline",
  CONFIRMED: "Bestätigt",
} as const;

// Wilderness Level Labels
export const WILDERNESS_LABELS: Record<WildernessLevel, string> = {
  1: "Einfacher Zugang",
  2: "Leichter Pfad",
  3: "Mittleres Gelände",
  4: "Schwieriges Gelände",
  5: "Tiefe Wildnis",
};

// Fire Permission Labels
export const FIRE_LABELS: Record<FirePermission, string> = {
  NO_FIRE: "Kein Feuer",
  GAS_ONLY: "Nur Gas",
  FIRE_BOWL: "Feuerschale erlaubt",
  OPEN_FIRE: "Offenes Feuer erlaubt",
};

// Water Availability Labels
export const WATER_LABELS: Record<WaterAvailability, string> = {
  NONE: "Kein Wasser",
  NATURAL_SOURCE: "Natürliche Quelle",
  PROVIDED: "Wasser gestellt",
};

// Map Configuration
export const MAP_CONFIG = {
  DEFAULT_CENTER: { lat: 51.1657, lng: 10.4515 }, // Center of Germany
  DEFAULT_ZOOM: 7,
  MIN_ZOOM: 6,
  MAX_ZOOM: 18,
  FUZZY_RADIUS_KM: 2,
  
  // Google Maps Style (Dark Mode)
  DARK_STYLE_ID: "dark", // We'll need to create custom style
} as const;

// Platform Fees
export const PRICING = {
  PLATFORM_FEE_PERCENTAGE: 15, // 15% commission
  MIN_PRICE_PER_NIGHT: 10,
  MAX_PRICE_PER_NIGHT: 100,
} as const;

// Reputation Thresholds
export const REPUTATION = {
  MIN_SCORE_HIGH_LEVEL_SECTOR: 70, // Need 70+ reputation for wilderness level 4-5
  SCORE_PER_COMPLETED_TRIP: 10,
  PENALTY_PER_INCIDENT: -25,
} as const;

