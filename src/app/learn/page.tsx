'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, Badge, ProgressBar } from '@/components/ui';
import { useProgressStore } from '@/stores/progressStore';
import { topics, getTopicsByLevel } from '@/data/topics';
import { cn } from '@/lib/utils';
import { Level } from '@/types';

// ==========================================
// PAGINA DE TODOS LOS TEMAS
// ==========================================

const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B1+', 'B2'];

export default function LearnPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<Level>('A1');
  const { topicProgress, currentLevel } = useProgressStore();

  useEffect(() => {
    setMounted(true);
    setSelectedLevel(currentLevel);
  }, [currentLevel]);

  if (!mounted) {
    return <PageSkeleton />;
  }

  const levelTopics = getTopicsByLevel(selectedLevel);
  const completedCount = levelTopics.filter(
    t => topicProgress[t.id]?.status === 'completed' || topicProgress[t.id]?.status === 'mastered'
  ).length;

  return (
    <main className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-xl font-bold">Aprender</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Selector de nivel */}
        <div className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4">
          {LEVELS.map((level) => {
            const levelTopicsAll = getTopicsByLevel(level);
            const completed = levelTopicsAll.filter(
              t => topicProgress[t.id]?.status === 'completed' || topicProgress[t.id]?.status === 'mastered'
            ).length;
            const isSelected = selectedLevel === level;

            return (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={cn(
                  "flex-shrink-0 px-4 py-2 rounded-lg font-medium transition-all",
                  isSelected
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                <span>{level}</span>
                <span className="ml-2 text-xs opacity-75">
                  {completed}/{levelTopicsAll.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Progreso del nivel */}
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Progreso de {selectedLevel}</span>
              <span className="text-sm text-gray-500">
                {completedCount} de {levelTopics.length} temas
              </span>
            </div>
            <ProgressBar
              value={completedCount}
              max={levelTopics.length}
              color="blue"
              animated={false}
            />
          </CardContent>
        </Card>

        {/* Lista de temas */}
        <div className="space-y-3">
          {levelTopics.map((topic, index) => {
            const progress = topicProgress[topic.id];
            const isLocked = progress?.status === 'locked';
            const isCompleted = progress?.status === 'completed' || progress?.status === 'mastered';
            const isInProgress = progress?.status === 'in_progress';

            return (
              <Link
                key={topic.id}
                href={isLocked ? '#' : `/learn/${topic.id}`}
                className={cn(isLocked && 'pointer-events-none')}
              >
                <Card
                  interactive={!isLocked}
                  className={cn(
                    "transition-all",
                    isLocked && "opacity-50"
                  )}
                >
                  <CardContent className="py-4">
                    <div className="flex items-center gap-4">
                      {/* Numero */}
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm",
                        isLocked && "bg-gray-200 dark:bg-gray-700 text-gray-400",
                        isCompleted && "bg-green-100 dark:bg-green-900/30 text-green-600",
                        isInProgress && "bg-blue-100 dark:bg-blue-900/30 text-blue-600",
                        !isLocked && !isCompleted && !isInProgress && "bg-gray-100 dark:bg-gray-700 text-gray-600"
                      )}>
                        {isCompleted ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : isLocked ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        ) : (
                          index + 1
                        )}
                      </div>

                      {/* Contenido */}
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          "font-medium",
                          isLocked && "text-gray-400"
                        )}>
                          {topic.title}
                        </p>
                        {progress && progress.exercisesCompleted > 0 && (
                          <div className="mt-1">
                            <ProgressBar
                              value={progress.exercisesCompleted}
                              max={progress.exercisesTotal}
                              size="sm"
                              color={isCompleted ? "green" : "blue"}
                              animated={false}
                            />
                          </div>
                        )}
                      </div>

                      {/* Status badge */}
                      {isInProgress && (
                        <Badge color="blue">En progreso</Badge>
                      )}
                      {isCompleted && (
                        <Badge color="green">Completado</Badge>
                      )}

                      {/* Arrow */}
                      {!isLocked && (
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-around py-2">
            <NavItem href="/" icon={<HomeIcon />} label="Inicio" />
            <NavItem href="/learn" icon={<BookIcon />} label="Aprender" active />
            <NavItem href="/practice" icon={<RefreshIcon />} label="Repasar" />
            <NavItem href="/progress" icon={<ChartIcon />} label="Progreso" />
          </div>
        </div>
      </nav>
    </main>
  );
}

function PageSkeleton() {
  return (
    <main className="min-h-screen pb-20">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
        ))}
      </div>
    </main>
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
