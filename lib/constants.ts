import type { FirePermission, WaterAvailability, WildernessLevel } from "@/types/sector";

// Tactical Vocabulary (No welcoming language)
export const TACTICAL_COPY = {
  // Auth
  LOGIN: "Access System",
  LOGOUT: "Disconnect",
  REGISTER: "Register Operator",
  
  // Map
  MAP_TITLE: "Sector Search",
  LOADING_SECTORS: "Scanning Territory...",
  NO_SECTORS: "No Active Sectors",
  
  // Booking
  BOOK_NOW: "Deploy",
  CONFIRM_BOOKING: "Confirm Deployment",
  BOOKING_SUCCESS: "Sector Reserved",
  
  // Waiver
  SIGN_WAIVER: "Accept Terms",
  WAIVER_REQUIRED: "Legal Agreement Required",
  
  // Dashboard
  COMMAND_CENTER: "Command Center",
  SECTOR_VERIFIED: "Sector Verified",
  COORDINATES_CONFIRMED: "Coordinates Confirmed",
  
  // Status
  ACTIVE: "Active",
  INACTIVE: "Offline",
  CONFIRMED: "Confirmed",
} as const;

// Wilderness Level Labels
export const WILDERNESS_LABELS: Record<WildernessLevel, string> = {
  1: "Easy Access",
  2: "Light Trail",
  3: "Moderate Terrain",
  4: "Rough Terrain",
  5: "Deep Woods",
};

// Fire Permission Labels
export const FIRE_LABELS: Record<FirePermission, string> = {
  NO_FIRE: "No Fire",
  GAS_ONLY: "Gas Stove Only",
  FIRE_BOWL: "Fire Bowl Permitted",
  OPEN_FIRE: "Open Fire Permitted",
};

// Water Availability Labels
export const WATER_LABELS: Record<WaterAvailability, string> = {
  NONE: "No Water",
  NATURAL_SOURCE: "Natural Source",
  PROVIDED: "Water Provided",
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

