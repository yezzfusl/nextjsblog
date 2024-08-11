// _app.js
import '../styles/globals.css';
import Layout from '../components/Layout';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <Head>
        <title>YezzFusl Blog</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <Component {...pageProps} />
          </AnimatePresence>
        )}
      </Layout>
    </>
  );
}

export default MyApp;
