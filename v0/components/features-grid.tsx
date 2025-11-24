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
    <section className="bg-[#171717] border-y border-[#262626] py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-[#e5e5e5] text-center mb-12">
          Was dich erwartet
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#0a0a0a] border border-[#262626] rounded p-6 hover:border-[#3d5a3d] transition-all group"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="w-12 h-12 bg-[#171717] border border-[#262626] rounded flex items-center justify-center group-hover:border-[#3d5a3d] transition-colors">
                  <feature.icon className="w-6 h-6 text-[#a3a3a3]" />
                </div>
                <span className="text-xs font-medium tracking-wide text-[#4a6f4a] font-mono border border-[#4a6f4a] px-2 py-1 rounded">
                  {feature.highlight}
                </span>
              </div>

              <h3 className="text-xl font-semibold tracking-wide text-[#e5e5e5] mb-3">{feature.title}</h3>

              <p className="text-[#a3a3a3] leading-relaxed text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
