// components/Card.js
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

const Card = ({ children }) => {
  const { theme } = useTheme();

  return (
    <motion.div
      className={`p-6 rounded-xl ${
        theme === 'dark' 
          ? 'bg-gray-800 bg-opacity-30' 
          : 'bg-white bg-opacity-30'
      } backdrop-filter backdrop-blur-lg shadow-lg transition-all duration-300`}
      whileHover={{
        scale: 1.03,
        boxShadow: theme === 'dark' 
          ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
    >
      {children}
    </motion.div>
  );
};

export default Card;
