import styles from './nfts-header.module.scss';

/* eslint-disable-next-line */
export interface NftsHeaderProps {}

export function NftsHeader(props: NftsHeaderProps) {
  return (
    <section className={styles['container']}>
      <div className="text-center mx-2 my-12 sm:my-20">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl leading-tight">
          NFTs are cool.
        </h1>
        <p className="text-sm sm:text-base mt-6 px-2 leading-loose text-center">
          Digital collectibles that can be verified on the blockchain and use as access to communities, private events, tools, etc. Also rad digital art.
        </p>
      </div>
      <div className="text-center">
        <h2 className="mx-2 text-2xl sm:text-3xl lg:text-4xl">
          Explore my NFT collection with{' '}
          <a
            className={`border-b-2 border-gold-yellow cursor-pointer hover:border-b-4 ${styles['text-link']}`}
            href="https://oncyber.io/vgomes-gallery"
            target="_blank"
            rel="noreferrer"
          >
            oncyber
          </a>
          .
        </h2>
        <div
          className={`${styles['oncyber-wrapper']} border-2 sm:border-8 border-mid-blue`}
        >
          <iframe
            title="oncyber nft gallery"
            width="100%"
            height="100%"
            src="https://oncyber.io/vgomes-gallery"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default NftsHeader;
