import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="A beautiful blog built with Next.js and TailwindCSS" />
          <meta property="og:title" content="Yezzfusl Blog" />
          <meta property="og:description" content="A beautiful blog built with Next.js and TailwindCSS" />
          <meta property="og:image" content="https://yezzfusl.vercel.app/og-image.jpg" />
          <meta property="og:url" content="https://yezzfusl.vercel.app/" />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
