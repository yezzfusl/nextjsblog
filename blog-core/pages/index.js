import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { motion } from 'framer-motion';

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

export default function Home({ posts }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
    >
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to YEZZFUSL Blog</h1>
      <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" variants={container}>
        {posts.map((post) => (
          <motion.div key={post.slug} variants={item}>
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="backdrop-filter backdrop-blur-lg bg-white dark:bg-gray-800 bg-opacity-30 dark:bg-opacity-30 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 dark:text-gray-400">{post.excerpt}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
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
    };
  });

  return {
    props: {
      posts,
    },
  };
}
