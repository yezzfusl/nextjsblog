// components/AnimatedLogo.js
import { motion } from 'framer-motion';

const AnimatedLogo = () => {
  const letterVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <motion.div 
      className="flex justify-center items-center space-x-1"
      initial="initial"
      animate="animate"
    >
      {['Y', 'e', 'z', 'z', 'F', 'u', 's', 'l'].map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedLogo;
