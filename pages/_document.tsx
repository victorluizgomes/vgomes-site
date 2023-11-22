import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
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
          <meta name="msapplication-TileColor" content="#ffc40d" />
          <meta name="theme-color" content="#ffffff" />

          <meta property="og:type" content="website" key="type" />
          <meta
            property="og:image"
            content="https://www.vgomes.co/og-image.jpg"
            key="image"
          />
          <meta property="og:image:width" content="279" />
          <meta property="og:image:height" content="279" />
          <meta
            property="og:title"
            content="Victor Gomes Personal Site"
            key="title"
          />
          <meta
            property="og:description"
            content="You will find all my links, art, a blog and some info about me."
            key="description"
          />
          <meta property="og:url" content="https://www.vgomes.co" key="type" />

          <meta
            property="twitter:card"
            content="summary_large_image"
            key="twitter:card"
          />
          <meta
            property="twitter:url"
            content="https://www.vgomes.co"
            key="twitter:url"
          />
          <meta
            property="twitter:title"
            content="Victor Gomes Personal Site"
            key="twitter:title"
          />
          <meta
            property="twitter:description"
            content="You will find all my links, art, a blog and some info about me."
            key="twitter:description"
          />
          <meta
            property="twitter:image"
            content="https://www.vgomes.co/og-image.jpg"
            key="twitter:image"
          />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,700;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            rel="stylesheet"
          />
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
