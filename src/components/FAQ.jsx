import React, { useState } from 'react';

const faqs = [
  {
    question: 'How does the LinkedIn text formatter work?',
    answer: 'Our formatter converts your text to Unicode mathematical characters that look like bold, italic, or monospace fonts. These special Unicode characters are fully supported by LinkedIn and will display consistently across all devices.'
  },
  {
    question: 'Is this really free? Are there any hidden costs?',
    answer: 'Yes, it\'s completely free! No hidden costs, no subscriptions, no sign-up required. Use it as much as you want, whenever you want. We built this tool to help professionals create better LinkedIn content.'
  },
  {
    question: 'Will the formatting work on LinkedIn mobile app?',
    answer: 'Absolutely! Because we use Unicode characters (not HTML or CSS), your formatted text works perfectly on LinkedIn mobile apps, desktop, and any other platform that supports Unicode text.'
  },
  {
    question: 'Can I use this for other platforms besides LinkedIn?',
    answer: 'Yes! The Unicode formatting works on most social media platforms including Twitter, Facebook, Instagram, and more. However, some platforms may render certain characters differently.'
  },
  {
    question: 'What markdown syntax is supported?',
    answer: 'We support common markdown syntax: **bold** or __bold__, *italic* or _italic_, `code` for monospace, # headings, bullet lists with - or *, and more. You can also use the formatting buttons for quick access.'
  },
  {
    question: 'Is my text saved or stored anywhere?',
    answer: 'No! All text formatting happens directly in your browser. We don\'t store, save, or transmit your content to any server. Your data stays completely private and secure on your device.'
  },
  {
    question: 'Why doesn\'t LinkedIn support native formatting?',
    answer: 'LinkedIn has limited native formatting options to maintain a clean, professional feed. However, Unicode characters provide a workaround that\'s been widely adopted by content creators and marketers to make their posts stand out.'
  },
  {
    question: 'Can I format emojis or special characters?',
    answer: 'Unicode transformations work best with standard alphanumeric characters (A-Z, a-z, 0-9). Emojis and special characters will pass through unchanged, which is usually what you want!'
  }
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-6 px-6 flex justify-between items-center text-left hover:bg-purple-50 transition-colors"
      >
        <span className="text-lg font-semibold text-gray-900 pr-8">
          {faq.question}
        </span>
        <span className={`flex-shrink-0 text-2xl text-purple-600 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ↓
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-6 text-gray-600 leading-relaxed">
          {faq.answer}
        </div>
      )}
    </div>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about the LinkedIn text formatter
          </p>
        </div>

        {/* FAQ List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Still have questions? Start using the formatter and see how easy it is!
          </p>
          <a
            href="#formatter"
            className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Try It Now →
          </a>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
