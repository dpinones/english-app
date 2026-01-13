import { Topic, TopicCategory, Level } from '@/types';

// ==========================================
// 220 TEMAS PARSEADOS DE temasIngles.md
// ==========================================

function getCategory(title: string): TopicCategory {
  const lower = title.toLowerCase();
  if (lower.includes('present')) return 'present-tenses';
  if (lower.includes('past') || lower.includes('was') || lower.includes('were')) return 'past-tenses';
  if (lower.includes('future') || lower.includes('will') || lower.includes('going to')) return 'future';
  if (lower.includes('review of all verb')) return 'verb-tense-reviews';
  if (lower.includes('modal') || lower.includes('can') || lower.includes('could') || lower.includes('should') || lower.includes('must') || lower.includes('might') || lower.includes('imperative') || lower.includes('phrasal')) return 'modals-imperatives-phrasal';
  if (lower.includes('conditional') || lower.includes('wish') || lower.includes('if only')) return 'conditionals';
  if (lower.includes('passive') || lower.includes('have something done')) return 'passive';
  if (lower.includes('reported') || lower.includes('indirect speech')) return 'reported-speech';
  if (lower.includes('gerund') || lower.includes('infinitive') || lower.includes('-ing')) return 'gerunds-infinitives';
  if (lower.includes('article') || lower.includes('noun') || lower.includes('pronoun') || lower.includes('a/an') || lower.includes('the') || lower.includes('some') || lower.includes('any') || lower.includes('much') || lower.includes('many') || lower.includes('this') || lower.includes('that') || lower.includes('possessive')) return 'articles-nouns-pronouns';
  if (lower.includes('relative') || lower.includes('who') || lower.includes('which') || lower.includes('that') || lower.includes('where') || lower.includes('whatever') || lower.includes('whenever')) return 'relative-clauses';
  if (lower.includes('there is') || lower.includes('there are') || lower.includes('there or it')) return 'there-it';
  if (lower.includes('auxiliary') || lower.includes('question tag') || lower.includes('so am i') || lower.includes('neither')) return 'auxiliary-verbs';
  if (lower.includes('adjective') || lower.includes('adverb') || lower.includes('comparative') || lower.includes('superlative') || lower.includes('-ed/-ing')) return 'adjectives-adverbs';
  if (lower.includes('conjunction') || lower.includes('clause') || lower.includes('however') || lower.includes('although') || lower.includes('because')) return 'conjunctions-clauses';
  if (lower.includes('preposition') || lower.includes('at, in, on') || lower.includes('during') || lower.includes('for, since')) return 'prepositions';
  if (lower.includes('question') || lower.includes('asking')) return 'questions';
  if (lower.includes('word order') || lower.includes('adverbs of frequency')) return 'word-order';
  return 'present-tenses'; // default
}

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
}

function parseLevel(levelStr: string): Level {
  if (levelStr === 'B1+') return 'B1+';
  return levelStr as Level;
}

