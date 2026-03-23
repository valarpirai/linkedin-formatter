import React from 'react';

function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-white via-purple-50 to-white py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-700 font-semibold text-sm mb-6">
            <span className="mr-2">✨</span>
            Free Forever • No Sign Up Required
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Your LinkedIn Posts
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              With Professional Formatting
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Convert markdown to LinkedIn-friendly Unicode text. Add <strong className="text-purple-700">𝗯𝗼𝗹𝗱</strong>,
            {' '}<em className="text-purple-700">𝘪𝘵𝘢𝘭𝘪𝘤</em>, and <code className="text-purple-700">𝚖𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎</code> styling
            to make your content stand out and drive more engagement.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="#formatter"
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Formatting Free →
            </a>
            <a
              href="#how-it-works"
              className="px-8 py-4 bg-white hover:bg-gray-50 text-purple-600 font-bold rounded-lg transition-all border-2 border-purple-200 hover:border-purple-300"
            >
              See How It Works
            </a>
          </div>

          {/* Social Proof / Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto pt-8 border-t border-gray-200">
            <div>
              <div className="text-3xl font-bold text-purple-600">100%</div>
              <div className="text-sm text-gray-600">Free to Use</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">Instant</div>
              <div className="text-sm text-gray-600">Formatting</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">No Limits</div>
              <div className="text-sm text-gray-600">Use Anytime</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}

export default Hero;
