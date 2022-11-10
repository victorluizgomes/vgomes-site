import styles from './art-gallery.module.scss';

/* eslint-disable-next-line */
export interface ArtGalleryProps {}

export function ArtGallery(props: ArtGalleryProps) {
  return (
    <div className={styles['container']}>
      <div className='text-center h-72'>
        <h1>Art Gallery under construction...</h1>
      </div>
    </div>
  );
}

export default ArtGallery;
