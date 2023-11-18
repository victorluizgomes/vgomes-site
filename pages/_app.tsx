import type { AppProps } from "next/app";
import "../styles/global.css"; // Importing global CSS
import NavBar from '../components/navBar';
import Footer from "../components/footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar/>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
