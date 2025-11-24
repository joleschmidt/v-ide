import { HeroSection } from "@/components/hero-section"
import { SectorCard } from "@/components/sector-card"
import { FeaturesGrid } from "@/components/features-grid"
import { HowItWorks } from "@/components/how-it-works"
import { Statistics } from "@/components/statistics"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { WATER_LABELS, FIRE_LABELS } from "@/lib/constants"

function formatCoordinates(lat: number, lng: number): string {
  const latDir = lat >= 0 ? 'N' : 'S'
  const lngDir = lng >= 0 ? 'E' : 'W'
  const latDeg = Math.abs(Math.floor(lat))
  const latMin = Math.abs(Math.floor((lat % 1) * 60))
  const lngDeg = Math.abs(Math.floor(lng))
  const lngMin = Math.abs(Math.floor((lng % 1) * 60))
  return `${latDeg}°${latMin}'${latDir} ${lngDeg}°${lngMin}'${lngDir}`
}

export default async function Home() {
  let sectors: any[] = []

  // Fetch sectors from Supabase
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("sectors")
      .select("id, name, images, fuzzy_lat, fuzzy_lng, wilderness_level, fire_permission, water_availability, price_per_night, has_toilet")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(6) // Show 6 on homepage

    if (!error && data) {
      sectors = data
    }
  } catch (err) {
    console.warn("Failed to fetch sectors from Supabase:", err)
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <HeroSection />

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold tracking-wide text-[#e5e5e5] mb-8 border-l-2 border-[#3d5a3d] pl-4">
          Verfügbare Gebiete
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {sectors.length > 0 ? (
            sectors.map((sector) => {
              const features: string[] = []

              // Add fire permission features
              if (sector.fire_permission === "NO_FIRE") {
                features.push("Kein Feuer")
              }

              // Add water availability features
              if (sector.water_availability === "NONE") {
                features.push("Kein Wasser")
              } else if (sector.water_availability === "NATURAL_SOURCE") {
                features.push("Quellwasser")
              }

              return (
                <SectorCard
                  key={sector.id}
                  id={sector.id}
                  title={sector.name}
                  image={sector.images?.[0] || "/placeholder.jpg"}
                  wildernessLevel={sector.wilderness_level}
                  coordinates={formatCoordinates(
                    Number(sector.fuzzy_lat),
                    Number(sector.fuzzy_lng)
                  )}
                  price={Number(sector.price_per_night)}
                  features={features}
                  byot={!sector.has_toilet}
                />
              )
            })
          ) : (
            // Fallback if no sectors found
            <>
              <SectorCard
                id="1"
                title="Gebiet Alpha"
                image="/dark-dense-forest-wilderness-tactical.jpg"
                wildernessLevel={5}
                coordinates="52°31'N 13°24'E"
                price={15}
                features={["Kein Feuer", "Kein Wasser"]}
                byot={true}
              />
            </>
          )}
        </div>
      </section>

      <FeaturesGrid />
      <HowItWorks />
      <Statistics />
      <Footer />
    </main>
  )
}
