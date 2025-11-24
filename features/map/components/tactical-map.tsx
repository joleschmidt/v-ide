"use client";

import { useCallback, useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GoogleMap, useJsApiLoader, Marker, Circle } from "@react-google-maps/api";
import type { SectorPreview } from "@/types/sector";
import { MAP_CONFIG } from "@/lib/constants";
import { SectorPreviewCard } from "./sector-preview-card";
import { MapFilters } from "./map-filters";
import { MapModeSelector } from "./map-mode-selector";
import { useMapState } from "../hooks/use-map-state";
import { getMarkerIcon, getCircleOptions } from "../utils/markers";

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
  const { filters, mapType } = useMapState();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [hoveredSector, setHoveredSector] = useState<SectorPreview | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Filter sectors based on active filters
  const filteredSectors = useMemo(() => {
    return sectors.filter((sector) => {
      // Wilderness level filter
      if (filters.wildernessLevel && filters.wildernessLevel.length > 0) {
        if (!filters.wildernessLevel.includes(sector.wildernessLevel)) {
          return false;
        }
      }

      // Fire permission filter
      if (filters.firePermission && filters.firePermission.length > 0) {
        if (!filters.firePermission.includes(sector.firePermission)) {
          return false;
        }
      }

      // Water availability filter
      if (filters.waterAvailability && filters.waterAvailability.length > 0) {
        if (!filters.waterAvailability.includes(sector.waterAvailability)) {
          return false;
        }
      }

      // Price range filter
      if (filters.priceRange) {
        const [minPrice, maxPrice] = filters.priceRange;
        if (sector.pricePerNight < minPrice || sector.pricePerNight > maxPrice) {
          return false;
        }
      }

      return true;
    });
  }, [sectors, filters]);

  // Update map type when it changes
  useEffect(() => {
    if (map) {
      let mapTypeId: google.maps.MapTypeId;
      if (mapType === "dark") {
        mapTypeId = google.maps.MapTypeId.ROADMAP;
      } else if (mapType === "hybrid") {
        mapTypeId = google.maps.MapTypeId.HYBRID;
      } else {
        mapTypeId = mapType as google.maps.MapTypeId;
      }
      map.setMapTypeId(mapTypeId);

      // Apply dark styles only for dark mode
      if (mapType === "dark") {
        map.setOptions({ styles: darkMapStyles });
      } else {
        map.setOptions({ styles: [] });
      }
    }
  }, [map, mapType]);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMarkerMouseOver = (sector: SectorPreview, event: google.maps.MapMouseEvent) => {
    setHoveredSector(sector);
    if (event.domEvent && 'clientX' in event.domEvent && 'clientY' in event.domEvent) {
      setMousePosition({
        x: (event.domEvent as MouseEvent).clientX,
        y: (event.domEvent as MouseEvent).clientY
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
    <div className="relative h-full w-full" style={{ height: '100%', width: '100%' }}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%", minHeight: '100%' }}
        center={MAP_CONFIG.DEFAULT_CENTER}
        zoom={MAP_CONFIG.DEFAULT_ZOOM}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          styles: mapType === "dark" ? darkMapStyles : [],
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
          mapTypeId: mapType === "dark"
            ? google.maps.MapTypeId.ROADMAP
            : mapType === "hybrid"
              ? google.maps.MapTypeId.HYBRID
              : mapType as google.maps.MapTypeId,
        }}
      >
        {filteredSectors.map((sector) => (
          <div key={sector.id}>
            {/* Fuzzy Location Circle */}
            <Circle
              center={{
                lat: sector.fuzzyLocation.center.lat,
                lng: sector.fuzzyLocation.center.lng,
              }}
              radius={sector.fuzzyLocation.radiusKm * 1000}
              options={getCircleOptions(sector)}
            />

            {/* Tactical Marker */}
            <Marker
              position={{
                lat: sector.fuzzyLocation.center.lat,
                lng: sector.fuzzyLocation.center.lng,
              }}
              icon={getMarkerIcon(sector)}
              onMouseOver={(e) => handleMarkerMouseOver(sector, e)}
              onMouseOut={handleMarkerMouseOut}
              onClick={() => handleMarkerClick(sector.id)}
            />
          </div>
        ))}
      </GoogleMap>

      {/* Filter Panel */}
      <MapFilters />

      {/* Map Mode Selector */}
      <MapModeSelector />

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

