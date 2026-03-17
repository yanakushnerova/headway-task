import Image from 'next/image';
import styles from './IconButton.module.css';

type Props = {
  src: string;
  alt: string;
  onClick: () => void;
  className?: string;
  size?: number;
};

function IconButton({ src, alt, onClick, className = '', size = 24 }: Props) {
  return (
    <button type="button" onClick={onClick} className={`${styles.button} ${className}`}>
      <Image src={src} alt={alt} width={size} height={size} />
    </button>
  );
}

IconButton.defaultProps = {
  className: '',
  size: 24,
};

export default IconButton;
