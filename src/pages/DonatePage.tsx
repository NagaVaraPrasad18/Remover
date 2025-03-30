import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Wallet, Heart, Copy } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DonatePage = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 3000);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col"
    >
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex mb-6"
            >
              <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-full">
                <Heart className="h-8 w-8 text-primary" />
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-bold mb-4"
            >
              Support PaywallFree
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6"
            >
              Your support helps us maintain and improve PaywallFree, ensuring everyone has access to quality information.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Card Payment Section */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg mr-3">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">Card Payment</h2>
              </div>
              
              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2">Amount (USD)</label>
                  <select className="premium-input">
                    <option value="5">$5</option>
                    <option value="10">$10</option>
                    <option value="20">$20</option>
                    <option value="50">$50</option>
                    <option value="100">$100</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Card Information</label>
                  <div className="premium-input h-12 flex items-center justify-center text-gray-400">
                    Secure payment form (simulated)
                  </div>
                </div>
                
                <button
                  type="button"
                  className="premium-button w-full"
                >
                  Pay Securely
                </button>
              </form>
            </motion.div>
            
            {/* Other Payment Methods */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg mr-3">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">Other Payment Methods</h2>
              </div>
              
              <div className="space-y-4">
                <a 
                  href="https://www.buymeacoffee.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-[#FFDD00]/10 rounded-lg mr-3">
                      <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy Me A Coffee" className="h-6 w-6" />
                    </div>
                    <span className="font-medium">Buy Me a Coffee</span>
                  </div>
                </a>
                
                {/* UPI Section */}
                <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-500/10 rounded-lg mr-3">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-6 w-6" />
                    </div>
                    <span className="font-medium">UPI Payment</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      UPI ID: donate@paywallfree
                    </div>
                    <button 
                      onClick={() => copyToClipboard('donate@paywallfree', 'upi')}
                      className="p-2 text-primary hover:text-primary/80 transition-colors"
                    >
                      <Copy className="h-5 w-5" />
                    </button>
                  </div>
                  
                  {copied === 'upi' && (
                    <div className="text-xs text-primary mb-3">
                      Copied to clipboard!
                    </div>
                  )}
                  
                  <div className="flex justify-center">
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=donate@paywallfree" 
                      alt="UPI QR Code" 
                      className="w-32 h-32 bg-white p-2 rounded-lg" 
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Cryptocurrency Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass-card rounded-2xl p-6 shadow-lg mb-12"
          >
            <div className="flex items-center mb-6">
              <div className="p-2 bg-[#F7931A]/10 rounded-lg mr-3">
                <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg" alt="Cryptocurrency" className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-semibold">Cryptocurrency</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {/* Bitcoin */}
              <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="p-1 mr-2">
                    <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg" alt="Bitcoin" className="h-5 w-5" />
                  </div>
                  <span className="font-medium">Bitcoin</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600 dark:text-gray-400 break-all">
                    3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5
                  </div>
                  <button 
                    onClick={() => copyToClipboard('3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5', 'btc')}
                    className="p-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                </div>
                {copied === 'btc' && (
                  <div className="text-xs text-primary mt-2">
                    Copied to clipboard!
                  </div>
                )}
              </div>
              
              {/* Ethereum */}
              <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="p-1 mr-2">
                    <img src="https://cryptologos.cc/logos/ethereum-eth-logo.svg" alt="Ethereum" className="h-5 w-5" />
                  </div>
                  <span className="font-medium">Ethereum</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600 dark:text-gray-400 break-all">
                    0x742d35Cc6634C0532925a3b844Bc454e4438f44e
                  </div>
                  <button 
                    onClick={() => copyToClipboard('0x742d35Cc6634C0532925a3b844Bc454e4438f44e', 'eth')}
                    className="p-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                </div>
                {copied === 'eth' && (
                  <div className="text-xs text-primary mt-2">
                    Copied to clipboard!
                  </div>
                )}
              </div>
            </div>
          </motion.div>
          
          {/* Why Support Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="p-8 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5"
          >
            <h2 className="text-2xl font-semibold text-center mb-8">Why Support Us?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  icon: "📖", 
                  title: "Keep Information Free", 
                  desc: "Help us maintain free access to quality content" 
                },
                { 
                  icon: "🚀", 
                  title: "Improve Features", 
                  desc: "Support development of new capabilities" 
                },
                { 
                  icon: "🛡️", 
                  title: "Ensure Reliability", 
                  desc: "Help maintain stable and secure service" 
                }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default DonatePage;
