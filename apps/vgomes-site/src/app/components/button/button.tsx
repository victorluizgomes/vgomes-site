import styles from './button.module.scss';

/* eslint-disable-next-line */
export interface ButtonProps {
  label: string;
  active: boolean;
  onClick?: () => void;
}

export function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={`${styles['button-wrapper']} ${
        props.active ? styles['button-active'] : ''
      }`}
    >
      {props.label}
    </button>
  );
}

export default Button;
