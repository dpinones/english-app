import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Level,
  SRSItem,
  TopicProgress,
  DailyStats,
  SRSQuality,
} from '@/types';
import {
  calculateNextReview,
  createSRSItem,
  isDue,
  sortItemsForReview,
} from '@/lib/srs/algorithm';
import { topics } from '@/data/topics';
import {
  isSupabaseConfigured,
  syncUserProgress,
  syncTopicProgress,
  syncDailyStats,
  fetchAllProgress,
} from '@/lib/supabase';

// ==========================================
// ESTADO DEL PROGRESO
// ==========================================

interface ProgressState {
  // Usuario
  currentLevel: Level;
  xpPoints: number;
  streakDays: number;
  lastPracticeDate: string | null;

  // SRS Items
  srsItems: Record<string, SRSItem>; // key = exerciseId

  // Progreso por tema
  topicProgress: Record<number, TopicProgress>;

  // Estadisticas
  dailyStats: DailyStats[];
  todayStats: DailyStats;

  // Sesion actual
  currentSessionXP: number;
  currentSessionCorrect: number;
  currentSessionTotal: number;
}

interface ProgressActions {
  // SRS
  getSRSItem: (exerciseId: string) => SRSItem | null;
  updateSRSItem: (exerciseId: string, quality: SRSQuality) => void;
  getDueItems: () => SRSItem[];
  getDueCount: () => number;

  // Ejercicios
  recordExerciseResult: (
    exerciseId: string,
    topicId: number,
    isCorrect: boolean,
    quality: SRSQuality
  ) => void;

  // Progreso de tema
  getTopicProgress: (topicId: number) => TopicProgress;
  updateTopicProgress: (topicId: number, completed: number, total: number, correct: number) => void;
  unlockTopic: (topicId: number) => void;

  // Sesion
  startSession: () => void;
  endSession: () => void;

  // Streak
  updateStreak: () => void;

  // XP
  addXP: (amount: number) => void;

  // Supabase Sync
  syncWithSupabase: () => Promise<void>;
  loadFromSupabase: () => Promise<void>;

  // Reset
  resetProgress: () => void;
}

type ProgressStore = ProgressState & ProgressActions;

// Estado inicial
const getInitialTopicProgress = (): Record<number, TopicProgress> => {
  const progress: Record<number, TopicProgress> = {};

  topics.forEach((topic, index) => {
    progress[topic.id] = {
      topicId: topic.id,
      exercisesCompleted: 0,
      exercisesTotal: 10, // Estimado por defecto
      accuracy: 0,
      // Primer tema de A1 disponible, resto bloqueado
      status: index === 0 ? 'available' : 'locked',
    };
  });

  return progress;
};

const getTodayDateString = () => new Date().toISOString().split('T')[0];

const getInitialTodayStats = (): DailyStats => ({
  date: getTodayDateString(),
  exercisesDone: 0,
  correct: 0,
  minutesPracticed: 0,
});

