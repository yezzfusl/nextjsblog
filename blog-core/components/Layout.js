import { useState, useEffect } from 'react';
import Link from 'next/link';

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
    <div className="min-h-screen flex flex-col transition-colors duration-300 dark:bg-gray-900 dark:text-white">
      <header className="bg-gray-100 dark:bg-gray-800 py-4">
        <nav className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            My Blog
          </Link>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-700"
          >
            {darkMode ? '🌞' : '🌙'}
          </button>
        </nav>
      </header>
      <main className="container mx-auto px-4 flex-grow">
        {children}
      </main>
      <footer className="bg-gray-100 dark:bg-gray-800 py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 My Blog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
