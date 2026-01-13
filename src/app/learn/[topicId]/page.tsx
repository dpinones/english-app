'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, Button, Badge, ProgressBar } from '@/components/ui';
import { SVOBuilder, FillBlank, SentenceOrder, MultipleChoice, TransformSentence, QuestionAnswer } from '@/components/exercises';
import { useProgressStore } from '@/stores/progressStore';
import { getTopicById } from '@/data/topics';
import { getExercisesByTopic } from '@/data/exercises';
import { mapResultToQuality } from '@/lib/srs/algorithm';
import { cn } from '@/lib/utils';
import { Exercise, ExerciseType } from '@/types';

// ==========================================
// PAGINA DE EJERCICIOS DE UN TEMA
// ==========================================

export default function TopicExercisesPage() {
  const params = useParams();
  const router = useRouter();
  const topicId = parseInt(params.topicId as string);

  const [mounted, setMounted] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const { recordExerciseResult, updateTopicProgress, startSession } = useProgressStore();

  const topic = getTopicById(topicId);

  useEffect(() => {
    setMounted(true);
    const topicExercises = getExercisesByTopic(topicId);
    setExercises(topicExercises);
    startSession();
  }, [topicId, startSession]);

  const currentExercise = exercises[currentIndex];

  const handleExerciseComplete = useCallback((isCorrect: boolean, answer: string, timeMs: number) => {
    if (!currentExercise) return;

    const quality = mapResultToQuality(isCorrect, timeMs);

    // Registrar resultado
    recordExerciseResult(currentExercise.id, topicId, isCorrect, quality);

    // Actualizar contadores de sesion
    setSessionTotal(prev => prev + 1);
    if (isCorrect) {
      setSessionCorrect(prev => prev + 1);
    }

    // Esperar un momento y pasar al siguiente
    setTimeout(() => {
      if (currentIndex < exercises.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        // Sesion completada
        setIsComplete(true);
        updateTopicProgress(
          topicId,
          sessionTotal + 1,
          exercises.length,
          sessionCorrect + (isCorrect ? 1 : 0)
        );
      }
    }, 1500);
  }, [currentExercise, currentIndex, exercises.length, recordExerciseResult, topicId, sessionCorrect, sessionTotal, updateTopicProgress]);

  if (!mounted || !topic) {
    return <PageSkeleton />;
  }

  if (exercises.length === 0) {
    return (
      <main className="min-h-screen p-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500 mb-4">No hay ejercicios disponibles para este tema todavia.</p>
              <Link href="/">
                <Button>Volver al inicio</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  // Pantalla de completado
  if (isComplete) {
    const accuracy = Math.round((sessionCorrect / sessionTotal) * 100);
    const isPassing = accuracy >= 70;

    return (
      <main className="min-h-screen p-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="text-center py-8">
              {/* Icono */}
              <div className={cn(
                "w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center",
                isPassing ? "bg-green-100 dark:bg-green-900/30" : "bg-amber-100 dark:bg-amber-900/30"
              )}>
                {isPassing ? (
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )}
              </div>

              {/* Titulo */}
              <h2 className="text-2xl font-bold mb-2">
                {isPassing ? 'Excelente!' : 'Sigue practicando!'}
              </h2>
              <p className="text-gray-500 mb-6">
                {isPassing
                  ? 'Has completado este tema con exito.'
                  : 'Necesitas mas practica en este tema.'}
              </p>

              {/* Estadisticas */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{sessionTotal}</p>
                  <p className="text-sm text-gray-500">Ejercicios</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{sessionCorrect}</p>
                  <p className="text-sm text-gray-500">Correctos</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className={cn(
                    "text-2xl font-bold",
                    accuracy >= 80 ? "text-green-600" : accuracy >= 60 ? "text-amber-600" : "text-red-600"
                  )}>
                    {accuracy}%
                  </p>
                  <p className="text-sm text-gray-500">Precision</p>
                </div>
              </div>

              {/* XP ganados */}
              <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <p className="text-amber-600 font-medium">
                  +{sessionCorrect * 10} XP ganados
                </p>
              </div>

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" onClick={() => {
                  setCurrentIndex(0);
                  setSessionCorrect(0);
                  setSessionTotal(0);
                  setIsComplete(false);
                }}>
                  Repetir tema
                </Button>
                <Link href="/">
                  <Button>Continuar</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-4">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex-1">
              <p className="text-sm text-gray-500">{topic.level}</p>
              <h1 className="font-semibold truncate">{topic.title}</h1>
            </div>
            <Badge variant="outline">
              {currentIndex + 1}/{exercises.length}
            </Badge>
          </div>
        </div>

        {/* Progress bar */}
        <ProgressBar
          value={currentIndex}
          max={exercises.length}
          size="sm"
          color="blue"
          animated={false}
          className="rounded-none"
        />
      </header>

      {/* Ejercicio actual */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {currentExercise && (
          <ExerciseRenderer
            exercise={currentExercise}
            onComplete={handleExerciseComplete}
          />
        )}
      </div>
    </main>
  );
}

// ==========================================
// COMPONENTE PARA RENDERIZAR EJERCICIOS
// ==========================================

interface ExerciseRendererProps {
  exercise: Exercise;
  onComplete: (isCorrect: boolean, answer: string, timeMs: number) => void;
}

function ExerciseRenderer({ exercise, onComplete }: ExerciseRendererProps) {
  switch (exercise.type) {
    case 'svo_builder':
      return <SVOBuilder exercise={exercise} onComplete={onComplete} />;
    case 'fill_blank':
      return <FillBlank exercise={exercise} onComplete={onComplete} />;
    case 'sentence_order':
      return <SentenceOrder exercise={exercise} onComplete={onComplete} />;
    case 'multiple_choice':
      return <MultipleChoice exercise={exercise} onComplete={onComplete} />;
    case 'transform':
      return <TransformSentence exercise={exercise} onComplete={onComplete} />;
    case 'question_answer':
      return <QuestionAnswer exercise={exercise} onComplete={onComplete} />;
    default:
      return (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">
              Tipo de ejercicio no soportado: {exercise.type}
            </p>
          </CardContent>
        </Card>
      );
  }
}

function PageSkeleton() {
  return (
    <main className="min-h-screen">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </header>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
      </div>
    </main>
  );
}
