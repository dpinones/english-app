import { SRSItem, SRSQuality, SRSStatus } from '@/types';

// ==========================================
// FUNCIONES DE FECHA (sin dependencias)
// ==========================================

function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// ==========================================
// ALGORITMO SM-2 SIMPLIFICADO
// ==========================================

/**
 * Calcula el nuevo estado de un item SRS despues de un repaso.
 * Basado en el algoritmo SuperMemo 2 (SM-2).
 *
 * @param item - Estado actual del item
 * @param quality - Calidad de la respuesta (0, 2, 3, 4)
 * @returns Nuevo estado del item
 */
export function calculateNextReview(
  item: SRSItem,
  quality: SRSQuality
): Partial<SRSItem> {
  let { easeFactor, intervalDays, repetitions } = item;
  const now = new Date().toISOString();

  // Si la calidad es menor a 3, el usuario fallo - reiniciar
  if (quality < 3) {
    repetitions = 0;
    intervalDays = 1; // Revisar manana
  } else {
    // Respuesta exitosa - incrementar repeticiones
    repetitions += 1;

    // Calcular nuevo intervalo
    if (repetitions === 1) {
      intervalDays = 1;      // Primera vez correcta: 1 dia
    } else if (repetitions === 2) {
      intervalDays = 6;      // Segunda vez: 6 dias
    } else {
      // Posteriores: intervalo * easeFactor
      intervalDays = Math.round(intervalDays * easeFactor);
    }
  }

  // Actualizar factor de facilidad usando formula SM-2
  // EF' = EF + (0.1 - (5-q) * (0.08 + (5-q) * 0.02))
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  // Limitar easeFactor entre 1.3 y 2.5
  easeFactor = Math.max(1.3, Math.min(2.5, easeFactor));

  // Calcular proxima fecha de repaso
  const nextReviewDate = addDays(startOfDay(new Date()), intervalDays).toISOString();

  // Determinar estado
  const status = getItemStatus(repetitions, intervalDays);

  return {
    easeFactor: Number(easeFactor.toFixed(2)),
    intervalDays,
    repetitions,
    nextReviewDate,
    lastReviewDate: now,
    status,
  };
}

/**
 * Determina el estado de un item basado en sus repeticiones e intervalo.
 */
export function getItemStatus(repetitions: number, intervalDays: number): SRSStatus {
  if (repetitions === 0) return 'new';
  if (repetitions < 3) return 'learning';
  if (intervalDays >= 21) return 'mastered'; // 3+ semanas = dominado
  return 'review';
}

/**
 * Crea un nuevo item SRS para un ejercicio.
 */
export function createSRSItem(exerciseId: string): SRSItem {
  return {
    id: crypto.randomUUID(),
    exerciseId,
    easeFactor: 2.5,
    intervalDays: 0,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    timesCorrect: 0,
    timesIncorrect: 0,
    status: 'new',
  };
}

/**
 * Verifica si un item esta pendiente de repaso (vencido o para hoy).
 */
export function isDue(item: SRSItem): boolean {
  const today = startOfDay(new Date());
  const reviewDate = startOfDay(new Date(item.nextReviewDate));
  return reviewDate.getTime() <= today.getTime();
}

/**
 * Calcula cuantos dias de retraso tiene un item.
 */
export function getOverdueDays(item: SRSItem): number {
  const today = startOfDay(new Date());
  const reviewDate = startOfDay(new Date(item.nextReviewDate));

  if (reviewDate.getTime() > today.getTime()) return 0;

  const diffTime = today.getTime() - reviewDate.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Ordena items para una sesion de repaso.
 * Prioridad: items vencidos primero, luego por fecha.
 */
export function sortItemsForReview(items: SRSItem[]): SRSItem[] {
  return [...items].sort((a, b) => {
    const aOverdue = getOverdueDays(a);
    const bOverdue = getOverdueDays(b);

    // Items mas vencidos primero
    if (aOverdue !== bOverdue) {
      return bOverdue - aOverdue;
    }

    // Luego items nuevos
    if (a.status === 'new' && b.status !== 'new') return -1;
    if (b.status === 'new' && a.status !== 'new') return 1;

    // Finalmente por fecha de proximo repaso
    return new Date(a.nextReviewDate).getTime() - new Date(b.nextReviewDate).getTime();
  });
}

/**
 * Mapea resultado de ejercicio a calidad SRS.
 */
export function mapResultToQuality(
  isCorrect: boolean,
  responseTimeMs: number,
  usedHint: boolean = false
): SRSQuality {
  if (!isCorrect) {
    return 0; // Again
  }

  if (usedHint) {
    return 2; // Hard - necesito ayuda
  }

  // Respuesta rapida (< 5 segundos) sin ayuda
  if (responseTimeMs < 5000) {
    return 4; // Easy
  }

  return 3; // Good
}

/**
 * Tabla de intervalos para referencia.
 *
 * Con quality=3 (Good) y easeFactor=2.5:
 * - Repaso 1: 1 dia
 * - Repaso 2: 6 dias
 * - Repaso 3: ~15 dias (6 * 2.5)
 * - Repaso 4: ~38 dias
 * - Repaso 5: ~95 dias
 * - Repaso 6: ~238 dias (~8 meses)
 */
export const INTERVAL_REFERENCE = {
  'again': 1,
  'hard': 1,
  'good_first': 1,
  'good_second': 6,
  'easy_boost': 1.3, // Multiplica el intervalo calculado
};
