import { useState } from 'react';
import Button from '../../../components/button/button';
import styles from './art-gallery.module.scss';

/* eslint-disable-next-line */
export interface ArtGalleryProps {}

export function ArtGallery(props: ArtGalleryProps) {
  const [paintingActive, setPaintingActive] = useState<boolean>(true);
  const [drawingActive, setDrawingActive] = useState<boolean>(false);
  const [digitalActive, setDigitalActive] = useState<boolean>(false);
  const [generativeActive, setGenerativeActive] = useState<boolean>(false);
  const [pixelActive, setPixelActive] = useState<boolean>(false);
  const setPainting = () => {
    resetBtns();
    setPaintingActive(true);
  }
  const setDrawing = () => {
    resetBtns();
    setDrawingActive(true);
  }
  const setDigital = () => {
    resetBtns();
    setDigitalActive(true);
  }
  const setGenerative = () => {
    resetBtns();
    setGenerativeActive(true);
  }
  const setPixel = () => {
    resetBtns();
    setPixelActive(true);
  }

  const resetBtns = () => {
    setPaintingActive(false);
    setDrawingActive(false);
    setDigitalActive(false);
    setGenerativeActive(false);
    setPixelActive(false);
  }

  return (
    <div className={styles['container']}>
      <div className='flex item-center justify-center mb-3'>
        <Button label='Painting' active={paintingActive} onClick={setPainting} />
        <Button label='Drawing' active={drawingActive} onClick={setDrawing} />
        <Button label='Digital' active={digitalActive} onClick={setDigital} />
        <Button label='Generative' active={generativeActive} onClick={setGenerative} />
        <Button label='Pixel' active={pixelActive} onClick={setPixel} />
      </div>
      <div className='text-center h-72'>
        <h1>Art Gallery under construction...</h1>
      </div>
    </div>
  );
}

export default ArtGallery;
