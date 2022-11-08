import NftProjectCard, {
  NftCardColorEnum,
} from '../nft-project-card/nft-project-card';
import styles from './nft-projects.module.scss';

/* eslint-disable-next-line */
export interface NftProjectsProps {}

export function NftProjects(props: NftProjectsProps) {
  return (
    <div className={`${styles['container']} py-20`}>
      <div className={styles['header-text']}>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl text-center leading-tight">
          NFT Projects
        </h2>
        <p className="text-sm sm:text-base mt-6 leading-loose text-center">
          I started collecting and exploring NFTs in September 2021, ever since
          I feel in love with the space. So much so I've added a few things to
          web3 myself.
        </p>
      </div>
      <div
        className={`${styles['projects-wrapper']} flex flex-col gap-4 my-12`}
      >
        <NftProjectCard
          bgColor={NftCardColorEnum.Blue}
          title="Lucid Paths"
          description="A generative art & sound NFT, a collaboration with friend and
        co-creative Daniel Berger."
          websiteLink="https://lucidpaths.com/"
          openseaLink="https://opensea.io/collection/lucid-paths"
        />
        <NftProjectCard
          bgColor={NftCardColorEnum.Red}
          title="Lua Labs"
          description="A NFT and web3 partnership to explore the technology side of this space, through software engineering."
          websiteLink="https://lualabs.io/"
        />
        <NftProjectCard
          bgColor={NftCardColorEnum.Yellow}
          title="VesselVerse"
          description="Working with a established artist involved with NBA and basketball to create an auction based NFT."
          websiteLink="https://vesselverse.io"
          openseaLink="https://opensea.io/VesselVerse?tab=created"
        />
      </div>
    </div>
  );
}

export default NftProjects;
