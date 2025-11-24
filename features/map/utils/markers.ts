import type { SectorPreview } from "@/types/sector";
import type { FirePermission, WildernessLevel } from "@/types/sector";

export const getMarkerIcon = (sector: SectorPreview): google.maps.Icon => {
  const baseColor = getMarkerColor(sector);
  const { iconSvg, iconColor } = getIconSvg(sector);

  // Create data URL from SVG with larger size and better visibility
  // Icons are in 24x24 viewBox, centered at (12, 12), so we translate to center of 48x48
  const svg = `
    <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="20" fill="${baseColor}" opacity="0.95"/>
      <circle cx="24" cy="24" r="20" fill="none" stroke="${lightenColor(baseColor)}" stroke-width="2"/>
      <g transform="translate(12, 12)">
        ${iconSvg}
      </g>
    </svg>
  `;

  const encodedSvg = encodeURIComponent(svg);
  const dataUrl = `data:image/svg+xml,${encodedSvg}`;

  return {
    url: dataUrl,
    scaledSize: new google.maps.Size(48, 48),
    anchor: new google.maps.Point(24, 24),
  };
};

const getMarkerColor = (sector: SectorPreview): string => {
  // Color based on wilderness level
  const colors: Record<WildernessLevel, string> = {
    1: "#6a8a6a", // Light green - easy access
    2: "#5a8a5a", // Medium green - light trail
    3: "#4a7a4a", // Standard green - moderate
    4: "#3a6a3a", // Dark green - rough terrain
    5: "#2a5a2a", // Darkest green - deep woods
  };
  return colors[sector.wildernessLevel];
};

const getIconSvg = (sector: SectorPreview): { iconSvg: string; iconColor: string } => {
  // Icon based on fire permission with distinct colors
  // Using Lucide icon paths in 24x24 viewBox, centered at (12, 12)
  switch (sector.firePermission) {
    case "OPEN_FIRE":
      // Flame icon - red-400 (#f87171)
      return {
        iconColor: "#f87171",
        iconSvg: `
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.5-1.5-4-1.5-4S8 8.5 8 10a2.5 2.5 0 0 0 .5 4.5Z" fill="#f87171" stroke="#f87171" stroke-width="0.5"/>
          <path d="M14.5 14.5A2.5 2.5 0 0 1 12 12c0-1.5 1.5-4 1.5-4S16 8.5 16 10a2.5 2.5 0 0 1-.5 4.5Z" fill="#f87171" stroke="#f87171" stroke-width="0.5"/>
          <path d="M9 6.5c.5 1 1.5 2 2.5 2s2-1 2.5-2" fill="none" stroke="#f87171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        `,
      };
    case "FIRE_BOWL":
      // Campfire icon - orange-400 (#fb923c)
      return {
        iconColor: "#fb923c",
        iconSvg: `
          <path d="M15.57 15.5a1.9 1.9 0 0 1-2.13-2.07l.42-2.67a1.85 1.85 0 0 0-.09-.85 1.89 1.89 0 0 0-1.6-1.2 2 2 0 0 0-1.6 1.2 1.85 1.85 0 0 0-.09.85l.42 2.67a1.9 1.9 0 0 1-2.13 2.07l-2.38-.42a1.9 1.9 0 0 0-2.13 2.07l.42 2.67a1.85 1.85 0 0 0 .09.85 1.89 1.89 0 0 0 1.6 1.2 2 2 0 0 0 1.6-1.2 1.85 1.85 0 0 0 .09-.85l-.42-2.67a1.9 1.9 0 0 1 2.13-2.07l2.38.42Z" fill="#fb923c" stroke="#fb923c" stroke-width="0.5"/>
          <path d="M12 12v-2" fill="none" stroke="#fb923c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 16v-2" fill="none" stroke="#fb923c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        `,
      };
    case "GAS_ONLY":
      // Zap/lightning icon - yellow-400 (#facc15)
      return {
        iconColor: "#facc15",
        iconSvg: `
          <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.01A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.01A1 1 0 0 0 11 14H4Z" fill="#facc15" stroke="#facc15" stroke-width="0.5"/>
        `,
      };
    case "NO_FIRE":
    default:
      // Flame with slash - red-400 with gray slash
      return {
        iconColor: "#f87171",
        iconSvg: `
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.5-1.5-4-1.5-4S8 8.5 8 10a2.5 2.5 0 0 0 .5 4.5Z" fill="none" stroke="#f87171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14.5 14.5A2.5 2.5 0 0 1 12 12c0-1.5 1.5-4 1.5-4S16 8.5 16 10a2.5 2.5 0 0 1-.5 4.5Z" fill="none" stroke="#f87171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="4" y1="4" x2="20" y2="20" stroke="#9ca3af" stroke-width="2.5" stroke-linecap="round"/>
        `,
      };
  }
};

const lightenColor = (color: string): string => {
  // Simple color lightening for stroke
  const colorMap: Record<string, string> = {
    "#6a8a6a": "#7a9a7a",
    "#5a8a5a": "#6a9a6a",
    "#4a7a4a": "#5a8a5a",
    "#3a6a3a": "#4a7a4a",
    "#2a5a2a": "#3a6a3a",
  };
  return colorMap[color] || color;
};

export const getCircleOptions = (sector: SectorPreview): google.maps.CircleOptions => {
  const baseColor = getMarkerColor(sector);
  return {
    fillColor: baseColor,
    fillOpacity: 0.1,
    strokeColor: baseColor,
    strokeOpacity: 0.3,
    strokeWeight: 1,
  };
};

