import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const inputRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check if the key pressed is '/' and the active element isn't the input field
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current.focus(); // Focus on the input field
      }
    };

    // Attach the event listener to the window
    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto mb-8">
      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search posts... (Press '/' to focus)"
        className="w-full p-3 pr-10 rounded-full border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:focus:border-blue-500"
      />
      {searchTerm && (
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-300 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      )}
    </form>
  );
}

