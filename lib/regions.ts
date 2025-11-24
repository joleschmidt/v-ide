export type RegionId = 
  | "schwarzwald"
  | "allgaeu"
  | "lahn-dill"
  | "harz"
  | "bayerischer-wald"
  | "pfaelzer-wald"
  | "thueringer-wald"
  | "sauerland"
  | "eifel"
  | "taunus";

export interface Region {
  id: RegionId;
  name: string;
  description: string;
  characteristics: string[];
  imageUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  area: string; // e.g. "Baden-Württemberg"
}

export const REGIONS: Record<RegionId, Region> = {
  "schwarzwald": {
    id: "schwarzwald",
    name: "Schwarzwald",
    description: "Deutschlands größtes Mittelgebirge mit dichten Wäldern, tiefen Tälern und rauen Gipfeln. Perfekt für erfahrene Bushcrafter, die echte Wildnis suchen.",
    characteristics: [
      "Dichte Nadelwälder",
      "Höhenlagen bis 1493m",
      "Viele Wasserquellen",
      "Raues Klima",
      "Hohe Wildnis-Level"
    ],
    imageUrl: "/dark-dense-forest-wilderness-tactical.jpg",
    coordinates: { lat: 48.0, lng: 8.2 },
    area: "Baden-Württemberg"
  },
  "allgaeu": {
    id: "allgaeu",
    name: "Allgäu",
    description: "Alpine Landschaft mit Wiesen, Wäldern und Bergen. Mischung aus alpiner Herausforderung und zugänglicher Natur.",
    characteristics: [
      "Alpine Landschaft",
      "Höhenlagen bis 2656m",
      "Viele Bäche und Seen",
      "Wechselhaftes Wetter",
      "Moderate bis hohe Wildnis-Level"
    ],
    imageUrl: "/pine-forest-clearing-mountains-tactical.jpg",
    coordinates: { lat: 47.6, lng: 10.2 },
    area: "Bayern"
  },
  "lahn-dill": {
    id: "lahn-dill",
    name: "Lahn-Dill-Bergland",
    description: "Mittelgebirgslandschaft mit abwechslungsreichen Wäldern, Tälern und Höhenzügen. Ideal für Einsteiger und Fortgeschrittene.",
    characteristics: [
      "Mischwälder",
      "Höhenlagen bis 674m",
      "Gute Wasserquellen",
      "Mildes Klima",
      "Niedrige bis moderate Wildnis-Level"
    ],
    imageUrl: "/remote-wilderness-canyon-survival-tactical.jpg",
    coordinates: { lat: 50.7, lng: 8.3 },
    area: "Hessen"
  },
  "harz": {
    id: "harz",
    name: "Harz",
    description: "Mystischer Mittelgebirgszug mit dichten Wäldern, Mooren und rauen Gipfeln. Bekannt für seine Wildnis und Abgeschiedenheit.",
    characteristics: [
      "Dichte Buchen- und Fichtenwälder",
      "Höhenlagen bis 1141m",
      "Viele Quellen und Bäche",
      "Kühles Klima",
      "Hohe Wildnis-Level"
    ],
    imageUrl: "/dark-dense-forest-wilderness-tactical.jpg",
    coordinates: { lat: 51.8, lng: 10.6 },
    area: "Niedersachsen, Sachsen-Anhalt, Thüringen"
  },
  "bayerischer-wald": {
    id: "bayerischer-wald",
    name: "Bayerischer Wald",
    description: "Größter zusammenhängender Wald Mitteleuropas. Extrem dichte Wälder, unberührte Natur und echte Wildnis.",
    characteristics: [
      "Dichtester Wald Deutschlands",
      "Höhenlagen bis 1456m",
      "Viele Wasserquellen",
      "Raues Klima",
      "Sehr hohe Wildnis-Level"
    ],
    imageUrl: "/dark-dense-forest-wilderness-tactical.jpg",
    coordinates: { lat: 49.0, lng: 13.2 },
    area: "Bayern"
  },
  "pfaelzer-wald": {
    id: "pfaelzer-wald",
    name: "Pfälzerwald",
    description: "Größtes zusammenhängendes Waldgebiet Deutschlands. Dichte Wälder, Sandsteinfelsen und abgelegene Täler.",
    characteristics: [
      "Dichte Kiefern- und Buchenwälder",
      "Höhenlagen bis 673m",
      "Gute Wasserquellen",
      "Mildes Klima",
      "Moderate Wildnis-Level"
    ],
    imageUrl: "/pine-forest-clearing-mountains-tactical.jpg",
    coordinates: { lat: 49.3, lng: 7.8 },
    area: "Rheinland-Pfalz"
  },
  "thueringer-wald": {
    id: "thueringer-wald",
    name: "Thüringer Wald",
    description: "Längstes zusammenhängendes Waldgebiet Deutschlands. Dichte Wälder, klare Bäche und abgelegene Gebiete.",
    characteristics: [
      "Dichte Fichten- und Buchenwälder",
      "Höhenlagen bis 982m",
      "Viele Wasserquellen",
      "Kühles Klima",
      "Moderate bis hohe Wildnis-Level"
    ],
    imageUrl: "/dark-dense-forest-wilderness-tactical.jpg",
    coordinates: { lat: 50.6, lng: 10.8 },
    area: "Thüringen"
  },
  "sauerland": {
    id: "sauerland",
    name: "Sauerland",
    description: "Waldreiches Mittelgebirge mit tiefen Tälern und abgelegenen Gebieten. Perfekt für Bushcrafting in abgeschiedener Natur.",
    characteristics: [
      "Dichte Mischwälder",
      "Höhenlagen bis 843m",
      "Gute Wasserquellen",
      "Mildes Klima",
      "Moderate Wildnis-Level"
    ],
    imageUrl: "/remote-wilderness-canyon-survival-tactical.jpg",
    coordinates: { lat: 51.2, lng: 8.2 },
    area: "Nordrhein-Westfalen"
  },
  "eifel": {
    id: "eifel",
    name: "Eifel",
    description: "Vulkanisches Mittelgebirge mit dichten Wäldern, Mooren und Seen. Abwechslungsreiche Landschaft für verschiedene Wildnis-Level.",
    characteristics: [
      "Dichte Buchen- und Fichtenwälder",
      "Höhenlagen bis 747m",
      "Viele Seen und Bäche",
      "Mildes Klima",
      "Niedrige bis moderate Wildnis-Level"
    ],
    imageUrl: "/pine-forest-clearing-mountains-tactical.jpg",
    coordinates: { lat: 50.4, lng: 6.7 },
    area: "Rheinland-Pfalz, Nordrhein-Westfalen"
  },
  "taunus": {
    id: "taunus",
    name: "Taunus",
    description: "Mittelgebirgszug mit dichten Wäldern und abgelegenen Tälern. Nähe zu städtischen Gebieten, aber dennoch echte Wildnis.",
    characteristics: [
      "Dichte Buchenwälder",
      "Höhenlagen bis 880m",
      "Gute Wasserquellen",
      "Mildes Klima",
      "Niedrige bis moderate Wildnis-Level"
    ],
    imageUrl: "/remote-wilderness-canyon-survival-tactical.jpg",
    coordinates: { lat: 50.2, lng: 8.4 },
    area: "Hessen"
  },
};

export const REGION_IDS = Object.keys(REGIONS) as RegionId[];

export function getRegionById(id: string): Region | undefined {
  return REGIONS[id as RegionId];
}

