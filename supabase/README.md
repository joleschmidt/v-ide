# Supabase Database Setup

## Quick Start

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your project URL and anon key

2. **Run Migrations**

   Option A: Using Supabase CLI (Recommended)
   ```bash
   # Install Supabase CLI
   npm install -g supabase

   # Link to your project
   supabase link --project-ref your-project-ref

   # Run migrations
   supabase db push
   ```

   Option B: Using Supabase Dashboard
   - Go to SQL Editor in your Supabase dashboard
   - Copy and paste the contents of `001_initial_schema.sql`
   - Run the query
   - Copy and paste the contents of `002_row_level_security.sql`
   - Run the query

3. **Generate TypeScript Types**
   ```bash
   npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/supabase/types.ts
   ```

4. **Update Environment Variables**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

## Database Schema Overview

### Tables

- **users**: User profiles, roles, reputation
- **sectors**: Forest locations with fuzzy/exact coordinates
- **bookings**: Reservations with waiver signatures
- **reputation_badges**: Operator achievement system
- **incidents**: Violation reports

### Key Features

- **Auto BYOT**: Triggers automatically set `byot_mandatory` when `has_toilet = false`
- **RLS Policies**: Row-level security for data protection
- **Fuzzy Locations**: Public view shows 2km radius, exact coordinates only after booking
- **Timestamp Triggers**: Auto-update `updated_at` on all tables

## Security

All tables have Row Level Security (RLS) enabled:

- Users can only access their own data
- Public can view active sectors (fuzzy locations only)
- Landowners can manage their own sectors
- Operators can create bookings
- Exact coordinates revealed via application logic (not RLS)

## Testing

After setup, test with:

```sql
-- Insert test user
INSERT INTO users (email, display_name, role) 
VALUES ('test@voide.com', 'Test Operator', 'OPERATOR');

-- Insert test sector
INSERT INTO sectors (
  landowner_id, name, description,
  exact_lat, exact_lng, fuzzy_lat, fuzzy_lng,
  wilderness_level, fire_permission, water_availability,
  price_per_night
) VALUES (
  'your-user-id',
  'Test Sector',
  'A test sector for development',
  51.1657, 10.4515, 51.1657, 10.4515,
  3, 'GAS_ONLY', 'NATURAL_SOURCE',
  25.00
);
```

