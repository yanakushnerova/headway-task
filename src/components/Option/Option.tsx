import styles from '@/components/Option/Option.module.css';
import OptionShape from '@/components/Option/OptionShape';
import { OptionStatus } from '@/utils/quiz';

type Props = {
  id: string;
  text: string;
  status: OptionStatus;
  isDisabled: boolean;
  onClick: () => void;
};

function Option({ id, text, status, isDisabled, onClick }: Props) {
  return (
    <li className={styles.option} data-status={status}>
      <button type="button" disabled={isDisabled} onClick={onClick} className={styles.button}>
        <OptionShape />

        <span className={styles.optionId}>{id}</span>
        <span className={styles.optionText}>{text}</span>
      </button>
    </li>
  );
}

export default Option;
