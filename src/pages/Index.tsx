
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import FAQ from '../components/Faq';
import DonateSection from '../components/DonateSection';
import ChatbotButton from '../components/ChatbotButton';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col"
    >
      <Navbar />
      <Hero />
      <Features />
      <FAQ />
      <DonateSection />
      <Footer />
      <ChatbotButton />
    </motion.div>
  );
};

export default Index;
