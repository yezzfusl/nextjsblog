import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function BlogPost({ frontmatter, content }) {
  return (
    <div className="mt-8">
      <h1 className="text-4xl font-bold mb-4">{frontmatter.title}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{frontmatter.date}</p>
      <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8');
  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
}
