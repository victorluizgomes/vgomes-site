import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>

          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#080A0F" />
          <meta name="theme-color" content="#080A0F" />

          <meta name="robots" content="index, follow" key="robots" />
          <meta name="author" content="Victor Gomes" />

          {/* Open Graph defaults — overridden per-page via next/head key prop */}
          <meta property="og:type" content="website" key="og:type" />
          <meta
            property="og:site_name"
            content="Victor Gomes"
            key="og:site_name"
          />
          <meta
            property="og:image"
            content="https://www.vgomes.co/og-image.jpg"
            key="og:image"
          />
          <meta property="og:image:width" content="1200" key="og:image:width" />
          <meta property="og:image:height" content="630" key="og:image:height" />
          <meta property="og:image:alt" content="Victor Gomes — Front-end Software Engineer" key="og:image:alt" />
          <meta
            property="og:title"
            content="Victor Gomes — Front-end Software Engineer"
            key="og:title"
          />
          <meta
            property="og:description"
            content="Senior Front-end Software Engineer at Coinbase. Building exceptional web &amp; mobile experiences. Based in Atlanta."
            key="og:description"
          />
          <meta property="og:url" content="https://www.vgomes.co" key="og:url" />

          {/* Twitter Card defaults */}
          <meta
            property="twitter:card"
            content="summary_large_image"
            key="twitter:card"
          />
          <meta
            property="twitter:site"
            content="@vgomes_tech"
            key="twitter:site"
          />
          <meta
            property="twitter:url"
            content="https://www.vgomes.co"
            key="twitter:url"
          />
          <meta
            property="twitter:title"
            content="Victor Gomes — Front-end Software Engineer"
            key="twitter:title"
          />
          <meta
            property="twitter:description"
            content="Senior Front-end Software Engineer at Coinbase. Building exceptional web &amp; mobile experiences. Based in Atlanta."
            key="twitter:description"
          />
          <meta
            property="twitter:image"
            content="https://www.vgomes.co/og-image.jpg"
            key="twitter:image"
          />

          {/* Font preconnects */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link rel="preconnect" href="https://api.fontshare.com" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
