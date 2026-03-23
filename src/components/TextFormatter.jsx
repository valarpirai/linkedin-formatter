import React, { useState, useRef, useEffect } from 'react';
import { toBold, toItalic, toMonospace, toBoldItalic, formatSelection } from '../utils/unicodeTransformer';
import { quickFormat, markdownToLinkedIn } from '../utils/markdownParser';

function TextFormatter() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const textareaRef = useRef(null);
  const debounceTimerRef = useRef(null);

  // Auto-convert markdown after typing stops (debounced)
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      if (inputText) {
        const converted = markdownToLinkedIn(inputText);
        setOutputText(converted);
      } else {
        setOutputText('');
      }
    }, 500); // Convert after 500ms of inactivity

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [inputText]);

  // Handle text input change
  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);
  };

  // Handle paste - convert immediately
  const handlePaste = (e) => {
    // Let the default paste happen first
    setTimeout(() => {
      const text = textareaRef.current?.value || '';
      setInputText(text);
      const converted = markdownToLinkedIn(text);
      setOutputText(converted);
    }, 0);
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

    // Convert immediately after formatting
    const converted = markdownToLinkedIn(formatted);
    setOutputText(converted);

    // Restore focus
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start, start + (end - start));
    }, 0);
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

  // Apply list formatting to selected lines
  const applyListFormat = (listType) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start === end) {
      alert('Please select text (multiple lines) first');
      return;
    }

    const before = inputText.substring(0, start);
    const selected = inputText.substring(start, end);
    const after = inputText.substring(end);

    // Split selected text into lines
    const lines = selected.split('\n').filter(line => line.trim());

    // Format each line as a list item
    let formattedLines;
    if (listType === 'bullet') {
      formattedLines = lines.map(line => {
        // Remove existing list markers
        const cleaned = line.replace(/^[\s-*•]+/, '').trim();
        return `- ${cleaned}`;
      });
    } else if (listType === 'numbered') {
      formattedLines = lines.map((line, index) => {
        // Remove existing list markers
        const cleaned = line.replace(/^[\s-*•\d.]+/, '').trim();
        return `${index + 1}. ${cleaned}`;
      });
    }

    const formatted = before + formattedLines.join('\n') + after;
    setInputText(formatted);

    // Convert immediately
    const converted = markdownToLinkedIn(formatted);
    setOutputText(converted);

    // Restore focus
    setTimeout(() => {
      textarea.focus();
      const newEnd = start + formattedLines.join('\n').length;
      textarea.setSelectionRange(start, newEnd);
    }, 0);
  };

  // Clear all
  const clearAll = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Toolbar - Sticky */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 shadow-md">
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
            <div className="w-px h-8 bg-white/20"></div>
            <button
              onClick={() => applyListFormat('bullet')}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
              title="Bullet list (select lines first)"
            >
              • List
            </button>
            <button
              onClick={() => applyListFormat('numbered')}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
              title="Numbered list (select lines first)"
            >
              1. List
            </button>
            <div className="flex-1"></div>
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
              onPaste={handlePaste}
              placeholder="Type your text here...

**Bold text** with double asterisks
*Italic text* with single asterisks
`Monospace text` with backticks

Formatting is applied automatically as you type or paste!"
              className="flex-1 min-h-[300px] p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none resize-none font-mono text-sm"
            />
            <div className={`text-xs mt-2 ${
              inputText.length > 3000 ? 'text-red-600 font-semibold' :
              inputText.length > 2700 ? 'text-orange-600 font-semibold' :
              'text-gray-500'
            }`}>
              {inputText.length} / 3000 characters
              {inputText.length > 3000 && ' (exceeds LinkedIn limit!)'}
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
            <div className={`text-xs mt-2 ${
              outputText.length > 3000 ? 'text-red-600 font-semibold' :
              outputText.length > 2700 ? 'text-orange-600 font-semibold' :
              'text-gray-500'
            }`}>
              {outputText.length} / 3000 characters
              {outputText.length > 3000 && ' (exceeds LinkedIn limit!)'}
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
            Formatting is applied automatically as you type or paste! You can also select text and use the formatting buttons above.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TextFormatter;
