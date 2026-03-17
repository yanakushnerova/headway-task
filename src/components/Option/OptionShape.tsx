import styles from '@/components/Option/Option.module.css';

function OptionShape() {
  return (
    <svg
      className={styles.shape}
      viewBox="0 0 389 72"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M33.0117 0.5H355.988C359.607 0.500098 363.015 2.20331 365.187 5.09766L388.374 36L365.187 66.9023C363.015 69.7967 359.607 71.4999 355.988 71.5H33.0117C29.3931 71.4999 25.9854 69.7967 23.8135 66.9023L0.625 36L23.8135 5.09766C25.9854 2.20331 29.3931 0.5001 33.0117 0.5Z"
        className={styles.shapePath}
      />
    </svg>
  );
}

export default OptionShape;
