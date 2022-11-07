import styles from './nfts.module.scss';
import NftsHeader from './nfts-header/nfts-header';
import NftProjects from './nft-projects/nft-projects';

/* eslint-disable-next-line */
export interface NftsProps {}

export function Nfts(props: NftsProps) {
  return (
    <div className={styles['container']}>
      <NftsHeader />
      <NftProjects />
    </div>
  );
}

export default Nfts;
