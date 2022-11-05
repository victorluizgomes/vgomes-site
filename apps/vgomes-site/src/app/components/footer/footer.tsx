import {
  TWITTER_URL,
  INSTAGRAM_URL,
  GITHUB_URL,
  LINKEDIN_URL,
} from '../../../model/constants';
import styles from './footer.module.scss';

/* eslint-disable-next-line */
export interface FooterProps {}

export function Footer(props: FooterProps) {
  return (
    <div className={`${styles['container']} py-20`}>
      <div className="px-16">
        <p>
          Say Hello &#8212;{' '}
          <a
            className="hover:border-b-gold-yellow hover:border-b-2"
            href="mailto:vgomescontact@gmail.com"
          >
            vgomescontact@gmail.com
          </a>
        </p>
        <hr className={`my-6 border-gold-yellow border-t-4`} />
        <div className="flex justify-between">
          <p>&#169; Victor Gomes {new Date().getFullYear()}</p>
          <ul className="flex gap-5">
            <li className="hover:border-b-gold-yellow hover:border-b-2">
              <a href={TWITTER_URL}>TW</a>
            </li>
            <li className="hover:border-b-gold-yellow hover:border-b-2">
              <a href={INSTAGRAM_URL}>IG</a>
            </li>
            <li className="hover:border-b-gold-yellow hover:border-b-2">
              <a href={GITHUB_URL}>GH</a>
            </li>
            <li className="hover:border-b-gold-yellow hover:border-b-2">
              <a href={LINKEDIN_URL}>LN</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
