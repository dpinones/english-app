'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, Badge, ProgressBar } from '@/components/ui';
import { useProgressStore } from '@/stores/progressStore';
import { topics, getTopicsByLevel } from '@/data/topics';
import { cn, formatXP } from '@/lib/utils';

// ==========================================
// DASHBOARD - PAGINA PRINCIPAL
// ==========================================

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const {
    currentLevel,
    xpPoints,
    streakDays,
    topicProgress,
    getDueCount,
  } = useProgressStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Evitar hydration mismatch
  if (!mounted) {
    return <DashboardSkeleton />;
  }

  const dueCount = getDueCount();
  const currentLevelTopics = getTopicsByLevel(currentLevel);
  const completedTopics = currentLevelTopics.filter(
    t => topicProgress[t.id]?.status === 'completed' || topicProgress[t.id]?.status === 'mastered'
  ).length;

  // Encontrar el siguiente tema disponible
  const nextTopic = topics.find(
    t => topicProgress[t.id]?.status === 'available' || topicProgress[t.id]?.status === 'in_progress'
  );

  return (
    <main className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">English Easy</h1>
              <p className="text-sm text-gray-500">Aprende con SVO</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Streak */}
              <div className="flex items-center gap-1 text-orange-500">
                <FireIcon />
                <span className="font-bold">{streakDays}</span>
              </div>
              {/* XP */}
              <div className="flex items-center gap-1 text-amber-500">
                <StarIcon />
                <span className="font-bold">{formatXP(xpPoints)}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Nivel actual */}
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Badge variant="level" level={currentLevel} size="lg">
                  {currentLevel}
                </Badge>
                <div>
                  <p className="font-semibold">Nivel {currentLevel}</p>
                  <p className="text-sm text-gray-500">
                    {completedTopics} de {currentLevelTopics.length} temas completados
                  </p>
                </div>
              </div>
            </div>
            <ProgressBar
              value={completedTopics}
              max={currentLevelTopics.length}
              color="blue"
              animated={false}
            />
          </CardContent>
        </Card>

        {/* Acciones rapidas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Continuar aprendiendo */}
          {nextTopic && (
            <Link href={`/learn/${nextTopic.id}`}>
              <Card interactive className="h-full bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-blue-100 text-sm mb-1">Continuar</p>
                      <h3 className="font-semibold text-lg mb-2">
                        {nextTopic.title.length > 40
                          ? nextTopic.title.substring(0, 40) + '...'
                          : nextTopic.title}
                      </h3>
                      <Badge className="bg-white/20 text-white">{nextTopic.level}</Badge>
                    </div>
                    <ArrowRightIcon className="w-6 h-6 text-blue-200" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          )}

          {/* Repaso diario */}
          <Link href="/practice">
            <Card
              interactive
              className={cn(
                "h-full",
                dueCount > 0
                  ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800"
              )}
            >
              <CardContent>
                <div className="flex items-start justify-between">
                  <div>
                    <p className={cn("text-sm mb-1", dueCount > 0 ? "text-amber-100" : "text-gray-500")}>
                      Repaso Diario
                    </p>
                    <h3 className="font-semibold text-lg mb-2">
                      {dueCount > 0 ? `${dueCount} ejercicios` : 'Todo al dia!'}
                    </h3>
                    {dueCount > 0 && (
                      <p className="text-amber-100 text-sm">Pendientes de repasar</p>
                    )}
                  </div>
                  <ClockIcon className={cn("w-6 h-6", dueCount > 0 ? "text-amber-200" : "text-gray-400")} />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Lista de temas */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Temas de {currentLevel}</h2>
            <Link href="/learn" className="text-blue-600 text-sm hover:underline">
              Ver todos
            </Link>
          </div>

          <div className="space-y-3">
            {currentLevelTopics.slice(0, 5).map((topic) => {
              const progress = topicProgress[topic.id];
              const isLocked = progress?.status === 'locked';
              const isCompleted = progress?.status === 'completed' || progress?.status === 'mastered';

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
                    <CardContent className="py-3">
                      <div className="flex items-center gap-3">
                        {/* Status icon */}
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center",
                          isLocked && "bg-gray-200 dark:bg-gray-700",
                          isCompleted && "bg-green-100 dark:bg-green-900/30",
                          !isLocked && !isCompleted && "bg-blue-100 dark:bg-blue-900/30"
                        )}>
                          {isLocked ? (
                            <LockIcon className="w-5 h-5 text-gray-400" />
                          ) : isCompleted ? (
                            <CheckIcon className="w-5 h-5 text-green-600" />
                          ) : (
                            <BookIcon className="w-5 h-5 text-blue-600" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            "font-medium truncate",
                            isLocked && "text-gray-400"
                          )}>
                            {topic.title}
                          </p>
                          {progress && progress.exercisesCompleted > 0 && (
                            <p className="text-sm text-gray-500">
                              {progress.exercisesCompleted}/{progress.exercisesTotal} ejercicios
                            </p>
                          )}
                        </div>

                        {/* Arrow */}
                        {!isLocked && (
                          <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Tip del dia */}
        <Card className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <CardContent>
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <LightbulbIcon className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="font-medium text-blue-800 dark:text-blue-300 mb-1">
                  Tip: La formula SVO
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  Cuando no sepas como empezar una oracion, piensa: <strong>Quien</strong> (Subject) + <strong>Hace</strong> (Verb) + <strong>Que</strong> (Object).
                  Por ejemplo: &quot;I am a programmer&quot; = Yo + soy + programador.
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
            <NavItem href="/" icon={<HomeIcon />} label="Inicio" active />
            <NavItem href="/learn" icon={<BookIcon />} label="Aprender" />
            <NavItem href="/practice" icon={<RefreshIcon />} label="Repasar" />
            <NavItem href="/progress" icon={<ChartIcon />} label="Progreso" />
          </div>
        </div>
      </nav>
    </main>
  );
}

// ==========================================
// COMPONENTES AUXILIARES
// ==========================================

function DashboardSkeleton() {
  return (
    <main className="min-h-screen pb-20">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
        </div>
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
function FireIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("w-6 h-6", className)} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function LightbulbIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
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
