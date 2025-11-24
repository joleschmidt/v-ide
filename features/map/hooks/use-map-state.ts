import { create } from "zustand";
import type { MapState, MapFilters } from "../types";
import { MAP_CONFIG } from "@/lib/constants";
import type { MapType } from "../components/map-mode-selector";

interface MapStore extends MapState {
  mapType: MapType;
  setCenter: (center: MapState["center"]) => void;
  setZoom: (zoom: number) => void;
  setFilters: (filters: MapFilters) => void;
  setMapType: (mapType: MapType) => void;
  resetFilters: () => void;
}

export const useMapState = create<MapStore>((set) => ({
  center: MAP_CONFIG.DEFAULT_CENTER,
  zoom: MAP_CONFIG.DEFAULT_ZOOM,
  filters: {},
  mapType: "dark",
  
  setCenter: (center) => set({ center }),
  setZoom: (zoom) => set({ zoom }),
  setFilters: (filters) => set({ filters }),
  setMapType: (mapType) => set({ mapType }),
  resetFilters: () => set({ filters: {} }),
}));

