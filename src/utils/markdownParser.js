import { marked } from 'marked';
import { toBold, toItalic, toMonospace } from './unicodeTransformer';

/**
 * Custom renderer for marked to convert markdown to LinkedIn-friendly Unicode
 */
const renderer = {
  // Bold text
  strong(text) {
    return toBold(text);
  },

  // Italic text
  em(text) {
    return toItalic(text);
  },

  // Code (monospace)
  codespan(text) {
    return toMonospace(text);
  },

  // Headings - use bold and add spacing
  heading(text, level) {
    const boldText = toBold(text);
    return '\n' + boldText + '\n\n';
  },

  // Paragraphs - add line breaks
  paragraph(text) {
    return text + '\n\n';
  },

  // Lists
  list(body, ordered, start) {
    return body + '\n';
  },

  listitem(text) {
    return '• ' + text + '\n';
  },

  // Links - show URL
  link(href, title, text) {
    return `${text} (${href})`;
  },

  // Code blocks - use monospace
  code(code) {
    return '\n' + toMonospace(code) + '\n\n';
  },

  // Blockquotes - add quote marker
  blockquote(quote) {
    return quote.split('\n').map(line => '│ ' + line).join('\n') + '\n\n';
  },

  // Horizontal rule
  hr() {
    return '\n────────────────────\n\n';
  },

  // Line break
  br() {
    return '\n';
  },

  // Remove HTML tags
  html(html) {
    return '';
  },

  // Images - show alt text and URL
  image(href, title, text) {
    return `[Image: ${text}]`;
  }
};

/**
 * Convert markdown to LinkedIn-formatted text
 */
export function markdownToLinkedIn(markdown) {
  if (!markdown || typeof markdown !== 'string') {
    return '';
  }

  // Configure marked
  marked.use({
    renderer,
    breaks: true,
    gfm: true
  });

  try {
    // Parse markdown
    let result = marked.parse(markdown);

    // Clean up extra line breaks
    result = result.replace(/\n{3,}/g, '\n\n');
    result = result.trim();

    return result;
  } catch (error) {
    console.error('Error parsing markdown:', error);
    return markdown;
  }
}

/**
 * Simple markdown pattern detection and conversion
 */
export function quickFormat(text) {
  if (!text) return '';

  let formatted = text;

  // Bold: **text** or __text__
  formatted = formatted.replace(/\*\*([^*]+)\*\*/g, (_, content) => toBold(content));
  formatted = formatted.replace(/__([^_]+)__/g, (_, content) => toBold(content));

  // Italic: *text* or _text_
  formatted = formatted.replace(/(?<!\*)\*(?!\*)([^*]+)\*(?!\*)/g, (_, content) => toItalic(content));
  formatted = formatted.replace(/(?<!_)_(?!_)([^_]+)_(?!_)/g, (_, content) => toItalic(content));

  // Monospace/Code: `text`
  formatted = formatted.replace(/`([^`]+)`/g, (_, content) => toMonospace(content));

  return formatted;
}

export default {
  markdownToLinkedIn,
  quickFormat
};
