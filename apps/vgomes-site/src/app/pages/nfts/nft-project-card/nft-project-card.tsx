import styles from './nft-project-card.module.scss';

/* eslint-disable-next-line */
export interface NftProjectCardProps {
  bgColor: NftCardColorEnum;
  title: string;
  description: string;
  websiteLink?: string;
  openseaLink?: string;
}

export enum NftCardColorEnum {
  Blue = 1,
  Red = 2,
  Yellow = 3,
}

export function NftProjectCard(props: NftProjectCardProps) {
  return (
    <article
      className={`${styles['container']} ${
        props.bgColor === NftCardColorEnum.Blue ? 'bg-mid-blue' : ''
      } ${props.bgColor === NftCardColorEnum.Red ? 'bg-mid-red' : ''} ${
        props.bgColor === NftCardColorEnum.Yellow ? 'bg-gold-yellow' : ''
      }`}
    >
      <h3 className="text-xl">{props.title}</h3>
      <p className="pt-4">{props.description}</p>
      <div className="flex gap-4">
        {props.websiteLink && (
          <a
            className={`${styles['project-links']} pt-4 border-b font-bold`}
            href={props.websiteLink}
            target="_blank"
            rel="noreferrer"
          >
            Website
          </a>
        )}{' '}
        {props.openseaLink && (
          <a
            className={`${styles['project-links']} pt-4 border-b font-bold`}
            href={props.openseaLink}
            target="_blank"
            rel="noreferrer"
          >
            Opensea
          </a>
        )}
      </div>
    </article>
  );
}

export default NftProjectCard;
