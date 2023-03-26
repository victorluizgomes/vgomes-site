import { ArtPropertiesInterface } from '../art-gallery/art-gallery';
import styles from './art-wrapper.module.scss';

export enum ArtType {
  IMAGE = 'image',
  VIDEO = 'video',
}

/* eslint-disable-next-line */
export interface ArtWrapperProps {
  type: string;
  art: ArtPropertiesInterface;
  thumbnailSrc?: string;
  imgName?: string;
  onExpandArt: (art: ArtPropertiesInterface) => void;
  onLoad?: () => void;
  onError?: () => void;
}

export function ArtWrapper(props: ArtWrapperProps) {

  return (
    <div
      onClick={() => props.onExpandArt(props.art)}
      className={`mb-2 ${styles['container']}`}
    >
      {/* TODO: have videos and images available */}
      {props.type === ArtType.IMAGE && (
        <div className={`bg-off-grey ${styles['art-img-wrapper']}`}>
          <img
            width="100%"
            height="100%"
            src={props.thumbnailSrc}
            alt={props.imgName}
            onLoad={props.onLoad}
            onError={props.onLoad}
          />
        </div>
      )}
      {props.type === ArtType.VIDEO && <></>}
    </div>
  );
}

export default ArtWrapper;
