'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from '@/app/page.module.css';
import Button from '@/components/Button/Button';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className={styles.main}>
      <div className={styles.imageBlock}>
        <Image className={styles.image} src="/svg/hand.svg" fill priority alt="Thumb up" />
      </div>
      <div className={styles.sideBlock}>
        <h1 className={styles.h1}>Who wants to be a millionaire?</h1>
        <Button
          text="Start"
          onClick={() => {
            router.push('/quiz/1');
          }}
        />
      </div>
    </main>
  );
}
