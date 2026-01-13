import { Exercise, SVOBuilderExercise, FillBlankExercise, SentenceOrderExercise, MultipleChoiceExercise, TransformExercise, QuestionAnswerExercise } from '@/types';

// ==========================================
// EJERCICIOS A1: Questions
// Tema: Word order and question words
// ==========================================

export const a1QuestionsExercises: Exercise[] = [
  // SVO Builder - Preguntas basicas
  {
    id: 'a1-q-svo-1',
    topicId: 4,
    type: 'svo_builder',
    prompt: 'Construye la pregunta: "Que es esto?"',
    difficulty: 1,
    explanation: 'What + is + complemento?',
    content: {
      subjectOptions: ['What', 'Where', 'Who'],
      verbOptions: ['is', 'are', 'am'],
      objectOptions: ['this', 'that', 'it'],
      correctSentence: 'What is this',
    },
  } as SVOBuilderExercise,

  {
    id: 'a1-q-svo-2',
    topicId: 4,
    type: 'svo_builder',
    prompt: 'Construye: "Donde esta el?"',
    difficulty: 1,
    explanation: 'Where + is + sujeto?',
    content: {
      subjectOptions: ['Where', 'What', 'When'],
      verbOptions: ['is', 'are', 'am'],
      objectOptions: ['he', 'she', 'it'],
      correctSentence: 'Where is he',
    },
  } as SVOBuilderExercise,

  {
    id: 'a1-q-svo-3',
    topicId: 4,
    type: 'svo_builder',
    prompt: 'Construye: "Quien eres tu?"',
    difficulty: 1,
    explanation: 'Who + are + sujeto?',
    content: {
      subjectOptions: ['Who', 'What', 'Where'],
      verbOptions: ['am', 'is', 'are'],
      objectOptions: ['you', 'he', 'they'],
      correctSentence: 'Who are you',
    },
  } as SVOBuilderExercise,

  // Fill the blank
  {
    id: 'a1-q-fill-1',
    topicId: 4,
    type: 'fill_blank',
    prompt: 'Completa con la palabra interrogativa correcta',
    difficulty: 1,
    explanation: 'What = que/cual, Where = donde, Who = quien',
    content: {
      sentence: '___ is your name?',
      options: ['What', 'Where', 'Who'],
      correctAnswer: 'What',
    },
  } as FillBlankExercise,

  {
    id: 'a1-q-fill-2',
    topicId: 4,
    type: 'fill_blank',
    prompt: 'Completa con la palabra interrogativa correcta',
    difficulty: 1,
    explanation: 'Where se usa para preguntar por lugares',
    content: {
      sentence: '___ do you live?',
      options: ['What', 'Where', 'Who'],
      correctAnswer: 'Where',
    },
  } as FillBlankExercise,

  {
    id: 'a1-q-fill-3',
    topicId: 4,
    type: 'fill_blank',
    prompt: 'Completa con la palabra interrogativa correcta',
    difficulty: 2,
    explanation: 'How = como, se usa para preguntar de que manera',
    content: {
      sentence: '___ are you?',
      options: ['How', 'What', 'Where'],
      correctAnswer: 'How',
    },
  } as FillBlankExercise,

  {
    id: 'a1-q-fill-4',
    topicId: 4,
    type: 'fill_blank',
    prompt: 'Completa con la palabra interrogativa correcta',
    difficulty: 2,
    explanation: 'When = cuando, se usa para preguntar por tiempo',
    content: {
      sentence: '___ is your birthday?',
      options: ['When', 'Where', 'What'],
      correctAnswer: 'When',
    },
  } as FillBlankExercise,

  // Sentence order
  {
    id: 'a1-q-order-1',
    topicId: 4,
    type: 'sentence_order',
    prompt: 'Ordena las palabras para formar una pregunta',
    difficulty: 1,
    explanation: 'Orden: Palabra interrogativa + verbo + sujeto/complemento?',
    content: {
      words: ['What', 'is', 'your', 'job', '?'],
      correctOrder: ['What', 'is', 'your', 'job', '?'],
    },
  } as SentenceOrderExercise,

  {
    id: 'a1-q-order-2',
    topicId: 4,
    type: 'sentence_order',
    prompt: 'Ordena las palabras para formar una pregunta',
    difficulty: 2,
    explanation: 'Con Do/Does: Do/Does + sujeto + verbo base?',
    content: {
      words: ['Do', 'you', 'speak', 'English', '?'],
      correctOrder: ['Do', 'you', 'speak', 'English', '?'],
    },
  } as SentenceOrderExercise,

  {
    id: 'a1-q-order-3',
    topicId: 4,
    type: 'sentence_order',
    prompt: 'Ordena las palabras',
    difficulty: 2,
    explanation: 'Where + do/does + sujeto + verbo?',
    content: {
      words: ['Where', 'do', 'you', 'work', '?'],
      correctOrder: ['Where', 'do', 'you', 'work', '?'],
    },
  } as SentenceOrderExercise,

  // Transform exercises
  {
    id: 'a1-q-transform-1',
    topicId: 4,
    type: 'transform',
    prompt: 'Convierte a pregunta',
    difficulty: 2,
    explanation: 'Para preguntas con "to be": mueve el verbo al inicio',
    content: {
      original: 'She is a teacher.',
      targetType: 'question',
      acceptedAnswers: ['Is she a teacher?', 'Is she a teacher'],
    },
  } as TransformExercise,

  {
    id: 'a1-q-transform-2',
    topicId: 4,
    type: 'transform',
    prompt: 'Convierte a pregunta',
    difficulty: 2,
    explanation: 'Para preguntas con otros verbos: Do/Does + sujeto + verbo base?',
    content: {
      original: 'You like coffee.',
      targetType: 'question',
      acceptedAnswers: ['Do you like coffee?', 'Do you like coffee'],
    },
  } as TransformExercise,

  {
    id: 'a1-q-transform-3',
    topicId: 4,
    type: 'transform',
    prompt: 'Convierte a pregunta',
    difficulty: 3,
    explanation: 'Con he/she/it usamos Does y el verbo sin -s',
    content: {
      original: 'He works here.',
      targetType: 'question',
      acceptedAnswers: ['Does he work here?', 'Does he work here'],
    },
  } as TransformExercise,

  // Question & Answer
  {
    id: 'a1-q-qa-1',
    topicId: 4,
    type: 'question_answer',
    prompt: 'Formula la pregunta correcta',
    difficulty: 2,
    explanation: 'Para preguntar el nombre: What is your name?',
    content: {
      context: 'Quieres saber el nombre de alguien.',
      given: 'My name is Carlos.',
      expectedType: 'question',
      acceptedAnswers: ['What is your name?', 'What is your name', "What's your name?", "What's your name"],
    },
  } as QuestionAnswerExercise,

  {
    id: 'a1-q-qa-2',
    topicId: 4,
    type: 'question_answer',
    prompt: 'Responde la pregunta',
    difficulty: 1,
    explanation: 'Responde con Yes/No seguido de I do/I don\'t',
    content: {
      given: 'Do you speak Spanish?',
      expectedType: 'answer',
      acceptedAnswers: ['Yes, I do.', 'Yes, I do', 'No, I do not.', 'No, I do not', "No, I don't.", "No, I don't"],
    },
  } as QuestionAnswerExercise,

  {
    id: 'a1-q-qa-3',
    topicId: 4,
    type: 'question_answer',
    prompt: 'Formula la pregunta para saber donde vive alguien',
    difficulty: 2,
    explanation: 'Where + do + you + live?',
    content: {
      given: 'I live in Mexico.',
      expectedType: 'question',
      acceptedAnswers: ['Where do you live?', 'Where do you live'],
    },
  } as QuestionAnswerExercise,

  // Multiple choice
  {
    id: 'a1-q-mc-1',
    topicId: 4,
    type: 'multiple_choice',
    prompt: 'Cual es la pregunta correcta?',
    difficulty: 1,
    explanation: 'What = que/cual, para preguntar sobre cosas',
    content: {
      question: 'Quieres preguntar el trabajo de alguien:',
      options: ['What is your job?', 'Where is your job?', 'Who is your job?'],
      correctAnswer: 'What is your job?',
    },
  } as MultipleChoiceExercise,

  {
    id: 'a1-q-mc-2',
    topicId: 4,
    type: 'multiple_choice',
    prompt: 'Cual es la pregunta correcta?',
    difficulty: 2,
    explanation: 'Con verbos que no son "to be", usamos Do/Does',
    content: {
      question: 'Which question is correct?',
      options: ['Do you like pizza?', 'Are you like pizza?', 'You like pizza?'],
      correctAnswer: 'Do you like pizza?',
    },
  } as MultipleChoiceExercise,

  {
    id: 'a1-q-mc-3',
    topicId: 4,
    type: 'multiple_choice',
    prompt: 'Cual es la respuesta correcta a "How are you?"',
    difficulty: 1,
    explanation: 'How are you? = Como estas? Respuesta: I am fine/good',
    content: {
      question: 'How do you respond to "How are you?"',
      options: ["I'm fine, thank you.", 'Yes, I am.', 'I am John.'],
      correctAnswer: "I'm fine, thank you.",
    },
  } as MultipleChoiceExercise,
];

export default a1QuestionsExercises;
