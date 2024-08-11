// pages/about.js
import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';

const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <>
      <Head>
        <title>About | YezzFusl Blog</title>
        <meta name="description" content="About the author of YezzFusl Blog" />
      </Head>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-8"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text"
        >
          About the Author
        </motion.h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            className="w-64 h-64 relative rounded-full overflow-hidden shadow-2xl"
          >
            <Image
              src="https://avatars.githubusercontent.com/u/18398621?s=400&u=29f05cb776cb70b7e9b4bdfda4c4bc61a7421428&v=4"
              alt="yezzfusl"
              layout="fill"
              objectFit="cover"
            />
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="max-w-xl space-y-6"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl font-semibold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text"
            >
              yezzfusl
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-700 dark:text-gray-300"
            >
              Passionate EE Software Developer and Hobby OS Programmer
            </motion.p>
            <motion.p 
              variants={itemVariants}
              className="text-gray-600 dark:text-gray-400"
            >
              Hello! I'm yezzfusl, a software developer with a background in EE.
              My passion lies in creating efficient and innovative software solutions, with a particular
              interest in operating system development as a hobby.
            </motion.p>
            <motion.p 
              variants={itemVariants}
              className="text-gray-600 dark:text-gray-400"
            >
              This blog is a platform where I share my experiences, insights, and projects related to
              software development, electrical engineering, and my journey in OS programming. Join me
              as we explore the fascinating world of technology together!
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default AboutPage;
