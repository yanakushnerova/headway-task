import { notFound } from 'next/navigation';
import { getPrizeForQuestionId, getQuestionById, getQuiz } from '@/utils/quiz';
import PrizeLadder from '@/components/PrizeLadder';
import QuestionBlock from '@/components/QuestionBlock';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function QuizQuestionPage({ params }: Props) {
  const { id } = await params;
  const questionId = Number(id);

  if (!Number.isInteger(questionId) || questionId < 1) {
    notFound();
  }

  const quiz = getQuiz();
  const question = getQuestionById(questionId);

  if (!question) {
    notFound();
  }

  const prize = getPrizeForQuestionId(questionId);
  const lastQuestionId = quiz.questions[quiz.questions.length - 1]?.id ?? questionId;

  return (
    <main>
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <section style={{ flex: 1 }}>
          <QuestionBlock question={question} prize={prize} lastQuestionId={lastQuestionId} />
        </section>

        <PrizeLadder steps={quiz.prizeLadder} activeQuestionId={questionId} />
      </div>
    </main>
  );
}
