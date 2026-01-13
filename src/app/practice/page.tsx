'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { SVOBuilder, FillBlank, SentenceOrder, MultipleChoice, TransformSentence, QuestionAnswer } from '@/components/exercises';
import { useProgressStore } from '@/stores/progressStore';
import { getExerciseById } from '@/data/exercises';
import { cn } from '@/lib/utils';
import { SRSItem, Exercise, SRSQuality } from '@/types';

// ==========================================
// PAGINA DE REPASO SRS
// ==========================================

export default function PracticePage() {
  const [mounted, setMounted] = useState(false);
  const [dueItems, setDueItems] = useState<SRSItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [showQualityButtons, setShowQualityButtons] = useState(false);
  const [lastResult, setLastResult] = useState<{ isCorrect: boolean; timeMs: number } | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const { getDueItems, updateSRSItem, startSession, addXP } = useProgressStore();

  useEffect(() => {
    setMounted(true);
    const items = getDueItems();
    setDueItems(items);
    startSession();
  }, [getDueItems, startSession]);

  const currentItem = dueItems[currentIndex];
  const currentExercise = currentItem ? getExerciseById(currentItem.exerciseId) : null;

  const handleExerciseComplete = useCallback((isCorrect: boolean, answer: string, timeMs: number) => {
    setLastResult({ isCorrect, timeMs });
    setSessionTotal(prev => prev + 1);
    if (isCorrect) {
      setSessionCorrect(prev => prev + 1);
      addXP(10);
    }
    setShowQualityButtons(true);
  }, [addXP]);

  const handleQualitySelect = useCallback((quality: SRSQuality) => {
    if (!currentItem) return;

    // Actualizar SRS
    updateSRSItem(currentItem.exerciseId, quality);

    // Resetear estado y pasar al siguiente
    setShowQualityButtons(false);
    setLastResult(null);

    if (currentIndex < dueItems.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  }, [currentItem, currentIndex, dueItems.length, updateSRSItem]);

  if (!mounted) {
    return <PageSkeleton />;
  }

  // Sin items para repasar
  if (dueItems.length === 0) {
    return (
      <main className="min-h-screen pb-20">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-12">
          <Card>
            <CardContent className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Todo al dia!</h2>
              <p className="text-gray-500 mb-6">
                No tienes ejercicios pendientes de repasar. Vuelve manana o aprende nuevos temas.
              </p>
              <Link href="/learn">
                <Button>Aprender mas</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <BottomNav />
      </main>
    );
  }

  // Sesion completada
  if (isComplete) {
    const accuracy = sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : 0;

    return (
      <main className="min-h-screen pb-20">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-8">
          <Card>
            <CardContent className="text-center py-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h2 className="text-2xl font-bold mb-2">Repaso completado!</h2>
              <p className="text-gray-500 mb-6">Has revisado todos los ejercicios pendientes.</p>

              {/* Estadisticas */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{sessionTotal}</p>
                  <p className="text-sm text-gray-500">Repasados</p>
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

              <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <p className="text-amber-600 font-medium">
                  +{sessionCorrect * 10} XP ganados
                </p>
              </div>

              <Link href="/">
                <Button>Volver al inicio</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <BottomNav />
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-20">
      {/* Header con progreso */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Link>
            <h1 className="font-semibold">Repaso Diario</h1>
            <Badge variant="outline">
              {currentIndex + 1}/{dueItems.length}
            </Badge>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${((currentIndex) / dueItems.length) * 100}%` }}
          />
        </div>
      </header>

      {/* Ejercicio */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {currentExercise && !showQualityButtons && (
          <ExerciseRenderer
            exercise={currentExercise}
            onComplete={handleExerciseComplete}
          />
        )}

        {/* Botones de calidad SRS */}
        {showQualityButtons && (
          <Card>
            <CardContent className="py-8">
              <div className="text-center mb-6">
                <div className={cn(
                  "w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center",
                  lastResult?.isCorrect ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"
                )}>
                  {lastResult?.isCorrect ? (
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
                <p className="text-lg font-medium mb-2">
                  {lastResult?.isCorrect ? 'Correcto!' : 'Incorrecto'}
                </p>
                <p className="text-gray-500">Como de dificil fue recordar esto?</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => handleQualitySelect(0)}
                  className="p-4 rounded-lg border-2 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <p className="font-medium text-red-600">Again</p>
                  <p className="text-xs text-gray-500">1 dia</p>
                </button>
                <button
                  onClick={() => handleQualitySelect(2)}
                  className="p-4 rounded-lg border-2 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
                >
                  <p className="font-medium text-amber-600">Hard</p>
                  <p className="text-xs text-gray-500">1 dia</p>
                </button>
                <button
                  onClick={() => handleQualitySelect(3)}
                  className="p-4 rounded-lg border-2 border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                >
                  <p className="font-medium text-green-600">Good</p>
                  <p className="text-xs text-gray-500">Normal</p>
                </button>
                <button
                  onClick={() => handleQualitySelect(4)}
                  className="p-4 rounded-lg border-2 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <p className="font-medium text-blue-600">Easy</p>
                  <p className="text-xs text-gray-500">Mas tiempo</p>
                </button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNav />
    </main>
  );
}

// Componente para renderizar ejercicios
function ExerciseRenderer({ exercise, onComplete }: {
  exercise: Exercise;
  onComplete: (isCorrect: boolean, answer: string, timeMs: number) => void;
}) {
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
            <p className="text-gray-500">Tipo de ejercicio no soportado</p>
          </CardContent>
        </Card>
      );
  }
}

function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-xl font-bold">Repaso Diario</h1>
        </div>
      </div>
    </header>
  );
}

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-around py-2">
          <NavItem href="/" icon={<HomeIcon />} label="Inicio" />
          <NavItem href="/learn" icon={<BookIcon />} label="Aprender" />
          <NavItem href="/practice" icon={<RefreshIcon />} label="Repasar" active />
          <NavItem href="/progress" icon={<ChartIcon />} label="Progreso" />
        </div>
      </div>
    </nav>
  );
}

function NavItem({ href, icon, label, active = false }: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors",
        active ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
      )}
    >
      <span className="w-6 h-6">{icon}</span>
      <span className="text-xs">{label}</span>
    </Link>
  );
}

function PageSkeleton() {
  return (
    <main className="min-h-screen">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </header>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
      </div>
    </main>
  );
}

// Icons
function HomeIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}
