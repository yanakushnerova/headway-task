'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import useQuizSession from '@/hooks/useQuizSession';
import type { QuizQuestion } from '@/utils/quiz';
import { isSetsEqual } from '@/utils/quiz';
import { ANSWER_FEEDBACK_DELAY_MS } from '@/utils/constants';

type Props = {
  question: QuizQuestion;
  prize: number;
  lastQuestionId: number;
};

type Evaluation = {
  selected: Set<string>;
  isCorrect: boolean;
};

type OptionStatus = 'neutral' | 'correct' | 'wrong' | 'incomplete';

function QuestionBlock({ question, prize, lastQuestionId }: Props) {
  const router = useRouter();
  const { isSessionLoaded, score, currentId, saveProgress } = useQuizSession();

  const correctIds = useMemo(
    () => new Set(question.options.filter((o) => o.isAnswer).map((o) => o.id)),
    [question.options],
  );

  const requiredSelections = question.type === 'multiple' ? correctIds.size : 1;

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);

  useEffect(() => {
    if (!isSessionLoaded) return;
    if (currentId === question.id) return;

    router.replace(`/quiz/${currentId}`);
  }, [currentId, isSessionLoaded, question.id, router]);

  const handleQuestionCompletion = useCallback(
    (isCorrect: boolean) => {
      const isLast = question.id === lastQuestionId;
      const nextScore = isCorrect ? prize : score;

      if (isLast || !isCorrect) {
        saveProgress({ currentId: question.id, score: nextScore });
        router.push('/results');
        return;
      }

      const nextId = question.id + 1;
      saveProgress({ currentId: nextId, score: nextScore });
      router.push(`/quiz/${nextId}`);
    },
    [question.id, lastQuestionId, prize, score, saveProgress, router],
  );

  const evaluateIfReady = useCallback(
    (nextSelected: Set<string>) => {
      const ready =
        question.type === 'single'
          ? nextSelected.size === 1
          : nextSelected.size === requiredSelections;

      if (!ready) return;

      const isCorrect = isSetsEqual(nextSelected, correctIds);
      setEvaluation({ selected: nextSelected, isCorrect });

      window.setTimeout(() => handleQuestionCompletion(isCorrect), ANSWER_FEEDBACK_DELAY_MS);
    },
    [question.type, requiredSelections, correctIds, handleQuestionCompletion],
  );

  if (isSessionLoaded && currentId !== question.id) {
    return null;
  }

  const handleAnswerToggle = (optionId: string) => {
    if (evaluation) return;

    const next = new Set(selected);

    if (question.type === 'single') {
      next.clear();
      next.add(optionId);
    } else if (next.has(optionId)) {
      next.delete(optionId);
    } else {
      next.add(optionId);
    }

    setSelected(next);
    evaluateIfReady(next);
  };

  const getOptionState = (optionId: string): OptionStatus => {
    if (evaluation) {
      if (!evaluation.selected.has(optionId)) return 'neutral';
      return correctIds.has(optionId) ? 'correct' : 'wrong';
    }

    if (question.type === 'multiple' && selected.has(optionId)) {
      return 'incomplete';
    }

    return 'neutral';
  };

  return (
    <div>
      <h2>{question.text}</h2>

      <ul>
        {question.options.map((opt) => {
          const state = getOptionState(opt.id);
          const label = `${opt.id}. ${opt.text}`;

          let background = '#fff';
          if (state === 'correct') background = 'green';
          if (state === 'wrong') background = 'red';
          if (state === 'incomplete') background = 'orange';

          return (
            <li key={opt.id}>
              <button
                type="button"
                disabled={!!evaluation}
                onClick={() => handleAnswerToggle(opt.id)}
                style={{
                  display: 'block',
                  textAlign: 'left',
                  border: '1px solid black',
                  background,
                  cursor: evaluation ? 'default' : 'pointer',
                }}
              >
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default QuestionBlock;
