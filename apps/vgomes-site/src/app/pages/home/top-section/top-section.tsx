import styles from './top-section.module.scss';
import SocialLink from '../social-link/social-link';
import {
  GITHUB_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  TWITTER_URL,
} from '../../../../model/constants';
import {
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

/* eslint-disable-next-line */
export interface TopSectionProps {}

export function TopSection(props: TopSectionProps) {
  return (
    <div className={styles['container']}>
      {/* main picture and text area */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-6 md:gap-3 lg:gap-10 mx-1 sm:mx-6 lg:mx-20 mb-10 md:mb-24 mt-24">
        <img
          className="min-w-72 w-72 max-w-72 lg:min-w-80 lg:w-80 lg:max-w-80"
          src="assets/hq-header-picture.png"
          alt="stylized portrait of Victor"
        />
        {/* main text area */}
        <div
          className={`${styles['main-text-container']} text-center md:text-left`}
        >
          <img
            className={styles['hi-img']}
            src="assets/vectors/hi-vector.png"
            alt="a graphic spelling HI!"
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl leading-tight">
            I'm Victor Gomes. <br />
            Front-end Engineer.
          </h1>
          <p className=" mt-6 text-sm sm:text-base lg:text-base leading-loose lg:leading-loose">
            <span className="inline-block">
              I'm a general creative, with a love for art & technology.
            </span>
            <span className="inline-block">
              Currently working as a Front-end Engineer at{' '}
              <a
                className="border-b border-b-gold-yellow cursor-pointer"
                href="https://www.blackrock.com/us/individual/about-us/about-blackrock"
                target="_blank"
                rel="noreferrer"
              >
                Blackrock
              </a>
              .
            </span>{' '}
            <span className="inline-block">
              {' '}
              Based in Atlanta, United States.
            </span>
          </p>
        </div>
      </div>
      {/* socials links */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-12">
        <p>Check out</p>
        <ul className="flex gap-2 sm:gap-4">
          <li>
            <SocialLink url={TWITTER_URL} icon={faTwitter} />
          </li>
          <li>
            <SocialLink url={INSTAGRAM_URL} icon={faInstagram} />
          </li>
          <li>
            <SocialLink url={GITHUB_URL} icon={faGithub} />
          </li>
          <li>
            <SocialLink url={LINKEDIN_URL} icon={faLinkedinIn} />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TopSection;
