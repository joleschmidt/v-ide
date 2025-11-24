import { Mail, MapPin, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#262626] py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold tracking-wide text-[#e5e5e5] mb-4">
              V<span className="inline-block">Ø</span>IDE
            </h3>
            <p className="text-[#737373] text-sm leading-relaxed mb-6">
              Legales Bushcrafting in Deutschland. Keine Infrastruktur, reine Wildnis.
            </p>
            <div className="flex items-center gap-2 text-sm text-[#4a6f4a] border border-[#4a6f4a] px-3 py-1.5 rounded inline-block">
              <span className="w-2 h-2 bg-[#4a6f4a] rounded-full animate-pulse"></span>
              127 Gebiete verfügbar
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide text-[#e5e5e5] mb-4">Kontakt</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-[#737373]">
                <Mail className="w-4 h-4 text-[#4a6f4a] mt-0.5" />
                <span>kontakt@voide.de</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-[#737373]">
                <MapPin className="w-4 h-4 text-[#4a6f4a] mt-0.5" />
                <span>
                  Berlin, Deutschland
                  <br />
                  Bundesweit verfügbar
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm text-[#737373]">
                <Clock className="w-4 h-4 text-[#4a6f4a] mt-0.5" />
                <span>Mo-Fr: 09:00 - 18:00</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide text-[#e5e5e5] mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-[#737373]">
              <li>
                <a href="#" className="hover:text-[#4a6f4a] transition-colors">
                  Nutzungsbedingungen
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#4a6f4a] transition-colors">
                  Datenschutz
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#4a6f4a] transition-colors">
                  Impressum
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#4a6f4a] transition-colors">
                  AGB
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-[#262626] text-center text-sm text-[#737373] font-mono">
          © 2025 VØIDE. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  )
}
