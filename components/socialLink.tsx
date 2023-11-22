import styles from "../styles/SocialLink.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      className={`${styles["container"]} bg-off-grey hover:bg-gold-yellow flex items-center justify-center`}
    >
      <div className="flex justify-center h-8 w-8">
        <FontAwesomeIcon icon={props.icon} size="2xl" />
      </div>
    </a>
  );
}
