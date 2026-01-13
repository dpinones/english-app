import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

// ==========================================
// SUPABASE CLIENT CONFIGURATION
// ==========================================

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  console.warn('Missing NEXT_PUBLIC_SUPABASE_URL - app will work offline only');
}

if (!supabaseAnonKey) {
  console.warn('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY - app will work offline only');
}

// Create client only if both URL and key are available
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null;

// Helper to check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {
  return supabase !== null;
};

// Default user ID for personal use (no auth)
// This can be any unique identifier - we use a fixed UUID for simplicity
export const DEFAULT_USER_ID = 'default-user-001';
