import { Exercise, SVOBuilderExercise, FillBlankExercise, SentenceOrderExercise, MultipleChoiceExercise, TransformExercise, QuestionAnswerExercise } from '@/types';

// ==========================================
// EJERCICIOS A1: Past Simple
// Tema 14: Regular/irregular verbs
// ==========================================

export const a1PastSimpleExercises: Exercise[] = [
  // SVO Builder - Verbos regulares
  {
    id: 'a1-ps-svo-1',
    topicId: 14,
    type: 'svo_builder',
    prompt: 'Construye: "Yo trabaje ayer"',
    difficulty: 1,
    explanation: 'Past simple regular: verbo + -ed',
    content: {
      subjectOptions: ['I', 'He', 'They'],
      verbOptions: ['worked', 'work', 'working'],
      objectOptions: ['yesterday', 'today', 'now'],
      correctSentence: 'I worked yesterday',
    },
  } as SVOBuilderExercise,

  {
    id: 'a1-ps-svo-2',
    topicId: 14,
    type: 'svo_builder',
    prompt: 'Construye: "Ella estudio ingles"',
    difficulty: 1,
    explanation: 'study -> studied (y -> ied)',
    content: {
      subjectOptions: ['She', 'I', 'They'],
      verbOptions: ['studied', 'study', 'studies'],
      objectOptions: ['English', 'math', 'science'],
      correctSentence: 'She studied English',
    },
  } as SVOBuilderExercise,

  {
    id: 'a1-ps-svo-3',
    topicId: 14,
    type: 'svo_builder',
    prompt: 'Construye: "El fue al trabajo" (irregular)',
    difficulty: 2,
    explanation: 'go -> went (verbo irregular)',
    content: {
      subjectOptions: ['He', 'I', 'They'],
      verbOptions: ['went', 'go', 'goes'],
      objectOptions: ['to work', 'to school', 'home'],
      correctSentence: 'He went to work',
    },
  } as SVOBuilderExercise,

  // Fill the blank - Verbos regulares
  {
    id: 'a1-ps-fill-1',
    topicId: 14,
    type: 'fill_blank',
    prompt: 'Completa con el pasado del verbo',
    difficulty: 1,
    explanation: 'play -> played',
    content: {
      sentence: 'I ___ football yesterday. (play)',
      options: ['played', 'play', 'plays'],
      correctAnswer: 'played',
    },
  } as FillBlankExercise,

  {
    id: 'a1-ps-fill-2',
    topicId: 14,
    type: 'fill_blank',
    prompt: 'Completa con el pasado del verbo',
    difficulty: 1,
    explanation: 'watch -> watched',
    content: {
      sentence: 'She ___ a movie last night. (watch)',
      options: ['watched', 'watch', 'watches'],
      correctAnswer: 'watched',
    },
  } as FillBlankExercise,

  {
    id: 'a1-ps-fill-3',
    topicId: 14,
    type: 'fill_blank',
    prompt: 'Completa con el pasado del verbo irregular',
    difficulty: 2,
    explanation: 'eat -> ate (irregular)',
    content: {
      sentence: 'We ___ pizza for dinner. (eat)',
      options: ['ate', 'eat', 'eated'],
      correctAnswer: 'ate',
    },
  } as FillBlankExercise,

  {
    id: 'a1-ps-fill-4',
    topicId: 14,
    type: 'fill_blank',
    prompt: 'Completa con el pasado del verbo irregular',
    difficulty: 2,
    explanation: 'see -> saw (irregular)',
    content: {
      sentence: 'I ___ my friend at the mall. (see)',
      options: ['saw', 'see', 'seed'],
      correctAnswer: 'saw',
    },
  } as FillBlankExercise,

  {
    id: 'a1-ps-fill-5',
    topicId: 14,
    type: 'fill_blank',
    prompt: 'Completa con el pasado del verbo irregular',
    difficulty: 2,
    explanation: 'make -> made (irregular)',
    content: {
      sentence: 'She ___ a cake for the party. (make)',
      options: ['made', 'make', 'maked'],
      correctAnswer: 'made',
    },
  } as FillBlankExercise,

  {
    id: 'a1-ps-fill-6',
    topicId: 14,
    type: 'fill_blank',
    prompt: 'Completa con el pasado del verbo irregular',
    difficulty: 2,
    explanation: 'have -> had (irregular)',
    content: {
      sentence: 'They ___ a great time. (have)',
      options: ['had', 'have', 'haved'],
      correctAnswer: 'had',
    },
  } as FillBlankExercise,

  // Sentence order
  {
    id: 'a1-ps-order-1',
    topicId: 14,
    type: 'sentence_order',
    prompt: 'Ordena las palabras',
    difficulty: 1,
    explanation: 'Orden: Sujeto + verbo pasado + complemento',
    content: {
      words: ['I', 'finished', 'my', 'homework'],
      correctOrder: ['I', 'finished', 'my', 'homework'],
    },
  } as SentenceOrderExercise,

  {
    id: 'a1-ps-order-2',
    topicId: 14,
    type: 'sentence_order',
    prompt: 'Ordena las palabras',
    difficulty: 2,
    explanation: 'Verbo irregular: buy -> bought',
    content: {
      words: ['She', 'bought', 'a', 'new', 'phone'],
      correctOrder: ['She', 'bought', 'a', 'new', 'phone'],
    },
  } as SentenceOrderExercise,

  {
    id: 'a1-ps-order-3',
    topicId: 14,
    type: 'sentence_order',
    prompt: 'Ordena las palabras con marcador de tiempo',
    difficulty: 2,
    explanation: 'El marcador de tiempo puede ir al final',
    content: {
      words: ['We', 'traveled', 'to', 'Spain', 'last', 'year'],
      correctOrder: ['We', 'traveled', 'to', 'Spain', 'last', 'year'],
    },
  } as SentenceOrderExercise,

  // Multiple choice
  {
    id: 'a1-ps-mc-1',
    topicId: 14,
    type: 'multiple_choice',
    prompt: 'Cual es el pasado de "go"?',
    difficulty: 1,
    explanation: 'go -> went (irregular)',
    content: {
      question: 'I ___ to the store.',
      options: ['went', 'goed', 'go'],
      correctAnswer: 'went',
    },
  } as MultipleChoiceExercise,

  {
    id: 'a1-ps-mc-2',
    topicId: 14,
    type: 'multiple_choice',
    prompt: 'Cual es el pasado de "take"?',
    difficulty: 2,
    explanation: 'take -> took (irregular)',
    content: {
      question: 'She ___ the bus to work.',
      options: ['took', 'taked', 'take'],
      correctAnswer: 'took',
    },
  } as MultipleChoiceExercise,

  {
    id: 'a1-ps-mc-3',
    topicId: 14,
    type: 'multiple_choice',
    prompt: 'Cual es el pasado de "write"?',
    difficulty: 2,
    explanation: 'write -> wrote (irregular)',
    content: {
      question: 'He ___ an email to his boss.',
      options: ['wrote', 'writed', 'write'],
      correctAnswer: 'wrote',
    },
  } as MultipleChoiceExercise,

  {
    id: 'a1-ps-mc-4',
    topicId: 14,
    type: 'multiple_choice',
    prompt: 'Cual es el pasado de "stop"?',
    difficulty: 1,
    explanation: 'stop -> stopped (consonante final se duplica)',
    content: {
      question: 'The car ___ at the traffic light.',
      options: ['stopped', 'stoped', 'stop'],
      correctAnswer: 'stopped',
    },
  } as MultipleChoiceExercise,

  // Question & Answer
  {
    id: 'a1-ps-qa-1',
    topicId: 14,
    type: 'question_answer',
    prompt: 'Usa el verbo en pasado para responder',
    difficulty: 2,
    explanation: 'What did you do? -> I + verbo pasado',
    content: {
      context: 'Que hiciste ayer?',
      given: 'What did you do yesterday? (work)',
      expectedType: 'answer',
      acceptedAnswers: ['I worked.', 'I worked', 'I worked yesterday.', 'I worked yesterday'],
    },
  } as QuestionAnswerExercise,

  {
    id: 'a1-ps-qa-2',
    topicId: 14,
    type: 'question_answer',
    prompt: 'Usa el verbo irregular en pasado',
    difficulty: 2,
    explanation: 'Where did you go? -> I went...',
    content: {
      given: 'Where did you go? (store)',
      expectedType: 'answer',
      acceptedAnswers: ['I went to the store.', 'I went to the store'],
    },
  } as QuestionAnswerExercise,

  // Transform
  {
    id: 'a1-ps-transform-1',
    topicId: 14,
    type: 'transform',
    prompt: 'Cambia al pasado',
    difficulty: 2,
    explanation: 'Cambia el verbo al pasado simple',
    content: {
      original: 'I play tennis.',
      targetType: 'question',
      acceptedAnswers: ['I played tennis.', 'I played tennis'],
    },
  } as TransformExercise,

  {
    id: 'a1-ps-transform-2',
    topicId: 14,
    type: 'transform',
    prompt: 'Cambia al pasado (verbo irregular)',
    difficulty: 2,
    explanation: 'go -> went',
    content: {
      original: 'She goes to school.',
      targetType: 'question',
      acceptedAnswers: ['She went to school.', 'She went to school'],
    },
  } as TransformExercise,
];

export default a1PastSimpleExercises;
