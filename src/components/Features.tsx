
import { motion } from 'framer-motion';
import { Newspaper, Layers, Zap } from 'lucide-react';

const features = [
  {
    icon: Newspaper,
    title: "Free Article Access",
    description: "Read unlimited premium articles without hitting paywalls or subscription requirements"
  },
  {
    icon: Layers,
    title: "Multiple Bypass Methods",
    description: "Choose from 5 different bypass techniques for maximum compatibility with different news sites"
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get immediate access to your desired content with our fast and reliable paywall removal tool"
  }
];

const Features = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-4"
          >
            Premium Features
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-20 h-1 bg-primary mx-auto mb-6"
          ></motion.div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="glass-card rounded-2xl p-8 hover-lift h-full">
                <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-2xl inline-block mb-6">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
