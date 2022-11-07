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
    <div
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
            className="pt-4 hover:border-b hover:border-black pb-1 hover:pb-0"
            href={props.websiteLink}
            target="_blank"
            rel="noreferrer"
          >
            Website
          </a>
        )}{' '}
        {props.openseaLink && (
          <a
            className="pt-4 hover:border-b hover:border-black pb-1 hover:pb-0"
            href={props.openseaLink}
            target="_blank"
            rel="noreferrer"
          >
            Opensea
          </a>
        )}
      </div>
    </div>
  );
}

export default NftProjectCard;
