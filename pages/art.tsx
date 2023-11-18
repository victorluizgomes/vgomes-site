import Head from "next/head";
import ArtInfo from '../components/art/artInfo';
import ArtGallery from "../components/art/artGallery";

export interface ArtProps {}

export default function Art(props: ArtProps) {
  return (
    <main>
      <Head>
        <title>Victor Gomes | Art Portfolio</title>
        <meta
          name="description"
          content="Discover a diverse range of Victor Gomes' art, from painting and drawing to digital and generative creations. Experience a unique fusion of creativity and imagination."
        />
      </Head>
      <ArtInfo />
      <ArtGallery/>
    </main>
  );
}