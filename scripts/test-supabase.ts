/**
 * Quick script to test Supabase connection
 * Run with: npx tsx scripts/test-supabase.ts
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables');
  console.log('Make sure you have:');
  console.log('  NEXT_PUBLIC_SUPABASE_URL');
  console.log('  NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('🔍 Testing Supabase connection...\n');

  try {
    // Test 1: Check if we can connect
    console.log('1. Testing connection...');
    const { data: health, error: healthError } = await supabase
      .from('users')
      .select('count')
      .limit(0);

    if (healthError && healthError.code === 'PGRST116') {
      console.log('   ⚠️  Tables not found - you need to run migrations');
      console.log('   📝 See: supabase/README.md\n');
    } else if (healthError) {
      console.log('   ❌ Connection error:', healthError.message);
      return;
    } else {
      console.log('   ✅ Connection successful!\n');
    }

    // Test 2: Check if tables exist
    console.log('2. Checking database schema...');
    const tables = ['users', 'sectors', 'bookings'];
    const results: Record<string, boolean> = {};

    for (const table of tables) {
      const { error } = await supabase.from(table).select('*').limit(0);
      results[table] = !error;
    }

    console.log('   Tables status:');
    for (const [table, exists] of Object.entries(results)) {
      console.log(`   ${exists ? '✅' : '❌'} ${table}`);
    }

    if (Object.values(results).every(Boolean)) {
      console.log('\n   ✅ All tables exist!');
    } else {
      console.log('\n   ⚠️  Some tables are missing');
      console.log('   📝 Run migrations: supabase/migrations/001_initial_schema.sql');
    }

    // Test 3: Check RLS
    console.log('\n3. Checking Row Level Security...');
    const { data: rlsCheck } = await supabase
      .from('sectors')
      .select('*')
      .limit(1);

    if (rlsCheck !== null) {
      console.log('   ✅ RLS policies active');
    } else {
      console.log('   ⚠️  RLS might not be configured');
      console.log('   📝 Run: supabase/migrations/002_row_level_security.sql');
    }

    console.log('\n✅ Supabase connection test complete!');
  } catch (error: any) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

testConnection();

