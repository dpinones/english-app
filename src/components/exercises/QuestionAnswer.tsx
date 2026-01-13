'use client';

import { useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { QuestionAnswerExercise } from '@/types';

// ==========================================
// QUESTION & ANSWER - PREGUNTAS Y RESPUESTAS
// Formular pregunta correcta o dar respuesta apropiada
// ==========================================

interface QuestionAnswerProps {
  exercise: QuestionAnswerExercise;
  onComplete: (isCorrect: boolean, answer: string, timeMs: number) => void;
}

export function QuestionAnswer({ exercise, onComplete }: QuestionAnswerProps) {
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

  const normalizeAnswer = (answer: string): string => {
    return answer
      .toLowerCase()
      .trim()
      .replace(/[?.!,]/g, '')
      .replace(/\s+/g, ' ')
      .replace(/n't/g, ' not')
      .replace(/i'm/g, 'i am')
      .replace(/you're/g, 'you are')
      .replace(/he's/g, 'he is')
      .replace(/she's/g, 'she is')
      .replace(/it's/g, 'it is')
      .replace(/we're/g, 'we are')
      .replace(/they're/g, 'they are')
      .replace(/don't/g, 'do not')
      .replace(/doesn't/g, 'does not');
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
    }, 1500);
  }, [userAnswer, content.acceptedAnswers, startTime, onComplete]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && userAnswer.trim() && !showFeedback) {
      checkAnswer();
    }
  };

  const isAskingQuestion = content.expectedType === 'question';

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
      {/* Instruccion */}
      <div className="text-center">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          {prompt}
        </p>
        <div className={cn(
          "mt-2 inline-block px-3 py-1 rounded-full text-sm font-medium",
          isAskingQuestion
            ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
            : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
        )}>
          {isAskingQuestion ? 'Formula la pregunta' : 'Da la respuesta'}
        </div>
      </div>

      {/* Contexto si existe */}
      {content.context && (
        <div className="text-center py-3 px-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-700 dark:text-amber-400">
            <span className="font-medium">Contexto:</span> {content.context}
          </p>
        </div>
      )}

      {/* Lo que se da (pregunta o respuesta) */}
      <div className="text-center py-4 px-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-sm text-gray-500 mb-2">
          {isAskingQuestion ? 'Respuesta dada:' : 'Pregunta:'}
        </p>
        <p className="text-xl font-medium text-gray-800 dark:text-gray-200">
          &quot;{content.given}&quot;
        </p>
      </div>

      {/* Input de respuesta */}
      <div className="space-y-2">
        <label className="text-sm text-gray-500">
          {isAskingQuestion ? 'Tu pregunta:' : 'Tu respuesta:'}
        </label>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={showFeedback}
          placeholder={isAskingQuestion ? 'What...? / Do you...? / Are you...?' : 'Yes, I... / No, I...'}
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
                {isAskingQuestion ? 'Pregunta correcta' : 'Respuesta correcta'}: <strong>&quot;{content.acceptedAnswers[0]}&quot;</strong>
              </p>
              {content.acceptedAnswers.length > 1 && (
                <p className="text-sm text-gray-500 mt-1">
                  Otras opciones validas: {content.acceptedAnswers.slice(1).map(a => `"${a}"`).join(', ')}
                </p>
              )}
            </div>
          )}
          {exercise.explanation && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {exercise.explanation}
            </p>
          )}
        </div>
      )}

      {/* Tips */}
      {!showFeedback && (
        <div className="text-center text-sm text-gray-500 space-y-1">
          {isAskingQuestion ? (
            <>
              <p>Tip: Usa &quot;What&quot; para preguntar sobre cosas</p>
              <p>&quot;Do/Does&quot; para preguntas de si/no</p>
            </>
          ) : (
            <>
              <p>Tip: Responde con &quot;Yes, I do&quot; o &quot;No, I don&apos;t&quot;</p>
              <p>O con oraciones completas</p>
            </>
          )}
        </div>
      )}

      {/* Boton verificar */}
      <div className="flex justify-center">
        <Button
          variant="primary"
          onClick={checkAnswer}
          disabled={!userAnswer.trim() || showFeedback}
        >
          Verificar
        </Button>
      </div>
    </div>
  );
}

export default QuestionAnswer;
