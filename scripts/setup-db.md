# Quick Database Setup Guide

## Step 1: Run Migrations

### Option A: Supabase Dashboard (Easiest)

1. Go to your Supabase project dashboard
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
5. Paste into the SQL Editor
6. Click **Run** (or press Cmd/Ctrl + Enter)
7. Wait for success message
8. Repeat for `supabase/migrations/002_row_level_security.sql`

### Option B: Supabase CLI

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref YOUR_PROJECT_REF

# Push migrations
supabase db push
```

## Step 2: Generate TypeScript Types

After migrations are complete:

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/supabase/types.ts
```

Or use the project ref:

```bash
npx supabase gen types typescript --project-ref YOUR_PROJECT_REF > lib/supabase/types.ts
```

## Step 3: Test Connection

```bash
# Install tsx if needed
npm install -g tsx

# Run test script
npx tsx scripts/test-supabase.ts
```

## Step 4: Create Test Data (Optional)

After migrations, you can insert test sectors:

```sql
-- First, create a test user (or use your auth user)
INSERT INTO users (id, email, display_name, role)
VALUES (
  gen_random_uuid(),
  'test@voide.com',
  'Test Landowner',
  'LANDOWNER'
)
ON CONFLICT (email) DO NOTHING
RETURNING id;

-- Then create a test sector (replace USER_ID with the ID from above)
INSERT INTO sectors (
  landowner_id,
  name,
  description,
  images,
  exact_lat,
  exact_lng,
  fuzzy_lat,
  fuzzy_lng,
  fuzzy_radius_km,
  wilderness_level,
  fire_permission,
  water_availability,
  has_toilet,
  max_operators,
  is_active,
  price_per_night
) VALUES (
  (SELECT id FROM users WHERE email = 'test@voide.com' LIMIT 1),
  'Test Sector Alpha',
  'A test sector for development and testing purposes.',
  ARRAY['/dark-dense-forest-wilderness-tactical.jpg'],
  51.1657,
  10.4515,
  51.1657,
  10.4515,
  2.0,
  4,
  'FIRE_BOWL',
  'NONE',
  false,
  2,
  true,
  25.00
);
```

## Troubleshooting

### "relation does not exist"
- Make sure you ran `001_initial_schema.sql` first
- Check that you're in the correct database/project

### "permission denied"
- Make sure you ran `002_row_level_security.sql`
- Check that RLS is enabled on tables

### Types generation fails
- Make sure migrations are complete
- Verify your project ID/ref is correct
- Check that you have the correct permissions

