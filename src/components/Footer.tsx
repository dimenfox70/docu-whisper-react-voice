
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 py-6 border-t bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} AnyDocSummarize. All rights reserved.
            </p>
          </div>
          
          <nav className="flex space-x-6">
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              FAQ
            </Link>
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Examples
            </Link>
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Pricing
            </Link>
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Contact
            </Link>
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Feedback
            </Link>
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Privacy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
