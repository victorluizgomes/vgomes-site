import styles from './top-section.module.scss';

/* eslint-disable-next-line */
export interface TopSectionProps {}

export function TopSection(props: TopSectionProps) {
  return (
    <div className={styles['container']}>
      <img className="w-56" src="../../../../assets/hq-header-picture.png" alt="stylized portrait of Victor" />
    </div>
  );
}

export default TopSection;
