import styles from './Button.module.css';

type Props = {
  text: string;
  onClick: () => void;
};

function Button({ text, onClick }: Props) {
  return (
    <button type="button" onClick={onClick} className={styles.button}>
      {text}
    </button>
  );
}

export default Button;
