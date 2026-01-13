import { Exercise, SVOBuilderExercise, FillBlankExercise, SentenceOrderExercise, MultipleChoiceExercise } from '@/types';

// ==========================================
// EJERCICIOS A1: Present simple forms of 'to be'
// Tema: am/is/are
// ==========================================

export const a1PresentBeExercises: Exercise[] = [
  // SVO Builder exercises
  {
    id: 'a1-be-svo-1',
    topicId: 1,
    type: 'svo_builder',
    prompt: 'Construye la oracion: "Soy un estudiante"',
    difficulty: 1,
    explanation: 'Usamos "am" con el pronombre "I". Formula: I + am + complemento',
    content: {
      subjectOptions: ['I', 'You', 'He'],
      verbOptions: ['am', 'is', 'are'],
      objectOptions: ['a student', 'a teacher', 'happy'],
      correctSentence: 'I am a student',
    },
  } as SVOBuilderExercise,

  {
    id: 'a1-be-svo-2',
    topicId: 1,
    type: 'svo_builder',
    prompt: 'Construye la oracion: "Ella es doctora"',
    difficulty: 1,
    explanation: 'Usamos "is" con He/She/It. Formula: She + is + complemento',
    content: {
      subjectOptions: ['She', 'He', 'I'],
      verbOptions: ['am', 'is', 'are'],
      objectOptions: ['a doctor', 'a nurse', 'tired'],
      correctSentence: 'She is a doctor',
    },
  } as SVOBuilderExercise,

  {
    id: 'a1-be-svo-3',
    topicId: 1,
    type: 'svo_builder',
    prompt: 'Construye la oracion: "Ellos son felices"',
    difficulty: 1,
    explanation: 'Usamos "are" con You/We/They. Formula: They + are + complemento',
    content: {
      subjectOptions: ['They', 'We', 'He'],
      verbOptions: ['am', 'is', 'are'],
      objectOptions: ['happy', 'sad', 'tired'],
      correctSentence: 'They are happy',
    },
  } as SVOBuilderExercise,

  {
    id: 'a1-be-svo-4',
    topicId: 1,
    type: 'svo_builder',
    prompt: 'Construye la oracion: "Tu eres mi amigo"',
    difficulty: 2,
    explanation: 'Usamos "are" con "You". Formula: You + are + complemento',
    content: {
      subjectOptions: ['You', 'I', 'She'],
      verbOptions: ['am', 'is', 'are'],
      objectOptions: ['my friend', 'my teacher', 'happy'],
      correctSentence: 'You are my friend',
    },
  } as SVOBuilderExercise,

  {
    id: 'a1-be-svo-5',
    topicId: 1,
    type: 'svo_builder',
    prompt: 'Construye la oracion: "Nosotros somos estudiantes"',
    difficulty: 2,
    explanation: 'Usamos "are" con "We". Formula: We + are + complemento',
    content: {
      subjectOptions: ['We', 'They', 'I'],
      verbOptions: ['am', 'is', 'are'],
      objectOptions: ['students', 'teachers', 'happy'],
      correctSentence: 'We are students',
    },
  } as SVOBuilderExercise,

  // Fill the blank exercises
  {
    id: 'a1-be-fill-1',
    topicId: 1,
    type: 'fill_blank',
    prompt: 'Completa con la forma correcta del verbo "to be"',
    difficulty: 1,
    explanation: 'I siempre va con "am"',
    content: {
      sentence: 'I ___ a programmer.',
      options: ['am', 'is', 'are'],
      correctAnswer: 'am',
    },
  } as FillBlankExercise,

  {
    id: 'a1-be-fill-2',
    topicId: 1,
    type: 'fill_blank',
    prompt: 'Completa con la forma correcta del verbo "to be"',
    difficulty: 1,
    explanation: 'He/She/It siempre van con "is"',
    content: {
      sentence: 'She ___ my sister.',
      options: ['am', 'is', 'are'],
      correctAnswer: 'is',
    },
  } as FillBlankExercise,

  {
    id: 'a1-be-fill-3',
    topicId: 1,
    type: 'fill_blank',
    prompt: 'Completa con la forma correcta del verbo "to be"',
    difficulty: 1,
    explanation: 'You/We/They siempre van con "are"',
    content: {
      sentence: 'They ___ from Mexico.',
      options: ['am', 'is', 'are'],
      correctAnswer: 'are',
    },
  } as FillBlankExercise,

  {
    id: 'a1-be-fill-4',
    topicId: 1,
    type: 'fill_blank',
    prompt: 'Completa con la forma correcta del verbo "to be"',
    difficulty: 2,
    explanation: 'It siempre va con "is"',
    content: {
      sentence: 'It ___ a beautiful day.',
      options: ['am', 'is', 'are'],
      correctAnswer: 'is',
    },
  } as FillBlankExercise,

  {
    id: 'a1-be-fill-5',
    topicId: 1,
    type: 'fill_blank',
    prompt: 'Completa con la forma correcta del verbo "to be"',
    difficulty: 2,
    explanation: 'We siempre va con "are"',
    content: {
      sentence: 'We ___ ready to start.',
      options: ['am', 'is', 'are'],
      correctAnswer: 'are',
    },
  } as FillBlankExercise,

  // Sentence order exercises
  {
    id: 'a1-be-order-1',
    topicId: 1,
    type: 'sentence_order',
    prompt: 'Ordena las palabras para formar una oracion',
    difficulty: 1,
    explanation: 'En ingles el orden es: Sujeto + Verbo + Complemento',
    content: {
      words: ['I', 'am', 'happy'],
      correctOrder: ['I', 'am', 'happy'],
    },
  } as SentenceOrderExercise,

  {
    id: 'a1-be-order-2',
    topicId: 1,
    type: 'sentence_order',
    prompt: 'Ordena las palabras para formar una oracion',
    difficulty: 2,
    explanation: 'Los articulos (a/an) van antes del sustantivo',
    content: {
      words: ['She', 'is', 'a', 'teacher'],
      correctOrder: ['She', 'is', 'a', 'teacher'],
    },
  } as SentenceOrderExercise,

  {
    id: 'a1-be-order-3',
    topicId: 1,
    type: 'sentence_order',
    prompt: 'Ordena las palabras para formar una oracion',
    difficulty: 2,
    explanation: 'El adjetivo posesivo (my, your) va antes del sustantivo',
    content: {
      words: ['You', 'are', 'my', 'friend'],
      correctOrder: ['You', 'are', 'my', 'friend'],
    },
  } as SentenceOrderExercise,

  {
    id: 'a1-be-order-4',
    topicId: 1,
    type: 'sentence_order',
    prompt: 'Ordena las palabras para formar una oracion',
    difficulty: 2,
    explanation: 'Sujeto + Verbo + Complemento',
    content: {
      words: ['They', 'are', 'students'],
      distractors: ['is'],
      correctOrder: ['They', 'are', 'students'],
    },
  } as SentenceOrderExercise,

  {
    id: 'a1-be-order-5',
    topicId: 1,
    type: 'sentence_order',
    prompt: 'Ordena las palabras para formar una oracion',
    difficulty: 3,
    explanation: 'El adjetivo en ingles va antes del sustantivo',
    content: {
      words: ['It', 'is', 'a', 'good', 'idea'],
      correctOrder: ['It', 'is', 'a', 'good', 'idea'],
    },
  } as SentenceOrderExercise,

  // Multiple choice exercises
  {
    id: 'a1-be-mc-1',
    topicId: 1,
    type: 'multiple_choice',
    prompt: 'Selecciona la oracion correcta',
    difficulty: 1,
    explanation: 'I siempre usa "am", nunca "is" o "are"',
    content: {
      question: 'Which sentence is correct?',
      options: ['I am tired.', 'I is tired.', 'I are tired.'],
      correctAnswer: 'I am tired.',
    },
  } as MultipleChoiceExercise,

  {
    id: 'a1-be-mc-2',
    topicId: 1,
    type: 'multiple_choice',
    prompt: 'Selecciona la oracion correcta',
    difficulty: 1,
    explanation: 'He/She/It usan "is"',
    content: {
      question: 'Which sentence is correct?',
      options: ['He is a doctor.', 'He am a doctor.', 'He are a doctor.'],
      correctAnswer: 'He is a doctor.',
    },
  } as MultipleChoiceExercise,

  {
    id: 'a1-be-mc-3',
    topicId: 1,
    type: 'multiple_choice',
    prompt: 'Selecciona la oracion correcta',
    difficulty: 2,
    explanation: 'We/You/They usan "are"',
    content: {
      question: 'Which sentence is correct?',
      options: ['We are happy.', 'We is happy.', 'We am happy.'],
      correctAnswer: 'We are happy.',
    },
  } as MultipleChoiceExercise,

  {
    id: 'a1-be-mc-4',
    topicId: 1,
    type: 'multiple_choice',
    prompt: 'Como se dice "Soy programador" en ingles?',
    difficulty: 2,
    explanation: 'I + am + a + profesion',
    content: {
      question: 'How do you say "Soy programador" in English?',
      options: ['I am a programmer.', 'I is a programmer.', 'I are programmer.'],
      correctAnswer: 'I am a programmer.',
    },
  } as MultipleChoiceExercise,

  {
    id: 'a1-be-mc-5',
    topicId: 1,
    type: 'multiple_choice',
    prompt: 'Selecciona la traduccion correcta de "Son mis amigos"',
    difficulty: 2,
    explanation: 'They + are + complemento',
    content: {
      question: 'How do you say "Son mis amigos" in English?',
      options: ['They are my friends.', 'They is my friends.', 'They am my friends.'],
      correctAnswer: 'They are my friends.',
    },
  } as MultipleChoiceExercise,
];

export default a1PresentBeExercises;
