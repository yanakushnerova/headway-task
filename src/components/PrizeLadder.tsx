import type { PrizeStep } from '@/utils/quiz';

type Props = {
  steps: PrizeStep[];
  activeQuestionId: number;
};

function PrizeLadder({ steps, activeQuestionId }: Props) {
  return (
    <aside style={{ width: 200 }}>
      <ul>
        {steps.map((step) => (
          <li
            key={step.questionId}
            style={{
              backgroundColor: step.questionId === activeQuestionId ? 'yellow' : 'transparent',
              listStyleType: 'none',
            }}
          >
            ${step.prize.toLocaleString()}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default PrizeLadder;
