import styles from './home.module.scss';
import TopSection from './top-section/top-section';
import AboutSection from './about-section/about-section';

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {
  return (
    <div className={styles['container']}>
      <TopSection />
      <AboutSection />
    </div>
  );
}

export default Home;
