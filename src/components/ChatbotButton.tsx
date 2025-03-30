
import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

const initialMessages = [
  {
    id: 1,
    text: "Hi there! I'm your PaywallFree assistant. How can I help you today?",
    isUser: false,
    timestamp: new Date(),
  },
];

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessageId = Date.now();
    const userMessage = {
      id: userMessageId,
      text: newMessage,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage('');
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      let botResponse = '';
      
      // Simple response logic
      const lowerMessage = newMessage.toLowerCase();
      if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        botResponse = "Hello! How can I assist you with PaywallFree today?";
      } else if (lowerMessage.includes('paywall') && lowerMessage.includes('work')) {
        botResponse = "PaywallFree works by using advanced techniques to bypass subscription barriers. Just paste the article URL and select a bypass mode to access the content.";
      } else if (lowerMessage.includes('bypass') || lowerMessage.includes('remove')) {
        botResponse = "To bypass a paywall, paste the article URL in the input field, select a bypass mode, and click 'Remove Paywall'. Try different modes if one doesn't work.";
      } else if (lowerMessage.includes('support') || lowerMessage.includes('site')) {
        botResponse = "We support most major news websites including The New York Times, The Washington Post, The Wall Street Journal, Bloomberg, and many more.";
      } else if (lowerMessage.includes('donate') || lowerMessage.includes('support')) {
        botResponse = "You can support us by visiting the donation page. Your contribution helps us maintain and improve PaywallFree.";
      } else {
        botResponse = "I'm here to help with PaywallFree. You can ask me about how it works, supported sites, or how to bypass paywalls.";
      }
      
      const botMessage = {
        id: Date.now(),
        text: botResponse,
        isUser: false,
        timestamp: new Date(),
      };
      
      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300"
        aria-label="Open chat assistant"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] h-[500px] z-50 rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-accent p-4 flex justify-between items-center text-white">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">PaywallFree Assistant</h3>
                  <p className="text-xs opacity-80">Always here to help</p>
                </div>
              </div>
              <button
                onClick={toggleChatbot}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.isUser
                          ? 'bg-primary text-white rounded-tr-none'
                          : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-tl-none'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1 text-right">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-tl-none">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-pulse"></div>
                        <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 p-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50 dark:bg-gray-800"
                />
                <button
                  type="submit"
                  className="p-2 rounded-lg bg-primary text-white disabled:opacity-50"
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotButton;
