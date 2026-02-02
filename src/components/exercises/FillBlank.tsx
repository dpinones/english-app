'use client';

import { useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { FillBlankExercise } from '@/types';

// ==========================================
// FILL THE BLANK - COMPLETAR ESPACIOS
// ==========================================

interface FillBlankProps {
  exercise: FillBlankExercise;
  onComplete: (isCorrect: boolean, answer: string, timeMs: number) => void;
}

export function FillBlank({ exercise, onComplete }: FillBlankProps) {
  const { content, prompt } = exercise;
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [startTime, setStartTime] = useState(Date.now());
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Reset state when exercise changes
  useEffect(() => {
    setSelectedOption(null);
    setStartTime(Date.now());
    setShowFeedback(false);
    setIsCorrect(false);
  }, [exercise.id]);

  // Dividir la oracion por el espacio en blanco
  const parts = content.sentence.split('___');

  const handleOptionSelect = useCallback((option: string) => {
    if (showFeedback) return;
    setSelectedOption(option);
  }, [showFeedback]);

  const checkAnswer = useCallback(() => {
    if (!selectedOption) return;

    const correct = selectedOption.toLowerCase() === content.correctAnswer.toLowerCase();
    const timeMs = Date.now() - startTime;

    setIsCorrect(correct);
    setShowFeedback(true);

    setTimeout(() => {
      onComplete(correct, selectedOption, timeMs);
    }, 3000);
  }, [selectedOption, content.correctAnswer, startTime, onComplete]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
      {/* Instruccion */}
      <div className="text-center">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          {prompt}
        </p>
      </div>

      {/* Oracion con espacio */}
      <div className="text-center py-6 px-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-xl">
          {parts[0]}
          <span
            className={cn(
              "inline-block min-w-[80px] mx-2 px-3 py-1 rounded-lg border-2 border-dashed",
              !selectedOption && "border-gray-300 dark:border-gray-600",
              selectedOption && !showFeedback && "border-blue-500 bg-blue-50 dark:bg-blue-900/20",
              showFeedback && isCorrect && "border-green-500 bg-green-50 dark:bg-green-900/20",
              showFeedback && !isCorrect && "border-red-500 bg-red-50 dark:bg-red-900/20"
            )}
          >
            {selectedOption || '___'}
          </span>
          {parts[1]}
        </p>
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
                La respuesta correcta es: <strong>"{content.correctAnswer}"</strong>
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

      {/* Opciones */}
      <div className="flex flex-wrap justify-center gap-3">
        {content.options.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionSelect(option)}
            disabled={showFeedback}
            className={cn(
              "px-6 py-3 rounded-lg font-medium transition-all duration-200",
              "border-2",
              selectedOption === option
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600",
              showFeedback && option === content.correctAnswer && "border-green-500 bg-green-50 dark:bg-green-900/20",
              showFeedback && selectedOption === option && !isCorrect && "border-red-500 bg-red-50 dark:bg-red-900/20"
            )}
          >
            {option}
          </button>
        ))}
      </div>

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

export default FillBlank;
