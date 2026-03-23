import React from 'react';

function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              LinkedIn Formatter
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
              How it Works
            </a>
            <a href="#faq" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
              FAQ
            </a>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <a
              href="#formatter"
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
            >
              Try Free
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200 px-4 py-3">
        <div className="flex justify-around">
          <a href="#features" className="text-sm text-gray-600 hover:text-purple-600">
            Features
          </a>
          <a href="#how-it-works" className="text-sm text-gray-600 hover:text-purple-600">
            How it Works
          </a>
          <a href="#faq" className="text-sm text-gray-600 hover:text-purple-600">
            FAQ
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
