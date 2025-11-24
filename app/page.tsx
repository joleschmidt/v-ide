import { HeroSection } from "@/components/hero-section"
import { SectorCard } from "@/components/sector-card"
import { FeaturesGrid } from "@/components/features-grid"
import { HowItWorks } from "@/components/how-it-works"
import { Statistics } from "@/components/statistics"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212]">
      <HeroSection />

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold tracking-wide text-[#e2e8f0] mb-8 border-l-2 border-[#4a7a4a] pl-4">
          Verfügbare Gebiete
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SectorCard
            title="Gebiet Alpha"
            image="/dark-dense-forest-wilderness-tactical.jpg"
            wildernessLevel={5}
            coordinates="52°31'N 13°24'E"
            price={15}
            features={["Kein Feuer", "Kein Wasser"]}
            byot={true}
          />
          <SectorCard
            title="Gebiet Bravo"
            image="/pine-forest-clearing-mountains-tactical.jpg"
            wildernessLevel={3}
            coordinates="47°16'N 11°23'E"
            price={12}
            features={["Quellwasser", "Kein Feuer"]}
            byot={true}
          />
          <SectorCard
            title="Gebiet Charlie"
            image="/remote-wilderness-canyon-survival-tactical.jpg"
            wildernessLevel={5}
            coordinates="50°05'N 8°41'E"
            price={18}
            features={["Kein Wasser", "Kein Feuer"]}
            byot={true}
          />
        </div>
      </section>

      <FeaturesGrid />
      <HowItWorks />
      <Statistics />
      <Footer />
    </main>
  )
}
