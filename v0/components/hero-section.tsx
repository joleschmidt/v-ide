import { SearchBar } from "./search-bar"

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Topographic Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23e5e5e5' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-6xl md:text-8xl font-bold tracking-wide text-[#e5e5e5] leading-tight text-balance">
            Betritt die V<span className="inline-block">Ø</span>IDE.
          </h1>

          <p className="text-xl md:text-2xl tracking-wide text-[#a3a3a3] font-light">
            Legales Bushcrafting. Keine Infrastruktur. Reine Wildnis.
          </p>

          <div className="pt-8">
            <SearchBar />
          </div>

          <div className="flex justify-center gap-8 pt-8 font-mono text-sm text-[#737373]">
            <div className="border border-[#262626] px-4 py-2 rounded">
              <span className="text-[#4a6f4a]">●</span> 127 Gebiete verfügbar
            </div>
            <div className="border border-[#262626] px-4 py-2 rounded">
              <span className="text-[#4a6f4a]">●</span> 100% Legal
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
