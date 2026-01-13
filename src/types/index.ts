// ==========================================
// TIPOS BASE PARA LA APP DE INGLES
// ==========================================

// Niveles CEFR
export type Level = 'A1' | 'A2' | 'B1' | 'B1+' | 'B2';

// Categorias de temas
export type TopicCategory =
  | 'present-tenses'
  | 'past-tenses'
  | 'future'
  | 'verb-tense-reviews'
  | 'modals-imperatives-phrasal'
  | 'conditionals'
  | 'passive'
  | 'reported-speech'
  | 'gerunds-infinitives'
  | 'articles-nouns-pronouns'
  | 'relative-clauses'
  | 'there-it'
  | 'auxiliary-verbs'
  | 'adjectives-adverbs'
  | 'conjunctions-clauses'
  | 'prepositions'
  | 'questions'
  | 'word-order';

// ==========================================
// TEMAS Y CONTENIDO
// ==========================================

export interface Topic {
  id: number;
  title: string;
  level: Level;
  category: TopicCategory;
  slug: string;
  orderIndex: number;
  svoPattern?: string;
  description?: string;
}

// ==========================================
// EJERCICIOS
// ==========================================

export type ExerciseType =
  | 'svo_builder'
  | 'sentence_order'
  | 'fill_blank'
  | 'multiple_choice'
  | 'transform'
  | 'question_answer';

export interface BaseExercise {
  id: string;
  topicId: number;
  type: ExerciseType;
  prompt: string;
  explanation?: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
}

// SVO Builder: arrastrar bloques a posiciones S-V-O
export interface SVOBuilderExercise extends BaseExercise {
  type: 'svo_builder';
  content: {
    subjectOptions: string[];
    verbOptions: string[];
    objectOptions: string[];
    correctSentence: string;
  };
}

// Sentence Order: ordenar palabras
export interface SentenceOrderExercise extends BaseExercise {
  type: 'sentence_order';
  content: {
    words: string[];
    distractors?: string[];
    correctOrder: string[];
  };
}

// Fill the Blank: completar espacios
export interface FillBlankExercise extends BaseExercise {
  type: 'fill_blank';
  content: {
    sentence: string; // usa ___ para el espacio
    options: string[];
    correctAnswer: string;
  };
}

// Multiple Choice: seleccion multiple
export interface MultipleChoiceExercise extends BaseExercise {
  type: 'multiple_choice';
  content: {
    question: string;
    options: string[];
    correctAnswer: string;
  };
}

// Transform: convertir oracion
export interface TransformExercise extends BaseExercise {
  type: 'transform';
  content: {
    original: string;
    targetType: 'negative' | 'question' | 'affirmative';
    acceptedAnswers: string[];
  };
}

// Question & Answer
export interface QuestionAnswerExercise extends BaseExercise {
  type: 'question_answer';
  content: {
    context?: string;
    given: string;
    expectedType: 'question' | 'answer';
    acceptedAnswers: string[];
  };
}

export type Exercise =
  | SVOBuilderExercise
  | SentenceOrderExercise
  | FillBlankExercise
  | MultipleChoiceExercise
  | TransformExercise
  | QuestionAnswerExercise;

// ==========================================
// SPACED REPETITION SYSTEM (SRS)
// ==========================================

export type SRSStatus = 'new' | 'learning' | 'review' | 'mastered';

export interface SRSItem {
  id: string;
  exerciseId: string;
  easeFactor: number;      // 1.3 - 2.5
  intervalDays: number;
  repetitions: number;
  nextReviewDate: string;  // ISO date string
  lastReviewDate?: string;
  timesCorrect: number;
  timesIncorrect: number;
  status: SRSStatus;
}

export type SRSQuality = 0 | 2 | 3 | 4;
// 0 = Again (fallo total)
// 2 = Hard (dificil)
// 3 = Good (bien)
// 4 = Easy (facil)

export interface ReviewResult {
  quality: SRSQuality;
  responseTimeMs: number;
  wasCorrect: boolean;
  userAnswer?: string;
}

// ==========================================
// PROGRESO DEL USUARIO
// ==========================================

export interface TopicProgress {
  topicId: number;
  exercisesCompleted: number;
  exercisesTotal: number;
  accuracy: number;
  status: 'locked' | 'available' | 'in_progress' | 'completed' | 'mastered';
  startedAt?: string;
  completedAt?: string;
}

export interface LevelProgress {
  level: Level;
  topicsCompleted: number;
  topicsTotal: number;
  overallAccuracy: number;
  status: 'locked' | 'current' | 'completed';
}

export interface DailyStats {
  date: string;
  exercisesDone: number;
  correct: number;
  minutesPracticed: number;
}

export interface UserProgress {
  currentLevel: Level;
  xpPoints: number;
  streakDays: number;
  lastPracticeDate?: string;
  topicProgress: Record<number, TopicProgress>;
  levelProgress: Record<Level, LevelProgress>;
  dailyStats: DailyStats[];
}

// ==========================================
// UI STATE
// ==========================================

export interface ExerciseResult {
  exerciseId: string;
  isCorrect: boolean;
  userAnswer: string | string[];
  correctAnswer: string | string[];
  timeSpentMs: number;
}

export interface SessionStats {
  exercisesAttempted: number;
  exercisesCorrect: number;
  xpEarned: number;
  startedAt: string;
  endedAt?: string;
}