// ==========================================
// STORE
// ==========================================

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      // Estado inicial
      currentLevel: 'A1',
      xpPoints: 0,
      streakDays: 0,
      lastPracticeDate: null,
      srsItems: {},
      topicProgress: getInitialTopicProgress(),
      dailyStats: [],
      todayStats: getInitialTodayStats(),
      currentSessionXP: 0,
      currentSessionCorrect: 0,
      currentSessionTotal: 0,

      // ==========================================
      // SRS ACTIONS
      // ==========================================

      getSRSItem: (exerciseId: string) => {
        return get().srsItems[exerciseId] || null;
      },

      updateSRSItem: (exerciseId: string, quality: SRSQuality) => {
        const { srsItems } = get();
        let item = srsItems[exerciseId];

        if (!item) {
          item = createSRSItem(exerciseId);
        }

        const updates = calculateNextReview(item, quality);
        const updatedItem: SRSItem = {
          ...item,
          ...updates,
          timesCorrect: quality >= 3 ? item.timesCorrect + 1 : item.timesCorrect,
          timesIncorrect: quality < 3 ? item.timesIncorrect + 1 : item.timesIncorrect,
        };

        set({
          srsItems: {
            ...srsItems,
            [exerciseId]: updatedItem,
          },
        });
      },

      getDueItems: () => {
        const { srsItems } = get();
        const dueItems = Object.values(srsItems).filter(isDue);
        return sortItemsForReview(dueItems);
      },

      getDueCount: () => {
        return get().getDueItems().length;
      },

      // ==========================================
      // EXERCISE ACTIONS
      // ==========================================

      recordExerciseResult: (
        exerciseId: string,
        topicId: number,
        isCorrect: boolean,
        quality: SRSQuality
      ) => {
        const { todayStats } = get();

        // Actualizar SRS
        get().updateSRSItem(exerciseId, quality);

        // Actualizar estadisticas del dia
        const today = getTodayDateString();
        const newTodayStats = todayStats.date === today ? todayStats : getInitialTodayStats();

        set({
          todayStats: {
            ...newTodayStats,
            date: today,
            exercisesDone: newTodayStats.exercisesDone + 1,
            correct: newTodayStats.correct + (isCorrect ? 1 : 0),
          },
          currentSessionTotal: get().currentSessionTotal + 1,
          currentSessionCorrect: get().currentSessionCorrect + (isCorrect ? 1 : 0),
        });

        // Agregar XP
        if (isCorrect) {
          get().addXP(10);
        }

        // Actualizar streak
        get().updateStreak();

        // Sync con Supabase (async, no bloqueante)
        const srsItem = get().srsItems[exerciseId];
        if (srsItem && isSupabaseConfigured()) {
          syncUserProgress({
            exerciseId: srsItem.exerciseId,
            topicId,
            easeFactor: srsItem.easeFactor,
            intervalDays: srsItem.intervalDays,
            repetitions: srsItem.repetitions,
            nextReview: srsItem.nextReviewDate,
            lastReview: srsItem.lastReviewDate || null,
            timesCorrect: srsItem.timesCorrect,
            timesIncorrect: srsItem.timesIncorrect,
            status: srsItem.status,
          }).then(success => {
            if (success) console.log('Synced to Supabase:', exerciseId);
          });
        }
      },

      // ==========================================
      // TOPIC PROGRESS
      // ==========================================

      getTopicProgress: (topicId: number) => {
        const { topicProgress } = get();
        return (
          topicProgress[topicId] || {
            topicId,
            exercisesCompleted: 0,
            exercisesTotal: 10,
            accuracy: 0,
            status: 'locked',
          }
        );
      },

      updateTopicProgress: (topicId: number, completed: number, total: number, correct: number) => {
        const { topicProgress } = get();
        const existing = topicProgress[topicId];
        const accuracy = completed > 0 ? Math.round((correct / completed) * 100) : 0;

        let status = existing?.status || 'available';
        if (completed >= total) {
          status = accuracy >= 80 ? 'mastered' : 'completed';
        } else if (completed > 0) {
          status = 'in_progress';
        }

        const now = new Date().toISOString();
        const updatedProgress = {
          topicId,
          exercisesCompleted: completed,
          exercisesTotal: total,
          accuracy,
          status,
          startedAt: existing?.startedAt || now,
          completedAt: status === 'completed' || status === 'mastered' ? now : undefined,
        };

        set({
          topicProgress: {
            ...topicProgress,
            [topicId]: updatedProgress,
          },
        });

        // Desbloquear siguiente tema si se completo este
        if (status === 'completed' || status === 'mastered') {
          const currentTopic = topics.find(t => t.id === topicId);
          if (currentTopic) {
            const nextTopic = topics.find(t => t.orderIndex === currentTopic.orderIndex + 1);
            if (nextTopic) {
              get().unlockTopic(nextTopic.id);
            }
          }
        }

        // Sync topic progress con Supabase
        if (isSupabaseConfigured()) {
          syncTopicProgress({
            topicId,
            exercisesCompleted: completed,
            exercisesCorrect: correct,
            lastPracticed: now,
            masteryLevel: accuracy,
          }).then(success => {
            if (success) console.log('Topic progress synced:', topicId);
          });
        }
      },

      unlockTopic: (topicId: number) => {
        const { topicProgress } = get();
        const existing = topicProgress[topicId];

        if (existing?.status === 'locked') {
          set({
            topicProgress: {
              ...topicProgress,
              [topicId]: {
                ...existing,
                status: 'available',
              },
            },
          });
        }
      },

      // ==========================================
      // SESSION
      // ==========================================

      startSession: () => {
        set({
          currentSessionXP: 0,
          currentSessionCorrect: 0,
          currentSessionTotal: 0,
        });
      },

      endSession: () => {
        const { dailyStats, todayStats, streakDays, currentSessionXP } = get();
        const today = getTodayDateString();

        // Guardar stats del dia si hay actividad
        if (todayStats.exercisesDone > 0) {
          const existingIndex = dailyStats.findIndex(s => s.date === today);
          if (existingIndex >= 0) {
            const newStats = [...dailyStats];
            newStats[existingIndex] = todayStats;
            set({ dailyStats: newStats });
          } else {
            set({ dailyStats: [...dailyStats, todayStats] });
          }

          // Sync daily stats con Supabase
          if (isSupabaseConfigured()) {
            syncDailyStats({
              date: today,
              exercisesDone: todayStats.exercisesDone,
              correct: todayStats.correct,
              minutesPracticed: todayStats.minutesPracticed,
              streakDays: streakDays,
              xpEarned: currentSessionXP,
            }).then(success => {
              if (success) console.log('Daily stats synced:', today);
            });
          }
        }
      },

      // ==========================================
      // STREAK
      // ==========================================

      updateStreak: () => {
        const { lastPracticeDate, streakDays } = get();
        const today = getTodayDateString();

        if (lastPracticeDate === today) {
          // Ya practico hoy, no cambiar streak
          return;
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toISOString().split('T')[0];

        let newStreak = streakDays;

        if (lastPracticeDate === yesterdayString) {
          // Practico ayer, incrementar streak
          newStreak = streakDays + 1;
        } else if (lastPracticeDate !== today) {
          // No practico ayer ni hoy, resetear streak
          newStreak = 1;
        }

        set({
          streakDays: newStreak,
          lastPracticeDate: today,
        });
      },

      // ==========================================
      // XP
      // ==========================================

      addXP: (amount: number) => {
        set(state => ({
          xpPoints: state.xpPoints + amount,
          currentSessionXP: state.currentSessionXP + amount,
        }));
      },

      // ==========================================
      // SUPABASE SYNC
      // ==========================================

      syncWithSupabase: async () => {
        if (!isSupabaseConfigured()) {
          console.log('Supabase not configured, skipping sync');
          return;
        }

        const { srsItems, topicProgress, todayStats } = get();
        const today = getTodayDateString();

        // Sync all SRS items
        const srsPromises = Object.values(srsItems).map(item =>
          syncUserProgress({
            exerciseId: item.exerciseId,
            topicId: 0, // Topic ID is stored in the exercise
            easeFactor: item.easeFactor,
            intervalDays: item.intervalDays,
            repetitions: item.repetitions,
            nextReview: item.nextReviewDate,
            lastReview: item.lastReviewDate || null,
            timesCorrect: item.timesCorrect,
            timesIncorrect: item.timesIncorrect,
            status: item.status,
          })
        );

        // Sync all topic progress
        const topicPromises = Object.values(topicProgress).map(tp =>
          syncTopicProgress({
            topicId: tp.topicId,
            exercisesCompleted: tp.exercisesCompleted,
            exercisesCorrect: Math.round(tp.exercisesCompleted * (tp.accuracy / 100)),
            lastPracticed: tp.completedAt || tp.startedAt || null,
            masteryLevel: tp.accuracy,
          })
        );

        // Sync today's stats
        if (todayStats.exercisesDone > 0) {
          await syncDailyStats({
            date: today,
            exercisesDone: todayStats.exercisesDone,
            correct: todayStats.correct,
            minutesPracticed: todayStats.minutesPracticed,
            streakDays: get().streakDays,
            xpEarned: get().currentSessionXP,
          });
        }

        await Promise.all([...srsPromises, ...topicPromises]);
        console.log('Sync with Supabase completed');
      },

      loadFromSupabase: async () => {
        if (!isSupabaseConfigured()) {
          console.log('Supabase not configured, using local storage only');
          return;
        }

        try {
          const data = await fetchAllProgress();
          if (!data) {
            console.log('No data from Supabase, using local storage');
            return;
          }

          // Convert Supabase data to local format
          const newSrsItems: Record<string, SRSItem> = {};
          data.userProgress.forEach(up => {
            newSrsItems[up.exerciseId] = {
              id: up.exerciseId,
              exerciseId: up.exerciseId,
              easeFactor: up.easeFactor,
              intervalDays: up.intervalDays,
              repetitions: up.repetitions,
              nextReviewDate: up.nextReview,
              lastReviewDate: up.lastReview || undefined,
              timesCorrect: up.timesCorrect,
              timesIncorrect: up.timesIncorrect,
              status: up.status as SRSItem['status'],
            };
          });

          const newTopicProgress: Record<number, TopicProgress> = { ...get().topicProgress };
          data.topicProgress.forEach(tp => {
            const accuracy = tp.exercisesCompleted > 0
              ? Math.round((tp.exercisesCorrect / tp.exercisesCompleted) * 100)
              : 0;

            let status: TopicProgress['status'] = 'available';
            if (tp.masteryLevel >= 80) status = 'mastered';
            else if (tp.exercisesCompleted > 0 && tp.masteryLevel >= 70) status = 'completed';
            else if (tp.exercisesCompleted > 0) status = 'in_progress';

            newTopicProgress[tp.topicId] = {
              topicId: tp.topicId,
              exercisesCompleted: tp.exercisesCompleted,
              exercisesTotal: newTopicProgress[tp.topicId]?.exercisesTotal || 10,
              accuracy,
              status,
              startedAt: tp.lastPracticed || undefined,
              completedAt: status === 'completed' || status === 'mastered' ? tp.lastPracticed || undefined : undefined,
            };
          });

          // Calculate total XP and streak from daily stats
          let totalXP = 0;
          let latestStreak = 0;
          if (data.dailyStats.length > 0) {
            totalXP = data.dailyStats.reduce((sum, ds) => sum + ds.xpEarned, 0);
            latestStreak = data.dailyStats[0]?.streakDays || 0;
          }

          set({
            srsItems: newSrsItems,
            topicProgress: newTopicProgress,
            xpPoints: totalXP || get().xpPoints,
            streakDays: latestStreak || get().streakDays,
          });

          console.log('Loaded progress from Supabase');
        } catch (error) {
          console.error('Error loading from Supabase:', error);
        }
      },

      // ==========================================
      // RESET
      // ==========================================

      resetProgress: () => {
        set({
          currentLevel: 'A1',
          xpPoints: 0,
          streakDays: 0,
          lastPracticeDate: null,
          srsItems: {},
          topicProgress: getInitialTopicProgress(),
          dailyStats: [],
          todayStats: getInitialTodayStats(),
          currentSessionXP: 0,
          currentSessionCorrect: 0,
          currentSessionTotal: 0,
        });
      },
    }),
    {
      name: 'english-progress-storage',
      partialize: (state) => ({
        currentLevel: state.currentLevel,
        xpPoints: state.xpPoints,
        streakDays: state.streakDays,
        lastPracticeDate: state.lastPracticeDate,
        srsItems: state.srsItems,
        topicProgress: state.topicProgress,
        dailyStats: state.dailyStats,
      }),
    }
  )
);
