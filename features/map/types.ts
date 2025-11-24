export interface MapFilters {
  wildernessLevel?: number[];
  firePermission?: string[];
  waterAvailability?: string[];
  priceRange?: [number, number];
}

export interface MapState {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  filters: MapFilters;
}

