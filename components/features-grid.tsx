import { Shield, Skull, Map } from "lucide-react"

export function FeaturesGrid() {
  const features = [
    {
      icon: Shield,
      title: "Legale Flächen",
      description: "Alle Gebiete mit Gestattungsvertrag. Vollständig genehmigtes Bushcrafting auf Privatgelände.",
      highlight: "Geprüft",
    },
    {
      icon: Skull,
      title: "Keine Infrastruktur",
      description: "Keine Annehmlichkeiten. Kein Komfort. Du bringst alles mit. Echte Wildnis.",
      highlight: "Pur",
    },
    {
      icon: Map,
      title: "Detaillierte Karten",
      description: "Hochauflösende Satellitenbilder. GPS-Koordinaten. Geländeanalyse inklusive.",
      highlight: "Präzise",
    },
  ]

  return (
    <section className="bg-[#1a1a1a] border-y border-[#2a2a2a] py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-[#e2e8f0] text-center mb-12">
          Was dich erwartet
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#121212] border border-[#2a2a2a] rounded-md p-6 hover:border-[#4a7a4a] transition-all group"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="w-12 h-12 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md flex items-center justify-center group-hover:border-[#3a5a3a] transition-colors">
                  <feature.icon className="w-6 h-6 text-[#a8a8a8]" />
                </div>
                <span className="text-xs font-medium tracking-wide text-[#4a7a4a] font-mono border border-[#4a7a4a] px-2 py-1 rounded-md">
                  {feature.highlight}
                </span>
              </div>

              <h3 className="text-xl font-semibold tracking-wide text-[#e2e8f0] mb-3">{feature.title}</h3>

              <p className="text-[#a8a8a8] leading-relaxed text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
