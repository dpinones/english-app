import { supabase, isSupabaseConfigured, DEFAULT_USER_ID } from './client';

// ==========================================
// SUPABASE SYNC SERVICE
// Sincroniza el progreso local con Supabase
// ==========================================

interface SyncProgress {
  exerciseId: string;
  topicId: number;
  easeFactor: number;
  intervalDays: number;
  repetitions: number;
  nextReview: string;
  lastReview: string | null;
  timesCorrect: number;
  timesIncorrect: number;
  status: string;
}

interface SyncTopicProgress {
  topicId: number;
  exercisesCompleted: number;
  exercisesCorrect: number;
  lastPracticed: string | null;
  masteryLevel: number;
}

interface SyncDailyStats {
  date: string;
  exercisesDone: number;
  correct: number;
  minutesPracticed: number;
  streakDays: number;
  xpEarned: number;
}

// ==========================================
// USER PROGRESS SYNC
// ==========================================

export async function syncUserProgress(progress: SyncProgress): Promise<boolean> {
  if (!isSupabaseConfigured() || !supabase) {
    console.log('Supabase not configured, skipping sync');
    return false;
  }

  try {
    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: DEFAULT_USER_ID,
        exercise_id: progress.exerciseId,
        ease_factor: progress.easeFactor,
        interval_days: progress.intervalDays,
        repetitions: progress.repetitions,
        next_review: progress.nextReview,
        last_review: progress.lastReview,
        times_correct: progress.timesCorrect,
        times_incorrect: progress.timesIncorrect,
        status: progress.status,
      }, {
        onConflict: 'user_id,exercise_id',
      });

    if (error) {
      console.error('Error syncing user progress:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error syncing user progress:', error);
    return false;
  }
}

export async function fetchUserProgress(): Promise<SyncProgress[] | null> {
  if (!isSupabaseConfigured() || !supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', DEFAULT_USER_ID);

    if (error) {
      console.error('Error fetching user progress:', error);
      return null;
    }

    return data?.map(row => ({
      exerciseId: row.exercise_id,
      topicId: 0, // Will be populated from exercises table
      easeFactor: row.ease_factor,
      intervalDays: row.interval_days,
      repetitions: row.repetitions,
      nextReview: row.next_review,
      lastReview: row.last_review,
      timesCorrect: row.times_correct,
      timesIncorrect: row.times_incorrect,
      status: row.status,
    })) || [];
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return null;
  }
}

// ==========================================
// TOPIC PROGRESS SYNC
// ==========================================

export async function syncTopicProgress(progress: SyncTopicProgress): Promise<boolean> {
  if (!isSupabaseConfigured() || !supabase) {
    return false;
  }

  try {
    const { error } = await supabase
      .from('topic_progress')
      .upsert({
        user_id: DEFAULT_USER_ID,
        topic_id: progress.topicId,
        exercises_completed: progress.exercisesCompleted,
        exercises_correct: progress.exercisesCorrect,
        last_practiced: progress.lastPracticed,
        mastery_level: progress.masteryLevel,
      }, {
        onConflict: 'user_id,topic_id',
      });

    if (error) {
      console.error('Error syncing topic progress:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error syncing topic progress:', error);
    return false;
  }
}

export async function fetchTopicProgress(): Promise<SyncTopicProgress[] | null> {
  if (!isSupabaseConfigured() || !supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('topic_progress')
      .select('*')
      .eq('user_id', DEFAULT_USER_ID);

    if (error) {
      console.error('Error fetching topic progress:', error);
      return null;
    }

    return data?.map(row => ({
      topicId: row.topic_id,
      exercisesCompleted: row.exercises_completed,
      exercisesCorrect: row.exercises_correct,
      lastPracticed: row.last_practiced,
      masteryLevel: row.mastery_level,
    })) || [];
  } catch (error) {
    console.error('Error fetching topic progress:', error);
    return null;
  }
}

// ==========================================
// DAILY STATS SYNC
// ==========================================

export async function syncDailyStats(stats: SyncDailyStats): Promise<boolean> {
  if (!isSupabaseConfigured() || !supabase) {
    return false;
  }

  try {
    const { error } = await supabase
      .from('daily_stats')
      .upsert({
        user_id: DEFAULT_USER_ID,
        date: stats.date,
        exercises_done: stats.exercisesDone,
        correct: stats.correct,
        minutes_practiced: stats.minutesPracticed,
        streak_days: stats.streakDays,
        xp_earned: stats.xpEarned,
      }, {
        onConflict: 'user_id,date',
      });

    if (error) {
      console.error('Error syncing daily stats:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error syncing daily stats:', error);
    return false;
  }
}

export async function fetchDailyStats(days: number = 30): Promise<SyncDailyStats[] | null> {
  if (!isSupabaseConfigured() || !supabase) {
    return null;
  }

  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabase
      .from('daily_stats')
      .select('*')
      .eq('user_id', DEFAULT_USER_ID)
      .gte('date', startDate.toISOString().split('T')[0])
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching daily stats:', error);
      return null;
    }

    return data?.map(row => ({
      date: row.date,
      exercisesDone: row.exercises_done,
      correct: row.correct,
      minutesPracticed: row.minutes_practiced,
      streakDays: row.streak_days,
      xpEarned: row.xp_earned,
    })) || [];
  } catch (error) {
    console.error('Error fetching daily stats:', error);
    return null;
  }
}

// ==========================================
// FETCH DUE EXERCISES
// ==========================================

export async function fetchDueExercises(): Promise<string[] | null> {
  if (!isSupabaseConfigured() || !supabase) {
    return null;
  }

  try {
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('user_progress')
      .select('exercise_id')
      .eq('user_id', DEFAULT_USER_ID)
      .lte('next_review', today);

    if (error) {
      console.error('Error fetching due exercises:', error);
      return null;
    }

    return data?.map(row => row.exercise_id) || [];
  } catch (error) {
    console.error('Error fetching due exercises:', error);
    return null;
  }
}

// ==========================================
// FULL SYNC
// ==========================================

export interface FullSyncData {
  userProgress: SyncProgress[];
  topicProgress: SyncTopicProgress[];
  dailyStats: SyncDailyStats[];
}

export async function fetchAllProgress(): Promise<FullSyncData | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const [userProgress, topicProgress, dailyStats] = await Promise.all([
    fetchUserProgress(),
    fetchTopicProgress(),
    fetchDailyStats(30),
  ]);

  if (!userProgress || !topicProgress || !dailyStats) {
    return null;
  }

  return {
    userProgress,
    topicProgress,
    dailyStats,
  };
}
