import type { Sector, SectorPreview } from "@/types/sector";
import type { Database } from "@/lib/supabase/types";

type SectorRow = Database["public"]["Tables"]["sectors"]["Row"];

/**
 * Transform Supabase sector row to Sector type
 */
export function transformSectorRow(row: SectorRow): Sector {
  return {
    id: row.id,
    landownerId: row.landowner_id,
    name: row.name,
    description: row.description,
    images: row.images || [],
    exactLocation: {
      lat: Number(row.exact_lat),
      lng: Number(row.exact_lng),
    },
    fuzzyLocation: {
      center: {
        lat: Number(row.fuzzy_lat),
        lng: Number(row.fuzzy_lng),
      },
      radiusKm: Number(row.fuzzy_radius_km),
    },
    wildernessLevel: row.wilderness_level as Sector["wildernessLevel"],
    firePermission: row.fire_permission,
    waterAvailability: row.water_availability,
    hasToilet: row.has_toilet,
    byotMandatory: row.byot_mandatory,
    maxOperators: row.max_operators,
    isActive: row.is_active,
    blockedDates: row.blocked_dates || [],
    pricePerNight: Number(row.price_per_night),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * Transform Supabase sector row to SectorPreview type
 */
export function transformSectorPreview(row: SectorRow): SectorPreview {
  return {
    id: row.id,
    name: row.name,
    wildernessLevel: row.wilderness_level as SectorPreview["wildernessLevel"],
    firePermission: row.fire_permission,
    pricePerNight: Number(row.price_per_night),
    imageUrl: row.images?.[0] || "/placeholder.jpg",
    fuzzyLocation: {
      center: {
        lat: Number(row.fuzzy_lat),
        lng: Number(row.fuzzy_lng),
      },
      radiusKm: Number(row.fuzzy_radius_km),
    },
  };
}

