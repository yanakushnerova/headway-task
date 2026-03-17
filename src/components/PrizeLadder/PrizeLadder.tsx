import { PRIZE_ITEM_STATUS, type PrizeItemStatus, type PrizeStep } from '@/utils/quiz';
import PrizeItem from '@/components/PrizeItem/PrizeItem';
import styles from '@/components/PrizeLadder/PrizeLadder.module.css';

type Props = {
  steps: PrizeStep[];
  activeQuestionId: number;
};

function getStepStatus(questionId: number, activeQuestionId: number): PrizeItemStatus {
  if (questionId === activeQuestionId) return PRIZE_ITEM_STATUS.Current;
  if (questionId < activeQuestionId) return PRIZE_ITEM_STATUS.Reached;
  return PRIZE_ITEM_STATUS.Upcoming;
}

function PrizeLadder({ steps, activeQuestionId }: Props) {
  return (
    <aside className={styles.aside}>
      {steps.map((step) => (
        <PrizeItem
          key={step.questionId}
          prize={step.prize}
          status={getStepStatus(step.questionId, activeQuestionId)}
        />
      ))}
    </aside>
  );
}

export default PrizeLadder;
