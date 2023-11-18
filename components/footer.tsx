import {
  X_TWITTER_URL,
  INSTAGRAM_URL,
  GITHUB_URL,
  LINKEDIN_URL,
} from "../model/constants";
import styles from "../styles/Footer.module.css";

/* eslint-disable-next-line */
export interface FooterProps {}

export function Footer(props: FooterProps) {
  return (
    <footer className={`${styles["container"]} pb-14 pt-10 sm:py-20`}>
      <div className="px-6 sm:px-16">
        <p className="text-center sm:text-left">
          Say Hello &#8212;{" "}
          <a
            className={`hover:border-b-gold-yellow hover:border-b-2 ${styles["email-link"]}`}
            href="mailto:vgomescontact@gmail.com"
          >
            vgomescontact@gmail.com
          </a>
        </p>
        <hr className={`my-6 border-gold-yellow border-t-4`} />
        <div className="flex flex-col-reverse sm:flex-row justify-between text-center sm:text-left gap-4 sm:gap-0">
          <p>&#169; Victor Gomes {new Date().getFullYear()}</p>
          <ul className="flex justify-center sm:justify-start gap-5">
            <li
              className={`hover:border-b-gold-yellow hover:border-b-2 ${styles["social-link"]}`}
            >
              <a target="_blank" rel="noreferrer" href={X_TWITTER_URL}>
                X
              </a>
            </li>
            <li
              className={`hover:border-b-gold-yellow hover:border-b-2 ${styles["social-link"]}`}
            >
              <a target="_blank" rel="noreferrer" href={INSTAGRAM_URL}>
                IG
              </a>
            </li>
            <li
              className={`hover:border-b-gold-yellow hover:border-b-2 ${styles["social-link"]}`}
            >
              <a target="_blank" rel="noreferrer" href={GITHUB_URL}>
                GH
              </a>
            </li>
            <li
              className={`hover:border-b-gold-yellow hover:border-b-2 ${styles["social-link"]}`}
            >
              <a target="_blank" rel="noreferrer" href={LINKEDIN_URL}>
                LN
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
