import { useEffect, useState } from 'react';
import styles from '../../styles/art/ExpandedArt.module.css';
import Image from 'next/image';
import { ArtPropertiesInterface } from '../../model/art.interface';

/* eslint-disable-next-line */
export interface ExpandedArtProps {
  art: ArtPropertiesInterface;
  artArray: ArtPropertiesInterface[];
  currentIndex: number;
  onClose: () => void;
}

export function ExpandedArt(props: ExpandedArtProps) {
  const [currentIndex, setCurrentIndex] = useState(props.currentIndex);
  const [currArt, setCurrArt] = useState(props.art);

  const leftClicked = (e: any) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrArt(props.artArray[currentIndex - 1]);
    }
  };

  const rightClicked = (e: any) => {
    e.stopPropagation();
    if (currentIndex < props.artArray.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrArt(props.artArray[currentIndex + 1]);
    }
  };

  useEffect(() => {
    // prevents background from scrolling when expanded is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [currArt]);

  return (
    <div className={styles['container']} onClick={props.onClose}>
      <div className={styles['expanded-wrapper']}>
        <button
          onClick={props.onClose}
          className={`w-10 h-10 hover:bg-gold-yellow bg-off-white ${styles['close-btn']}`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.35355 17.3536C7.54882 17.5488 7.8654 17.5488 8.06066 17.3536L12 13.4142L15.9393 17.3536C16.1346 17.5488 16.4512 17.5488 16.6464 17.3536L17.3536 16.6464C17.5488 16.4512 17.5488 16.1346 17.3536 15.9393L13.4142 12L17.3536 8.06066C17.5488 7.8654 17.5488 7.54882 17.3536 7.35355L16.6464 6.64645C16.4512 6.45118 16.1346 6.45118 15.9393 6.64645L12 10.5858L8.06066 6.64645C7.8654 6.45118 7.54882 6.45118 7.35356 6.64645L6.64645 7.35355C6.45119 7.54882 6.45119 7.8654 6.64645 8.06066L10.5858 12L6.64645 15.9393C6.45118 16.1346 6.45118 16.4512 6.64645 16.6464L7.35355 17.3536Z"
              fill="#000"
            />
          </svg>
        </button>
        <h2 className="text-center w-full text-off-white text-2xl">
          {currArt.name}
        </h2>
        {currArt.description && (
          <p className="text-sm sm:text-base mt-5 px-2 leading-loose text-center text-off-white">
            {currArt.description}
          </p>
        )}
        <Image
          className={styles['expanded-image']}
          src={currArt.link} // Your image URL
          alt={currArt.name}
          width={1000}
          height={1000}
        />
      </div>
      <div className="fixed left-0 bottom-0 w-full">
        <div className='flex flex-row w-full justify-center items-center gap-10 my-6'>
          <button
            onClick={(e) => leftClicked(e)}
            className={`${
              currentIndex <= 0
                ? 'bg-neutral-500 hover:bg-neutral-500 cursor-not-allowed'
                : 'bg-off-white hover:bg-gold-yellow'
            } w-10 h-10 ${styles['art-nav-btns']}`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.85354 6.14645C8.65828 5.95118 8.34169 5.95118 8.14643 6.14645L2.14643 12.1464C1.95117 12.3417 1.95117 12.6583 2.14643 12.8536L8.14643 18.8536C8.34169 19.0488 8.65828 19.0488 8.85354 18.8536L9.56065 18.1464C9.75591 17.9512 9.75591 17.6346 9.56065 17.4393L5.57132 13.45L21.3571 13.45C21.6333 13.45 21.8571 13.2262 21.8571 12.95V11.95C21.8571 11.6739 21.6333 11.45 21.3571 11.45L5.67129 11.45L9.56065 7.56066C9.75591 7.3654 9.75591 7.04882 9.56065 6.85355L8.85354 6.14645Z"
                fill="#000"
              />
            </svg>
          </button>
          <button
            onClick={(e) => rightClicked(e)}
            className={`${
              currentIndex >= props.artArray.length - 1
                ? 'bg-neutral-500 hover:bg-neutral-500 cursor-not-allowed'
                : 'bg-off-white hover:bg-gold-yellow'
            } w-10 h-10 ${
              styles['art-nav-btns']
            } `}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.0036 18.8536C15.1988 19.0488 15.5154 19.0488 15.7107 18.8536L21.7107 12.8536C21.9059 12.6583 21.9059 12.3417 21.7107 12.1464L15.7107 6.14645C15.5154 5.95118 15.1988 5.95118 15.0036 6.14645L14.2965 6.85355C14.1012 7.04882 14.1012 7.3654 14.2965 7.56066L18.2858 11.55L2.5 11.55C2.22386 11.55 2 11.7738 2 12.05V13.05C2 13.3261 2.22386 13.55 2.5 13.55L18.1858 13.55L14.2965 17.4393C14.1012 17.6346 14.1012 17.9512 14.2965 18.1464L15.0036 18.8536Z"
                fill="#000E"
              />
            </svg>
          </button>
          </div>
        </div>
    </div>
  );
}

export default ExpandedArt;
