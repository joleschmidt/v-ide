import { TacticalMap } from "@/features/map/components/tactical-map";
import { createClient } from "@/lib/supabase/server";
import { transformSectorPreview } from "@/lib/sectors";
import type { SectorPreview } from "@/types/sector";
import { MapWrapper } from "./map-wrapper";

export default async function SectorsPage() {
  let sectors: SectorPreview[] = [];

  // Fetch sectors from Supabase
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("sectors")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (!error && data) {
      sectors = data.map((row) => transformSectorPreview(row));
    }
  } catch (err) {
    console.warn("Failed to fetch sectors from Supabase:", err);
  }

  return (
    <MapWrapper>
      <div className="fixed inset-0 top-16" style={{ height: 'calc(100vh - 4rem)', maxHeight: 'calc(100vh - 4rem)', width: '100vw' }}>
        <div className="relative h-full w-full overflow-hidden">
          <TacticalMap sectors={sectors} />
        </div>
      </div>
    </MapWrapper>
  );
}

