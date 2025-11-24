# VØIDE Architecture Documentation

## System Architecture Overview

VØIDE is built as a feature-based Next.js 14+ application with a clear separation of concerns.

---

## Core Principles

1. **Feature-Based Structure**: Each feature is self-contained with components, hooks, and types
2. **Type Safety**: Strict TypeScript, no `any` types
3. **Server-First**: Use Server Components by default, Client Components only for interactivity
4. **Mobile-First**: UI optimized for field use (forest environments)

---

## Folder Structure Explained

```
/app                          # Next.js App Router
  ├── (auth)/                 # Auth layout group
  │   ├── login/
  │   ├── register/
  │   └── layout.tsx          # Auth-specific layout
  │
  ├── (dashboard)/            # Protected routes group
  │   ├── command/            # Landowner "Command Center"
  │   │   ├── sectors/        # Manage sectors
  │   │   ├── bookings/       # View bookings
  │   │   └── page.tsx
  │   ├── profile/            # User profile
  │   └── layout.tsx          # Dashboard layout
  │
  ├── sectors/                # Public sector pages
  │   ├── [id]/               # Dynamic sector detail
  │   └── page.tsx            # Map search (main interface)
  │
  ├── booking/                # Booking flow
  │   └── [sectorId]/
  │       └── page.tsx        # Waiver + payment
  │
  └── api/                    # API routes
      ├── sectors/            # Sector CRUD
      ├── bookings/           # Booking operations
      └── webhooks/stripe/    # Stripe webhooks

/features                     # Feature modules
  ├── map/                    # Map functionality
  │   ├── components/
  │   │   ├── tactical-map.tsx           # Main map component
  │   │   ├── sector-marker.tsx          # Custom pins
  │   │   ├── sector-preview-card.tsx    # Hover popup
  │   │   └── map-filters.tsx            # Filter UI
  │   ├── hooks/
  │   │   └── use-map-state.ts           # Zustand store
  │   └── types.ts            # Map-specific types
  │
  ├── sectors/                # Sector functionality
  │   ├── components/
  │   │   ├── sector-card.tsx
  │   │   ├── sector-detail.tsx
  │   │   └── sector-grid.tsx
  │   ├── hooks/
  │   └── types.ts
  │
  ├── booking/                # Booking functionality
  │   ├── components/
  │   │   ├── booking-calendar.tsx
  │   │   ├── waiver-form.tsx            # Digital signature
  │   │   ├── byot-agreement.tsx
  │   │   └── payment-form.tsx
  │   └── types.ts
  │
  ├── auth/                   # Authentication
  │   ├── components/
  │   │   ├── login-form.tsx
  │   │   └── register-form.tsx
  │   ├── hooks/
  │   │   └── use-auth.ts
  │   └── types.ts
  │
  └── profile/                # User profiles
      ├── components/
      │   ├── reputation-badge.tsx
      │   └── operator-stats.tsx
      └── types.ts

/types                        # Shared TypeScript types
  ├── sector.ts               # Sector/Spot interface
  ├── user.ts                 # User + reputation
  └── booking.ts              # Booking + waiver

/lib                          # Shared utilities
  ├── supabase/
  │   ├── client.ts           # Browser client
  │   ├── server.ts           # Server client
  │   └── types.ts            # Generated DB types
  ├── stripe/
  │   └── client.ts
  ├── constants.ts            # Tactical vocabulary + config
  └── utils.ts                # Helper functions

/components/ui                # Reusable UI components (shadcn/ui)
```

---

## Data Flow

### 1. Sector Search Flow

```
User lands on /sectors
    ↓
TacticalMap component loads
    ↓
Fetch sectors from Supabase (with fuzzy locations)
    ↓
Render markers + fuzzy circles
    ↓
User hovers marker → SectorPreviewCard shows
    ↓
User clicks marker → Navigate to /sectors/[id]
```

### 2. Booking Flow

```
User on /sectors/[id]
    ↓
Click "Deploy" button
    ↓
Navigate to /booking/[sectorId]
    ↓
Step 1: Select dates (calendar component)
    ↓
Step 2: Sign waiver (WaiverForm component)
    ↓
Step 3: Payment (Stripe)
    ↓
Payment success → Booking created
    ↓
Exact GPS coordinates revealed
    ↓
Confirmation email sent
```

### 3. Landowner Dashboard Flow

