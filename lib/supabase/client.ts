import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '⚠️  Supabase environment variables are missing.\n' +
    '   Create a .env.local file with:\n' +
    '   NEXT_PUBLIC_SUPABASE_URL=your-project-url\n' +
    '   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key\n' +
    '   See .env.local.example for reference.'
  );
}

// Create a dummy client if env vars are missing (prevents runtime errors)
export const supabase = createClient<Database>(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

