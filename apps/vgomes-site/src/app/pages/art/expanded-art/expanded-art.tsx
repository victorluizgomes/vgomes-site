import styles from './expanded-art.module.scss';

/* eslint-disable-next-line */
export interface ExpandedArtProps {}

export function ExpandedArt(props: ExpandedArtProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ExpandedArt!</h1>
    </div>
  );
}

export default ExpandedArt;
