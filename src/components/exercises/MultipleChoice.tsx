'use client';

import { useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { MultipleChoiceExercise } from '@/types';

// ==========================================
// MULTIPLE CHOICE - SELECCION MULTIPLE
// ==========================================

interface MultipleChoiceProps {
  exercise: MultipleChoiceExercise;
  onComplete: (isCorrect: boolean, answer: string, timeMs: number) => void;
}

export function MultipleChoice({ exercise, onComplete }: MultipleChoiceProps) {
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

      {/* Pregunta */}
      <div className="text-center py-4 px-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-xl font-medium text-gray-800 dark:text-gray-200">
          {content.question}
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
      <div className="space-y-3">
        {content.options.map((option, index) => {
          const letter = String.fromCharCode(65 + index); // A, B, C, D...
          const isSelected = selectedOption === option;
          const isCorrectOption = option === content.correctAnswer;

          return (
            <button
              key={option}
              onClick={() => handleOptionSelect(option)}
              disabled={showFeedback}
              className={cn(
                "w-full p-4 rounded-lg text-left transition-all duration-200",
                "border-2 flex items-center gap-4",
                // Estado normal
                !isSelected && !showFeedback && "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600",
                // Seleccionado (sin feedback)
                isSelected && !showFeedback && "border-blue-500 bg-blue-50 dark:bg-blue-900/20",
                // Feedback: correcto
                showFeedback && isCorrectOption && "border-green-500 bg-green-50 dark:bg-green-900/20",
                // Feedback: seleccionado pero incorrecto
                showFeedback && isSelected && !isCorrectOption && "border-red-500 bg-red-50 dark:bg-red-900/20"
              )}
            >
              {/* Letra de opcion */}
              <span className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                !isSelected && !showFeedback && "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400",
                isSelected && !showFeedback && "bg-blue-500 text-white",
                showFeedback && isCorrectOption && "bg-green-500 text-white",
                showFeedback && isSelected && !isCorrectOption && "bg-red-500 text-white"
              )}>
                {letter}
              </span>

              {/* Texto de opcion */}
              <span className={cn(
                "flex-1 font-medium",
                showFeedback && isCorrectOption && "text-green-700 dark:text-green-400",
                showFeedback && isSelected && !isCorrectOption && "text-red-700 dark:text-red-400"
              )}>
                {option}
              </span>

              {/* Icono de feedback */}
              {showFeedback && isCorrectOption && (
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {showFeedback && isSelected && !isCorrectOption && (
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          );
        })}
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

export default MultipleChoice;
