"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleMap, useJsApiLoader, Marker, Circle } from "@react-google-maps/api";
import type { SectorPreview } from "@/types/sector";
import { MAP_CONFIG } from "@/lib/constants";
import { SectorPreviewCard } from "./sector-preview-card";

interface TacticalMapProps {
  sectors: SectorPreview[];
  onSectorClick?: (sectorId: string) => void;
}

const darkMapStyles = [
  { elementType: "geometry", stylers: [{ color: "#121212" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#121212" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#666666" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#a8a8a8" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#666666" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#1a1a1a" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#4a7a4a" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#2a2a2a" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1a1a1a" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#3a3a3a" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2a2a2a" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0a0a0a" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#3a5a5a" }],
  },
];

export const TacticalMap = ({ sectors, onSectorClick }: TacticalMapProps) => {
  const router = useRouter();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [hoveredSector, setHoveredSector] = useState<SectorPreview | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMarkerMouseOver = (sector: SectorPreview, event: google.maps.MapMouseEvent) => {
    setHoveredSector(sector);
    if (event.domEvent) {
      setMousePosition({ 
        x: event.domEvent.clientX, 
        y: event.domEvent.clientY 
      });
    }
  };

  const handleMarkerMouseOut = () => {
    setHoveredSector(null);
  };

  const handleMarkerClick = (sectorId: string) => {
    if (onSectorClick) {
      onSectorClick(sectorId);
    } else {
      router.push(`/sectors/${sectorId}`);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#121212]">
        <p className="font-mono text-sm text-[#666666]">
          Scanning Territory...
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={MAP_CONFIG.DEFAULT_CENTER}
        zoom={MAP_CONFIG.DEFAULT_ZOOM}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          styles: darkMapStyles,
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
          minZoom: MAP_CONFIG.MIN_ZOOM,
          maxZoom: MAP_CONFIG.MAX_ZOOM,
          gestureHandling: "greedy",
        }}
      >
        {sectors.map((sector) => (
          <div key={sector.id}>
            {/* Fuzzy Location Circle */}
            <Circle
              center={{
                lat: sector.fuzzyLocation.center.lat,
                lng: sector.fuzzyLocation.center.lng,
              }}
              radius={sector.fuzzyLocation.radiusKm * 1000}
              options={{
                fillColor: "#4a7a4a",
                fillOpacity: 0.1,
                strokeColor: "#4a7a4a",
                strokeOpacity: 0.3,
                strokeWeight: 1,
              }}
            />
            
            {/* Tactical Marker */}
            <Marker
              position={{
                lat: sector.fuzzyLocation.center.lat,
                lng: sector.fuzzyLocation.center.lng,
              }}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: "#4a7a4a",
                fillOpacity: 1,
                strokeColor: "#5a8a5a",
                strokeWeight: 2,
                scale: 8,
              }}
              onMouseOver={(e) => handleMarkerMouseOver(sector, e)}
              onMouseOut={handleMarkerMouseOut}
              onClick={() => handleMarkerClick(sector.id)}
            />
          </div>
        ))}
      </GoogleMap>

      {/* Hover Preview Card */}
      {hoveredSector && (
        <div
          className="pointer-events-none fixed z-50"
          style={{
            left: mousePosition.x + 20,
            top: mousePosition.y + 20,
          }}
        >
          <SectorPreviewCard sector={hoveredSector} />
        </div>
      )}
    </div>
  );
};

