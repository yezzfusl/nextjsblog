// pages/math-challenge.js
import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import MathJax from 'react-mathjax';

const challenges = [
  {
    question: "Solve the following integral: \\int_{0}^{\\pi} \\sin^2(x) dx",
    answer: "π/2",
    hint: "Consider using the double angle formula for sin²(x)."
  },
  {
    question: "Find the limit: \\lim_{x \\to 0} \\frac{\\sin(x)}{x}",
    answer: "1",
    hint: "This is a famous limit. Consider using L'Hôpital's rule or the Taylor series expansion of sin(x)."
  },
  {
    question: "Solve the differential equation: \\frac{dy}{dx} + 2y = e^x",
    answer: "y = 1/3 * e^x + Ce^(-2x)",
    hint: "This is a first-order linear differential equation. Try using an integrating factor."
  }
];

export default function MathChallenge() {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [unlockedPost, setUnlockedPost] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userAnswer.toLowerCase().replace(/\s/g, '') === challenges[currentChallenge].answer.toLowerCase().replace(/\s/g, '')) {
      if (currentChallenge === challenges.length - 1) {
        setFeedback('Congratulations! You\'ve solved all challenges!');
        setUnlockedPost(true);
      } else {
        setFeedback('Correct! Moving to the next challenge.');
        setCurrentChallenge(currentChallenge + 1);
        setUserAnswer('');
        setShowHint(false);
      }
    } else {
      setFeedback('Incorrect. Try again!');
    }
  };

  return (
    <MathJax.Provider>
      <div className="max-w-2xl mx-auto">
        <Head>
          <title>Math Challenge | YezzFusl Blog</title>
          <meta name="description" content="Solve advanced math problems to unlock hidden content" />
        </Head>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8 text-center">Math Challenge</h1>
          {!unlockedPost ? (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <MathJax.Node formula={challenges[currentChallenge].question} />
              <form onSubmit={handleSubmit} className="mt-4">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Enter your answer"
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700"
                />
                <div className="flex justify-between mt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowHint(!showHint)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                  >
                    {showHint ? 'Hide Hint' : 'Show Hint'}
                  </button>
                </div>
              </form>
              {showHint && (
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  Hint: {challenges[currentChallenge].hint}
                </p>
              )}
              {feedback && (
                <p className="mt-4 text-center font-bold">
                  {feedback}
                </p>
              )}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Congratulations! You've unlocked the hidden content.</h2>
              <p>Here's your reward: [Fuck you, what reward are you even talking about? Go hit the books and learn some math instead of wasting your time with these basic-ass questions.]</p>
            </div>
          )}
        </motion.div>
      </div>
    </MathJax.Provider>
  );
}
