import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedLogo from './AnimatedLogo';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const menuVariants = {
    closed: { opacity: 0, x: "-100%" },
    open: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col transition-all duration-500 dark:bg-gray-900 dark:text-white bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="py-4 sticky top-0 z-10 bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 backdrop-filter backdrop-blur-lg">
        <nav className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex-1">
            <AnimatedLogo />
          </Link>
          <div className="hidden md:flex space-x-6 flex-1 justify-center">
            {router.pathname !== '/' && (
              <Link href="/" className="hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300">
                Home
              </Link>
            )}
            <Link href="/about" className="hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300">
              About
            </Link>
            <Link href="/math-challenge" className="hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300">
              Math Challenge
            </Link>
          </div>
          <div className="flex items-center space-x-4 flex-1 justify-end">
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-xl"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? '🌞' : '🌙'}
            </motion.button>
            <button 
              className="md:hidden text-2xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
          </div>
        </nav>
      </header>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-20 md:hidden"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="p-4 space-y-4">
              <Link href="/" className="block hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300">
                Home
              </Link>
              <Link href="/about" className="block hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300">
                About
              </Link>
              <Link href="/math-challenge" className="block hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300">
                Math Challenge
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <main className="container mx-auto px-4 flex-grow mt-8">
        {children}
      </main>
      <footer className="bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 backdrop-filter backdrop-blur-lg py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 YezzFusl. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

