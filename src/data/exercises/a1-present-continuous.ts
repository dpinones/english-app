import { Exercise, SVOBuilderExercise, FillBlankExercise, SentenceOrderExercise, MultipleChoiceExercise, TransformExercise, QuestionAnswerExercise } from '@/types';

// ==========================================
// EJERCICIOS A1: Present continuous
// Tema 3: I'm doing, I'm not doing, Are you doing?
// ==========================================

export const a1PresentContinuousExercises: Exercise[] = [
  // SVO Builder exercises
  {
    id: 'a1-pc-svo-1',
    topicId: 3,
    type: 'svo_builder',
    prompt: 'Construye: "Estoy trabajando"',
    difficulty: 1,
    explanation: 'Present continuous: am/is/are + verbo-ing',
    content: {
      subjectOptions: ['I', 'He', 'They'],
      verbOptions: ['am working', 'is working', 'are working'],
      objectOptions: ['now', 'today', 'hard'],
      correctSentence: 'I am working',
    },
  } as SVOBuilderExercise,

  {
    id: 'a1-pc-svo-2',
    topicId: 3,
    type: 'svo_builder',
    prompt: 'Construye: "Ella esta estudiando ingles"',
    difficulty: 1,
    explanation: 'She/He/It + is + verbo-ing',
    content: {
      subjectOptions: ['She', 'I', 'They'],
      verbOptions: ['am studying', 'is studying', 'are studying'],
      objectOptions: ['English', 'Spanish', 'math'],
      correctSentence: 'She is studying English',
    },
  } as SVOBuilderExercise,

  {
    id: 'a1-pc-svo-3',
    topicId: 3,
    type: 'svo_builder',
    prompt: 'Construye: "Ellos estan comiendo pizza"',
    difficulty: 1,
    explanation: 'They/We/You + are + verbo-ing',
    content: {
      subjectOptions: ['They', 'She', 'I'],
      verbOptions: ['am eating', 'is eating', 'are eating'],
      objectOptions: ['pizza', 'pasta', 'salad'],
      correctSentence: 'They are eating pizza',
    },
  } as SVOBuilderExercise,

  // Fill the blank exercises
  {
    id: 'a1-pc-fill-1',
    topicId: 3,
    type: 'fill_blank',
    prompt: 'Completa con la forma correcta del present continuous',
    difficulty: 1,
    explanation: 'I + am + verbo-ing',
    content: {
      sentence: 'I ___ reading a book right now.',
      options: ['am', 'is', 'are'],
      correctAnswer: 'am',
    },
  } as FillBlankExercise,

  {
    id: 'a1-pc-fill-2',
    topicId: 3,
    type: 'fill_blank',
    prompt: 'Completa con la forma correcta',
    difficulty: 1,
    explanation: 'He/She/It + is + verbo-ing',
    content: {
      sentence: 'He ___ playing football.',
      options: ['am', 'is', 'are'],
      correctAnswer: 'is',
    },
  } as FillBlankExercise,

  {
    id: 'a1-pc-fill-3',
    topicId: 3,
    type: 'fill_blank',
    prompt: 'Completa con la forma correcta',
    difficulty: 2,
    explanation: 'We/They/You + are + verbo-ing',
    content: {
      sentence: 'We ___ learning English together.',
      options: ['am', 'is', 'are'],
      correctAnswer: 'are',
    },
  } as FillBlankExercise,

  {
    id: 'a1-pc-fill-4',
    topicId: 3,
    type: 'fill_blank',
    prompt: 'Que forma del verbo es correcta?',
    difficulty: 2,
    explanation: 'En present continuous usamos verbo + -ing',
    content: {
      sentence: 'She is ___ a movie.',
      options: ['watch', 'watching', 'watches'],
      correctAnswer: 'watching',
    },
  } as FillBlankExercise,

  // Sentence order exercises
  {
    id: 'a1-pc-order-1',
    topicId: 3,
    type: 'sentence_order',
    prompt: 'Ordena las palabras',
    difficulty: 1,
    explanation: 'Orden: Sujeto + am/is/are + verbo-ing',
    content: {
      words: ['I', 'am', 'coding', 'now'],
      correctOrder: ['I', 'am', 'coding', 'now'],
    },
  } as SentenceOrderExercise,

  {
    id: 'a1-pc-order-2',
    topicId: 3,
    type: 'sentence_order',
    prompt: 'Forma una oracion negativa',
    difficulty: 2,
    explanation: 'Negativo: Sujeto + am/is/are + not + verbo-ing',
    content: {
      words: ['She', 'is', 'not', 'sleeping'],
      correctOrder: ['She', 'is', 'not', 'sleeping'],
    },
  } as SentenceOrderExercise,

  {
    id: 'a1-pc-order-3',
    topicId: 3,
    type: 'sentence_order',
    prompt: 'Forma una pregunta',
    difficulty: 2,
    explanation: 'Pregunta: Am/Is/Are + sujeto + verbo-ing?',
    content: {
      words: ['Are', 'you', 'working', '?'],
      correctOrder: ['Are', 'you', 'working', '?'],
    },
  } as SentenceOrderExercise,

  // Transform exercises
  {
    id: 'a1-pc-transform-1',
    topicId: 3,
    type: 'transform',
    prompt: 'Convierte a pregunta',
    difficulty: 2,
    explanation: 'Mueve am/is/are al inicio para formar pregunta',
    content: {
      original: 'You are studying.',
      targetType: 'question',
      acceptedAnswers: ['Are you studying?', 'Are you studying'],
    },
  } as TransformExercise,

  {
    id: 'a1-pc-transform-2',
    topicId: 3,
    type: 'transform',
    prompt: 'Convierte a negativa',
    difficulty: 2,
    explanation: 'Agrega "not" despues de am/is/are',
    content: {
      original: 'He is working.',
      targetType: 'negative',
      acceptedAnswers: ['He is not working.', 'He is not working', "He isn't working.", "He isn't working"],
    },
  } as TransformExercise,

  {
    id: 'a1-pc-transform-3',
    topicId: 3,
    type: 'transform',
    prompt: 'Convierte a pregunta',
    difficulty: 2,
    explanation: 'Is + sujeto + verbo-ing?',
    content: {
      original: 'She is reading a book.',
      targetType: 'question',
      acceptedAnswers: ['Is she reading a book?', 'Is she reading a book'],
    },
  } as TransformExercise,

  // Question & Answer exercises
  {
    id: 'a1-pc-qa-1',
    topicId: 3,
    type: 'question_answer',
    prompt: 'Formula la pregunta correcta',
    difficulty: 2,
    explanation: 'Para preguntar que esta haciendo alguien: What + am/is/are + sujeto + doing?',
    content: {
      given: 'I am coding.',
      expectedType: 'question',
      acceptedAnswers: ['What are you doing?', 'What are you doing'],
    },
  } as QuestionAnswerExercise,

  {
    id: 'a1-pc-qa-2',
    topicId: 3,
    type: 'question_answer',
    prompt: 'Responde la pregunta',
    difficulty: 2,
    explanation: 'Responde con Yes, I am / No, I am not',
    content: {
      given: 'Are you working?',
      expectedType: 'answer',
      acceptedAnswers: ['Yes, I am.', 'Yes, I am', 'No, I am not.', 'No, I am not', "No, I'm not."],
    },
  } as QuestionAnswerExercise,

  // Multiple choice exercises
  {
    id: 'a1-pc-mc-1',
    topicId: 3,
    type: 'multiple_choice',
    prompt: 'Selecciona la oracion correcta',
    difficulty: 1,
    explanation: 'I siempre usa "am" en present continuous',
    content: {
      question: 'Which sentence is correct?',
      options: ['I am working now.', 'I is working now.', 'I are working now.'],
      correctAnswer: 'I am working now.',
    },
  } as MultipleChoiceExercise,

  {
    id: 'a1-pc-mc-2',
    topicId: 3,
    type: 'multiple_choice',
    prompt: 'Cual es la pregunta correcta?',
    difficulty: 2,
    explanation: 'Pregunta: Is + she + verbo-ing?',
    content: {
      question: 'Which question is correct?',
      options: ['Is she sleeping?', 'Does she sleeping?', 'She is sleeping?'],
      correctAnswer: 'Is she sleeping?',
    },
  } as MultipleChoiceExercise,

  {
    id: 'a1-pc-mc-3',
    topicId: 3,
    type: 'multiple_choice',
    prompt: 'Cual es la forma negativa correcta?',
    difficulty: 2,
    explanation: 'Negativo: sujeto + is not / isn\'t + verbo-ing',
    content: {
      question: 'Which negative sentence is correct?',
      options: ["He isn't watching TV.", "He doesn't watching TV.", 'He not watching TV.'],
      correctAnswer: "He isn't watching TV.",
    },
  } as MultipleChoiceExercise,
];

export default a1PresentContinuousExercises;
