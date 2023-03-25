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
  const [paintingActive, setPaintingActive] = useState<boolean>(false);
  const [drawingActive, setDrawingActive] = useState<boolean>(false);
  // const [generativeActive, setGenerativeActive] = useState<boolean>(false);
  const [digitalActive, setDigitalActive] = useState<boolean>(true);
  const [pixelActive, setPixelActive] = useState<boolean>(false);

  const [digitalArt, setDigitalArt] = useState<any>([]);
  const [paintingArt, setPaintingArt] = useState<any>([]);
  const [pixelArt, setPixelArt] = useState<any>([]);
  const [drawingArt, setDrawingArt] = useState<any>([]);

  const setPainting = () => {
    resetBtns();
    setPaintingActive(true);
  }
  const setDrawing = () => {
    resetBtns();
    setDrawingActive(true);
  }
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
    setDrawingActive(false);
    // setGenerativeActive(false);
    setDigitalActive(false);
    setPixelActive(false);
  }

  useEffect(() => {
    const fetchArtworks = async (category: string) => {
      const artCollection = collection(db, category);
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
            medium: mediumURL,
          },
        };
      });
      return await Promise.all(artDataPromises);
    };

    const fetchAllCategories = async () => {
      const digital = await fetchArtworks('digital');
      setDigitalArt(digital);

      const painting = await fetchArtworks('painting');
      setPaintingArt(painting);

      const pixel = await fetchArtworks('pixel');
      setPixelArt(pixel);

      const drawing = await fetchArtworks('drawing');
      setDrawingArt(drawing);
    };

    fetchAllCategories();
  }, []);

  return (
    <section className={styles['container']}>
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

      <nav className='flex item-center justify-center mb-3'>
        <Button label='Digital' active={digitalActive} onClick={setDigital} />
        <Button label='Painting' active={paintingActive} onClick={setPainting} />
        <Button label='Drawing' active={drawingActive} onClick={setDrawing} />
        {/* <Button label='Generative' active={generativeActive} onClick={setGenerative} /> */}
        <Button label='Pixel' active={pixelActive} onClick={setPixel} />
      </nav>
      {digitalActive && <div className={`columns-2 md:columns-3 lg:columns-4 ${styles['art-grid-container']}`}>
        {digitalArt.map((art: any) => (
          <div key={art.id}>
            <ArtWrapper type='image' src={art.thumbnails.thumbnail}/>
          </div>
        ))}
      </div>}
      {paintingActive && <div className={`columns-2 md:columns-3 lg:columns-4 ${styles['art-grid-container']}`}>
        {paintingArt.map((art: any) => (
          <div key={art.id}>
            <ArtWrapper type='image' src={art.thumbnails.thumbnail}/>
          </div>
        ))}
      </div>}
      {pixelActive && <div className={`columns-2 md:columns-3 lg:columns-4 ${styles['art-grid-container']}`}>
        {pixelArt.map((art: any) => (
          <div key={art.id}>
            <ArtWrapper type='image' src={art.thumbnails.thumbnail}/>
          </div>
        ))}
      </div>}
      {drawingActive && <div className={`columns-2 md:columns-3 lg:columns-4 ${styles['art-grid-container']}`}>
        {drawingArt.map((art: any) => (
          <div key={art.id}>
            <ArtWrapper type='image' src={art.thumbnails.thumbnail}/>
          </div>
        ))}
      </div>}
    </section>
  );
}

export default ArtGallery;
