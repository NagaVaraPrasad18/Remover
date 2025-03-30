
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            Made with <Heart className="h-3 w-3 mx-1 text-red-500" /> for educational purposes only
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {currentYear} PaywallFree
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
