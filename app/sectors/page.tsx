import { TacticalMap } from "@/features/map/components/tactical-map";
import { TACTICAL_COPY } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { transformSectorPreview } from "@/lib/sectors";

export default async function SectorsPage() {
  let sectors = [];

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
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="border-b border-[#2a2a2a] bg-[#1a1a1a] px-6 py-4">
        <h1 className="font-mono text-sm font-semibold text-[#e2e8f0]">
          {TACTICAL_COPY.MAP_TITLE}
        </h1>
      </header>

      {/* Map */}
      <main className="flex-1">
        <TacticalMap sectors={sectors} />
      </main>
    </div>
  );
}

