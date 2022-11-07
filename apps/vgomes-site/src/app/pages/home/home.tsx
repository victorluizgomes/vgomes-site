import styles from './home.module.scss';
import TopSection from './top-section/top-section';
import AboutSection from './about-section/about-section';

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {
  return (
    <div className={styles['container']}>
      <img className={styles['big-bg-deco']} src="assets/vectors/big-bg-circle-vector.png" alt="blue circle vector" />
      <TopSection />
      <AboutSection />
    </div>
  );
}

export default Home;
