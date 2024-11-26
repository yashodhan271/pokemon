import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

const Header = () => {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gray-900/50 border-b border-gray-800"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div 
          className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
        >
          PokéSearch
        </motion.div>
        <motion.a
          href="https://github.com/yourusername/pokemon-search"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="text-gray-400 hover:text-white"
        >
          <FaGithub size={24} />
        </motion.a>
      </div>
    </motion.header>
  );
};

export default Header;
