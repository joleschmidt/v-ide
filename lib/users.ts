import type { Database } from "@/lib/supabase/types";
import type { User, UserRole } from "@/types/user";

type UserRow = Database["public"]["Tables"]["users"]["Row"];

export function transformUserRow(row: UserRow): User {
  return {
    id: row.id,
    email: row.email,
    role: row.role as UserRole,
    displayName: row.display_name,
    avatarUrl: row.avatar_url || undefined,
    bio: row.bio || undefined,
    reputationScore: row.reputation_score || 0,
    badges: [], // Will be fetched separately if needed
    completedTrips: row.completed_trips || 0,
    totalSectors: row.total_sectors || undefined,
    totalEarnings: row.total_earnings ? Number(row.total_earnings) : undefined,
    isVerified: row.is_verified || false,
    isBanned: row.is_banned || false,
    createdAt: row.created_at || new Date().toISOString(),
    lastLoginAt: row.last_login_at || new Date().toISOString(),
  };
}

