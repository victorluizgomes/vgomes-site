import NavBar from '../../components/nav-bar/nav-bar';
import Footer from '../../components/footer/footer'
import styles from './home.module.scss';

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {
  return (
    <div className={styles['container']}>
      <NavBar></NavBar>
      <h1>Welcome to Home!</h1>
      <Footer></Footer>
    </div>
  );
}

export default Home;
