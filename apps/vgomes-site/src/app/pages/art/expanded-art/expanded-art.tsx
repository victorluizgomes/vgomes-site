import { ReactNode } from 'react';
import styles from './expanded-art.module.scss';

/* eslint-disable-next-line */
export interface ExpandedArtProps {
  title: string;
  description?: string;
  children?: ReactNode; // where the image gets sent
}

export function ExpandedArt(props: ExpandedArtProps) {
  const leftClicked = () => {
    // TODO:
  }

  const rightClicked = () => {
    // TODO:
  }

  const closeClicked = () => {
    // TODO:
  }


  return (
    <div className={styles['container']}>
      {/* TODO: replace 'X' with actual icon */}
      <button onClick={closeClicked} className={`w-10 h-10 text-off-white text-3xl ${styles['close-btn']}`}>X</button>
      <div className={styles['inner-container']}>
        {/* TODO: implement modal -- make so it doesn't scroll until exiting */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl leading-tight text-off-white">
          {props.title}
        </h1>
        <p className="text-sm sm:text-base mt-5 px-2 leading-loose text-center text-off-white">
          {props.description}
        </p>
        <div className='my-6'>{props.children}</div>
        <div className='flex flex-row w-60 justify-between mb-6'>
          <button onClick={leftClicked} className={`bg-off-white w-10 h-10 ${styles['art-nav-btns']}`}></button>
          <button onClick={rightClicked} className={`bg-off-white w-10 h-10 ${styles['art-nav-btns']}`}></button>
        </div>
      </div>
    </div>
  );
}

export default ExpandedArt;
