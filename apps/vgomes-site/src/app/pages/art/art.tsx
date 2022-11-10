import styles from './art.module.scss';
import ArtGallery from './art-gallery/art-gallery';
import TopSection from './top-section/top-section';

/* eslint-disable-next-line */
export interface ArtProps {}

export function Art(props: ArtProps) {
  return (
    <div className={styles['container']}>
      <TopSection />
      <ArtGallery />
    </div>
  );
}

export default Art;
