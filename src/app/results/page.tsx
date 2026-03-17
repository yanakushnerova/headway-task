'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import useQuizSession from '@/hooks/useQuizSession';
import styles from '@/app/results/page.module.css';
import Button from '@/components/Button/Button';

export default function ResultsPage() {
  const router = useRouter();
  const { score, resetSession } = useQuizSession();

  return (
    <main className={styles.main}>
      <div className={styles.imageBlock}>
        <Image className={styles.image} src="/svg/hand.svg" fill priority alt="Thumb up" />
      </div>
      <div className={styles.sideBlock}>
        <div className={styles.textBlock}>
          <h1 className={styles.h1}>Total score:</h1>
          <p className={styles.p}>${score.toLocaleString()} earned</p>
        </div>

        <Button
          text="Try again"
          onClick={() => {
            resetSession();
            router.push('/');
          }}
        />
      </div>
    </main>
  );
}
