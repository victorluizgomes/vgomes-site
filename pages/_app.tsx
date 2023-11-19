import type { AppProps } from "next/app";
import "../styles/global.css"; // Importing global CSS
import NavBar from '../components/navBar';
import Footer from "../components/footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div>
        <NavBar/>
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}

export default MyApp;
