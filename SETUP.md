# VØIDE Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Then fill in your credentials:

```env
# Supabase (Required for auth & database)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Google Maps (Required for map functionality)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# Stripe (Required for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
```

### 3. Setup Supabase

#### Option A: Using Supabase Dashboard (Easiest)

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy your project URL and anon key to `.env.local`
3. Go to SQL Editor in your Supabase dashboard
4. Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
5. Run the query
6. Copy and paste the contents of `supabase/migrations/002_row_level_security.sql`
7. Run the query

#### Option B: Using Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

#### Generate TypeScript Types

After running migrations:

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/supabase/types.ts
```

### 4. Setup Google Maps

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable "Maps JavaScript API"
4. Create an API key
5. Add the key to `.env.local`

### 5. Setup Stripe (Optional for MVP)

1. Go to [stripe.com](https://stripe.com) and create an account
2. Get your API keys from the dashboard
3. Add them to `.env.local`

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Troubleshooting

### "Supabase environment variables are missing"

Make sure you've created `.env.local` with your Supabase credentials. The app will work without them, but auth features won't function.

### "Google Maps not loading"

- Check that `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set
- Verify the API key has "Maps JavaScript API" enabled
- Check browser console for API errors

### Database connection errors

- Verify your Supabase URL and anon key are correct
- Check that migrations have been run
- Ensure RLS policies are set up correctly

---

## Next Steps

1. ✅ Setup environment variables
2. ✅ Run database migrations
3. ✅ Test authentication flow
4. ⏭️ Create test sectors in Supabase
5. ⏭️ Test booking flow
6. ⏭️ Configure Stripe webhooks

---

## Development Notes

- The app will run without Supabase configured (with warnings)
- Auth features require Supabase setup
- Map features require Google Maps API key
- Payment features require Stripe setup

