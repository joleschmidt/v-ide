export type UserRole = "OPERATOR" | "LANDOWNER" | "BOTH";

export interface ReputationBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  
  // Profile
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  
  // Reputation (for Operators)
  reputationScore: number;        // 0-100
  badges: ReputationBadge[];
  completedTrips: number;
  
  // Landowner Stats
  totalSectors?: number;
  totalEarnings?: number;
  
  // Status
  isVerified: boolean;
  isBanned: boolean;
  
  // Metadata
  createdAt: string;
  lastLoginAt: string;
}