// Datos parseados del archivo temasIngles.md
const rawTopics: { level: string; title: string }[] = [
  // Present tenses
  { level: 'A1', title: "Present simple forms of 'to be': am/is/are" },
  { level: 'A1', title: "Present simple: I do, I don't, Do I?" },
  { level: 'A1', title: "Present continuous: I'm doing, I'm not doing, Are you doing?" },
  { level: 'A1', title: "Present simple or present continuous?" },
  { level: 'A2', title: "Present simple vs present continuous" },
  { level: 'B1', title: "Present simple or present continuous" },
  { level: 'A1', title: "Have got" },
  { level: 'A2', title: "Present perfect: Form and use" },
  { level: 'A2', title: "Present perfect or past simple?" },
  { level: 'B1', title: "Past simple or present perfect?" },
  { level: 'B1', title: "Present perfect simple and present perfect continuous" },
  { level: 'B1+', title: "Present perfect simple or continuous" },

  // Past tenses
  { level: 'A1', title: "Was/were: Past simple of 'be'" },
  { level: 'A1', title: "Past simple: Regular/irregular verbs" },
  { level: 'A1', title: "Past simple: Negatives and questions" },
  { level: 'A2', title: "Past simple: Form and use" },
  { level: 'A2', title: "Past continuous and past simple" },
  { level: 'A2', title: "Past perfect" },
  { level: 'B1', title: "Past simple, past continuous, past perfect" },
  { level: 'B1+', title: "Narrative tenses: All past tenses" },
  { level: 'B2', title: "Narrative tenses, used to, would" },

  // Future
  { level: 'A1', title: "'Will' and 'shall': Future" },
  { level: 'A1', title: "Be going to: Plans and predictions" },
  { level: 'A2', title: "Will vs be going to: Future" },
  { level: 'A2', title: "Present continuous for future arrangements" },
  { level: 'B1', title: "Future forms: Will, be going to, present continuous" },
  { level: 'B1+', title: "Future continuous and future perfect" },
  { level: 'B2', title: "Future forms: Expressing future time" },
  { level: 'B2', title: "Other ways to express future: Be about to, be due to, etc." },
  { level: 'B2', title: "Future in the past" },

  // Verb tense reviews
  { level: 'A2', title: "Review of all verb tenses A2" },
  { level: 'B1', title: "Review of all verb tenses B1" },
  { level: 'B1+', title: "Review of all verb tenses B1-B2" },

  // Modals, imperative, phrasal verbs
  { level: 'A1', title: "Can, can't: Ability, possibility, permission" },
  { level: 'A1', title: "The imperative: Sit down! Don't talk!" },
  { level: 'A1', title: "Would you like...? I'd like..." },
  { level: 'A2', title: "Have to, don't have to, must, mustn't" },
  { level: 'A2', title: "Should, shouldn't" },
  { level: 'A2', title: "Might, might not: Possibility" },
  { level: 'A2', title: "'May' and 'might': What's the difference?" },
  { level: 'A2', title: "Used to, didn't use to: past habits and states" },
  { level: 'A2', title: "How to use the verb 'go' in English" },
  { level: 'A2', title: "The different uses of the verb 'get'" },
  { level: 'A2', title: "'Do' vs 'Make': What's the difference?" },
  { level: 'A2', title: "Verbs with two objects" },
  { level: 'A2', title: "Stative vs dynamic verbs (or non-action vs action verbs)" },
  { level: 'A2', title: "Phrasal verbs: Transitive and intransitive, separable and inseparable" },
  { level: 'B1', title: "Have to, must, should: Obligation, prohibition, necessity, advice" },
  { level: 'B1', title: "Had better... it's time" },
  { level: 'B1', title: "Can, could, be able to: Ability and possibility" },
  { level: 'B1', title: "Modal verbs of deduction: Must, might, could, can't" },
  { level: 'B1', title: "Usually, used to, be used to, get used to" },
  { level: 'B1', title: "B1 Phrasal verbs 1: Exercises and explanation" },
  { level: 'B1', title: "B1 Phrasal verbs 2: Exercises and explanation" },
  { level: 'B1', title: "B1 Phrasal verbs 3: Exercises and explanation" },
  { level: 'B1', title: "Would rather & Would sooner" },
  { level: 'B1+', title: "Needn't, don't need to, didn't need to, needn't have" },
  { level: 'B1+', title: "Past modal verbs of deduction" },
  { level: 'B1+', title: "Likely, unlikely, bound, definitely, probably: Probability" },
  { level: 'B1+', title: "Used to, be used to, get used to" },
  { level: 'B1+', title: "Would and used to: Past habits and repeated actions" },
  { level: 'B1+', title: "Verbs of the senses: Look, sound, feel, etc." },
  { level: 'B1+', title: "Do or Make?" },
  { level: 'B2', title: "Modal verbs: Permission, obligation, prohibition, necessity" },
  { level: 'B2', title: "Speculation and deduction: Modal verbs and expressions" },
  { level: 'B2', title: "Verbs of the senses" },
  { level: 'B2', title: "Get: Different meanings" },

  // Conditionals
  { level: 'A2', title: "First conditional and future time clauses" },
  { level: 'B1', title: "First conditional, future time clauses" },
  { level: 'B1+', title: "Zero and first conditional and future time clauses" },
  { level: 'B1+', title: "When I do vs When I have done" },
  { level: 'A2', title: "Second conditional" },
  { level: 'B1', title: "Second conditional: Unreal situations" },
  { level: 'B1', title: "First and second conditionals" },
  { level: 'B1', title: "Third conditional: Past unreal situations" },
  { level: 'B1+', title: "Second and third conditionals: Unreal conditionals" },
  { level: 'B2', title: "Unless, even if, provided, as long as, etc.: Other expressions in conditionals" },
  { level: 'B2', title: "All conditionals: Mixed conditionals, alternatives to if, inversion" },
  { level: 'B2', title: "Mixed conditionals: If I were you, I wouldn't have done it" },
  { level: 'B1+', title: "Wishes and regrets: I wish / If only" },
  { level: 'B2', title: "Wish, rather, if only, it's time: Unreal uses of past tenses" },

  // Passive
  { level: 'A2', title: "Present and past simple passive: Be + past participle" },
  { level: 'B1', title: "Passive verb forms" },
  { level: 'B1', title: "Active and passive voice" },
  { level: 'B1+', title: "The passive voice: All tenses" },
  { level: 'B1+', title: "The passive with reporting verbs: It is said that..." },
  { level: 'B1+', title: "Have something done" },
  { level: 'B2', title: "Distancing: Expressions and passive of reporting verbs" },
  { level: 'B2', title: "Passive verbs with two objects" },

  // Reported speech
  { level: 'A2', title: "Reported speech / Indirect speech" },
  { level: 'B1', title: "Indirect speech / Reported speech" },

  // Gerunds and infinitives
  { level: 'A1', title: "Verbs + to + infinitive and verbs + -ing" },
  { level: 'A2', title: "Expressing purpose with 'to' and 'for'" },
  { level: 'A2', title: "Infinitives and gerunds: Verb patterns" },
  { level: 'B1', title: "Gerund or infinitive: Do, to do, doing" },
  { level: 'B1+', title: "Gerund or infinitive: Verb patterns" },
  { level: 'B1+', title: "Would rather, would prefer: Expressing preference" },
  { level: 'B1+', title: "Reporting verbs: Admit doing, refuse to do, etc." },
  { level: 'B2', title: "Verb + object + infinitive/gerund: Verb patterns" },
  { level: 'B2', title: "Gerunds and infinitives: Complex forms" },

  // Articles, nouns, pronouns, determiners
  { level: 'A1', title: "A/an, plurals: Singular and plural forms" },
  { level: 'A1', title: "A/an, the, no article: The use of articles in English" },
  { level: 'A1', title: "A, some, any: countable and uncountable nouns" },
  { level: 'A1', title: "Much, many, a lot of, a little, a few" },
  { level: 'A1', title: "This, that, these, those" },
  { level: 'A1', title: "Possessive adjectives and subject pronouns (I/my, you/your, etc.)" },
  { level: 'A1', title: "Object pronouns vs subject pronouns: Me or I, she or her?" },
  { level: 'A1', title: "Whose, possessive 's: Whose is this? It's Mike's" },
  { level: 'A2', title: "Subject pronouns, object pronouns, possessive pronouns, possessive adjectives" },
  { level: 'A2', title: "Something, anything, nothing, etc." },
  { level: 'A2', title: "Much, many, little, few, some, any: Quantifiers" },
  { level: 'A2', title: "Too, too much, too many, enough" },
  { level: 'A2', title: "Most, most of, the most" },
  { level: 'B1', title: "A(n), the, no article" },
  { level: 'B1', title: "Much, many, a lot, little, few, some, any, no: Quantifiers" },
  { level: 'B1', title: "All, both: Quantifiers" },
  { level: 'B1', title: "Both, either, neither: Quantifiers" },
  { level: 'B1', title: "Reflexive pronouns: Myself, yourself" },
  { level: 'B1', title: "Any, no, none: Quantifiers" },
  { level: 'B1', title: "Another, other, others, the other, the others" },
  { level: 'B1+', title: "Quantifiers: all, most, both, either, neither, any, no, none" },
  { level: 'B2', title: "Reflexive and reciprocal pronouns" },
  { level: 'B2', title: "Generic or common-gender pronouns" },
  { level: 'B2', title: "Compound nouns and possessive forms" },
  { level: 'B2', title: "Possessive 's with time expressions: Two hours' walk" },

  // Relative clauses
  { level: 'A2', title: "Defining relative clauses: Who, which, that, where" },
  { level: 'B1', title: "Defining and non-defining relative clauses" },
  { level: 'B1+', title: "Whatever, whenever, wherever, whoever, however" },
  { level: 'B2', title: "Relative clauses: Defining and non-defining" },

  // There and it
  { level: 'A1', title: "The difference between 'this' and 'it'" },
  { level: 'A1', title: "There is, there are / there was, there were" },
  { level: 'A1', title: "There or it" },
  { level: 'B2', title: "'There' and 'it': Preparatory subjects" },

  // Auxiliary verbs
  { level: 'A2', title: "So, neither: So am I, neither do I, etc." },
  { level: 'B1', title: "Question tags: Aren't you? don't you?" },
  { level: 'B1+', title: "Auxiliary verbs: Different uses" },
  { level: 'B2', title: "Have: Auxiliary or main verb" },
  { level: 'B2', title: "Ellipsis and substitution" },

  // Adjectives and adverbs
  { level: 'A1', title: "Adjectives: Old, interesting, expensive, etc." },
  { level: 'A1', title: "Adverbs of manner (slowly) or adjectives (slow)?" },
  { level: 'A1', title: "Comparative adjectives: Older than, more important than, etc." },
  { level: 'A1', title: "Superlative adjectives: The oldest, the most important, etc." },
  { level: 'A2', title: "Comparative and superlative adjectives and adverbs" },
  { level: 'A2', title: "No longer, any longer, anymore" },
  { level: 'B1', title: "Comparative and superlative adjectives and adverbs" },
  { level: 'B1', title: "Compound adjectives with numbers: 'A two-day trip'" },
  { level: 'B1+', title: "The ... the ... comparatives" },
  { level: 'B1', title: "-Ed/-ing adjectives: Adjectives from verbs" },
  { level: 'B1+', title: "Participles as adjectives: -ed / -ing adjectives" },
  { level: 'B1', title: "So, such, such a, so much, so many" },
  { level: 'B1+', title: "So, such (a), so much, so many" },
  { level: 'B1+', title: "Adjectives without noun" },
  { level: 'B1+', title: "Adjective order" },
  { level: 'B1+', title: "Already, still, yet: What's the difference?" },
  { level: 'B1+', title: "Pretty, rather, quite, fairly" },
  { level: 'B2', title: "Modifying comparatives" },
  { level: 'B2', title: "Compound adjectives in English" },
  { level: 'B2', title: "Inversion with negative adverbials: Adding emphasis" },

  // Conjunctions and clauses
  { level: 'A1', title: "Conjunctions: And, but, or, so, because" },
  { level: 'A2', title: "However, although, because, so, and time connectors" },
  { level: 'B1', title: "Clauses of contrast, purpose and reason" },
  { level: 'B1+', title: "Clauses of contrast and purpose" },
  { level: 'B2', title: "Clauses of contrast, purpose, reason and result" },
  { level: 'B2', title: "Discourse markers: Linking words" },
  { level: 'B2', title: "Participle clauses" },

  // Prepositions
  { level: 'A1', title: "At, in, on: Prepositions of time" },
  { level: 'A1', title: "At, in, on: Prepositions of place" },
  { level: 'A1', title: "Next to, under, between, in front of, behind, over, etc." },
  { level: 'A2', title: "Prepositions of movement: Along, across, over, etc." },
  { level: 'A2', title: "On time vs In time, At the end vs In the end." },
  { level: 'B1', title: "Verb + preposition" },
  { level: 'B1', title: "Adjective + preposition" },
  { level: 'B1', title: "During, for, while" },
  { level: 'B1', title: "For, since, from: What's the difference?" },
  { level: 'B2', title: "50 common Noun + Preposition collocations" },

  // Questions
  { level: 'A1', title: "Questions: Word order and question words" },
  { level: 'A2', title: "Asking questions in English: Question forms" },
  { level: 'A2', title: "Subject questions, questions with preposition" },
  { level: 'B1+', title: "Questions: Different types" },
  { level: 'B1+', title: "Indirect questions" },

  // Word order
  { level: 'A1', title: "Adverbs of frequency with present simple" },
  { level: 'A1', title: "Basic word order in English" },
  { level: 'B1+', title: "Position of adverbs and adverb phrases" },
  { level: 'B2', title: "Cleft sentences: Adding emphasis" },
];

// Generar temas con IDs
export const topics: Topic[] = rawTopics.map((topic, index) => ({
  id: index + 1,
  title: topic.title,
  level: parseLevel(topic.level),
  category: getCategory(topic.title),
  slug: createSlug(topic.title),
  orderIndex: index + 1,
}));

// Helper para obtener temas por nivel
export function getTopicsByLevel(level: Level): Topic[] {
  return topics.filter(t => t.level === level);
}

// Helper para obtener tema por ID
export function getTopicById(id: number): Topic | undefined {
  return topics.find(t => t.id === id);
}

// Helper para obtener tema por slug
export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find(t => t.slug === slug);
}

// Contar temas por nivel
export const topicCountByLevel: Record<Level, number> = {
  'A1': topics.filter(t => t.level === 'A1').length,
  'A2': topics.filter(t => t.level === 'A2').length,
  'B1': topics.filter(t => t.level === 'B1').length,
  'B1+': topics.filter(t => t.level === 'B1+').length,
  'B2': topics.filter(t => t.level === 'B2').length,
};

// Temas A1 (los primeros que veras)
export const a1Topics = getTopicsByLevel('A1');
