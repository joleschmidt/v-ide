export type BookingStatus = 
  | "PENDING_WAIVER"
  | "PENDING_PAYMENT"
  | "CONFIRMED"
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELLED";

export interface WaiverSignature {
  operatorId: string;
  signedAt: string;
  ipAddress: string;
  acceptedTerms: {
    liabilityAccepted: boolean;
    leaveNoTraceAccepted: boolean;
    byotAccepted: boolean;          // Only if required
  };
}

export interface Booking {
  id: string;
  
  // Parties
  operatorId: string;
  landownerId: string;
  sectorId: string;
  
  // Dates
  checkInDate: string;              // ISO date
  checkOutDate: string;             // ISO date (always +1 day for one-night)
  
  // Legal
  waiverSignature?: WaiverSignature;
  byotRequired: boolean;
  
  // Payment
  totalAmount: number;              // EUR
  platformFee: number;              // EUR
  landownerPayout: number;          // EUR
  stripePaymentIntentId?: string;
  
  // Status
  status: BookingStatus;
  
  // Coordinates (revealed after payment)
  exactCoordinatesRevealed: boolean;
  
  // Post-Trip
  operatorRating?: number;          // 1-5
  landownerRating?: number;         // 1-5
  incidentReported: boolean;
  incidentDetails?: string;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}

