// ==========================================
// SUPABASE DATABASE TYPES
// Generated from schema - update when schema changes
// ==========================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      topics: {
        Row: {
          id: number;
          title: string;
          level: string;
          category: string;
          svo_pattern: string | null;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          level: string;
          category: string;
          svo_pattern?: string | null;
          order_index: number;
          created_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          level?: string;
          category?: string;
          svo_pattern?: string | null;
          order_index?: number;
          created_at?: string;
        };
      };
      exercises: {
        Row: {
          id: string;
          topic_id: number;
          type: string;
          prompt: string;
          content: Json;
          explanation: string | null;
          difficulty: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          topic_id: number;
          type: string;
          prompt: string;
          content: Json;
          explanation?: string | null;
          difficulty?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          topic_id?: number;
          type?: string;
          prompt?: string;
          content?: Json;
          explanation?: string | null;
          difficulty?: number;
          created_at?: string;
        };
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          exercise_id: string; // TEXT - references local exercise IDs
          ease_factor: number;
          interval_days: number;
          repetitions: number;
          next_review: string;
          last_review: string | null;
          times_correct: number;
          times_incorrect: number;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          exercise_id: string;
          ease_factor?: number;
          interval_days?: number;
          repetitions?: number;
          next_review?: string;
          last_review?: string | null;
          times_correct?: number;
          times_incorrect?: number;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          exercise_id?: string;
          ease_factor?: number;
          interval_days?: number;
          repetitions?: number;
          next_review?: string;
          last_review?: string | null;
          times_correct?: number;
          times_incorrect?: number;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      topic_progress: {
        Row: {
          id: string;
          user_id: string;
          topic_id: number;
          exercises_completed: number;
          exercises_correct: number;
          last_practiced: string | null;
          mastery_level: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          topic_id: number;
          exercises_completed?: number;
          exercises_correct?: number;
          last_practiced?: string | null;
          mastery_level?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          topic_id?: number;
          exercises_completed?: number;
          exercises_correct?: number;
          last_practiced?: string | null;
          mastery_level?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      daily_stats: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          exercises_done: number;
          correct: number;
          minutes_practiced: number;
          streak_days: number;
          xp_earned: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          exercises_done?: number;
          correct?: number;
          minutes_practiced?: number;
          streak_days?: number;
          xp_earned?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          exercises_done?: number;
          correct?: number;
          minutes_practiced?: number;
          streak_days?: number;
          xp_earned?: number;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// Helper types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];
