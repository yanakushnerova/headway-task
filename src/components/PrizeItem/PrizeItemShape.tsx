import styles from '@/components/PrizeItem/PrizeItem.module.css';

function PrizeItemShape() {
  return (
    <svg
      className={styles.shape}
      viewBox="0 0 376 40"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path className={styles.line} d="M69 20H0" />
      <path className={styles.line} d="M376 20H307" />
      <path
        className={styles.shapePath}
        d="M90.2871 0.5H285.713C289.126 0.500018 292.363 2.0158 294.548 4.6377L307.349 20L294.548 35.3623C292.363 37.9842 289.126 39.5 285.713 39.5H90.2871C86.8742 39.5 83.6371 37.9842 81.4521 35.3623L68.6504 20L81.4521 4.6377C83.6371 2.0158 86.8742 0.500017 90.2871 0.5Z"
      />
    </svg>
  );
}

export default PrizeItemShape;
