import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { motion } from 'framer-motion';
import Head from 'next/head';
import SearchBar from '../components/SearchBar';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Search({ posts }) {
  const router = useRouter();
  const { q } = router.query;
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (q) {
      const results = posts.filter(
        post =>
          post.title.toLowerCase().includes(q.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(q.toLowerCase()) ||
          post.author.toLowerCase().includes(q.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [q, posts]);

  return (
    <>
      <Head>
        <title>Search Results | YezzFusl Blog</title>
        <meta name="description" content={`Search results for ${q}`} />
      </Head>
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
      >
        <h1 className="text-4xl font-bold mb-8 text-center">Search Results</h1>
        <SearchBar />
        <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" variants={container}>
          {searchResults.map((post) => (
            <motion.div key={post.slug} variants={item}>
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="backdrop-filter backdrop-blur-lg bg-white dark:bg-gray-800 bg-opacity-30 dark:bg-opacity-30 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">{post.excerpt}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">By {post.author}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        {searchResults.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-400">No results found for "{q}"</p>
        )}
      </motion.div>
    </>
  );
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug: filename.replace('.md', ''),
      title: data.title,
      excerpt: data.excerpt,
      author: data.author || 'Anonymous',
    };
  });

  return {
    props: {
      posts,
    },
  };
}
