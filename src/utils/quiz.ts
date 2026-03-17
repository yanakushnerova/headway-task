import quizJson from '@/quiz/quiz.json';

export type QuizQuestion = {
  id: number;
  type: 'single' | 'multiple';
  text: string;
  options: QuizOption[];
};

export type QuizOption = {
  id: string;
  text: string;
  isAnswer: boolean;
};

export type PrizeStep = {
  questionId: number;
  prize: number;
};

export type QuizData = {
  quiz: {
    title: string;
    prizeLadder: PrizeStep[];
    questions: QuizQuestion[];
  };
};

export const OPTION_STATUS = {
  Inactive: 'inactive',
  Selected: 'selected',
  Correct: 'correct',
  Wrong: 'wrong',
} as const;

export type OptionStatus = (typeof OPTION_STATUS)[keyof typeof OPTION_STATUS];

export const PRIZE_ITEM_STATUS = {
  Current: 'current',
  Reached: 'reached',
  Upcoming: 'upcoming',
} as const;

export type PrizeItemStatus = (typeof PRIZE_ITEM_STATUS)[keyof typeof PRIZE_ITEM_STATUS];

export function getQuiz(): QuizData['quiz'] {
  return (quizJson as QuizData).quiz;
}

export function getQuestionById(id: number): QuizQuestion | null {
  const quiz = getQuiz();
  return quiz.questions.find((q) => q.id === id) ?? null;
}

export function getPrizeForQuestionId(id: number): number {
  const quiz = getQuiz();
  return quiz.prizeLadder.find((p) => p.questionId === id)?.prize ?? 0;
}

export function isSetsEqual(a: Set<string>, b: Set<string>) {
  if (a.size !== b.size) return false;
  return [...a].every((v) => b.has(v));
}
