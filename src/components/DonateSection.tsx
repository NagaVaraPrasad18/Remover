
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const DonateSection = () => {
  return (
    <section id="donate" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-accent/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto max-w-4xl">
        <div className="glass-card rounded-3xl p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
          
          <div className="text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex mb-6"
            >
              <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-full">
                <Heart className="h-6 w-6 text-primary animate-pulse" />
              </div>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl font-bold mb-4"
            >
              Support Our Mission
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Help us keep PaywallFree accessible to everyone. Your support ensures we can continue providing free access to quality information.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center space-y-4"
            >
              <Link 
                to="/donate" 
                className="premium-button group px-8 py-3 text-lg font-medium"
              >
                <Heart className="h-5 w-5 mr-2" />
                <span>Support Our Work</span>
              </Link>
              
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Every contribution makes a difference in keeping information accessible.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonateSection;
