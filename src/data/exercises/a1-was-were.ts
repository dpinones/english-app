import { Exercise, SVOBuilderExercise, FillBlankExercise, SentenceOrderExercise, MultipleChoiceExercise, TransformExercise, QuestionAnswerExercise } from '@/types';

// ==========================================
// EJERCICIOS A1: Was/Were
// Tema 13: Past simple of 'to be'
// ==========================================

export const a1WasWereExercises: Exercise[] = [
  // SVO Builder
  {
    id: 'a1-ww-svo-1',
    topicId: 13,
    type: 'svo_builder',
    prompt: 'Construye: "Yo estaba cansado"',
    difficulty: 1,
    explanation: 'I/He/She/It + was, You/We/They + were',
    content: {
      subjectOptions: ['I', 'You', 'They'],
      verbOptions: ['was', 'were', 'am'],
      objectOptions: ['tired', 'happy', 'sad'],
      correctSentence: 'I was tired',
    },
  } as SVOBuilderExercise,

  {
    id: 'a1-ww-svo-2',
    topicId: 13,
    type: 'svo_builder',
    prompt: 'Construye: "Ellos estaban en casa"',
    difficulty: 1,
    explanation: 'They + were',
    content: {
      subjectOptions: ['They', 'He', 'I'],
      verbOptions: ['were', 'was', 'are'],
      objectOptions: ['at home', 'at work', 'at school'],
      correctSentence: 'They were at home',
    },
  } as SVOBuilderExercise,

  {
    id: 'a1-ww-svo-3',
    topicId: 13,
    type: 'svo_builder',
    prompt: 'Construye: "El era un estudiante"',
    difficulty: 1,
    explanation: 'He + was',
    content: {
      subjectOptions: ['He', 'They', 'We'],
      verbOptions: ['was', 'were', 'is'],
      objectOptions: ['a student', 'a teacher', 'a doctor'],
      correctSentence: 'He was a student',
    },
  } as SVOBuilderExercise,

  // Fill the blank
  {
    id: 'a1-ww-fill-1',
    topicId: 13,
    type: 'fill_blank',
    prompt: 'Completa con was o were',
    difficulty: 1,
    explanation: 'I + was',
    content: {
      sentence: 'I ___ at the office yesterday.',
      options: ['was', 'were', 'am'],
      correctAnswer: 'was',
    },
  } as FillBlankExercise,

  {
    id: 'a1-ww-fill-2',
    topicId: 13,
    type: 'fill_blank',
    prompt: 'Completa con was o were',
    difficulty: 1,
    explanation: 'You + were',
    content: {
      sentence: 'You ___ very helpful.',
      options: ['were', 'was', 'are'],
      correctAnswer: 'were',
    },
  } as FillBlankExercise,

  {
    id: 'a1-ww-fill-3',
    topicId: 13,
    type: 'fill_blank',
    prompt: 'Completa con was o were',
    difficulty: 1,
    explanation: 'She + was',
    content: {
      sentence: 'She ___ a great teacher.',
      options: ['was', 'were', 'is'],
      correctAnswer: 'was',
    },
  } as FillBlankExercise,

  {
    id: 'a1-ww-fill-4',
    topicId: 13,
    type: 'fill_blank',
    prompt: 'Completa con was o were',
    difficulty: 1,
    explanation: 'We + were',
    content: {
      sentence: 'We ___ friends in school.',
      options: ['were', 'was', 'are'],
      correctAnswer: 'were',
    },
  } as FillBlankExercise,

  {
    id: 'a1-ww-fill-5',
    topicId: 13,
    type: 'fill_blank',
    prompt: 'Completa la forma negativa',
    difficulty: 2,
    explanation: 'was not = wasn\'t',
    content: {
      sentence: 'It ___ my fault.',
      options: ["wasn't", "weren't", "isn't"],
      correctAnswer: "wasn't",
    },
  } as FillBlankExercise,

  {
    id: 'a1-ww-fill-6',
    topicId: 13,
    type: 'fill_blank',
    prompt: 'Completa la forma negativa',
    difficulty: 2,
    explanation: 'were not = weren\'t',
    content: {
      sentence: 'They ___ at the party.',
      options: ["weren't", "wasn't", "aren't"],
      correctAnswer: "weren't",
    },
  } as FillBlankExercise,

  // Sentence order
  {
    id: 'a1-ww-order-1',
    topicId: 13,
    type: 'sentence_order',
    prompt: 'Ordena las palabras',
    difficulty: 1,
    explanation: 'Orden: Sujeto + was/were + complemento',
    content: {
      words: ['I', 'was', 'happy', 'yesterday'],
      correctOrder: ['I', 'was', 'happy', 'yesterday'],
    },
  } as SentenceOrderExercise,

  {
    id: 'a1-ww-order-2',
    topicId: 13,
    type: 'sentence_order',
    prompt: 'Ordena para formar una pregunta',
    difficulty: 2,
    explanation: 'Pregunta: Was/Were + sujeto + complemento?',
    content: {
      words: ['Were', 'you', 'at', 'home', '?'],
      correctOrder: ['Were', 'you', 'at', 'home', '?'],
    },
  } as SentenceOrderExercise,

  {
    id: 'a1-ww-order-3',
    topicId: 13,
    type: 'sentence_order',
    prompt: 'Ordena para formar una pregunta',
    difficulty: 2,
    explanation: 'Was + he/she/it?',
    content: {
      words: ['Was', 'she', 'your', 'teacher', '?'],
      correctOrder: ['Was', 'she', 'your', 'teacher', '?'],
    },
  } as SentenceOrderExercise,

  // Transform exercises
  {
    id: 'a1-ww-transform-1',
    topicId: 13,
    type: 'transform',
    prompt: 'Convierte a pregunta',
    difficulty: 2,
    explanation: 'Mueve was/were al inicio',
    content: {
      original: 'You were busy.',
      targetType: 'question',
      acceptedAnswers: ['Were you busy?', 'Were you busy'],
    },
  } as TransformExercise,

  {
    id: 'a1-ww-transform-2',
    topicId: 13,
    type: 'transform',
    prompt: 'Convierte a negativa',
    difficulty: 2,
    explanation: 'Agrega not despues de was/were',
    content: {
      original: 'He was late.',
      targetType: 'negative',
      acceptedAnswers: ['He was not late.', 'He was not late', "He wasn't late.", "He wasn't late"],
    },
  } as TransformExercise,

  {
    id: 'a1-ww-transform-3',
    topicId: 13,
    type: 'transform',
    prompt: 'Convierte a pregunta',
    difficulty: 2,
    explanation: 'Were + they?',
    content: {
      original: 'They were at the party.',
      targetType: 'question',
      acceptedAnswers: ['Were they at the party?', 'Were they at the party'],
    },
  } as TransformExercise,

  // Question & Answer
  {
    id: 'a1-ww-qa-1',
    topicId: 13,
    type: 'question_answer',
    prompt: 'Responde la pregunta',
    difficulty: 1,
    explanation: 'Yes, I was / No, I wasn\'t',
    content: {
      given: 'Were you tired yesterday?',
      expectedType: 'answer',
      acceptedAnswers: ['Yes, I was.', 'Yes, I was', "No, I wasn't.", "No, I wasn't", 'No, I was not.'],
    },
  } as QuestionAnswerExercise,

  {
    id: 'a1-ww-qa-2',
    topicId: 13,
    type: 'question_answer',
    prompt: 'Responde la pregunta',
    difficulty: 1,
    explanation: 'Yes, she was / No, she wasn\'t',
    content: {
      given: 'Was she at work?',
      expectedType: 'answer',
      acceptedAnswers: ['Yes, she was.', 'Yes, she was', "No, she wasn't.", "No, she wasn't", 'No, she was not.'],
    },
  } as QuestionAnswerExercise,

  {
    id: 'a1-ww-qa-3',
    topicId: 13,
    type: 'question_answer',
    prompt: 'Formula la pregunta para Where + was',
    difficulty: 2,
    explanation: 'Where + was + sujeto?',
    content: {
      given: 'I was at the store.',
      expectedType: 'question',
      acceptedAnswers: ['Where were you?', 'Where were you'],
    },
  } as QuestionAnswerExercise,

  // Multiple choice
  {
    id: 'a1-ww-mc-1',
    topicId: 13,
    type: 'multiple_choice',
    prompt: 'Selecciona la oracion correcta',
    difficulty: 1,
    explanation: 'I + was',
    content: {
      question: 'Yo estaba enfermo:',
      options: ['I was sick.', 'I were sick.', 'I am sick.'],
      correctAnswer: 'I was sick.',
    },
  } as MultipleChoiceExercise,

  {
    id: 'a1-ww-mc-2',
    topicId: 13,
    type: 'multiple_choice',
    prompt: 'Selecciona la oracion correcta',
    difficulty: 1,
    explanation: 'They + were',
    content: {
      question: 'Ellos estaban ocupados:',
      options: ['They were busy.', 'They was busy.', 'They are busy.'],
      correctAnswer: 'They were busy.',
    },
  } as MultipleChoiceExercise,

  {
    id: 'a1-ww-mc-3',
    topicId: 13,
    type: 'multiple_choice',
    prompt: 'Selecciona la pregunta correcta',
    difficulty: 2,
    explanation: 'Was/Were + sujeto?',
    content: {
      question: 'Estabas en casa?',
      options: ['Were you at home?', 'Was you at home?', 'Are you at home?'],
      correctAnswer: 'Were you at home?',
    },
  } as MultipleChoiceExercise,
];

export default a1WasWereExercises;
