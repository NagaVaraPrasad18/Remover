
import { useState } from 'react';
import { Shield, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { handleMode } from '../utils/action';

const Hero = () => {
  const [url, setUrl] = useState('');
  const [mode, setMode] = useState('remove_paywall_1');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setIsProcessing(true);
    
    // Store the URL and mode in sessionStorage for ResultPage
    //sessionStorage.setItem('sessionUrl', url);
    //sessionStorage.setItem('selectedMode', mode);
	
	//await handleMode(mode, url);
	setIsProcessing(false);
	window.location.href = `/result?url=${encodeURIComponent(url)}&mode=${mode}`;
    
    // Simulate processing
    /*setTimeout(() => {
      setIsProcessing(false);
      window.location.href = `/result?url=${encodeURIComponent(url)}&mode=${mode}`;
    }, 1500);*/
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full filter blur-3xl opacity-70 dark:opacity-30 animate-pulse-soft"></div>
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full filter blur-3xl opacity-70 dark:opacity-30 animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="container max-w-4xl mx-auto">
        {/* Chip */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium"
        >
          <span className="mr-2 w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          Access premium content without limits
        </motion.div>
        
        {/* Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-center leading-tight"
        >
          Read Premium Articles
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Without Paywalls</span>
        </motion.h1>
        
        {/* Subheading */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 dark:text-gray-300 mb-8 text-center max-w-3xl mx-auto"
        >
          Access your favorite news websites and articles without hitting subscription barriers or paywalls
        </motion.p>
        
        {/* URL Form */}
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="w-full max-w-3xl mx-auto glass-card rounded-2xl p-6 shadow-lg mb-8"
        >
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <input
                type="url"
                placeholder="Enter article URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="premium-input flex-grow"
                aria-label="Article URL"
              />
              
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="premium-input sm:w-1/3"
                aria-label="Paywall removal mode"
              >
                <option value="remove_paywall_1">Mode 1</option>
                <option value="remove_paywall_2">Mode 2</option>
                <option value="remove_paywall_3">Mode 3</option>
                <option value="remove_paywall_4">Mode 4</option>
                <option value="remove_paywall_5">Mode 5</option>
              </select>
            </div>
            
            <button
              type="submit"
              disabled={isProcessing || !url}
              className="premium-button flex items-center justify-center space-x-2 h-12 group"
            >
              {isProcessing ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
              ) : (
                <>
                  <Shield className="h-5 w-5" />
                  <span>Remove Paywall</span>
                  <ArrowRight className="h-4 w-4 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                </>
              )}
            </button>
          </div>
        </motion.form>
        
        {/* Supported sites */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Works with major news sites including</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['The New York Times', 'The Washington Post', 'The Wall Street Journal', 'Bloomberg', 'The Economist'].map((site) => (
              <span 
                key={site} 
                className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              >
                {site}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
