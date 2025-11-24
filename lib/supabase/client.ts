import { createBrowserClient } from '@supabase/ssr';
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

// Use SSR browser client to ensure cookies are set for server-side auth
export const supabase = createBrowserClient<Database>(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

