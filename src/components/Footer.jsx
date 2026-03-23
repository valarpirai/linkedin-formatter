import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              LinkedIn Formatter
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Free tool to format your LinkedIn posts with bold, italic, and monospace Unicode text.
              Make your content stand out and drive more engagement.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#formatter" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Text Formatter
                </a>
              </li>
              <li>
                <a href="#features" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-400 hover:text-purple-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 hover:text-purple-400 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Information</h3>
            <ul className="space-y-2 text-gray-400">
              <li>✓ 100% Free Forever</li>
              <li>✓ No Sign Up Required</li>
              <li>✓ Privacy First - No Data Stored</li>
              <li>✓ Works on All Devices</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>
            © {currentYear} LinkedIn Text Formatter. Built with React & Tailwind CSS.
          </p>
          <p className="mt-2 text-sm">
            This tool is not affiliated with or endorsed by LinkedIn Corporation.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
