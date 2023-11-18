import { useEffect, useRef, useState } from "react";
import { TabButton as Button } from "../../components/tabButton";
import ArtWrapper from "./artWrapper";
import styles from "../../styles/art/ArtGallery.module.css";
import { ArtPropertiesInterface } from "../../model/art.interface";
import ExpandedArt from "./expandedArt";
import artworksData from '../../model/artworks.json';

/* eslint-disable-next-line */
export interface ArtGalleryProps {}

export function ArtGallery(props: ArtGalleryProps) {
  const [paintingActive, setPaintingActive] = useState<boolean>(false);
  const [drawingActive, setDrawingActive] = useState<boolean>(false);
  // const [generativeActive, setGenerativeActive] = useState<boolean>(false);
  const [digitalActive, setDigitalActive] = useState<boolean>(true);
  const [pixelActive, setPixelActive] = useState<boolean>(false);

  const [digitalArt] = useState(artworksData.find(category => category.digital)?.digital || []);
  const [paintingArt] = useState(artworksData.find(category => category.painting)?.painting || []);
  const [pixelArt] = useState(artworksData.find(category => category.pixel)?.pixel || []);
  const [drawingArt] = useState(artworksData.find(category => category.drawing)?.drawing || []);

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
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setImagesLoaded((prevState) => {
      const updatedState = prevState + 1;

      if (updatedState >= numImages) {
        setTimeout(() => {
            setIsLoading(false);
        }, 300);
      }

      return updatedState;
    });

    // set a maximum load time, ensuring it doesn't load forever
    const maxLoadTime = 1250;
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

  return (
    <section className={styles["container"]}>
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
          <div className={styles["loader"]}></div>
          <p className="text-center pt-4">Loading artworks</p>
        </div>
      )}
      {digitalActive && (
        <div
          className={`columns-1 sm:columns-2 md:columns-3 ${
            styles["art-grid-container"]
          } ${isLoading ? styles["hidden"] : ""}`}
        >
          {digitalArt.map(
            (art: ArtPropertiesInterface, index: number) => (
              <div key={art.link}>
                <ArtWrapper
                  type="image"
                  art={art}
                  imgName={art.name}
                  thumbnailSrc={art.link}
                  onLoad={() => handleImageLoad(digitalArt.length)}
                  onError={() => handleImageLoad(digitalArt.length)}
                  onExpandArt={() =>
                    handleExpandArt(art, digitalArt, index)
                  }
                />
              </div>
            )
          )}
        </div>
      )}
      {paintingActive && (
        <div
          className={`columns-1 sm:columns-2 md:columns-3 ${
            styles["art-grid-container"]
          } ${isLoading ? styles["hidden"] : ""}`}
        >
          {paintingArt.map(
            (art: ArtPropertiesInterface, index: number) => (
              <div key={art.link}>
                <ArtWrapper
                  type="image"
                  art={art}
                  imgName={art.name}
                  thumbnailSrc={art.link}
                  onLoad={() => handleImageLoad(paintingArt.length)}
                  onError={() => handleImageLoad(paintingArt.length)}
                  onExpandArt={() =>
                    handleExpandArt(art, paintingArt, index)
                  }
                />
              </div>
            )
          )}
        </div>
      )}
      {pixelActive && (
        <div
          className={`columns-1 sm:columns-2 md:columns-3 ${
            styles["art-grid-container"]
          } ${isLoading ? styles["hidden"] : ""}`}
        >
          {pixelArt.map((art: ArtPropertiesInterface, index: number) => (
            <div key={art.link}>
              <ArtWrapper
                type="image"
                art={art}
                imgName={art.name}
                thumbnailSrc={art.link}
                onLoad={() => handleImageLoad(pixelArt.length)}
                onError={() => handleImageLoad(pixelArt.length)}
                onExpandArt={() => handleExpandArt(art, pixelArt, index)}
              />
            </div>
          ))}
        </div>
      )}
      {drawingActive && (
        <div
          className={`columns-1 sm:columns-2 md:columns-3 ${
            styles["art-grid-container"]
          } ${isLoading ? styles["hidden"] : ""}`}
        >
          {drawingArt.map(
            (art: ArtPropertiesInterface, index: number) => (
              <div key={art.link}>
                <ArtWrapper
                  type="image"
                  art={art}
                  imgName={art.name}
                  thumbnailSrc={art.link}
                  onLoad={() => handleImageLoad(drawingArt.length)}
                  onError={() => handleImageLoad(drawingArt.length)}
                  onExpandArt={() =>
                    handleExpandArt(art, drawingArt, index)
                  }
                />
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
}

export default ArtGallery;
