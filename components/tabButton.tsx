import styles from '../styles/TabButtom.module.css';

/* eslint-disable-next-line */
export interface TabButtonProps {
  label: string;
  active: boolean;
  onClick?: () => void;
}

export function TabButton(props: TabButtonProps) {
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

export default TabButton;
