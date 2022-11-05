import styles from './top-section.module.scss';

/* eslint-disable-next-line */
export interface TopSectionProps {}

export function TopSection(props: TopSectionProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to TopSection!</h1>
    </div>
  );
}

export default TopSection;
