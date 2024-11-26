import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-0 left-0 right-0 backdrop-blur-md bg-gray-900/50 border-t border-gray-800"
    >
      <div className="container mx-auto px-4 py-4">
        <p className="text-center text-gray-400 flex items-center justify-center gap-2">
          Made with 
          <motion.span
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-red-500"
          >
            <FaHeart />
          </motion.span>
          by <span className="text-blue-400 font-medium hover:text-blue-300 transition-colors">Yashodhan</span>
          <span className="mx-2"></span>
          <a 
            href="https://pokeapi.co" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
          
          </a>
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
