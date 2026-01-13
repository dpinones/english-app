import { Exercise } from '@/types';
import { a1PresentBeExercises } from './a1-present-be';
import { a1PresentSimpleExercises } from './a1-present-simple';
import { a1PresentContinuousExercises } from './a1-present-continuous';
import { a1SimpleVsContinuousExercises } from './a1-simple-vs-continuous';
import { a1HaveGotExercises } from './a1-have-got';
import { a1WasWereExercises } from './a1-was-were';
import { a1PastSimpleExercises } from './a1-past-simple';
import { a1PastQuestionsExercises } from './a1-past-questions';

// ==========================================
// BANCO DE EJERCICIOS
// ==========================================

// Todos los ejercicios indexados por topicId
// Mapeo basado en la posicion en topics.ts:
// 1: Present simple forms of 'to be'
// 2: Present simple: I do, I don't, Do I?
// 3: Present continuous
// 4: Present simple or present continuous?
// 7: Have got
// 13: Was/were: Past simple of 'be'
// 14: Past simple: Regular/irregular verbs
// 15: Past simple: Negatives and questions
export const exercisesByTopic: Record<number, Exercise[]> = {
  1: a1PresentBeExercises,
  2: a1PresentSimpleExercises,
  3: a1PresentContinuousExercises,
  4: a1SimpleVsContinuousExercises,
  7: a1HaveGotExercises,
  13: a1WasWereExercises,
  14: a1PastSimpleExercises,
  15: a1PastQuestionsExercises,
};

// Obtener ejercicios por tema
export function getExercisesByTopic(topicId: number): Exercise[] {
  return exercisesByTopic[topicId] || [];
}

// Obtener ejercicio por ID
export function getExerciseById(exerciseId: string): Exercise | undefined {
  for (const exercises of Object.values(exercisesByTopic)) {
    const found = exercises.find(e => e.id === exerciseId);
    if (found) return found;
  }
  return undefined;
}

// Obtener total de ejercicios para un tema
export function getExerciseCount(topicId: number): number {
  return (exercisesByTopic[topicId] || []).length;
}

// Obtener ejercicios aleatorios de un tema
export function getRandomExercises(topicId: number, count: number): Exercise[] {
  const exercises = exercisesByTopic[topicId] || [];
  const shuffled = [...exercises].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Estadisticas de ejercicios
export const exerciseStats = {
  totalExercises: Object.values(exercisesByTopic).flat().length,
  topicsWithExercises: Object.keys(exercisesByTopic).length,
};

// Export individual collections
export {
  a1PresentBeExercises,
  a1PresentSimpleExercises,
  a1PresentContinuousExercises,
  a1SimpleVsContinuousExercises,
  a1HaveGotExercises,
  a1WasWereExercises,
  a1PastSimpleExercises,
  a1PastQuestionsExercises,
};
