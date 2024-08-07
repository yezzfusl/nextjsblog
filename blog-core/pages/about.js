import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About | YezzFusl Blog</title>
        <meta name="description" content="About the author of YezzFusl Blog" />
      </Head>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <h1 className="text-4xl font-bold mb-8 text-center">About the Author</h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-64 h-64 relative rounded-full overflow-hidden shadow-lg"
          >
            <Image
              src="https://avatars.githubusercontent.com/u/18398621?s=400&u=bf3c3d6fe08236193f8441310fffc288d016bccb&v=4"
              alt="yezzfusl"
              layout="fill"
              objectFit="cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl backdrop-filter backdrop-blur-lg bg-white dark:bg-gray-800 bg-opacity-30 dark:bg-opacity-30 p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">yezzfusl</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Passionate EE Software Developer and Hobby OS Programmer
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Hello! I'm yezzfusl, a software developer with a background in EE. 
              My passion lies in creating efficient and innovative software solutions, with a particular 
              interest in operating system development as a hobby.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              This blog is a platform where I share my experiences, insights, and projects related to 
              software development, electrical engineering, and my journey in OS programming. Join me 
              as we explore the fascinating world of technology together!
            </p>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default AboutPage;
