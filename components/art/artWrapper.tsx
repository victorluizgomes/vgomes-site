import Image from "next/image";
import styles from "../../styles/art/ArtWrapper.module.css";
import { ArtPropertiesInterface, ArtType } from "../../model/art.interface";

export interface ArtWrapperProps {
  type: string;
  art: ArtPropertiesInterface;
  thumbnailSrc?: string;
  imgName?: string;
  videoSrc?: string;
  cover?: string;
  onExpandArt: (art: ArtPropertiesInterface) => void;
  onLoad?: () => void;
  onError?: () => void;
}

export function ArtWrapper(props: ArtWrapperProps) {
  return (
    <div
      onClick={() => props.onExpandArt(props.art)}
      className={`${styles["container"]}`}
    >
      {props.type === ArtType.IMAGE && (
        <div className={`bg-off-grey ${styles["art-img-wrapper"]}`}>
          <Image
            width={1000}
            height={1000}
            src={props.thumbnailSrc}
            alt={props.imgName}
            onLoad={props.onLoad}
            onError={props.onError}
            priority
          />
        </div>
      )}
      {props.type === ArtType.VIDEO && (
        <div className={`bg-off-grey ${styles["art-video-wrapper"]}`}>
          <video
            width="100%"
            height="100%"
            controls
            loop
            poster={props.cover || ''}
            onLoadStart={props.onLoad}
            onError={props.onError}
          >
            <source src={props.thumbnailSrc || props.videoSrc} type="video/mp4" />
            Your browser does not support the videos.
          </video>
        </div>
      )}
    </div>
  );
}

export default ArtWrapper;
