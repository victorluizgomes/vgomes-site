import styles from './about-section.module.scss';

/* eslint-disable-next-line */
export interface AboutSectionProps {}

export function AboutSection(props: AboutSectionProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to AboutSection!</h1>
    </div>
  );
}

export default AboutSection;
