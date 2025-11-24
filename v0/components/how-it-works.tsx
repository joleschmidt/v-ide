import { Search, MapPin, Tent, Compass } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      number: "01",
      title: "Gebiet finden",
      description: "Durchsuche unsere Datenbank nach verfügbaren Wildnisgebieten in deiner Nähe.",
    },
    {
      icon: MapPin,
      number: "02",
      title: "Gebiet buchen",
      description: "Reserviere dein Wunschgebiet für deinen gewünschten Zeitraum online.",
    },
    {
      icon: Compass,
      number: "03",
      title: "GPS-Daten erhalten",
      description: "Erhalte detaillierte Koordinaten und Kartenmaterial per E-Mail.",
    },
    {
      icon: Tent,
      number: "04",
      title: "Wildnis erleben",
      description: "Pack deine Ausrüstung und erlebe echtes Bushcrafting in der Natur.",
    },
  ]

  return (
    <section className="bg-[#0a0a0a] py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-[#e5e5e5] text-center mb-4">
            So funktioniert's
          </h2>
          <p className="text-center text-[#737373] mb-16 max-w-2xl mx-auto">
            In vier einfachen Schritten zu deinem eigenen Wildnis-Abenteuer.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-[#171717] border border-[#262626] rounded p-6 hover:border-[#3d5a3d] transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-[#0a0a0a] border border-[#3d5a3d] rounded flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-[#4a6f4a]" />
                    </div>
                    <span className="text-4xl font-bold font-mono text-[#262626]">{step.number}</span>
                  </div>

                  <h3 className="text-lg font-semibold tracking-wide text-[#e5e5e5] mb-2">{step.title}</h3>
                  <p className="text-sm text-[#a3a3a3] leading-relaxed">{step.description}</p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#262626]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
