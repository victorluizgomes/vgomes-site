/* eslint-disable react/jsx-no-useless-fragment */
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { db, storage } from 'apps/vgomes-site/src/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';
import Button from '../../../components/button/button';
import ArtWrapper from '../art-wrapper/art-wrapper';
import ExpandedArt from '../expanded-art/expanded-art';
import styles from './art-gallery.module.scss';

/* eslint-disable-next-line */
export interface ArtGalleryProps {}

export interface ArtPropertiesInterface {
  id: string;
  link: string;
  name: string;
  description?: string;
  descriptionLink?: string;
  isFeatured?: boolean;
  thumbnails: ArtThumbnailsMapInterface;
}

export interface ArtThumbnailsMapInterface {
  thumbnail: string;
  medium: string;
}

export function ArtGallery(props: ArtGalleryProps) {
  const [paintingActive, setPaintingActive] = useState<boolean>(false);
  const [drawingActive, setDrawingActive] = useState<boolean>(false);
  // const [generativeActive, setGenerativeActive] = useState<boolean>(false);
  const [digitalActive, setDigitalActive] = useState<boolean>(true);
  const [pixelActive, setPixelActive] = useState<boolean>(false);

  const [digitalArt, setDigitalArt] = useState<ArtPropertiesInterface[]>([]);
  const [paintingArt, setPaintingArt] = useState<ArtPropertiesInterface[]>([]);
  const [pixelArt, setPixelArt] = useState<ArtPropertiesInterface[]>([]);
  const [drawingArt, setDrawingArt] = useState<ArtPropertiesInterface[]>([]);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const [expandedArt, setExpandedArt] = useState<any>(null);
  const [expandedArtIndex, setExpandedArtIndex] = useState(-1);
  const [expandedCurrArray, setExpandedCurrArray] = useState<
    ArtPropertiesInterface[]
  >([]);

  const setPainting = () => {
    resetBtns();
    setPaintingActive(true);
  };
  const setDrawing = () => {
    resetBtns();
    setDrawingActive(true);
  };
  // const setGenerative = () => {
  //   resetBtns();
  //   setGenerativeActive(true);
  // }
  const setDigital = () => {
    resetBtns();
    setDigitalActive(true);
  };
  const setPixel = () => {
    resetBtns();
    setPixelActive(true);
  };

  const resetBtns = () => {
    setIsLoading(true);
    setImagesLoaded(0);
    setPaintingActive(false);
    setDrawingActive(false);
    // setGenerativeActive(false);
    setDigitalActive(false);
    setPixelActive(false);
  };

  const handleImageLoad = (numImages: number) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setImagesLoaded((prevState) => prevState + 1);
    if (imagesLoaded + 1 === numImages) {
      setIsLoading(false);
    }

    // set a maximum load time, ensuring it doesn't load forever
    const maxLoadTime = 1750;
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, maxLoadTime);
  };

  const handleExpandArt = (
    art: ArtPropertiesInterface,
    currArtArray: ArtPropertiesInterface[],
    index: number
  ) => {
    setExpandedArtIndex(index);
    setExpandedArt(art);
    setExpandedCurrArray(currArtArray);
  };

  const closeExpandedArt = () => {
    setExpandedArtIndex(-1);
    setExpandedArt(null);
  };

  useEffect(() => {
    const fetchArtworks = async (category: string) => {
      const artCollection = collection(db, category);
      const artSnapshot = await getDocs(artCollection);
      const artDataPromises = artSnapshot.docs.map(async (doc) => {
        const art = doc.data();
        const originalLinkRef = ref(storage, art['link']);
        const originalLinkURL = await getDownloadURL(originalLinkRef);
        const thumbnailRef = ref(storage, art['thumbnails'].thumbnail);
        const thumbnailURL = await getDownloadURL(thumbnailRef);
        const mediumRef = ref(storage, art['thumbnails'].medium);
        const mediumURL = await getDownloadURL(mediumRef);
        return {
          ...art,
          id: doc.id,
          name: art['name'],
          link: originalLinkURL,
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
      {expandedArt && (
        <ExpandedArt
          art={expandedArt}
          artArray={expandedCurrArray}
          currentIndex={expandedArtIndex}
          onClose={closeExpandedArt}
        />
      )}
      <nav className={`flex item-center justify-center mb-3 `}>
        <Button label="Digital" active={digitalActive} onClick={setDigital} />
        <Button
          label="Painting"
          active={paintingActive}
          onClick={setPainting}
        />
        <Button label="Drawing" active={drawingActive} onClick={setDrawing} />
        {/* <Button label='Generative' active={generativeActive} onClick={setGenerative} /> */}
        <Button label="Pixel" active={pixelActive} onClick={setPixel} />
      </nav>
      {isLoading && (
        <div className="flex flex-col w-full">
          <div className={styles['loader']}></div>
          <p className="text-center pt-4">Loading artworks</p>
        </div>
      )}
      {digitalActive && (
        <div
          className={`columns-1 sm:columns-2 md:columns-3 ${
            styles['art-grid-container']
          } ${isLoading ? styles['hidden'] : ''}`}
        >
          {digitalArt.map((art: ArtPropertiesInterface, index: number) => (
            <div key={art.id}>
              <ArtWrapper
                type="image"
                art={art}
                imgName={art.name}
                thumbnailSrc={art.thumbnails.thumbnail}
                onLoad={() => handleImageLoad(digitalArt.length)}
                onError={() => handleImageLoad(paintingArt.length)}
                onExpandArt={() => handleExpandArt(art, digitalArt, index)}
              />
            </div>
          ))}
        </div>
      )}
      {paintingActive && (
        <div
          className={`columns-1 sm:columns-2 md:columns-3 ${
            styles['art-grid-container']
          } ${isLoading ? styles['hidden'] : ''}`}
        >
          {paintingArt.map((art: ArtPropertiesInterface, index: number) => (
            <div key={art.id}>
              <ArtWrapper
                type="image"
                art={art}
                imgName={art.name}
                thumbnailSrc={art.thumbnails.thumbnail}
                onLoad={() => handleImageLoad(paintingArt.length)}
                onError={() => handleImageLoad(paintingArt.length)}
                onExpandArt={() => handleExpandArt(art, paintingArt, index)}
              />
            </div>
          ))}
        </div>
      )}
      {pixelActive && (
        <div
          className={`columns-1 sm:columns-2 md:columns-3 ${
            styles['art-grid-container']
          } ${isLoading ? styles['hidden'] : ''}`}
        >
          {pixelArt.map((art: ArtPropertiesInterface, index: number) => (
            <div key={art.id}>
              <ArtWrapper
                type="image"
                art={art}
                imgName={art.name}
                thumbnailSrc={art.thumbnails.thumbnail}
                onLoad={() => handleImageLoad(pixelArt.length)}
                onError={() => handleImageLoad(paintingArt.length)}
                onExpandArt={() => handleExpandArt(art, pixelArt, index)}
              />
            </div>
          ))}
        </div>
      )}
      {drawingActive && (
        <div
          className={`columns-1 sm:columns-2 md:columns-3 ${
            styles['art-grid-container']
          } ${isLoading ? styles['hidden'] : ''}`}
        >
          {drawingArt.map((art: ArtPropertiesInterface, index: number) => (
            <div key={art.id}>
              <ArtWrapper
                type="image"
                art={art}
                imgName={art.name}
                thumbnailSrc={art.thumbnails.thumbnail}
                onLoad={() => handleImageLoad(drawingArt.length)}
                onError={() => handleImageLoad(paintingArt.length)}
                onExpandArt={() => handleExpandArt(art, drawingArt, index)}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ArtGallery;
