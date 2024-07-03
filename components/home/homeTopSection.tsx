import styles from "../../styles/home/HomeTopSection.module.css";
import { SocialLink } from '../socialLink';
import Image from 'next/image';
import {
  GITHUB_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  X_TWITTER_URL,
} from '../../model/constants';
import {
  faXTwitter,
  faInstagram,
  faLinkedinIn,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

export interface TopSectionProps {}

export function TopSection(props: TopSectionProps) {
  return (
    <section className={styles['container']}>
      <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-6 md:gap-3 lg:gap-10 mx-2 sm:mx-6 lg:mx-20 mb-10 md:mb-24 mt-24">
        <Image
          src="/profile-picture.jpg"
          alt="stylized portrait of Victor"
          width={288}
          height={288}
          className="min-w-72 w-72 max-w-72 lg:min-w-80 lg:w-80 lg:max-w-80 rounded-3xl border border-gold-yellow"
          priority
        />
        <div className={`${styles['main-text-container']} text-center md:text-left`}>
          <Image
            src="/vectors/hi-vector.png" // Update the path as needed
            alt="a graphic spelling HI!"
            width={100}
            height={100}
            className={styles['hi-img']}
            priority
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl leading-tight">
            I&apos;m Victor Gomes. <br />
            Front-end Engineer.
          </h1>
          <p className=" mt-6 text-sm sm:text-base lg:text-base leading-loose lg:leading-loose">
            <span className="inline-block">
              I&apos;m a general creative, with a love for technology & art.&nbsp;
            </span>
            <span className="inline-block">
              Currently working as a Front-end Software Engineer at{' '}
              <a
                className={`border-b border-b-gold-yellow cursor-pointer hover:border-b-2 ${styles['header-link']}`}
                href="https://www.coinbase.com/about"
                target="_blank"
                rel="noreferrer"
              >
                Coinbase
              </a>
              . Previously worked at{' '}
              <a
                className={`border-b border-b-gold-yellow cursor-pointer hover:border-b-2 ${styles['header-link']}`}
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
            <SocialLink url={X_TWITTER_URL} icon={faXTwitter} ariaLabel="Twitter/X" />
          </li>
          <li>
            <SocialLink url={INSTAGRAM_URL} icon={faInstagram} ariaLabel="Instagram" />
          </li>
          <li>
            <SocialLink url={GITHUB_URL} icon={faGithub} ariaLabel="Github" />
          </li>
          <li>
            <SocialLink url={LINKEDIN_URL} icon={faLinkedinIn} ariaLabel="LinkedIn" />
          </li>
        </ul>
      </div>
    </section>
  );
}

export default TopSection;