```
Landowner logs in
    ↓
Navigate to /command
    ↓
View all sectors
    ↓
Toggle sector active/inactive
    ↓
Block specific dates
    ↓
View bookings + earnings
    ↓
Report incidents
```

---

## State Management

### Zustand Stores

```typescript
// Map state
useMapState()
  - center: Coordinates
  - zoom: number
  - filters: MapFilters

// Auth state
useAuth()
  - user: User | null
  - session: Session | null
  - loading: boolean

// Booking state (ephemeral)
useBookingFlow()
  - step: 'dates' | 'waiver' | 'payment'
  - selectedDates: DateRange
  - waiverSigned: boolean
```

---

## Database Schema (Supabase)

### Tables

```sql
-- users
id, email, role, display_name, reputation_score, badges, etc.

-- sectors
id, landowner_id, name, description, images, 
exact_lat, exact_lng, fuzzy_lat, fuzzy_lng, 
wilderness_level, fire_permission, water_availability,
has_toilet, byot_mandatory, price_per_night, etc.

-- bookings
id, operator_id, landowner_id, sector_id,
check_in_date, check_out_date, 
waiver_signed_at, waiver_ip_address,
liability_accepted, leave_no_trace_accepted, byot_accepted,
total_amount, platform_fee, landowner_payout,
stripe_payment_intent_id, status, etc.

-- reputation_badges
id, user_id, badge_type, earned_at

-- incidents
id, booking_id, reported_by, description, created_at
```

### Row Level Security (RLS)

- Public users can only see sectors with `is_active = true`
- Exact coordinates only visible after booking confirmed
- Users can only modify their own data
- Landowners can only access their own sectors/bookings

---

## API Routes

### Sectors

- `GET /api/sectors` - List all active sectors (fuzzy locations)
- `GET /api/sectors/[id]` - Get sector details
- `POST /api/sectors` - Create sector (landowner only)
- `PATCH /api/sectors/[id]` - Update sector
- `DELETE /api/sectors/[id]` - Delete sector

### Bookings

- `POST /api/bookings` - Create booking
- `GET /api/bookings/[id]` - Get booking details
- `PATCH /api/bookings/[id]` - Update booking status
- `POST /api/bookings/[id]/waiver` - Submit waiver signature

### Webhooks

- `POST /api/webhooks/stripe` - Handle Stripe events
  - `payment_intent.succeeded` → Update booking status
  - `payment_intent.failed` → Cancel booking

---

## Security Considerations

### Waiver System

- Digital signature captured with timestamp + IP address
- Waiver must be signed BEFORE payment
- Waiver data stored permanently (legal requirement)

### Location Privacy

- Exact GPS only revealed after payment confirmed
- Fuzzy locations use 2km radius offset
- Landowner can hide sector from map temporarily

### Payment Security

- Stripe Connect for split payments
- Platform fee: 15% of booking amount
- Automatic payout to landowner after trip completion

---

## Performance Optimizations

1. **Map Rendering**
   - Use clustering for dense areas
   - Lazy load sector images
   - Debounce zoom/pan events

2. **Server Components**
   - Use RSC for all non-interactive content
   - Stream data with Suspense boundaries

3. **Image Optimization**
   - Next.js Image component
   - WebP format with fallbacks
   - Blur placeholders

---

## Mobile Considerations

- Touch-friendly map controls (pinch zoom)
- Bottom sheet UI for sector details
- Offline mode (cache sectors)
- GPS integration (user location)
- Dark mode reduces battery drain

---

## Deployment

- **Platform**: Vercel (recommended)
- **Database**: Supabase (hosted Postgres)
- **Storage**: Supabase Storage (images)
- **CDN**: Vercel Edge Network
- **Analytics**: Vercel Analytics

---

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET

# Email (optional)
RESEND_API_KEY
```

---

## Testing Strategy

1. **Unit Tests**: Core business logic (utils, hooks)
2. **Integration Tests**: API routes, booking flow
3. **E2E Tests**: Critical user journeys (Playwright)
4. **Manual Testing**: Map interactions, mobile devices

---

## Monitoring & Logging

- Vercel Analytics for page views
- Supabase logs for database errors
- Stripe dashboard for payment issues
- Custom error tracking (Sentry)

---

## Future Enhancements

- [ ] Native mobile apps (React Native)
- [ ] Offline map support (cached tiles)
- [ ] Real-time availability updates
- [ ] Advanced search (polygon drawing)
- [ ] Landowner verification system
- [ ] Seasonal pricing
- [ ] Group bookings
- [ ] Insurance integration

