import styles from './nav-bar.module.scss';
import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
export interface NavBarProps {}

export function NavBar(props: NavBarProps) {
  return (
    // TODO: copy underline from current site or Sean Halpin
    <nav className={styles['container']}>
      <ul className='flex flex-row py-6 gap-12'>
        <li className={`${styles['nav-animation']} hover:border-b-gold-yellow hover:border-b-2 pb-2 hover:pb-0`}>
          <Link className="cursor-pointer font-bold" to="/vgomes-site/">Home</Link>
        </li>
        {/* <li className={`${styles['nav-animation']} hover:border-b-gold-yellow hover:border-b-2 pb-2 hover:pb-0`}>
          <Link className="cursor-pointer font-bold" to="/art">Art</Link>
        </li> */}
        <li className={`${styles['nav-animation']} hover:border-b-gold-yellow hover:border-b-2 pb-2 hover:pb-0`}>
          <Link className="cursor-pointer font-bold" to="/vgomes-site/nfts">NFTs</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
