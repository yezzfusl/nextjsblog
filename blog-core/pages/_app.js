import '../styles/globals.css';
import Layout from '../components/Layout';
import { AnimatePresence } from 'framer-motion';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Component {...pageProps} />
      </AnimatePresence>
    </Layout>
  );
}

export default MyApp;
