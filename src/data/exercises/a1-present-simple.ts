import { Exercise, SVOBuilderExercise, FillBlankExercise, SentenceOrderExercise, MultipleChoiceExercise } from '@/types';

// ==========================================
// EJERCICIOS A1: Present simple
// Tema: I do, I don't, Do I?
// ==========================================

export const a1PresentSimpleExercises: Exercise[] = [
  // SVO Builder exercises
  {
    id: 'a1-ps-svo-1',
    topicId: 2,
    type: 'svo_builder',
    prompt: 'Construye la oracion: "Yo trabajo"',
    difficulty: 1,
    explanation: 'En presente simple con I/You/We/They, el verbo no cambia. Formula: I + verbo base',
    content: {
      subjectOptions: ['I', 'He', 'They'],
      verbOptions: ['work', 'works', 'working'],
      objectOptions: ['every day', 'hard', ''],
      correctSentence: 'I work',
    },
  } as SVOBuilderExercise,

  {
    id: 'a1-ps-svo-2',
    topicId: 2,
    type: 'svo_builder',
    prompt: 'Construye la oracion: "El estudia ingles"',
    difficulty: 2,
    explanation: 'Con He/She/It, anadimos -s o -es al verbo. Formula: He + verbo+s + complemento',
    content: {
      subjectOptions: ['He', 'I', 'They'],
      verbOptions: ['study', 'studies', 'studying'],
      objectOptions: ['English', 'Spanish', 'French'],
      correctSentence: 'He studies English',
    },
  } as SVOBuilderExercise,

  {
    id: 'a1-ps-svo-3',
    topicId: 2,
    type: 'svo_builder',
    prompt: 'Construye la oracion: "Nosotros comemos pizza"',
    difficulty: 1,
    explanation: 'Con We, el verbo no cambia. Formula: We + verbo base + complemento',
    content: {
      subjectOptions: ['We', 'She', 'I'],
      verbOptions: ['eat', 'eats', 'eating'],
      objectOptions: ['pizza', 'pasta', 'rice'],
      correctSentence: 'We eat pizza',
    },
  } as SVOBuilderExercise,

  {
    id: 'a1-ps-svo-4',
    topicId: 2,
    type: 'svo_builder',
    prompt: 'Construye la oracion: "Ella habla espanol"',
    difficulty: 2,
    explanation: 'Con She, anadimos -s al verbo. Formula: She + verbo+s + complemento',
    content: {
      subjectOptions: ['She', 'They', 'I'],
      verbOptions: ['speak', 'speaks', 'speaking'],
      objectOptions: ['Spanish', 'English', 'French'],
      correctSentence: 'She speaks Spanish',
    },
  } as SVOBuilderExercise,

  {
    id: 'a1-ps-svo-5',
    topicId: 2,
    type: 'svo_builder',
    prompt: 'Construye la oracion: "Tu lees libros"',
    difficulty: 1,
    explanation: 'Con You, el verbo no cambia. Formula: You + verbo base + complemento',
    content: {
      subjectOptions: ['You', 'He', 'It'],
      verbOptions: ['read', 'reads', 'reading'],
      objectOptions: ['books', 'magazines', 'newspapers'],
      correctSentence: 'You read books',
    },
  } as SVOBuilderExercise,

  // Fill the blank exercises
  {
    id: 'a1-ps-fill-1',
    topicId: 2,
    type: 'fill_blank',
    prompt: 'Completa con la forma correcta del verbo',
    difficulty: 1,
    explanation: 'I/You/We/They + verbo base (sin cambios)',
    content: {
      sentence: 'I ___ coffee every morning.',
      options: ['drink', 'drinks', 'drinking'],
      correctAnswer: 'drink',
    },
  } as FillBlankExercise,

  {
    id: 'a1-ps-fill-2',
    topicId: 2,
    type: 'fill_blank',
    prompt: 'Completa con la forma correcta del verbo',
    difficulty: 2,
    explanation: 'He/She/It + verbo con -s o -es',
    content: {
      sentence: 'She ___ to the gym on Mondays.',
      options: ['go', 'goes', 'going'],
      correctAnswer: 'goes',
    },
  } as FillBlankExercise,

  {
    id: 'a1-ps-fill-3',
    topicId: 2,
    type: 'fill_blank',
    prompt: 'Completa con la forma correcta del verbo',
    difficulty: 2,
    explanation: 'He/She/It + verbo con -es cuando termina en -ch, -sh, -s, -x, -o',
    content: {
      sentence: 'He ___ TV in the evening.',
      options: ['watch', 'watches', 'watching'],
      correctAnswer: 'watches',
    },
  } as FillBlankExercise,

  {
    id: 'a1-ps-fill-4',
    topicId: 2,
    type: 'fill_blank',
    prompt: 'Completa con la forma correcta del verbo',
    difficulty: 1,
    explanation: 'They + verbo base',
    content: {
      sentence: 'They ___ in an office.',
      options: ['work', 'works', 'working'],
      correctAnswer: 'work',
    },
  } as FillBlankExercise,

  {
    id: 'a1-ps-fill-5',
    topicId: 2,
    type: 'fill_blank',
    prompt: 'Completa con la forma correcta del verbo',
    difficulty: 2,
    explanation: 'It + verbo con -s',
    content: {
      sentence: 'The code ___ well.',
      options: ['run', 'runs', 'running'],
      correctAnswer: 'runs',
    },
  } as FillBlankExercise,

  // Sentence order exercises
  {
    id: 'a1-ps-order-1',
    topicId: 2,
    type: 'sentence_order',
    prompt: 'Ordena las palabras para formar una oracion',
    difficulty: 1,
    explanation: 'Orden: Sujeto + Verbo + Complemento',
    content: {
      words: ['I', 'like', 'coding'],
      correctOrder: ['I', 'like', 'coding'],
    },
  } as SentenceOrderExercise,

  {
    id: 'a1-ps-order-2',
    topicId: 2,
    type: 'sentence_order',
    prompt: 'Ordena las palabras para formar una oracion',
    difficulty: 2,
    explanation: 'Recuerda: He/She/It + verbo con -s',
    content: {
      words: ['She', 'works', 'from', 'home'],
      correctOrder: ['She', 'works', 'from', 'home'],
    },
  } as SentenceOrderExercise,

  {
    id: 'a1-ps-order-3',
    topicId: 2,
    type: 'sentence_order',
    prompt: 'Ordena las palabras para formar una oracion negativa',
    difficulty: 2,
    explanation: 'Negativo: Sujeto + do not (dont) + verbo base',
    content: {
      words: ['I', 'do', 'not', 'like', 'bugs'],
      correctOrder: ['I', 'do', 'not', 'like', 'bugs'],
    },
  } as SentenceOrderExercise,

  {
    id: 'a1-ps-order-4',
    topicId: 2,
    type: 'sentence_order',
    prompt: 'Ordena las palabras para formar una pregunta',
    difficulty: 3,
    explanation: 'Pregunta: Do/Does + Sujeto + verbo base?',
    content: {
      words: ['Do', 'you', 'speak', 'English', '?'],
      correctOrder: ['Do', 'you', 'speak', 'English', '?'],
    },
  } as SentenceOrderExercise,

  {
    id: 'a1-ps-order-5',
    topicId: 2,
    type: 'sentence_order',
    prompt: 'Ordena las palabras para formar una pregunta',
    difficulty: 3,
    explanation: 'Con He/She/It usamos "Does" y el verbo sin -s',
    content: {
      words: ['Does', 'he', 'work', 'here', '?'],
      correctOrder: ['Does', 'he', 'work', 'here', '?'],
    },
  } as SentenceOrderExercise,

  // Multiple choice exercises
  {
    id: 'a1-ps-mc-1',
    topicId: 2,
    type: 'multiple_choice',
    prompt: 'Selecciona la oracion correcta',
    difficulty: 1,
    explanation: 'Con I, el verbo no cambia',
    content: {
      question: 'Which sentence is correct?',
      options: ['I work every day.', 'I works every day.', 'I working every day.'],
      correctAnswer: 'I work every day.',
    },
  } as MultipleChoiceExercise,

  {
    id: 'a1-ps-mc-2',
    topicId: 2,
    type: 'multiple_choice',
    prompt: 'Selecciona la oracion correcta',
    difficulty: 2,
    explanation: 'Con He, anadimos -s al verbo',
    content: {
      question: 'Which sentence is correct?',
      options: ['He plays football.', 'He play football.', 'He playing football.'],
      correctAnswer: 'He plays football.',
    },
  } as MultipleChoiceExercise,

  {
    id: 'a1-ps-mc-3',
    topicId: 2,
    type: 'multiple_choice',
    prompt: 'Como se forma el negativo con "I"?',
    difficulty: 2,
    explanation: 'I + do not (dont) + verbo base',
    content: {
      question: 'How do you say "No me gusta" in English?',
      options: ["I don't like it.", "I doesn't like it.", 'I not like it.'],
      correctAnswer: "I don't like it.",
    },
  } as MultipleChoiceExercise,

  {
    id: 'a1-ps-mc-4',
    topicId: 2,
    type: 'multiple_choice',
    prompt: 'Selecciona la pregunta correcta',
    difficulty: 2,
    explanation: 'Pregunta: Do + sujeto + verbo base',
    content: {
      question: 'Which question is correct?',
      options: ['Do you like coding?', 'Does you like coding?', 'You like coding?'],
      correctAnswer: 'Do you like coding?',
    },
  } as MultipleChoiceExercise,

  {
    id: 'a1-ps-mc-5',
    topicId: 2,
    type: 'multiple_choice',
    prompt: 'Selecciona la pregunta correcta para "she"',
    difficulty: 3,
    explanation: 'Con He/She/It: Does + sujeto + verbo base (sin -s)',
    content: {
      question: 'Which question is correct?',
      options: ['Does she work here?', 'Do she works here?', 'Does she works here?'],
      correctAnswer: 'Does she work here?',
    },
  } as MultipleChoiceExercise,
];

export default a1PresentSimpleExercises;
