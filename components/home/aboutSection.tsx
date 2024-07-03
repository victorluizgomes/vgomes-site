import styles from "../../styles/home/AboutSection.module.css";
import Image from "next/image";

/* eslint-disable-next-line */
export interface AboutSectionProps {}

export function AboutSection(props: AboutSectionProps) {
  return (
    <section className={styles["container"]}>
      <div
        className={`${styles["header"]} md:px-24 w-full flex justify-center`}
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-tight relative md:pr-52">
          <Image
            src="/vectors/arrow-vector.png"
            alt="red arrow pointing down at the text vector"
            height={100}
            width={190}
            className={styles["arrow-vector"]}
          />
          About me
        </h2>
      </div>
      <div className={`${styles["main-text-wrapper"]} gap-4 mt-6`}>
        <p className={styles["main-text"]}>
          I am a Front-end Software Engineer with a passion for art and
          technology, currently working at Coinbase. I recently joined the team
          in July 2024, where I&apos;ll be focusing on enhancing the
          coinbase.com consumer product by adding new features, optimizations,
          and improvements.
        </p>
        <p className={styles["main-text"]}>
          Before Coinbase, I spent 4.5 years at BlackRock, where I truly
          discovered and honed my love for Front-end web development. My journey
          at BlackRock began in 2020, right after I completed my Computer
          Science degree from the University of Arizona. During my first two
          years there, I was part of a rotational program, working with four
          different teams. This experience allowed me to tackle diverse
          challenges, work with unique teamwork styles, and sharpen my Front-end
          skills. Later, as a Senior member of the UX engineering team, I played
          a key role in building and supporting an internal Design System used
          by over 100 engineering teams. I was particularly responsible for
          complex Data Grids, Data Visualization components, and creating new
          standard components for AI Chats and internal AI Chatbot integration.
          Additionally, I built a library enabling Python Developers to use
          BlackRock&apos;s Design System to create web front-ends without
          needing web development knowledge.
        </p>
        <p className={styles["main-text"]}>
          My love for art and technology began at a young age. Growing up in
          Brazil, I spent much of my childhood drawing anime and cartoon
          characters and playing video games like Diablo, League of Legends, and
          Minecraft. This passion continued to grow as I moved to the United
          States for college. During my time at the University of Arizona, I
          worked as a teacher&apos;s assistant, conducted Virtual Reality
          research, and interned with BlackRock in New York.
        </p>
        <p className={styles["main-text"]}>
          Beyond my professional work, I founded Lua Labs, where I explored
          web3, blockchain, and NFT technologies. I&apos;ve been contracted by
          multiple teams to build web3 experiences and even launched our own NFT
          generative art project connected to the Ethereum blockchain. I also
          created Taskventure, a web app combining my interests in productivity,
          video games, and pixel art. This RPG productivity app makes to-do
          tracking fun and engaging.
        </p>
        <p className={styles["main-text"]}>
          Outside of work, I love developing my art skills, experimenting with
          different mediums like digital and generative art, acrylic paints, and
          pen sketches. I&apos;m always eager to learn new technologies and
          start side projects that blend my passions for art and tech.
        </p>
      </div>
    </section>
  );
}

export default AboutSection;
