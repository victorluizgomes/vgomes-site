import styles from '../../styles/home/AboutSection.module.css';
import Image from 'next/image';

/* eslint-disable-next-line */
export interface AboutSectionProps {}

export function AboutSection(props: AboutSectionProps) {
  return (
    <section className={styles['container']}>
      <div
        className={`${styles['header']} md:px-24 w-full flex justify-center`}
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-tight relative md:pr-52">
          <Image
            src="/vectors/arrow-vector.png"
            alt="red arrow pointing down at the text vector"
            height={100}
            width={190}
            className={styles['arrow-vector']}
          />
          About me
        </h2>
      </div>
      <div className={`${styles['main-text-wrapper']} gap-4 mt-6`}>
        <p className={styles['main-text']}>
          I am a Front-end Software Engineer with a passion for art and technology. I
          currently work at Blackrock, where I discovered my love for Front-end
          web development. In 2020, I started working there as a full-time
          Software Engineer after completing my Computer Science degree from the
          University of Arizona. Outside of work, I enjoy developing my art
          skills, experimenting with different mediums such as digital and
          generative art, acrylic paints, and pen sketches.
          I love learning different technologies, starting new coding projects on the side.
          The past few years I also delve into web3 development and worked
          in the NFT space with some friends to develop web3 technology.
        </p>
        <p className={styles['main-text']}>
          My love for art and technology began at a young age. I spent much of
          my childhood drawing anime and cartoon characters, playing video games
          like Diablo, League of Legends, Minecraft, and MMORPGs. As I got
          older, my love for both art and technology continued to grow and has
          become a huge part of my life. I was born and raised in Brazil and
          moved to the United States for college, where I studied Computer
          Science. During my time in University, I worked as a teacher&apos;s
          assistant and did Virtual Reality research, which was fulfilling and
          taught me a lot. I also interned with Blackrock as a Software
          Engineer, which led me to my current role.
        </p>
      </div>
    </section>
  );
}

export default AboutSection;
