'use client';

import { useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { SVOBuilderExercise } from '@/types';

// ==========================================
// SVO BUILDER - EJERCICIO PRINCIPAL
// ==========================================
// Este componente implementa la metodologia SVO (Subject-Verb-Object)
// El usuario arrastra/selecciona bloques para construir oraciones

interface SVOBuilderProps {
  exercise: SVOBuilderExercise;
  onComplete: (isCorrect: boolean, answer: string, timeMs: number) => void;
}

type SVOSlot = 'subject' | 'verb' | 'object';

interface SlotState {
  subject: string | null;
  verb: string | null;
  object: string | null;
}

export function SVOBuilder({ exercise, onComplete }: SVOBuilderProps) {
  const { content } = exercise;
  const [slots, setSlots] = useState<SlotState>({
    subject: null,
    verb: null,
    object: null,
  });
  const [selectedSlot, setSelectedSlot] = useState<SVOSlot | null>(null);
  const [startTime, setStartTime] = useState(Date.now());
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Reset state when exercise changes
  useEffect(() => {
    setSlots({ subject: null, verb: null, object: null });
    setSelectedSlot(null);
    setStartTime(Date.now());
    setShowFeedback(false);
    setIsCorrect(false);
  }, [exercise.id]);

  // Todas las opciones disponibles
  const allOptions = [
    ...content.subjectOptions.map(opt => ({ value: opt, type: 'subject' as const })),
    ...content.verbOptions.map(opt => ({ value: opt, type: 'verb' as const })),
    ...content.objectOptions.map(opt => ({ value: opt, type: 'object' as const })),
  ];

  // Opciones usadas
  const usedOptions = [slots.subject, slots.verb, slots.object].filter(Boolean);

  // Handler para seleccionar un slot
  const handleSlotClick = useCallback((slot: SVOSlot) => {
    if (showFeedback) return;
    setSelectedSlot(selectedSlot === slot ? null : slot);
  }, [selectedSlot, showFeedback]);

  // Handler para seleccionar una opcion
  const handleOptionClick = useCallback((option: string) => {
    if (showFeedback) return;

    if (selectedSlot) {
      // Si hay un slot seleccionado, colocar la opcion ahi
      setSlots(prev => ({ ...prev, [selectedSlot]: option }));
      setSelectedSlot(null);
    } else {
      // Si no hay slot seleccionado, intentar colocar automaticamente
      // Buscar el primer slot vacio en orden S-V-O
      if (!slots.subject) {
        setSlots(prev => ({ ...prev, subject: option }));
      } else if (!slots.verb) {
        setSlots(prev => ({ ...prev, verb: option }));
      } else if (!slots.object) {
        setSlots(prev => ({ ...prev, object: option }));
      }
    }
  }, [selectedSlot, slots, showFeedback]);

  // Handler para quitar una opcion de un slot
  const handleRemoveFromSlot = useCallback((slot: SVOSlot) => {
    if (showFeedback) return;
    setSlots(prev => ({ ...prev, [slot]: null }));
  }, [showFeedback]);

  // Verificar respuesta
  const checkAnswer = useCallback(() => {
    const userAnswer = `${slots.subject} ${slots.verb} ${slots.object}`.trim();
    const correct = userAnswer.toLowerCase() === content.correctSentence.toLowerCase();
    const timeMs = Date.now() - startTime;

    setIsCorrect(correct);
    setShowFeedback(true);

    // Delay para mostrar feedback antes de completar
    setTimeout(() => {
      onComplete(correct, userAnswer, timeMs);
    }, 3000);
  }, [slots, content.correctSentence, startTime, onComplete]);

  // Verificar si se puede enviar
  const canSubmit = slots.subject && slots.verb && slots.object;

  // Reset
  const handleReset = useCallback(() => {
    setSlots({ subject: null, verb: null, object: null });
    setSelectedSlot(null);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
      {/* Instruccion */}
      <div className="text-center">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
          {exercise.prompt}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Selecciona un slot (S, V, O) y luego elige una palabra
        </p>
      </div>

      {/* Slots SVO */}
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        {/* Subject */}
        <SlotBox
          label="S"
          sublabel="Subject"
          value={slots.subject}
          isSelected={selectedSlot === 'subject'}
          onClick={() => handleSlotClick('subject')}
          onRemove={() => handleRemoveFromSlot('subject')}
          showFeedback={showFeedback}
          isCorrect={isCorrect}
        />

        <Arrow />

        {/* Verb */}
        <SlotBox
          label="V"
          sublabel="Verb"
          value={slots.verb}
          isSelected={selectedSlot === 'verb'}
          onClick={() => handleSlotClick('verb')}
          onRemove={() => handleRemoveFromSlot('verb')}
          showFeedback={showFeedback}
          isCorrect={isCorrect}
        />

        <Arrow />

        {/* Object */}
        <SlotBox
          label="O"
          sublabel="Object"
          value={slots.object}
          isSelected={selectedSlot === 'object'}
          onClick={() => handleSlotClick('object')}
          onRemove={() => handleRemoveFromSlot('object')}
          showFeedback={showFeedback}
          isCorrect={isCorrect}
        />
      </div>

      {/* Oracion formada */}
      <div className="text-center py-4 px-6 bg-gray-50 dark:bg-gray-800 rounded-lg min-h-[60px] flex items-center justify-center">
        {canSubmit ? (
          <p className={cn(
            "text-xl font-medium",
            showFeedback && isCorrect && "text-green-600",
            showFeedback && !isCorrect && "text-red-600"
          )}>
            "{slots.subject} {slots.verb} {slots.object}"
          </p>
        ) : (
          <p className="text-gray-400 italic">
            Tu oracion aparecera aqui...
          </p>
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
                La respuesta correcta es: <strong>"{content.correctSentence}"</strong>
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

      {/* Opciones disponibles */}
      <div className="space-y-2">
        <p className="text-sm text-gray-500 text-center">Palabras disponibles:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {allOptions.map(({ value, type }) => {
            const isUsed = usedOptions.includes(value);
            return (
              <button
                key={`${type}-${value}`}
                onClick={() => !isUsed && handleOptionClick(value)}
                disabled={isUsed || showFeedback}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all duration-200",
                  "border-2",
                  isUsed
                    ? "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-white dark:bg-gray-800 border-blue-300 dark:border-blue-600 text-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-400 active:scale-95",
                  selectedSlot && !isUsed && "animate-pulse"
                )}
              >
                {value}
              </button>
            );
          })}
        </div>
      </div>

      {/* Botones de accion */}
      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          onClick={handleReset}
          disabled={showFeedback || (!slots.subject && !slots.verb && !slots.object)}
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

// ==========================================
// COMPONENTES AUXILIARES
// ==========================================

interface SlotBoxProps {
  label: string;
  sublabel: string;
  value: string | null;
  isSelected: boolean;
  onClick: () => void;
  onRemove: () => void;
  showFeedback: boolean;
  isCorrect: boolean;
}

function SlotBox({
  label,
  sublabel,
  value,
  isSelected,
  onClick,
  onRemove,
  showFeedback,
  isCorrect,
}: SlotBoxProps) {
  return (
    <div className="flex flex-col items-center">
      <span className={cn(
        "text-xs font-bold mb-1",
        label === 'S' && "text-blue-600",
        label === 'V' && "text-green-600",
        label === 'O' && "text-purple-600"
      )}>
        {label}
      </span>
      <button
        onClick={value ? onRemove : onClick}
        className={cn(
          "min-w-[80px] sm:min-w-[100px] h-14 sm:h-16 px-3 rounded-xl border-2 border-dashed",
          "flex items-center justify-center",
          "transition-all duration-200",
          !value && !isSelected && "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800",
          !value && isSelected && "border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-105",
          value && !showFeedback && "border-solid border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700",
          showFeedback && isCorrect && "border-solid border-green-500 bg-green-50 dark:bg-green-900/20",
          showFeedback && !isCorrect && "border-solid border-red-500 bg-red-50 dark:bg-red-900/20",
        )}
        disabled={showFeedback}
      >
        {value ? (
          <span className="font-medium text-gray-800 dark:text-gray-200 truncate">
            {value}
          </span>
        ) : (
          <span className="text-gray-400 text-sm">{sublabel}</span>
        )}
      </button>
    </div>
  );
}

function Arrow() {
  return (
    <svg
      className="w-6 h-6 text-gray-400 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}

export default SVOBuilder;
