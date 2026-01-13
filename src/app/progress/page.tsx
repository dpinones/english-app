'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, Badge, ProgressBar } from '@/components/ui';
import { useProgressStore } from '@/stores/progressStore';
import { getTopicsByLevel, topicCountByLevel } from '@/data/topics';
import { cn, formatXP } from '@/lib/utils';
import { Level } from '@/types';

// ==========================================
// PAGINA DE PROGRESO Y ESTADISTICAS
// ==========================================

const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B1+', 'B2'];

export default function ProgressPage() {
  const [mounted, setMounted] = useState(false);
  const {
    currentLevel,
    xpPoints,
    streakDays,
    topicProgress,
    srsItems,
    dailyStats,
  } = useProgressStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <PageSkeleton />;
  }

  // Calcular estadisticas generales
  const totalExercisesCompleted = Object.values(topicProgress).reduce(
    (acc, p) => acc + (p.exercisesCompleted || 0), 0
  );

  const totalSRSItems = Object.keys(srsItems).length;
  const masteredItems = Object.values(srsItems).filter(i => i.status === 'mastered').length;

  // Estadisticas por nivel
  const levelStats = LEVELS.map(level => {
    const topics = getTopicsByLevel(level);
    const completed = topics.filter(
      t => topicProgress[t.id]?.status === 'completed' || topicProgress[t.id]?.status === 'mastered'
    ).length;
    return {
      level,
      total: topics.length,
      completed,
      percentage: Math.round((completed / topics.length) * 100),
    };
  });

  // Ultimos 7 dias de actividad
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dateStr = date.toISOString().split('T')[0];
    const stats = dailyStats.find(d => d.date === dateStr);
    return {
      date: dateStr,
      day: date.toLocaleDateString('es', { weekday: 'short' }),
      exercisesDone: stats?.exercisesDone || 0,
      correct: stats?.correct || 0,
    };
  });

  const maxExercisesDay = Math.max(...last7Days.map(d => d.exercisesDone), 1);

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
            <h1 className="text-xl font-bold">Mi Progreso</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Stats principales */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="text-center py-4">
              <div className="text-3xl font-bold text-orange-500 mb-1">{streakDays}</div>
              <p className="text-sm text-gray-500">Dias de racha</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center py-4">
              <div className="text-3xl font-bold text-amber-500 mb-1">{formatXP(xpPoints)}</div>
              <p className="text-sm text-gray-500">XP Total</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center py-4">
              <div className="text-3xl font-bold text-blue-500 mb-1">{totalExercisesCompleted}</div>
              <p className="text-sm text-gray-500">Ejercicios</p>
            </CardContent>
          </Card>
        </div>

        {/* Nivel actual */}
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">Nivel actual</p>
                <p className="text-2xl font-bold">{currentLevel}</p>
              </div>
              <Badge variant="level" level={currentLevel} size="lg">
                {currentLevel}
              </Badge>
            </div>

            {/* Progreso por nivel */}
            <div className="space-y-4 mt-6">
              {levelStats.map(({ level, total, completed, percentage }) => (
                <div key={level}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={cn(
                      "font-medium",
                      level === currentLevel && "text-blue-600"
                    )}>
                      {level}
                    </span>
                    <span className="text-sm text-gray-500">
                      {completed}/{total} temas
                    </span>
                  </div>
                  <ProgressBar
                    value={completed}
                    max={total}
                    size="sm"
                    color={level === currentLevel ? "blue" : completed === total ? "green" : "blue"}
                    animated={false}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actividad semanal */}
        <Card>
          <CardContent>
            <h3 className="font-semibold mb-4">Actividad de la semana</h3>
            <div className="flex items-end justify-between gap-2 h-32">
              {last7Days.map((day, i) => (
                <div key={day.date} className="flex-1 flex flex-col items-center">
                  <div className="flex-1 w-full flex items-end">
                    <div
                      className={cn(
                        "w-full rounded-t transition-all",
                        day.exercisesDone > 0 ? "bg-blue-500" : "bg-gray-200 dark:bg-gray-700"
                      )}
                      style={{
                        height: `${(day.exercisesDone / maxExercisesDay) * 100}%`,
                        minHeight: day.exercisesDone > 0 ? '8px' : '4px',
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{day.day}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* SRS Stats */}
        <Card>
          <CardContent>
            <h3 className="font-semibold mb-4">Repeticion Espaciada</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                <p className="text-2xl font-bold text-blue-600">{totalSRSItems}</p>
                <p className="text-sm text-gray-500">Items en SRS</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-600">{masteredItems}</p>
                <p className="text-sm text-gray-500">Dominados</p>
              </div>
            </div>
            {totalSRSItems > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Progreso de dominio</p>
                <ProgressBar
                  value={masteredItems}
                  max={totalSRSItems}
                  color="green"
                  animated={false}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <CardContent>
            <div className="flex gap-3">
              <svg className="w-6 h-6 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-medium text-blue-800 dark:text-blue-300 mb-1">
                  Sobre el sistema SRS
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  Los ejercicios que completas se agregan al sistema de repeticion espaciada.
                  Apareceran para repaso en intervalos crecientes: 1 dia, 6 dias, 15 dias, etc.
                  Esto garantiza que recuerdes lo aprendido a largo plazo.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-around py-2">
            <NavItem href="/" icon={<HomeIcon />} label="Inicio" />
            <NavItem href="/learn" icon={<BookIcon />} label="Aprender" />
            <NavItem href="/practice" icon={<RefreshIcon />} label="Repasar" />
            <NavItem href="/progress" icon={<ChartIcon />} label="Progreso" active />
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
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
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
