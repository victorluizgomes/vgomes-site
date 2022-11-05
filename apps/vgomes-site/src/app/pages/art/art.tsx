import styles from './art.module.scss';

/* eslint-disable-next-line */
export interface ArtProps {}

export function Art(props: ArtProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Art!</h1>
    </div>
  );
}

export default Art;
