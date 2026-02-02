'use client';

import { useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { TransformExercise } from '@/types';

// ==========================================
// TRANSFORM SENTENCE - TRANSFORMAR ORACIONES
// Convertir afirmativa a pregunta, negativa, etc.
// ==========================================

interface TransformSentenceProps {
  exercise: TransformExercise;
  onComplete: (isCorrect: boolean, answer: string, timeMs: number) => void;
}

export function TransformSentence({ exercise, onComplete }: TransformSentenceProps) {
  const { content, prompt } = exercise;
  const [userAnswer, setUserAnswer] = useState('');
  const [startTime, setStartTime] = useState(Date.now());
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Reset state when exercise changes
  useEffect(() => {
    setUserAnswer('');
    setStartTime(Date.now());
    setShowFeedback(false);
    setIsCorrect(false);
  }, [exercise.id]);

  const getTargetLabel = () => {
    switch (content.targetType) {
      case 'question': return 'PREGUNTA';
      case 'negative': return 'NEGATIVA';
      case 'affirmative': return 'AFIRMATIVA';
      default: return (content.targetType as string).toUpperCase();
    }
  };

  const normalizeAnswer = (answer: string): string => {
    return answer
      .toLowerCase()
      .trim()
      .replace(/[?.!,]/g, '')
      .replace(/\s+/g, ' ')
      .replace(/n't/g, ' not')
      .replace(/don't/g, 'do not')
      .replace(/doesn't/g, 'does not')
      .replace(/isn't/g, 'is not')
      .replace(/aren't/g, 'are not')
      .replace(/wasn't/g, 'was not')
      .replace(/weren't/g, 'were not');
  };

  const checkAnswer = useCallback(() => {
    const normalizedUser = normalizeAnswer(userAnswer);
    const correct = content.acceptedAnswers.some(
      accepted => normalizeAnswer(accepted) === normalizedUser
    );
    const timeMs = Date.now() - startTime;

    setIsCorrect(correct);
    setShowFeedback(true);

    setTimeout(() => {
      onComplete(correct, userAnswer, timeMs);
    }, 3000);
  }, [userAnswer, content.acceptedAnswers, startTime, onComplete]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && userAnswer.trim() && !showFeedback) {
      checkAnswer();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
      {/* Instruccion */}
      <div className="text-center">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          {prompt}
        </p>
        <div className="mt-2 inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
          Transforma a {getTargetLabel()}
        </div>
      </div>

      {/* Oracion original */}
      <div className="text-center py-4 px-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-sm text-gray-500 mb-2">Oracion original:</p>
        <p className="text-xl font-medium text-gray-800 dark:text-gray-200">
          &quot;{content.original}&quot;
        </p>
      </div>

      {/* Input de respuesta */}
      <div className="space-y-2">
        <label className="text-sm text-gray-500">Tu respuesta:</label>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={showFeedback}
          placeholder={content.targetType === 'question' ? 'Escribe la pregunta...' : 'Escribe la oracion...'}
          className={cn(
            "w-full px-4 py-3 text-lg rounded-lg border-2 transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-blue-500",
            !showFeedback && "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800",
            showFeedback && isCorrect && "border-green-500 bg-green-50 dark:bg-green-900/20",
            showFeedback && !isCorrect && "border-red-500 bg-red-50 dark:bg-red-900/20"
          )}
        />
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className={cn(
          "p-4 rounded-lg text-center",
          isCorrect ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"
        )}>
          {isCorrect ? (
            <p className="text-green-700 dark:text-green-400 font-medium">
              Correcto!
            </p>
          ) : (
            <div>
              <p className="text-red-700 dark:text-red-400 font-medium mb-2">
                Incorrecto
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Respuesta correcta: <strong>&quot;{content.acceptedAnswers[0]}&quot;</strong>
              </p>
            </div>
          )}
          {exercise.explanation && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {exercise.explanation}
            </p>
          )}
        </div>
      )}

      {/* Tip */}
      {!showFeedback && content.targetType === 'question' && (
        <div className="text-center text-sm text-gray-500">
          <p>Tip: En preguntas con &quot;to be&quot;, mueve el verbo al inicio.</p>
          <p>En otras preguntas, usa Do/Does al inicio.</p>
        </div>
      )}

      {/* Boton verificar */}
      <div className="flex justify-center">
        <Button
          variant="primary"
          onClick={checkAnswer}
          disabled={showFeedback}
        >
          Verificar
        </Button>
      </div>
    </div>
  );
}

export default TransformSentence;
