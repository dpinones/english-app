'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { cn, shuffleArray } from '@/lib/utils';
import { Button } from '@/components/ui';
import { SentenceOrderExercise } from '@/types';

// ==========================================
// SENTENCE ORDER - ORDENAR PALABRAS
// ==========================================

interface SentenceOrderProps {
  exercise: SentenceOrderExercise;
  onComplete: (isCorrect: boolean, answer: string, timeMs: number) => void;
}

export function SentenceOrder({ exercise, onComplete }: SentenceOrderProps) {
  const { content, prompt } = exercise;

  // Mezclar palabras al inicio (incluyendo distractores)
  const allWords = useMemo(() => [...content.words, ...(content.distractors || [])], [content.words, content.distractors]);
  const [availableWords, setAvailableWords] = useState(() => shuffleArray(allWords));
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [startTime, setStartTime] = useState(Date.now());
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Reset state when exercise changes
  useEffect(() => {
    setAvailableWords(shuffleArray([...content.words, ...(content.distractors || [])]));
    setSelectedWords([]);
    setStartTime(Date.now());
    setShowFeedback(false);
    setIsCorrect(false);
  }, [exercise.id, content.words, content.distractors]);

  // Palabras restantes (no seleccionadas)
  const remainingWords = availableWords.filter(
    word => {
      const selectedCount = selectedWords.filter(w => w === word).length;
      const totalCount = availableWords.filter(w => w === word).length;
      return selectedCount < totalCount;
    }
  );

  const handleWordClick = useCallback((word: string) => {
    if (showFeedback) return;
    setSelectedWords(prev => [...prev, word]);
  }, [showFeedback]);

  const handleRemoveWord = useCallback((index: number) => {
    if (showFeedback) return;
    setSelectedWords(prev => prev.filter((_, i) => i !== index));
  }, [showFeedback]);

  const handleClear = useCallback(() => {
    setSelectedWords([]);
  }, []);

  const checkAnswer = useCallback(() => {
    const userAnswer = selectedWords.join(' ');
    const correctAnswer = content.correctOrder.join(' ');
    const correct = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
    const timeMs = Date.now() - startTime;

    setIsCorrect(correct);
    setShowFeedback(true);

    setTimeout(() => {
      onComplete(correct, userAnswer, timeMs);
    }, 3000);
  }, [selectedWords, content.correctOrder, startTime, onComplete]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
      {/* Instruccion */}
      <div className="text-center">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          {prompt}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Toca las palabras en el orden correcto
        </p>
      </div>

      {/* Area de respuesta */}
      <div className={cn(
        "min-h-[80px] p-4 rounded-lg border-2 border-dashed",
        "flex flex-wrap gap-2 items-center justify-center",
        !showFeedback && "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800",
        showFeedback && isCorrect && "border-green-500 bg-green-50 dark:bg-green-900/20",
        showFeedback && !isCorrect && "border-red-500 bg-red-50 dark:bg-red-900/20"
      )}>
        {selectedWords.length === 0 ? (
          <p className="text-gray-400 italic">
            Tu oracion aparecera aqui...
          </p>
        ) : (
          selectedWords.map((word, index) => (
            <button
              key={`${word}-${index}`}
              onClick={() => handleRemoveWord(index)}
              disabled={showFeedback}
              className={cn(
                "px-3 py-2 rounded-lg font-medium transition-all duration-200",
                "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
                "hover:bg-blue-200 dark:hover:bg-blue-900/50",
                "active:scale-95"
              )}
            >
              {word}
            </button>
          ))
        )}
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
                La respuesta correcta es: <strong>"{content.correctOrder.join(' ')}"</strong>
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

      {/* Palabras disponibles */}
      <div className="space-y-2">
        <p className="text-sm text-gray-500 text-center">Palabras disponibles:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {remainingWords.map((word, index) => (
            <button
              key={`${word}-${index}`}
              onClick={() => handleWordClick(word)}
              disabled={showFeedback}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-all duration-200",
                "border-2 border-gray-200 dark:border-gray-700",
                "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200",
                "hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20",
                "active:scale-95"
              )}
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      {/* Botones de accion */}
      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          onClick={handleClear}
          disabled={showFeedback || selectedWords.length === 0}
        >
          Limpiar
        </Button>
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

export default SentenceOrder;
