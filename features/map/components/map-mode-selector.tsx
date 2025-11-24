"use client";

import { Map, Satellite, Mountain, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMapState } from "../hooks/use-map-state";

export type MapType = "roadmap" | "hybrid" | "terrain" | "dark";

const mapTypes: { type: MapType; label: string; icon: React.ReactNode }[] = [
  { type: "dark", label: "Dark", icon: <Map className="h-4 w-4" /> },
  { type: "roadmap", label: "Roadmap", icon: <Layers className="h-4 w-4" /> },
  { type: "hybrid", label: "Hybrid", icon: <Satellite className="h-4 w-4" /> },
  { type: "terrain", label: "Terrain", icon: <Mountain className="h-4 w-4" /> },
];

export const MapModeSelector = () => {
  const { mapType, setMapType } = useMapState();

  return (
    <div className="fixed top-20 right-4 z-[9999] flex gap-1 border border-[#3a5a5a] bg-[#1a1a1a] p-1" style={{ position: 'fixed', zIndex: 9999 }}>
      {mapTypes.map(({ type, label, icon }) => (
        <Button
          key={type}
          variant={mapType === type ? "default" : "ghost"}
          size="sm"
          onClick={() => setMapType(type)}
          className={`h-8 px-3 font-mono text-xs ${
            mapType === type
              ? "bg-[#4a7a4a] text-[#e2e8f0] hover:bg-[#5a8a5a]"
              : "text-[#a8a8a8] hover:bg-[#2a2a2a] hover:text-[#e2e8f0]"
          }`}
          title={label}
        >
          {icon}
          <span className="ml-1 hidden sm:inline">{label}</span>
        </Button>
      ))}
    </div>
  );
};

