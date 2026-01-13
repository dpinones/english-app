// ==========================================
// SUPABASE MODULE EXPORTS
// ==========================================

export { supabase, isSupabaseConfigured, DEFAULT_USER_ID } from './client';
export type { Database, Tables, InsertTables, UpdateTables } from './types';
export {
  syncUserProgress,
  fetchUserProgress,
  syncTopicProgress,
  fetchTopicProgress,
  syncDailyStats,
  fetchDailyStats,
  fetchDueExercises,
  fetchAllProgress,
} from './sync';
export type { FullSyncData } from './sync';
