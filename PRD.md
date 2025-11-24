---
alwaysApply: true
---

# Project Requirements Document (PRD): VØIDE

## 1. Executive Summary

VØIDE is a platform connecting private forest owners in Germany with bushcrafters. It monetizes unused forest land by offering it as legal "One-Night-Camps".

**USP**: "Zero Infrastructure". We sell legality and seclusion, not amenities.

## 2. Core Features (MVP)

### A. The "Sector" Search (High-End Interactive Map)

**Core Experience**: The map is the main interface. It must feel fluid, "gamified", and fun to explore (like a strategy game or tactical HUD).

**Visual Style**: Custom Dark Mode (Mapbox or Leaflet with dark tiles).

**Tactical Layer**: Satellite or Topographic view by default.

**Markers**: Custom pins (not default bubbles). Use tactical symbols (e.g., triangles or target circles).

**Interactivity**:

- **Smooth Animations**: Zooming and panning must be buttery smooth.
- **Hover Effects**: Hovering a marker immediately shows a "Sector Preview" card (HUD style) without clicking.
- **Clustering**: Beautifully animated clusters when zooming out.
- **"Fog of War" (Optional)**: Unexplored areas or areas without spots could be slightly dimmed to focus attention on available sectors.

**Filters**:

- **Wilderness Level**: Scale 1-5 (1=Easy Access, 5=Deep Woods/No Path).
- **Fire Permission**: [No Fire] / [Gas Only] / [Fire Bowl] / [Open Fire].
- **Water**: [None] / [Natural Source] / [Provided].
- **Fuzzy Location**: Public users see a ~2km radius circle (approximate zone). Booked users see exact GPS coordinates.

### B. The Booking Flow ("The Contract")

- **Date Selection**: Calendar blocking.
- **Mandatory Waiver**: Before paying, user must digitally sign:
  - "I accept strict liability for my safety."
  - "I will adhere to 'Leave No Trace' principles."
  - "BYOT (Bring Your Own Toilet) is mandatory if no toilet is listed."
- **Payment**: Stripe Connect (Split payment: Platform fee vs. Landowner fee).

### C. The Landowner Dashboard ("Command Center")

- **Status**: Toggle Spot [Active/Inactive] (e.g., during hunting season).
- **Calendar**: Block dates.
- **Incidents**: Report users who left trash (leads to ban).

## 3. Critical Business Logic

### The "No-Toilet" Strategy (BYOT)

To avoid "Commercial Campsite" regulations, we do not require hosts to build toilets.

**Rule**: If the host provides no toilet, the system automatically appends a "BYOT Mandatory" clause to the booking agreement. The user must confirm they carry a portable sanitary solution.

### Liability (Haftung)

The platform acts as a broker for a "Gestattungsvertrag" (Permission Agreement), not a hotel stay.

Terms of Service must emphasize "Betreten auf eigene Gefahr" (Enter at own risk) compliant with German Federal Forest Act.

## 4. User Roles

- **Operator (Guest)**: Needs reputation (badges) to book high-level spots.
- **Landowner (Host)**: Needs minimal friction. "Passive Income" focus.
