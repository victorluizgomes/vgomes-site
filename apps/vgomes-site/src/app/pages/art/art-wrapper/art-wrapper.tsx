import { useState } from 'react';
import ExpandedArt from '../expanded-art/expanded-art';
import styles from './art-wrapper.module.scss';

export enum ArtType {
  IMAGE = 'image',
  VIDEO = 'video',
}

/* eslint-disable-next-line */
export interface ArtWrapperProps {
  type: string;
  src?: string;
}

export function ArtWrapper(props: ArtWrapperProps) {
  // const [modalOpen, setModalOpen] = useState<boolean>(false);

  // const expandArt = () => {
  //   setModalOpen(true);
  // };

  return (
    // <div onClick={expandArt} className={`mb-2 ${styles['container']}`}>
    <div className={`mb-2 ${styles['container']}`}>
      {/* TODO: have videos and images available */}
      {/* TODO: need to solve for different heights falling in 2 colums */}
      {props.type === ArtType.IMAGE && (
        <div
          className={`bg-off-grey ${styles['art-img-wrapper']}`}
        >
          <img width="100%" height="100%" src={props.src} alt="" />
        </div>
      )}
      {props.type === ArtType.VIDEO && <></>}
{/*
      {modalOpen && (
        <ExpandedArt
          title="IMAGE TITLE"
          description="lorem ipsum some description theat is not too large but reasonable"
        >
          <div className='w-72 h-96 bg-off-grey'></div>
        </ExpandedArt>
      )} */}
    </div>
  );
}

export default ArtWrapper;
