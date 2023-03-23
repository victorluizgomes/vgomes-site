// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { db, storage } from 'apps/vgomes-site/src/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import Button from '../../../components/button/button';
import ArtWrapper from '../art-wrapper/art-wrapper';
import styles from './art-gallery.module.scss';

/* eslint-disable-next-line */
export interface ArtGalleryProps {}

export function ArtGallery(props: ArtGalleryProps) {
  const [paintingActive, setPaintingActive] = useState<boolean>(true);
  // const [drawingActive, setDrawingActive] = useState<boolean>(false);
  // const [generativeActive, setGenerativeActive] = useState<boolean>(false);
  const [digitalActive, setDigitalActive] = useState<boolean>(false);
  const [pixelActive, setPixelActive] = useState<boolean>(false);

  const [digitalArt, setDigitalArt] = useState<any>([]);

  const setPainting = () => {
    resetBtns();
    setPaintingActive(true);
  }
  // const setDrawing = () => {
  //   resetBtns();
  //   setDrawingActive(true);
  // }
  // const setGenerative = () => {
  //   resetBtns();
  //   setGenerativeActive(true);
  // }
  const setDigital = () => {
    resetBtns();
    setDigitalActive(true);
  }
  const setPixel = () => {
    resetBtns();
    setPixelActive(true);
  }

  const resetBtns = () => {
    setPaintingActive(false);
    // setDrawingActive(false);
    // setGenerativeActive(false);
    setDigitalActive(false);
    setPixelActive(false);
  }

  useEffect(() => {
    const fetchArtworks = async () => {
      const artCollection = collection(db, 'digital');
      const artSnapshot = await getDocs(artCollection);
      const artDataPromises = artSnapshot.docs.map(async (doc) => {
        const art = doc.data();
        const thumbnailRef = ref(storage, art['thumbnails'].thumbnail);
        const thumbnailURL = await getDownloadURL(thumbnailRef);
        const mediumRef = ref(storage, art['thumbnails'].medium);
        const mediumURL = await getDownloadURL(mediumRef);
        return {
          id: doc.id,
          ...art,
          thumbnails: {
            ...art['thumbnails'],
            thumbnail: thumbnailURL,
            medium: mediumURL
          },
        };
      });

      const artData = await Promise.all(artDataPromises);
      setDigitalArt(artData);
    };

    fetchArtworks();

  }, []);

  return (
    <div className={styles['container']}>
      {/* <div>
        <div>
          {artworks.map((art: any) => (
            <div key={art.id}>
              <h3>{art.name}</h3>
              <p>{art.description}</p>
              <img src={art.thumbnails.thumbnail} alt={art.name} />
            </div>
          ))}
        </div>
      </div> */}

      <div className='flex item-center justify-center mb-3'>
        <Button label='Digital Art' active={digitalActive} onClick={setDigital} />
        <Button label='Paintings' active={paintingActive} onClick={setPainting} />
        {/* <Button label='Drawing' active={drawingActive} onClick={setDrawing} />
        <Button label='Generative' active={generativeActive} onClick={setGenerative} /> */}
        <Button label='Pixel Art' active={pixelActive} onClick={setPixel} />
      </div>
      {digitalActive && <div className={`columns-2 md:columns-3 lg:columns-4 ${styles['art-grid-container']}`}>
        {digitalArt.map((art: any) => (
          <ArtWrapper type='image' src={art.thumbnails.thumbnail}/>
        ))}
      </div>}
    </div>
  );
}

export default ArtGallery;
