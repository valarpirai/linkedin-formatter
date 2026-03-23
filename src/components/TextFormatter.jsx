import React, { useState, useRef } from 'react';
import { toBold, toItalic, toMonospace, toBoldItalic, formatSelection } from '../utils/unicodeTransformer';
import { quickFormat, markdownToLinkedIn } from '../utils/markdownParser';

function TextFormatter() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const textareaRef = useRef(null);

  // Handle text input change
  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);
    setOutputText(quickFormat(text));
  };

  // Apply formatting to selected text
  const applyFormat = (style) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start === end) {
      alert('Please select some text first');
      return;
    }

    const formatted = formatSelection(inputText, start, end, style);
    setInputText(formatted);
    setOutputText(quickFormat(formatted));

    // Restore focus
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start, start + (end - start));
    }, 0);
  };

  // Convert full markdown
  const convertMarkdown = () => {
    const converted = markdownToLinkedIn(inputText);
    setOutputText(converted);
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Failed to copy to clipboard');
    }
  };

  // Download as text file
  const downloadText = () => {
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'linkedin-post.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Download as markdown file
  const downloadMarkdown = () => {
    const blob = new Blob([inputText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'linkedin-post.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Clear all
  const clearAll = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Toolbar */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => applyFormat('bold')}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-bold transition-colors"
              title="Bold (select text first)"
            >
              𝗕
            </button>
            <button
              onClick={() => applyFormat('italic')}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg italic transition-colors"
              title="Italic (select text first)"
            >
              𝘐
            </button>
            <button
              onClick={() => applyFormat('monospace')}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-mono transition-colors"
              title="Monospace (select text first)"
            >
              𝙼
            </button>
            <button
              onClick={() => applyFormat('bold-italic')}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-bold italic transition-colors"
              title="Bold Italic (select text first)"
            >
              𝘽𝙄
            </button>
            <div className="flex-1"></div>
            <button
              onClick={convertMarkdown}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
              title="Convert full markdown"
            >
              Convert MD
            </button>
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
              title="Clear all"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Editor Area */}
        <div className="grid md:grid-cols-2 gap-4 p-6">
          {/* Input */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">
              Input (Type or paste markdown)
            </label>
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={handleInputChange}
              placeholder="Type your text here...

**Bold text** with double asterisks
*Italic text* with single asterisks
`Monospace text` with backticks

Or just type and select text to format using buttons above!"
              className="flex-1 min-h-[300px] p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none resize-none font-mono text-sm"
            />
            <div className="text-xs text-gray-500 mt-2">
              {inputText.length} characters
            </div>
          </div>

          {/* Output Preview */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">
              Preview (LinkedIn formatted)
            </label>
            <div className="flex-1 min-h-[300px] p-4 border-2 border-purple-200 rounded-lg bg-purple-50/30 whitespace-pre-wrap break-words font-sans text-sm">
              {outputText || (
                <span className="text-gray-400 italic">
                  Your formatted text will appear here...
                </span>
              )}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {outputText.length} characters
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={copyToClipboard}
              disabled={!outputText}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                copySuccess
                  ? 'bg-green-500 text-white'
                  : outputText
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {copySuccess ? '✓ Copied!' : '📋 Copy to Clipboard'}
            </button>
            <button
              onClick={downloadText}
              disabled={!outputText}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                outputText
                  ? 'bg-purple-100 hover:bg-purple-200 text-purple-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              💾 Download .txt
            </button>
            <button
              onClick={downloadMarkdown}
              disabled={!inputText}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                inputText
                  ? 'bg-purple-100 hover:bg-purple-200 text-purple-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              📄 Download .md
            </button>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-purple-50 px-6 py-4 border-t border-purple-100">
          <p className="text-sm text-purple-800">
            <strong>💡 Tips:</strong> Use markdown syntax like **bold**, *italic*, or `code`.
            Or select text and click formatting buttons. Your text is converted to Unicode that works on LinkedIn!
          </p>
        </div>
      </div>
    </div>
  );
}

export default TextFormatter;
