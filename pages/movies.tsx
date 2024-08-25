import Head from "next/head";
import { useEffect } from "react";
import styles from '../styles/Movies.module.css';

const MoviesPage = () => {
  useEffect(() => {
    // Create a function to fetch and embed the Letterboxd content
    const fetchLetterboxdContent = async () => {
      try {
        const response = await fetch(
          "https://lb-embed-content.bokonon.dev?username=vgomes"
        );
        const data = await response.text();
        console.log("data", data);
        document.getElementById("letterboxd-embed-wrapper-tc")!.innerHTML =
          data;
      } catch (error) {
        console.error("Error fetching Letterboxd content:", error);
      }
    };

    // Call the function to fetch the content
    fetchLetterboxdContent();
  }, []); // Empty dependency array to run effect once on component mount

  return (
    <main className={`py-4 sm:py-8 ${styles["container"]}`}>
      <Head>
        <title>Victor Gomes | Movies</title>
        <meta
          name="description"
          content="My latest movie reviews from Letterboxd a movie diary social app"
        />
      </Head>
      <div className="flex flex-col items-center justify-center">
        <div className="max-w-3xl px-4">
            <h1 className="text-3xl sm:text-4xl text-center leading-tight">Latest movies I have watched</h1>
            <p className="text-sm sm:text-base text-neutral-700 mt-3 sm:mt-6 px-2 text-center pb-10">
                I&apos;ve always loved movies, so I&apos;ve been using the app Letterboxd to review all the movies I watch. You can see the latest movies I reviewed in Letterboxd bellow.
            </p>
            <div id="letterboxd-embed-wrapper-tc">Loading...</div>
        </div>
      </div>
    </main>
  );
};

export default MoviesPage;
