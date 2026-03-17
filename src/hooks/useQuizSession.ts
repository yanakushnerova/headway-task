'use client';

import { useCallback, useEffect, useState } from 'react';
import { STORAGE_KEY } from '@/utils/constants';

type QuizProgress = {
  currentId: number;
  score: number;
};

function isQuizProgress(value: unknown): value is QuizProgress {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof (value as QuizProgress).score === 'number' &&
    Number.isFinite((value as QuizProgress).score) &&
    typeof (value as QuizProgress).currentId === 'number'
  );
}

function readSession(): QuizProgress | null {
  try {
    const session = sessionStorage.getItem(STORAGE_KEY);

    if (!session) return null;

    const parsed: unknown = JSON.parse(session);
    return isQuizProgress(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function writeSession(progress: QuizProgress) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to write quiz session to storage:', err);
  }
}

function removeSession() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to remove quiz session from storage:', err);
  }
}

function useQuizSession() {
  const [progress, setProgress] = useState<QuizProgress>({ currentId: 1, score: 0 });
  const [isSessionLoaded, setIsSessionLoaded] = useState(false);

  useEffect(() => {
    const stored = readSession();

    if (stored) {
      setProgress(stored);
    }

    setIsSessionLoaded(true);
  }, []);

  const saveProgress = useCallback((next: QuizProgress) => {
    setProgress(next);
    writeSession(next);
  }, []);

  const resetSession = useCallback(() => {
    removeSession();
  }, []);

  return {
    isSessionLoaded,
    score: progress.score,
    currentId: progress.currentId,
    saveProgress,
    resetSession,
  };
}

export default useQuizSession;
