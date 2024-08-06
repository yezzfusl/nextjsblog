import { useEffect, useState } from 'react';

export default function Repos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/yezzfusl/repos')
      .then((response) => response.json())
      .then((data) => {
        setRepos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching repos:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">GitHub Repositories</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo) => (
          
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="backdrop-filter backdrop-blur-lg bg-white dark:bg-gray-800 bg-opacity-30 dark:bg-opacity-30 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-2">{repo.name}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{repo.description}</p>
              <div className="flex items-center space-x-4">
                <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                  {repo.language}
                </span>
                <span className="text-sm">⭐ {repo.stargazers_count}</span>
                <span className="text-sm">🍴 {repo.forks_count}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
