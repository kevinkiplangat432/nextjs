/**
 * Application constants and configuration
 */

// Available languages for filtering
export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'French' },
  { code: 'es', name: 'Spanish' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'nl', name: 'Dutch' },
  { code: 'fi', name: 'Finnish' },
];

// Popular subjects/categories
export const POPULAR_SUBJECTS = [
  'Fiction',
  'Science Fiction',
  'Mystery',
  'Romance',
  'History',
  'Philosophy',
  'Poetry',
  'Drama',
  'Adventure',
  'Fantasy',
  'Children\'s Literature',
  'Biography',
];

// Book format icons mapping
export const FORMAT_ICONS = {
  'text/html': '🌐',
  'application/pdf': '📄',
  'text/plain': '📝',
  'application/epub+zip': '📱',
  'application/x-mobipocket-ebook': '📖',
  'text/plain; charset=us-ascii': '📝',
  'application/octet-stream': '💾',
};

// Format display names
export const FORMAT_NAMES = {
  'text/html': 'HTML',
  'application/pdf': 'PDF',
  'text/plain': 'Plain Text',
  'application/epub+zip': 'EPUB',
  'application/x-mobipocket-ebook': 'MOBI',
  'text/plain; charset=us-ascii': 'Text',
  'application/octet-stream': 'Download',
};

// API base URL
export const GUTENDEX_API = 'https://gutendex.com/books';

// Number of books per page
export const BOOKS_PER_PAGE = 32;