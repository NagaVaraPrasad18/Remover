
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Share2, Heart, Newspaper } from 'lucide-react';

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Check system preference for dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    setIsDark(initialTheme === 'dark');
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newDarkState = !isDark;
    setIsDark(newDarkState);
    document.documentElement.classList.toggle('dark', newDarkState);
    localStorage.setItem('theme', newDarkState ? 'dark' : 'light');
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'PaywallFree - Read Articles Without Paywalls',
          text: 'I found something interesting for you.',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <>
      {/* Toast notification */}
      <div 
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300 ${
          showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}
      >
        Link copied to clipboard!
      </div>
      
      <nav className="fixed w-full backdrop-blur-md bg-white/80 dark:bg-gray-900/80 z-40 border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-primary/10 rounded-full transition-all duration-300 group-hover:bg-primary/20">
                <Newspaper className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-medium tracking-tight">PaywallFree</span>
            </Link>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={toggleTheme}
                className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
              
              <button 
                onClick={handleShare}
                className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Share"
              >
                <Share2 className="h-5 w-5" />
              </button>
              
              <Link
                to="/donate"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-primary/80 text-white hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
              >
                <Heart className="h-4 w-4" />
                <span>Donate</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
