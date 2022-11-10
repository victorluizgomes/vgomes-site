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
          In September 2021 I started collecting and exploring NFTs. Ever since then
          I fell in love with the space; so much so I've added a few things to
          web3 myself.
        </p>
      </div>
      <div
        className={`${styles['projects-wrapper']} flex flex-col gap-4 my-12`}
      >
        <NftProjectCard
          bgColor={NftCardColorEnum.Blue}
          title="Lucid Paths"
          description="A generative art & sound NFT collection, a collaboration with a friend and
        co-creative Daniel Berger."
          websiteLink="https://lucidpaths.com/"
          openseaLink="https://opensea.io/collection/lucid-paths"
        />
        <NftProjectCard
          bgColor={NftCardColorEnum.Red}
          title="Lua Labs"
          description="A NFT and web3 partnership to explore the technology side of this space through software engineering."
          websiteLink="https://lualabs.io/"
        />
        <NftProjectCard
          bgColor={NftCardColorEnum.Yellow}
          title="VesselVerse"
          description="Working with an established artist involved with basketball and the NBA to create an auction based NFT."
          websiteLink="https://vesselverse.io"
          openseaLink="https://opensea.io/VesselVerse?tab=created"
        />
      </div>
    </div>
  );
}

export default NftProjects;
