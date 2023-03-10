import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" data-theme="light">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geo&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-th-background">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
