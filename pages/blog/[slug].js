import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';

export default function BlogPost({ frontmatter, content, slug }) {
  return (
    <>
      <Head>
        <title>{frontmatter.title} | YezzFusl Blog</title>
        <meta name="description" content={frontmatter.excerpt} />
        <meta property="og:title" content={`${frontmatter.title} | My Beautiful Blog`} />
        <meta property="og:description" content={frontmatter.excerpt} />
        <meta property="og:url" content={`https://yezzfusl.vercel.app/blog/${slug}`} />
      </Head>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold mb-4">{frontmatter.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-2">{frontmatter.date}</p>
        <div className="flex items-center mb-4">
          <Image
            src={`https://github.com/${frontmatter.githubUsername}.png`}
            alt={`${frontmatter.author || 'Anonymous'}'s profile picture`}
            width={40}
            height={40}
            className="rounded-full mr-2"
          />
          <p className="text-gray-600 dark:text-gray-400">By {frontmatter.author || 'Anonymous'}</p>
        </div>
        <motion.div className="prose dark:prose-dark max-w-none backdrop-filter backdrop-blur-lg bg-white dark:bg-gray-800 bg-opacity-30 dark:bg-opacity-30 p-6 rounded-xl shadow-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
        </motion.div>
      </motion.div>
    </>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));
  const paths = files.map((filename) => ({
    params: { slug: filename.replace('.md', '') },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8');
  const { data: frontmatter, content } = matter(markdownWithMeta);
  return {
    props: {
      frontmatter: {
        ...frontmatter,
        githubUsername: frontmatter.githubUsername || 'yezzfusl',
      },
      slug,
      content,
    },
  };
}
