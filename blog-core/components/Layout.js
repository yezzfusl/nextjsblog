import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 dark:bg-gray-900 dark:text-white bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="backdrop-filter backdrop-blur-lg bg-opacity-30 dark:bg-opacity-30 bg-white dark:bg-gray-800 py-4 sticky top-0 z-10">
        <nav className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            YezzFusl Blog
          </Link>
          <div className="space-x-4">
            <Link href="/about" className="hover:text-gray-600 dark:hover:text-gray-300">
              About
            </Link>
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-md bg-gray-200 dark:bg-gray-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? '🌞' : '🌙'}
            </motion.button>
          </div>
        </nav>
      </header>
      <main className="container mx-auto px-4 flex-grow mt-8">
        {children}
      </main>
      <footer className="backdrop-filter backdrop-blur-lg bg-opacity-30 dark:bg-opacity-30 bg-white dark:bg-gray-800 py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 YezzFusl. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
