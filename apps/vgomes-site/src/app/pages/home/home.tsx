import styles from './home.module.scss';
import TopSection from './top-section/top-section';
import AboutSection from './about-section/about-section';
import { Helmet } from 'react-helmet';

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {
  return (
    <>
      <Helmet>
        <title>Victor Gomes (vgomes.co)</title>
        <meta name="description" content="Victor Gomes personal website, showcasing his interests, hobbies and work. Some things you will find are Art, NFT and programming." />
      </Helmet>
      <main className={styles['container']}>
        <img className={styles['big-bg-deco']} src="assets/vectors/big-bg-circle-vector.png" role="presentation" alt="" />
        <TopSection />
        <AboutSection />
      </main>
    </>
  );
}

export default Home;
