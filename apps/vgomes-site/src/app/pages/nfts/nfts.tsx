import styles from './nfts.module.scss';

/* eslint-disable-next-line */
export interface NftsProps {}

export function Nfts(props: NftsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Nfts!</h1>
    </div>
  );
}

export default Nfts;
