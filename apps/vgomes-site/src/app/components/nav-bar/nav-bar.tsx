import styles from './nav-bar.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

/* eslint-disable-next-line */
export interface NavBarProps {}

export function NavBar(props: NavBarProps) {

  const location = useLocation();
  return (
    // TODO: copy underline from current site or Sean Halpin
    <nav className={styles['container']}>
      <ul className='flex flex-row py-6 gap-12'>
        <li className={`${styles['nav-animation']} ${location.pathname === '/' ? 'border-b-2 border-b-gold-yellow pb-0' : 'hover:pb-0'} hover:border-b-gold-yellow hover:border-b-2 pb-2`}>
          <Link className="cursor-pointer text-lg font-bold" to="/">Home</Link>
        </li>
        <li className={`${styles['nav-animation']} ${location.pathname === '/art' ? 'border-b-2 border-b-gold-yellow pb-0' : 'hover:pb-0'} hover:border-b-gold-yellow hover:border-b-2 pb-2`}>
          <Link className="cursor-pointer text-lg font-bold" to="/art">Art</Link>
        </li>
        <li className={`${styles['nav-animation']} ${location.pathname === '/nfts' ? 'border-b-2 border-b-gold-yellow pb-0' : 'hover:pb-0'} hover:border-b-gold-yellow hover:border-b-2 pb-2`}>
          <Link className="cursor-pointer text-lg font-bold" to="/nfts">NFTs</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
