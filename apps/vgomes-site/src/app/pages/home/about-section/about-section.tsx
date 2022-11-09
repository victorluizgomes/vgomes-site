import styles from './about-section.module.scss';

/* eslint-disable-next-line */
export interface AboutSectionProps {}

export function AboutSection(props: AboutSectionProps) {
  return (
    <div className={styles['container']}>
      <div
        className={`${styles['header']} md:px-24 w-full flex justify-center`}
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-tight relative md:pr-52">
          <img
            className={styles['arrow-vector']}
            src="assets/vectors/arrow-vector.png"
            alt="red arrow vector"
          />
          Who is Victor...
        </h2>
      </div>
      <div className={`${styles['main-text-wrapper']} gap-4 mt-6`}>
        <p className={styles['main-text']}>
          I'm from Brazil, lived there until I moved to the United States for
          college. Growing up I loved to draw, I drew a lot of anime and cartoon
          characters. I also was always on my computer, mostly playing video
          games, things like Diablo, Starcraft, Minecraft, and MMORPGs. When I
          moved to the United States, I studied Computer Science from the
          University of Arizona, where I graduated from in 2019. I loved it, the
          problem-solving of programming, experience being a teacher's assistant
          and doing Virtual Reality research, made my time there fulfilling.
        </p>
        <p className={styles['main-text']}>
          During my time in University I had an internship with Blackrock as a
          Software Engineer. In 2020, I started as a full-time software engineer
          at Blackrock. That is when I discovered my love for Front-end web
          development, and am currently working as a Front-end engineer. Outside
          of work, I have been developing my art, I love to experiment with
          different mediums. Things like generative art, acrylic paints, digital
          art, and pen sketches. I also have been learning about web3
          development, and together with some friends have worked in the NFT
          space developing web3 technology.
        </p>
      </div>
    </div>
  );
}

export default AboutSection;
