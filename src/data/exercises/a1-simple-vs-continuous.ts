import { Exercise, SVOBuilderExercise, FillBlankExercise, SentenceOrderExercise, MultipleChoiceExercise, TransformExercise, QuestionAnswerExercise } from '@/types';

// ==========================================
// EJERCICIOS A1: Present simple vs Present continuous
// Tema 4: Cuando usar cada uno
// ==========================================

export const a1SimpleVsContinuousExercises: Exercise[] = [
  // Multiple choice - Identificar el tiempo correcto
  {
    id: 'a1-svc-mc-1',
    topicId: 4,
    type: 'multiple_choice',
    prompt: 'Selecciona la oracion correcta',
    difficulty: 1,
    explanation: 'Present simple para habitos/rutinas, Present continuous para acciones ahora',
    content: {
      question: 'Ella trabaja todos los dias (habito):',
      options: ['She works every day.', 'She is working every day.', 'She work every day.'],
      correctAnswer: 'She works every day.',
    },
  } as MultipleChoiceExercise,

  {
    id: 'a1-svc-mc-2',
    topicId: 4,
    type: 'multiple_choice',
    prompt: 'Selecciona la oracion correcta',
    difficulty: 1,
    explanation: 'Present continuous para acciones que ocurren ahora mismo',
    content: {
      question: 'Ella esta trabajando ahora mismo:',
      options: ['She is working right now.', 'She works right now.', 'She working right now.'],
      correctAnswer: 'She is working right now.',
    },
  } as MultipleChoiceExercise,

  {
    id: 'a1-svc-mc-3',
    topicId: 4,
    type: 'multiple_choice',
    prompt: 'Cual tiempo verbal es correcto?',
    difficulty: 2,
    explanation: '"Usually" indica habito = Present simple',
    content: {
      question: 'I usually ___ coffee in the morning.',
      options: ['drink', 'am drinking', 'drinks'],
      correctAnswer: 'drink',
    },
  } as MultipleChoiceExercise,

  {
    id: 'a1-svc-mc-4',
    topicId: 4,
    type: 'multiple_choice',
    prompt: 'Cual tiempo verbal es correcto?',
    difficulty: 2,
    explanation: '"Right now" indica accion en progreso = Present continuous',
    content: {
      question: 'I ___ coffee right now.',
      options: ['am drinking', 'drink', 'drinks'],
      correctAnswer: 'am drinking',
    },
  } as MultipleChoiceExercise,

  // Fill the blank
  {
    id: 'a1-svc-fill-1',
    topicId: 4,
    type: 'fill_blank',
    prompt: 'Completa con el tiempo correcto',
    difficulty: 1,
    explanation: '"Every day" = habito = Present simple',
    content: {
      sentence: 'He ___ to work every day. (go)',
      options: ['goes', 'is going', 'go'],
      correctAnswer: 'goes',
    },
  } as FillBlankExercise,

  {
    id: 'a1-svc-fill-2',
    topicId: 4,
    type: 'fill_blank',
    prompt: 'Completa con el tiempo correcto',
    difficulty: 1,
    explanation: '"Now" = accion en progreso = Present continuous',
    content: {
      sentence: 'He ___ to work now. (go)',
      options: ['is going', 'goes', 'go'],
      correctAnswer: 'is going',
    },
  } as FillBlankExercise,

  {
    id: 'a1-svc-fill-3',
    topicId: 4,
    type: 'fill_blank',
    prompt: 'Completa con el tiempo correcto',
    difficulty: 2,
    explanation: '"Always" indica habito = Present simple',
    content: {
      sentence: 'She always ___ breakfast at 7am. (eat)',
      options: ['eats', 'is eating', 'eat'],
      correctAnswer: 'eats',
    },
  } as FillBlankExercise,

  {
    id: 'a1-svc-fill-4',
    topicId: 4,
    type: 'fill_blank',
    prompt: 'Completa con el tiempo correcto',
    difficulty: 2,
    explanation: '"At the moment" = accion en progreso = Present continuous',
    content: {
      sentence: 'She ___ breakfast at the moment. (eat)',
      options: ['is eating', 'eats', 'eat'],
      correctAnswer: 'is eating',
    },
  } as FillBlankExercise,

  {
    id: 'a1-svc-fill-5',
    topicId: 4,
    type: 'fill_blank',
    prompt: 'Completa con el tiempo correcto',
    difficulty: 2,
    explanation: '"Today" puede indicar accion temporal en progreso',
    content: {
      sentence: 'Today I ___ from home. (work)',
      options: ['am working', 'work', 'works'],
      correctAnswer: 'am working',
    },
  } as FillBlankExercise,

  // Sentence order
  {
    id: 'a1-svc-order-1',
    topicId: 4,
    type: 'sentence_order',
    prompt: 'Ordena las palabras (present simple)',
    difficulty: 1,
    explanation: 'Present simple: Sujeto + verbo + complemento',
    content: {
      words: ['I', 'work', 'every', 'day'],
      correctOrder: ['I', 'work', 'every', 'day'],
    },
  } as SentenceOrderExercise,

  {
    id: 'a1-svc-order-2',
    topicId: 4,
    type: 'sentence_order',
    prompt: 'Ordena las palabras (present continuous)',
    difficulty: 1,
    explanation: 'Present continuous: Sujeto + am/is/are + verbo-ing',
    content: {
      words: ['I', 'am', 'working', 'now'],
      correctOrder: ['I', 'am', 'working', 'now'],
    },
  } as SentenceOrderExercise,

  {
    id: 'a1-svc-order-3',
    topicId: 4,
    type: 'sentence_order',
    prompt: 'Ordena las palabras',
    difficulty: 2,
    explanation: 'He/She/It + is + verbo-ing para acciones en progreso',
    content: {
      words: ['She', 'is', 'studying', 'English', 'today'],
      correctOrder: ['She', 'is', 'studying', 'English', 'today'],
    },
  } as SentenceOrderExercise,

  // Transform exercises
  {
    id: 'a1-svc-transform-1',
    topicId: 4,
    type: 'transform',
    prompt: 'Cambia a present continuous (accion ahora)',
    difficulty: 2,
    explanation: 'De habito a accion en progreso: agrega am/is/are + -ing',
    content: {
      original: 'I work. (now)',
      targetType: 'question',
      acceptedAnswers: ['I am working.', 'I am working', "I'm working.", "I'm working"],
    },
  } as TransformExercise,

  {
    id: 'a1-svc-transform-2',
    topicId: 4,
    type: 'transform',
    prompt: 'Cambia a present simple (habito)',
    difficulty: 2,
    explanation: 'De accion en progreso a habito: quita am/is/are + -ing',
    content: {
      original: 'She is reading. (every day)',
      targetType: 'question',
      acceptedAnswers: ['She reads every day.', 'She reads every day'],
    },
  } as TransformExercise,

  // Question & Answer
  {
    id: 'a1-svc-qa-1',
    topicId: 4,
    type: 'question_answer',
    prompt: 'Responde usando el tiempo correcto',
    difficulty: 2,
    explanation: '"What do you do?" pregunta por tu trabajo/ocupacion habitual',
    content: {
      given: 'What do you do? (developer)',
      expectedType: 'answer',
      acceptedAnswers: ['I am a developer.', 'I am a developer', "I'm a developer.", "I'm a developer"],
    },
  } as QuestionAnswerExercise,

  {
    id: 'a1-svc-qa-2',
    topicId: 4,
    type: 'question_answer',
    prompt: 'Responde usando el tiempo correcto',
    difficulty: 2,
    explanation: '"What are you doing?" pregunta por la accion ahora',
    content: {
      given: 'What are you doing? (work)',
      expectedType: 'answer',
      acceptedAnswers: ['I am working.', 'I am working', "I'm working.", "I'm working"],
    },
  } as QuestionAnswerExercise,

  // SVO Builder
  {
    id: 'a1-svc-svo-1',
    topicId: 4,
    type: 'svo_builder',
    prompt: 'Construye: "Yo trabajo todos los dias" (habito)',
    difficulty: 1,
    explanation: 'Present simple para habitos: I + work',
    content: {
      subjectOptions: ['I', 'He', 'They'],
      verbOptions: ['work', 'am working', 'works'],
      objectOptions: ['every day', 'now', 'today'],
      correctSentence: 'I work every day',
    },
  } as SVOBuilderExercise,

  {
    id: 'a1-svc-svo-2',
    topicId: 4,
    type: 'svo_builder',
    prompt: 'Construye: "Estoy trabajando ahora" (accion en progreso)',
    difficulty: 1,
    explanation: 'Present continuous: I + am working',
    content: {
      subjectOptions: ['I', 'He', 'They'],
      verbOptions: ['am working', 'work', 'works'],
      objectOptions: ['now', 'every day', 'always'],
      correctSentence: 'I am working now',
    },
  } as SVOBuilderExercise,

  {
    id: 'a1-svc-svo-3',
    topicId: 4,
    type: 'svo_builder',
    prompt: 'Construye: "El siempre come pizza" (habito)',
    difficulty: 2,
    explanation: 'He/She/It + verbo con -s para habitos',
    content: {
      subjectOptions: ['He', 'I', 'They'],
      verbOptions: ['eats', 'is eating', 'eat'],
      objectOptions: ['pizza', 'always pizza', 'pizza now'],
      correctSentence: 'He eats pizza',
    },
  } as SVOBuilderExercise,
];

export default a1SimpleVsContinuousExercises;
