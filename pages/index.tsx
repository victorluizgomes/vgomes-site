import Head from 'next/head';
import AboutSection from '../components/home/aboutSection';
import TopSection from '../components/home/homeTopSection';
import styles from '../styles/home/Home.module.css';

export default function Home() {
  return (
    <main>
      <Head>
        <title>Victor Gomes | Front-end Enginer (vgomes.co)</title>
      </Head>
      <TopSection />
      <AboutSection />
    </main>
  );
}
