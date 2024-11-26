import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <motion.div
      className="relative w-16 h-16"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute w-full h-full border-4 border-blue-500/20 rounded-full" />
      <div className="absolute w-full h-full border-4 border-transparent border-t-blue-500 rounded-full" />
      <motion.div
        className="absolute inset-0"
        animate={{ scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-4 h-4 bg-blue-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </motion.div>
    </motion.div>
  );
};

export default LoadingSpinner;
