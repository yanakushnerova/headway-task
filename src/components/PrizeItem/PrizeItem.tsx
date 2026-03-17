import styles from '@/components/PrizeItem/PrizeItem.module.css';
import PrizeItemShape from '@/components/PrizeItem/PrizeItemShape';
import { PrizeItemStatus } from '@/utils/quiz';

type Props = {
  prize: number;
  status: PrizeItemStatus;
};

function PrizeItem({ prize, status }: Props) {
  return (
    <div className={styles.wrapper} data-status={status}>
      <PrizeItemShape />
      <span className={styles.prize}>${prize.toLocaleString()}</span>
    </div>
  );
}

export default PrizeItem;
