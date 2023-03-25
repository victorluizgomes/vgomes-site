import styles from './nfts.module.scss';
import NftsHeader from './nfts-header/nfts-header';
import NftProjects from './nft-projects/nft-projects';
import { Helmet } from 'react-helmet';

/* eslint-disable-next-line */
export interface NftsProps {}

export function Nfts(props: NftsProps) {
  return (
    <>
      <Helmet>
        <title>Victor Gomes - NFTs (vgomes.co)</title>
        <meta
          name="description"
          content="Explore Victor Gomes' NFT collection, featuring unique digital, generative, and pixel art. Pieces that Victor has created and collected, also Projects he has worked on in the NFT space."
        />
      </Helmet>
      <div className={styles['container']}>
        <NftsHeader />
        <NftProjects />
      </div>
    </>
  );
}

export default Nfts;
