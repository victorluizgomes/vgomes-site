import styles from './art.module.scss';
import ArtGallery from './art-gallery/art-gallery';
import TopSection from './top-section/top-section';
import { Helmet } from 'react-helmet';

/* eslint-disable-next-line */
export interface ArtProps {}

export function Art(props: ArtProps) {
  return (
    <>
      <Helmet>
        <title>Victor Gomes - Art (vgomes.co)</title>
        <meta
          name="description"
          content="Discover a diverse range of Victor Gomes' art, from painting and drawing to digital and generative creations. Experience a unique fusion of creativity and imagination."
        />
      </Helmet>
      <div className={styles['container']}>
        <TopSection />
        <ArtGallery />
      </div>
    </>
  );
}

export default Art;
