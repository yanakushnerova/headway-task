'use client';

import { useRouter } from 'next/navigation';
import useQuizSession from '@/hooks/useQuizSession';

export default function ResultsPage() {
  const router = useRouter();
  const { score, clearSession, saveProgress } = useQuizSession();

  return (
    <main>
      <h1>Total score:</h1>
      <p>${score.toLocaleString()} earned</p>

      <button
        type="button"
        onClick={() => {
          clearSession();
          saveProgress({ currentId: 1, score: 0 });
          router.push('/');
        }}
      >
        Try again
      </button>
    </main>
  );
}
