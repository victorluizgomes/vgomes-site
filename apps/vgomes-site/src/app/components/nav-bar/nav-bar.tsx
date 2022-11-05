import styles from './nav-bar.module.scss';
import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
export interface NavBarProps {}

export function NavBar(props: NavBarProps) {
  return (
    <nav className={styles['container']}>
      <ul className='flex flex-row'>
        <li>
          <Link className="m-4 border cursor-pointer" to="/">Home</Link>
        </li>
        <li>
          <Link className="m-4 border cursor-pointer" to="/art">Art</Link>
        </li>
        <li>
          <Link className="m-4 border cursor-pointer" to="/nfts">NFTs</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
