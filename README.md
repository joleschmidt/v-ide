# VØIDE

**Legal Bushcraft Access in Germany**

Zero infrastructure. Pure wilderness. Legal bushcraft camping on private forest land.

---

## 🎯 Project Overview

VØIDE connects private forest owners in Germany with bushcrafters seeking legal wilderness access. The platform facilitates "One-Night-Camps" with zero infrastructure, focusing on **raw nature** and **strict legality**.

### Core Philosophy

- **No Infrastructure**: BYOT (Bring Your Own Toilet) policy
- **Legal Framework**: Gestattungsvertrag (Permission Agreement) model
- **Safety First**: Mandatory digital waivers before booking
- **Privacy**: Fuzzy GPS locations until payment confirmed

---

## 🛠 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (Strict)
- **Styling**: Tailwind CSS v4
- **Map**: Google Maps React
- **Database**: Supabase
- **State**: Zustand
- **Payments**: Stripe Connect
- **UI Components**: Radix UI + shadcn/ui

---

## 📁 Project Structure

```
app/
├── (auth)/              # Login/Register
├── (dashboard)/         # Protected routes
│   └── command/         # Landowner dashboard
├── sectors/            # Map search + sector details
└── booking/            # Booking flow + waivers

features/
├── map/                # Google Maps integration
├── sectors/            # Sector components
├── booking/            # Booking flow + waiver forms
├── auth/               # Authentication
└── profile/            # User profiles + badges

types/
├── sector.ts           # Sector/Spot interfaces
├── user.ts             # User + reputation system
└── booking.ts          # Booking + waiver types

lib/
├── supabase/           # DB client + types
├── stripe/             # Payment client
├── constants.ts        # Tactical vocabulary + config
└── utils.ts            # Utility functions
```

---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js 18+
- Google Maps API Key
- Supabase Account
- Stripe Account

### 2. Installation

```bash
npm install
```

### 3. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

### 4. Database Setup

1. Create a Supabase project
2. Run the SQL migrations in `supabase/migrations/` (to be created)
3. Generate TypeScript types:

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/supabase/types.ts
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🎨 Design System

### Color Palette ("Night Forest")

- **Radar Black**: `#121212` (Main background)
- **Charcoal**: `#1a1a1a` (Cards)
- **Grid Lines**: `#2a2a2a` (Borders)
- **Forest Green**: `#4a7a4a` (Primary actions)
- **Moss Green**: `#5a8a5a` (Hover states)
- **Bone White**: `#e2e8f0` (Headlines)
- **Light Gray**: `#a8a8a8` (Body text)

### Typography

- **Headlines**: Inter (Bold/Semi Bold)
- **Data/Technical**: JetBrains Mono

### Design Principles

- Dark mode only (no light mode)
- Tactical utility interface
- Mobile-first (users in the forest)
- Sharp edges, minimal rounded corners
- Monospaced fonts for data

---

## 🗺 Map Component

The `TacticalMap` component is the core UX:

- **Dark Mode**: Custom Google Maps styling
- **Fuzzy Locations**: 2km radius circles (public view)
- **Hover Previews**: HUD-style sector cards
- **Smooth Animations**: Butter-smooth zoom/pan
- **Custom Markers**: Tactical symbols (circles, not bubbles)

---

## 📋 Key Features (MVP)

### ✅ Sector Search (Interactive Map)
- Dark tactical map with custom markers
- Fuzzy GPS locations (2km radius)
- Filters: Wilderness level, fire permission, water

### ✅ Booking Flow
- Calendar date selection
- Mandatory digital waiver
- Stripe Connect payment
- GPS coordinates revealed post-payment

### ✅ Landowner Dashboard ("Command Center")
- Toggle sector active/inactive
- Block dates (hunting season)
- Report incidents (trash)

### ✅ Legal Compliance
- Gestattungsvertrag model
- BYOT mandatory clause
- "Betreten auf eigene Gefahr" waivers

---

## 🔐 Legal Framework

VØIDE operates as a broker for **permission agreements** (Gestattungsvertrag), not hotel stays.

### Key Legal Requirements:

1. **Strict Liability Waiver**: Users accept full responsibility
2. **Leave No Trace**: Mandatory compliance
3. **BYOT Policy**: If no toilet provided, BYOT required
4. **German Federal Forest Act**: "Enter at own risk"

---

## 🧪 Development Roadmap

- [ ] Complete database schema + migrations
- [ ] Implement Supabase auth flow
- [ ] Build booking calendar component
- [ ] Integrate Stripe Connect
- [ ] Create landowner onboarding
- [ ] Implement reputation system
- [ ] Add email notifications
- [ ] Build admin dashboard
- [ ] Mobile app (React Native)

---

## 📝 Tactical Vocabulary

VØIDE uses **utility language**, not welcoming phrases:

- ✅ "Access System" (not "Log In")
- ✅ "Deploy" (not "Book Now")
- ✅ "Sector Verified" (not "Approved")
- ✅ "Coordinates Confirmed" (not "Location Available")
- ✅ "Command Center" (not "Dashboard")

---

## 🤝 Contributing

This is a private project. For questions or collaboration inquiries, contact the project owner.

---

## 📄 License

Proprietary. All rights reserved.

---

**Step into the VØIDE.**

