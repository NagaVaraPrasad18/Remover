
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "How does PaywallFree work?",
    answer: "PaywallFree uses advanced bypass techniques to access content behind paywalls, allowing you to read premium articles freely. Each mode employs a different method, ensuring maximum compatibility across various news websites."
  },
  {
    question: "What are the different bypass modes?",
    answer: "We offer 5 different modes, each optimized for specific types of paywalls. If one mode doesn't work, you can try another as effectiveness varies by website. Our multiple-mode approach ensures the highest success rate for accessing premium content."
  },
  {
    question: "Which news websites are supported?",
    answer: "PaywallFree works with most major news and content websites including The New York Times, The Washington Post, The Wall Street Journal, Bloomberg, The Economist, and many other premium publishers. Our tool is regularly updated to maintain compatibility."
  },
  {
    question: "Is PaywallFree free to use?",
    answer: "Yes, PaywallFree is completely free to use. We believe in making information accessible to everyone. There are no hidden fees or subscription requirements to use our paywall removal tool."
  },
  {
    question: "Why isn't it working for some articles?",
    answer: "News websites frequently update their paywall systems. If one mode doesn't work, try another mode as different techniques work better for different sites. We continuously update our methods to maintain effectiveness and bypass new paywall systems."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-20 h-1 bg-primary mx-auto mb-6"
          ></motion.div>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center p-5 text-left font-medium"
              >
                <span>{faq.question}</span>
                <span className="flex-shrink-0 ml-2">
                  {openIndex === index ? (
                    <Minus className="h-5 w-5 text-primary" />
                  ) : (
                    <Plus className="h-5 w-5" />
                  )}
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="p-5 pt-0 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
