'use client';

import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import IconButton from '@/components/IconButton/IconButton';
import useQuizSession from '@/hooks/useQuizSession';
import {
  OPTION_STATUS,
  isSetsEqual,
  type PrizeStep,
  type QuizQuestion,
  type OptionStatus,
} from '@/utils/quiz';
import { ANSWER_FEEDBACK_DELAY_MS } from '@/utils/constants';
import styles from '@/components/QuestionBlock/QuestionBlock.module.css';
import Option from '@/components/Option/Option';
import PrizeLadder from '@/components/PrizeLadder/PrizeLadder';

type Props = {
  question: QuizQuestion;
  prize: number;
  lastQuestionId: number;
  prizeSteps: PrizeStep[];
};

type Evaluation = {
  selected: Set<string>;
  isCorrect: boolean;
};

function QuestionBlock({ question, prize, lastQuestionId, prizeSteps }: Props) {
  const router = useRouter();
  const { isSessionLoaded, score, currentId, saveProgress } = useQuizSession();

  const correctIds = useMemo(
    () => new Set(question.options.filter((o) => o.isAnswer).map((o) => o.id)),
    [question.options],
  );

  const requiredSelections = question.type === 'multiple' ? correctIds.size : 1;

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [isPrizeDialogOpen, setIsPrizeDialogOpen] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isPrizeDialogOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isPrizeDialogOpen]);

  useEffect(() => {
    if (!isSessionLoaded || evaluation || currentId === question.id) return;

    router.replace(`/quiz/${currentId}`);
  }, [currentId, evaluation, isSessionLoaded, question.id, router]);

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

      setTimeout(() => handleQuestionCompletion(isCorrect), ANSWER_FEEDBACK_DELAY_MS);
    },
    [question.type, requiredSelections, correctIds, handleQuestionCompletion],
  );

  if (isSessionLoaded && currentId !== question.id && !evaluation) {
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

  const getOptionStatus = (optionId: string): OptionStatus => {
    if (evaluation) {
      if (!evaluation.selected.has(optionId)) return OPTION_STATUS.Inactive;
      return correctIds.has(optionId) ? OPTION_STATUS.Correct : OPTION_STATUS.Wrong;
    }

    if (selected.has(optionId)) return OPTION_STATUS.Selected;

    return OPTION_STATUS.Inactive;
  };

  return (
    <section className={styles.section}>
      <IconButton
        src="/svg/menu.svg"
        alt="Open prize ladder"
        className={styles.menuButton}
        onClick={() => setIsPrizeDialogOpen(true)}
      />

      <dialog
        ref={dialogRef}
        className={styles.prizeLadderDialog}
        onClose={() => setIsPrizeDialogOpen(false)}
      >
        <IconButton
          src="/svg/close.svg"
          alt="Close prize ladder"
          className={styles.closeButton}
          onClick={() => setIsPrizeDialogOpen(false)}
        />

        <PrizeLadder steps={prizeSteps} activeQuestionId={question.id} />
      </dialog>

      <h2 className={styles.h2}>{question.text}</h2>

      <ul className={styles.optionsBlock}>
        {question.options.map((opt) => {
          const { id, text } = opt;

          return (
            <Option
              key={id}
              id={id}
              text={text}
              status={getOptionStatus(id)}
              isDisabled={!!evaluation}
              onClick={() => handleAnswerToggle(id)}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default QuestionBlock;
