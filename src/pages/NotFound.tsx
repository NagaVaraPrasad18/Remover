
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4"
    >
      <div className="max-w-md w-full p-8 rounded-2xl glass-card text-center">
        <div className="relative mb-6 inline-block">
          <div className="absolute inset-0 rounded-full bg-red-500/20 animate-pulse"></div>
          <div className="relative z-10 text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-500">
            404
          </div>
        </div>
        
        <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default NotFound;
