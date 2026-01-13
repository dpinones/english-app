import { Exercise, SVOBuilderExercise, FillBlankExercise, SentenceOrderExercise, MultipleChoiceExercise, TransformExercise, QuestionAnswerExercise } from '@/types';

// ==========================================
// EJERCICIOS A1: Have got
// Tema 7: Posesion con have got
// ==========================================

export const a1HaveGotExercises: Exercise[] = [
  // SVO Builder
  {
    id: 'a1-hg-svo-1',
    topicId: 7,
    type: 'svo_builder',
    prompt: 'Construye: "Yo tengo un carro"',
    difficulty: 1,
    explanation: 'I/You/We/They + have got, He/She/It + has got',
    content: {
      subjectOptions: ['I', 'He', 'They'],
      verbOptions: ['have got', 'has got', 'am got'],
      objectOptions: ['a car', 'a house', 'a dog'],
      correctSentence: 'I have got a car',
    },
  } as SVOBuilderExercise,

  {
    id: 'a1-hg-svo-2',
    topicId: 7,
    type: 'svo_builder',
    prompt: 'Construye: "Ella tiene un perro"',
    difficulty: 1,
    explanation: 'She + has got (tercera persona)',
    content: {
      subjectOptions: ['She', 'I', 'They'],
      verbOptions: ['has got', 'have got', 'is got'],
      objectOptions: ['a dog', 'a cat', 'a bird'],
      correctSentence: 'She has got a dog',
    },
  } as SVOBuilderExercise,

  {
    id: 'a1-hg-svo-3',
    topicId: 7,
    type: 'svo_builder',
    prompt: 'Construye: "Ellos tienen dos hijos"',
    difficulty: 1,
    explanation: 'They + have got',
    content: {
      subjectOptions: ['They', 'He', 'She'],
      verbOptions: ['have got', 'has got', 'are got'],
      objectOptions: ['two children', 'a child', 'three children'],
      correctSentence: 'They have got two children',
    },
  } as SVOBuilderExercise,

  // Fill the blank
  {
    id: 'a1-hg-fill-1',
    topicId: 7,
    type: 'fill_blank',
    prompt: 'Completa con have got o has got',
    difficulty: 1,
    explanation: 'I/You/We/They + have got',
    content: {
      sentence: 'I ___ a new phone.',
      options: ['have got', 'has got', 'am got'],
      correctAnswer: 'have got',
    },
  } as FillBlankExercise,

  {
    id: 'a1-hg-fill-2',
    topicId: 7,
    type: 'fill_blank',
    prompt: 'Completa con have got o has got',
    difficulty: 1,
    explanation: 'He/She/It + has got',
    content: {
      sentence: 'He ___ blue eyes.',
      options: ['has got', 'have got', 'is got'],
      correctAnswer: 'has got',
    },
  } as FillBlankExercise,

  {
    id: 'a1-hg-fill-3',
    topicId: 7,
    type: 'fill_blank',
    prompt: 'Completa con have got o has got',
    difficulty: 1,
    explanation: 'We + have got',
    content: {
      sentence: 'We ___ a big house.',
      options: ['have got', 'has got', 'are got'],
      correctAnswer: 'have got',
    },
  } as FillBlankExercise,

  {
    id: 'a1-hg-fill-4',
    topicId: 7,
    type: 'fill_blank',
    prompt: 'Completa la forma negativa',
    difficulty: 2,
    explanation: 'Negativo: have not got / haven\'t got',
    content: {
      sentence: 'I ___ any money.',
      options: ["haven't got", "hasn't got", "don't got"],
      correctAnswer: "haven't got",
    },
  } as FillBlankExercise,

  {
    id: 'a1-hg-fill-5',
    topicId: 7,
    type: 'fill_blank',
    prompt: 'Completa la forma negativa',
    difficulty: 2,
    explanation: 'She + has not got / hasn\'t got',
    content: {
      sentence: 'She ___ a car.',
      options: ["hasn't got", "haven't got", "don't got"],
      correctAnswer: "hasn't got",
    },
  } as FillBlankExercise,

  // Sentence order
  {
    id: 'a1-hg-order-1',
    topicId: 7,
    type: 'sentence_order',
    prompt: 'Ordena las palabras',
    difficulty: 1,
    explanation: 'Orden: Sujeto + have/has got + objeto',
    content: {
      words: ['I', 'have', 'got', 'a', 'brother'],
      correctOrder: ['I', 'have', 'got', 'a', 'brother'],
    },
  } as SentenceOrderExercise,

  {
    id: 'a1-hg-order-2',
    topicId: 7,
    type: 'sentence_order',
    prompt: 'Ordena para formar una pregunta',
    difficulty: 2,
    explanation: 'Pregunta: Have/Has + sujeto + got + objeto?',
    content: {
      words: ['Have', 'you', 'got', 'a', 'pet', '?'],
      correctOrder: ['Have', 'you', 'got', 'a', 'pet', '?'],
    },
  } as SentenceOrderExercise,

  {
    id: 'a1-hg-order-3',
    topicId: 7,
    type: 'sentence_order',
    prompt: 'Ordena para formar una pregunta',
    difficulty: 2,
    explanation: 'Has + he/she/it + got?',
    content: {
      words: ['Has', 'she', 'got', 'a', 'job', '?'],
      correctOrder: ['Has', 'she', 'got', 'a', 'job', '?'],
    },
  } as SentenceOrderExercise,

  // Transform exercises
  {
    id: 'a1-hg-transform-1',
    topicId: 7,
    type: 'transform',
    prompt: 'Convierte a pregunta',
    difficulty: 2,
    explanation: 'Mueve have/has al inicio: Have you got...?',
    content: {
      original: 'You have got a car.',
      targetType: 'question',
      acceptedAnswers: ['Have you got a car?', 'Have you got a car'],
    },
  } as TransformExercise,

  {
    id: 'a1-hg-transform-2',
    topicId: 7,
    type: 'transform',
    prompt: 'Convierte a negativa',
    difficulty: 2,
    explanation: 'Agrega not despues de have/has',
    content: {
      original: 'He has got a bike.',
      targetType: 'negative',
      acceptedAnswers: ['He has not got a bike.', 'He has not got a bike', "He hasn't got a bike.", "He hasn't got a bike"],
    },
  } as TransformExercise,

  {
    id: 'a1-hg-transform-3',
    topicId: 7,
    type: 'transform',
    prompt: 'Convierte a pregunta',
    difficulty: 2,
    explanation: 'Has + she + got?',
    content: {
      original: 'She has got two sisters.',
      targetType: 'question',
      acceptedAnswers: ['Has she got two sisters?', 'Has she got two sisters'],
    },
  } as TransformExercise,

  // Question & Answer
  {
    id: 'a1-hg-qa-1',
    topicId: 7,
    type: 'question_answer',
    prompt: 'Responde la pregunta',
    difficulty: 1,
    explanation: 'Respuesta corta: Yes, I have / No, I haven\'t',
    content: {
      given: 'Have you got a phone?',
      expectedType: 'answer',
      acceptedAnswers: ['Yes, I have.', 'Yes, I have', "No, I haven't.", "No, I haven't", 'No, I have not.'],
    },
  } as QuestionAnswerExercise,

  {
    id: 'a1-hg-qa-2',
    topicId: 7,
    type: 'question_answer',
    prompt: 'Responde la pregunta',
    difficulty: 1,
    explanation: 'Yes, she has / No, she hasn\'t',
    content: {
      given: 'Has she got a dog?',
      expectedType: 'answer',
      acceptedAnswers: ['Yes, she has.', 'Yes, she has', "No, she hasn't.", "No, she hasn't", 'No, she has not.'],
    },
  } as QuestionAnswerExercise,

  {
    id: 'a1-hg-qa-3',
    topicId: 7,
    type: 'question_answer',
    prompt: 'Formula la pregunta para saber si tiene hermanos',
    difficulty: 2,
    explanation: 'Have you got + sustantivo?',
    content: {
      given: 'Yes, I have got two brothers.',
      expectedType: 'question',
      acceptedAnswers: ['Have you got brothers?', 'Have you got any brothers?', 'Have you got brothers', 'Have you got any brothers'],
    },
  } as QuestionAnswerExercise,

  // Multiple choice
  {
    id: 'a1-hg-mc-1',
    topicId: 7,
    type: 'multiple_choice',
    prompt: 'Selecciona la oracion correcta',
    difficulty: 1,
    explanation: 'I + have got (no "has")',
    content: {
      question: 'Yo tengo un carro:',
      options: ['I have got a car.', 'I has got a car.', 'I am got a car.'],
      correctAnswer: 'I have got a car.',
    },
  } as MultipleChoiceExercise,

  {
    id: 'a1-hg-mc-2',
    topicId: 7,
    type: 'multiple_choice',
    prompt: 'Selecciona la pregunta correcta',
    difficulty: 2,
    explanation: 'Have/Has + sujeto + got?',
    content: {
      question: 'Pregunta correcta para "Tienes hermanos?":',
      options: ['Have you got brothers?', 'Do you have got brothers?', 'Are you got brothers?'],
      correctAnswer: 'Have you got brothers?',
    },
  } as MultipleChoiceExercise,

  {
    id: 'a1-hg-mc-3',
    topicId: 7,
    type: 'multiple_choice',
    prompt: 'Selecciona la forma negativa correcta',
    difficulty: 2,
    explanation: 'haven\'t got / hasn\'t got',
    content: {
      question: 'El no tiene trabajo:',
      options: ["He hasn't got a job.", "He haven't got a job.", "He don't got a job."],
      correctAnswer: "He hasn't got a job.",
    },
  } as MultipleChoiceExercise,
];

export default a1HaveGotExercises;
