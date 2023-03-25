import styles from './about-section.module.scss';

/* eslint-disable-next-line */
export interface AboutSectionProps {}

export function AboutSection(props: AboutSectionProps) {
  return (
    <section className={styles['container']}>
      <div
        className={`${styles['header']} md:px-24 w-full flex justify-center`}
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-tight relative md:pr-52">
          <img
            className={styles['arrow-vector']}
            src="assets/vectors/arrow-vector.png"
            alt="red arrow pointing down at the text vector"
          />
          Who is Victor...
        </h2>
      </div>
      <div className={`${styles['main-text-wrapper']} gap-4 mt-6`}>
        <p className={styles['main-text']}>
          Growing up I loved to draw, I drew a lot of anime and cartoon
          characters. I spent much of my time playing video games with friends;
          things like Diablo, League of Legends, Minecraft, and MMORPGs. Both my love of
          art and technology grew as I got older and always has been a huge part
          of my life. I was born and raised in Brazil. Lived there until I moved
          to the United States for college, where I studied Computer Science at
          the University of Arizona and graduated in 2019. I loved it. Being a
          teacher's assistant, doing Virtual Reality research, and all of the
          problem-solving involved with programming made my time there
          fulfilling and I learned a lot from my experience.
        </p>
        <p className={styles['main-text']}>
          During my time in University I interned with Blackrock as a Software
          Engineer; and in 2020 I began as a full-time software engineer there.
          That is when I discovered my love for Front-end web development, and
          am currently working as a Front-end engineer. Outside of work, I have
          been developing my art; I love to experiment with different mediums.
          Digital and generative art, acrylic paints, and pen sketches are just
          a few examples. I also have been learning about web3 development, and
          together with some friends have worked in the NFT space developing
          web3 technology.
        </p>
      </div>
    </section>
  );
}

export default AboutSection;
