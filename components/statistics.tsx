export function Statistics() {
  const stats = [
    { value: "127", label: "Verfügbare Gebiete", suffix: "" },
    { value: "8", label: "Bundesländer", suffix: "" },
    { value: "100", label: "Legal & Genehmigt", suffix: "%" },
    { value: "2.4k", label: "Zufriedene Nutzer", suffix: "+" },
  ]

  return (
    <section className="bg-[#1a1a1a] border-y border-[#2a2a2a] py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold font-mono text-[#4a7a4a] mb-2">
                {stat.value}
                {stat.suffix}
              </div>
              <div className="text-sm text-[#666666] tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
