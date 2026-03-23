import React from 'react';

const features = [
  {
    icon: '✨',
    title: 'Unicode Text Styling',
    description: 'Transform text with bold, italic, monospace, and decorative Unicode variants that work natively on LinkedIn.'
  },
  {
    icon: '⚡',
    title: 'Smart Commands',
    description: 'Use slash commands or markdown syntax for quick formatting. Type naturally and let the formatter do the work.'
  },
  {
    icon: '📝',
    title: 'Markdown Conversion',
    description: 'Write in familiar markdown syntax and instantly convert to LinkedIn-compatible formatted text.'
  },
  {
    icon: '📋',
    title: 'One-Click Copy',
    description: 'Copy formatted text directly to clipboard and paste it into LinkedIn. No manual formatting needed.'
  },
  {
    icon: '💾',
    title: 'Export Options',
    description: 'Save your formatted posts as text or markdown files for later use or backup.'
  },
  {
    icon: '👀',
    title: 'Real-time Preview',
    description: 'See exactly how your formatted text will look on LinkedIn before you post. No surprises.'
  }
];

function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Professional Posts
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to create engaging, well-formatted LinkedIn content that stands out in the feed.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-gradient-to-br from-purple-50 to-white rounded-xl hover:shadow-xl transition-all duration-300 border border-purple-100 hover:border-purple-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* How it Works Section */}
        <div id="how-it-works" className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Simple, fast, and effective. Get professionally formatted posts in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Type or Paste
              </h3>
              <p className="text-gray-600">
                Write your content using markdown syntax or paste existing text. Use **bold**, *italic*, or `code` formatting.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Format & Preview
              </h3>
              <p className="text-gray-600">
                Select text and apply formatting or let auto-conversion handle it. See real-time preview of your formatted post.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Copy & Post
              </h3>
              <p className="text-gray-600">
                Click to copy your formatted text and paste directly into LinkedIn. Your formatting will work perfectly!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
