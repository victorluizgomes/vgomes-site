import type { AppProps } from "next/app";
import "../styles/global.css"; // Importing global CSS
import NavBar from "../components/navBar";
import Footer from "../components/footer";
import Head from "next/head";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      {/* Google tag (gtag.js) */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-MG32JXNQ3P" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-MG32JXNQ3P');
        `}
      </Script>

      <div>
        <NavBar />
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}

export default MyApp;
