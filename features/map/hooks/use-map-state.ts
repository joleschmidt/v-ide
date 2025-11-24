import { create } from "zustand";
import type { MapState, MapFilters } from "../types";
import { MAP_CONFIG } from "@/lib/constants";

interface MapStore extends MapState {
  setCenter: (center: MapState["center"]) => void;
  setZoom: (zoom: number) => void;
  setFilters: (filters: MapFilters) => void;
  resetFilters: () => void;
}

export const useMapState = create<MapStore>((set) => ({
  center: MAP_CONFIG.DEFAULT_CENTER,
  zoom: MAP_CONFIG.DEFAULT_ZOOM,
  filters: {},
  
  setCenter: (center) => set({ center }),
  setZoom: (zoom) => set({ zoom }),
  setFilters: (filters) => set({ filters }),
  resetFilters: () => set({ filters: {} }),
}));

