import styles from './social-link.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* eslint-disable-next-line */
export interface SocialLinkProps {
  url: string;
  icon: any;
}

export function SocialLink(props: SocialLinkProps) {
  return (
    <a
      href={props.url}
      target="_blank"
      rel="noreferrer"
      className={`${styles['container']} bg-off-grey hover:bg-gold-yellow flex items-center justify-center`}
    >
      <FontAwesomeIcon icon={props.icon} size="2xl" />
    </a>
  );
}

export default SocialLink;
