import styles from './about-section.module.scss';

/* eslint-disable-next-line */
export interface AboutSectionProps {}

export function AboutSection(props: AboutSectionProps) {
  return (
    <div className={styles['container']}>
      <div className={`${styles['header']} px-24 w-full flex justify-center`}>
        <h1 className="text-5xl leading-tight relative pr-52">
          <img
            className={styles['arrow-vector']}
            src="../../../../assets/vectors/arrow-vector.png"
            alt="red arrow vector"
          />
          Who is Victor...
        </h1>
      </div>
      <div className={`${styles['main-text-wrapper']} gap-4 mt-6`}>
        {/* TODO: change text here to UPDATED */}
        <p className={styles['main-text']}>
          I'm originally from Brazil but live in Georgia, United States now.
          Always drawing and fascinated with technology since I was young. I've
          been split between art, problem-solving, creativity and engineering.
          This is why I found a new addiction called NFTs, it packages all that
          I love.
        </p>
        <p className={styles['main-text']}>
          I moved to the United States when I was 18. Went to University
          in Arizoza where I graduated with a Bachelor of Arts in Computer
          Science. During that time, around 2017 was also the first time I
          invested in Cryptocurrencies. Which has been quite the fun ride.
          Recently I bought some digital painting tools and have started taking
          digital art seriously by drawing every day.
        </p>
      </div>
    </div>
  );
}

export default AboutSection;
