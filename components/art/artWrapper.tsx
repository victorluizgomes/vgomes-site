import Image from "next/image";
import styles from "../../styles/art/ArtWrapper.module.css";
import { ArtPropertiesInterface, ArtType } from "../../model/art.interface";

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
      className={`mb-2 ${styles["container"]}`}
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
          />
        </div>
      )}
      {props.type === ArtType.VIDEO && (
        // TODO: Use <video> tag or <Video> from 'next/video' if available
        <></>
      )}
    </div>
  );
}

export default ArtWrapper;
