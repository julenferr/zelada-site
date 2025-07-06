import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/tjg7yas.css" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300..700;1,300..700&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://db.onlinewebfonts.com/c/4c4c08af466e9ad071b6d69cf44093df?family=SaolDisplay-Regular"
          rel="stylesheet"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
