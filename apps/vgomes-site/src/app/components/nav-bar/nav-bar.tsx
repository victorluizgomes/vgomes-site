import styles from './nav-bar.module.scss';

/* eslint-disable-next-line */
export interface NavBarProps {}

export function NavBar(props: NavBarProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to NavBar!</h1>
    </div>
  );
}

export default NavBar;
