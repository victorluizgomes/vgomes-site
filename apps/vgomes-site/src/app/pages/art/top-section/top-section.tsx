import styles from './top-section.module.scss';

/* eslint-disable-next-line */
export interface TopSectionProps {}

export function TopSection(props: TopSectionProps) {
  return (
    <section className={styles['container']}>
      <div className="text-center mx-2 my-12 sm:my-20">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl leading-tight">
          Sometimes I work on creative projects and art.
        </h1>
        <p className="text-sm sm:text-base mt-6 px-2 leading-loose text-center">
          "Every child is an artist. The problem is how to remain an artist once we grow up." - Pablo Picasso
        </p>
      </div>
    </section>
  );
}

export default TopSection;
