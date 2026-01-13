import { Exercise, SVOBuilderExercise, FillBlankExercise, SentenceOrderExercise, MultipleChoiceExercise, TransformExercise, QuestionAnswerExercise } from '@/types';

// ==========================================
// EJERCICIOS A1: Past Simple - Negatives and Questions
// Tema 15: Did/didn't + verb base
// ==========================================

export const a1PastQuestionsExercises: Exercise[] = [
  // SVO Builder - Negativas
  {
    id: 'a1-pq-svo-1',
    topicId: 15,
    type: 'svo_builder',
    prompt: 'Construye: "Yo no trabaje"',
    difficulty: 1,
    explanation: 'Negativo en pasado: did not (didn\'t) + verbo base',
    content: {
      subjectOptions: ['I', 'He', 'They'],
      verbOptions: ["didn't work", "didn't worked", 'not worked'],
      objectOptions: ['yesterday', 'last week', 'today'],
      correctSentence: "I didn't work yesterday",
    },
  } as SVOBuilderExercise,

  {
    id: 'a1-pq-svo-2',
    topicId: 15,
    type: 'svo_builder',
    prompt: 'Construye: "Ella no fue al cine"',
    difficulty: 2,
    explanation: 'didn\'t + go (verbo base, no went)',
    content: {
      subjectOptions: ['She', 'I', 'They'],
      verbOptions: ["didn't go", "didn't went", 'not go'],
      objectOptions: ['to the cinema', 'to the park', 'home'],
      correctSentence: "She didn't go to the cinema",
    },
  } as SVOBuilderExercise,

  // Fill the blank - Negativas
  {
    id: 'a1-pq-fill-1',
    topicId: 15,
    type: 'fill_blank',
    prompt: 'Completa la negacion',
    difficulty: 1,
    explanation: 'didn\'t + verbo base',
    content: {
      sentence: 'I ___ watch TV last night.',
      options: ["didn't", "don't", "wasn't"],
      correctAnswer: "didn't",
    },
  } as FillBlankExercise,

  {
    id: 'a1-pq-fill-2',
    topicId: 15,
    type: 'fill_blank',
    prompt: 'Completa la negacion',
    difficulty: 1,
    explanation: 'didn\'t + verbo base (no -ed)',
    content: {
      sentence: 'She didn\'t ___ to the party. (go)',
      options: ['go', 'went', 'going'],
      correctAnswer: 'go',
    },
  } as FillBlankExercise,

  {
    id: 'a1-pq-fill-3',
    topicId: 15,
    type: 'fill_blank',
    prompt: 'Completa para formar pregunta',
    difficulty: 2,
    explanation: 'Did + sujeto + verbo base?',
    content: {
      sentence: '___ you see the movie?',
      options: ['Did', 'Do', 'Was'],
      correctAnswer: 'Did',
    },
  } as FillBlankExercise,

  {
    id: 'a1-pq-fill-4',
    topicId: 15,
    type: 'fill_blank',
    prompt: 'Completa la pregunta',
    difficulty: 2,
    explanation: 'Did + sujeto + verbo base (no pasado)',
    content: {
      sentence: 'Did she ___ to work? (go)',
      options: ['go', 'went', 'goes'],
      correctAnswer: 'go',
    },
  } as FillBlankExercise,

  {
    id: 'a1-pq-fill-5',
    topicId: 15,
    type: 'fill_blank',
    prompt: 'Completa la pregunta con What',
    difficulty: 2,
    explanation: 'What + did + sujeto + verbo base?',
    content: {
      sentence: 'What ___ you do yesterday?',
      options: ['did', 'do', 'was'],
      correctAnswer: 'did',
    },
  } as FillBlankExercise,

  // Sentence order - Preguntas
  {
    id: 'a1-pq-order-1',
    topicId: 15,
    type: 'sentence_order',
    prompt: 'Ordena para formar una pregunta',
    difficulty: 2,
    explanation: 'Did + sujeto + verbo base?',
    content: {
      words: ['Did', 'you', 'eat', 'breakfast', '?'],
      correctOrder: ['Did', 'you', 'eat', 'breakfast', '?'],
    },
  } as SentenceOrderExercise,

  {
    id: 'a1-pq-order-2',
    topicId: 15,
    type: 'sentence_order',
    prompt: 'Ordena para formar una pregunta con Where',
    difficulty: 2,
    explanation: 'Where + did + sujeto + verbo base?',
    content: {
      words: ['Where', 'did', 'you', 'go', '?'],
      correctOrder: ['Where', 'did', 'you', 'go', '?'],
    },
  } as SentenceOrderExercise,

  {
    id: 'a1-pq-order-3',
    topicId: 15,
    type: 'sentence_order',
    prompt: 'Ordena la oracion negativa',
    difficulty: 1,
    explanation: 'Sujeto + didn\'t + verbo base',
    content: {
      words: ['He', "didn't", 'call', 'me'],
      correctOrder: ['He', "didn't", 'call', 'me'],
    },
  } as SentenceOrderExercise,

  {
    id: 'a1-pq-order-4',
    topicId: 15,
    type: 'sentence_order',
    prompt: 'Ordena para formar una pregunta con What',
    difficulty: 2,
    explanation: 'What + did + sujeto + verbo base?',
    content: {
      words: ['What', 'did', 'she', 'buy', '?'],
      correctOrder: ['What', 'did', 'she', 'buy', '?'],
    },
  } as SentenceOrderExercise,

  // Transform exercises
  {
    id: 'a1-pq-transform-1',
    topicId: 15,
    type: 'transform',
    prompt: 'Convierte a pregunta',
    difficulty: 2,
    explanation: 'Did + sujeto + verbo base?',
    content: {
      original: 'You played tennis.',
      targetType: 'question',
      acceptedAnswers: ['Did you play tennis?', 'Did you play tennis'],
    },
  } as TransformExercise,

  {
    id: 'a1-pq-transform-2',
    topicId: 15,
    type: 'transform',
    prompt: 'Convierte a negativa',
    difficulty: 2,
    explanation: 'Sujeto + didn\'t + verbo base',
    content: {
      original: 'She called me.',
      targetType: 'negative',
      acceptedAnswers: ["She didn't call me.", "She didn't call me", 'She did not call me.', 'She did not call me'],
    },
  } as TransformExercise,

  {
    id: 'a1-pq-transform-3',
    topicId: 15,
    type: 'transform',
    prompt: 'Convierte a pregunta (verbo irregular)',
    difficulty: 2,
    explanation: 'Did + sujeto + verbo base (go, no went)',
    content: {
      original: 'He went to the park.',
      targetType: 'question',
      acceptedAnswers: ['Did he go to the park?', 'Did he go to the park'],
    },
  } as TransformExercise,

  {
    id: 'a1-pq-transform-4',
    topicId: 15,
    type: 'transform',
    prompt: 'Convierte a negativa (verbo irregular)',
    difficulty: 2,
    explanation: 'didn\'t + verbo base (eat, no ate)',
    content: {
      original: 'They ate pizza.',
      targetType: 'negative',
      acceptedAnswers: ["They didn't eat pizza.", "They didn't eat pizza", 'They did not eat pizza.', 'They did not eat pizza'],
    },
  } as TransformExercise,

  // Question & Answer
  {
    id: 'a1-pq-qa-1',
    topicId: 15,
    type: 'question_answer',
    prompt: 'Responde la pregunta en pasado',
    difficulty: 1,
    explanation: 'Yes, I did / No, I didn\'t',
    content: {
      given: 'Did you work yesterday?',
      expectedType: 'answer',
      acceptedAnswers: ['Yes, I did.', 'Yes, I did', "No, I didn't.", "No, I didn't", 'No, I did not.'],
    },
  } as QuestionAnswerExercise,

  {
    id: 'a1-pq-qa-2',
    topicId: 15,
    type: 'question_answer',
    prompt: 'Formula la pregunta en pasado',
    difficulty: 2,
    explanation: 'Did + you + verbo base?',
    content: {
      given: 'Yes, I watched TV yesterday.',
      expectedType: 'question',
      acceptedAnswers: ['Did you watch TV?', 'Did you watch TV yesterday?', 'Did you watch TV', 'Did you watch TV yesterday'],
    },
  } as QuestionAnswerExercise,

  {
    id: 'a1-pq-qa-3',
    topicId: 15,
    type: 'question_answer',
    prompt: 'Responde con informacion',
    difficulty: 2,
    explanation: 'What did you do? -> I + verbo pasado',
    content: {
      given: 'What did you do last weekend? (visit friends)',
      expectedType: 'answer',
      acceptedAnswers: ['I visited friends.', 'I visited friends', 'I visited my friends.', 'I visited my friends'],
    },
  } as QuestionAnswerExercise,

  // Multiple choice
  {
    id: 'a1-pq-mc-1',
    topicId: 15,
    type: 'multiple_choice',
    prompt: 'Selecciona la pregunta correcta',
    difficulty: 1,
    explanation: 'Did + sujeto + verbo BASE',
    content: {
      question: 'Fuiste a la tienda?',
      options: ['Did you go to the store?', 'Did you went to the store?', 'Do you go to the store?'],
      correctAnswer: 'Did you go to the store?',
    },
  } as MultipleChoiceExercise,

  {
    id: 'a1-pq-mc-2',
    topicId: 15,
    type: 'multiple_choice',
    prompt: 'Selecciona la negacion correcta',
    difficulty: 1,
    explanation: 'didn\'t + verbo BASE (no pasado)',
    content: {
      question: 'No comi pizza.',
      options: ["I didn't eat pizza.", "I didn't ate pizza.", "I not eat pizza."],
      correctAnswer: "I didn't eat pizza.",
    },
  } as MultipleChoiceExercise,

  {
    id: 'a1-pq-mc-3',
    topicId: 15,
    type: 'multiple_choice',
    prompt: 'Cual es la respuesta correcta?',
    difficulty: 2,
    explanation: 'Yes, pronombre + did / No, pronombre + didn\'t',
    content: {
      question: 'Did she call you?',
      options: ['Yes, she did.', 'Yes, she called.', 'Yes, she was.'],
      correctAnswer: 'Yes, she did.',
    },
  } as MultipleChoiceExercise,
];

export default a1PastQuestionsExercises;
