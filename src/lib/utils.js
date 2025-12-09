/**
 * Truncates text to a specified length and adds ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Formats large numbers with commas
 * @param {number} number - Number to format
 * @returns {string} Formatted number string
 */
export function formatNumber(number) {
  return number?.toLocaleString() || '0';
}

/**
 * Extracts year from author's life dates
 * @param {Object} author - Author object
 * @returns {string} Formatted life years
 */
export function getAuthorYears(author) {
  if (!author) return '';
  const birth = author.birth_year || '?';
  const death = author.death_year || '?';
  return `(${birth} - ${death})`;
}

/**
 * Gets the primary author name
 * @param {Array} authors - Array of authors
 * @returns {string} Author name or "Unknown Author"
 */
export function getPrimaryAuthor(authors) {
  if (!authors || authors.length === 0) return 'Unknown Author';
  return authors[0].name;
}

/**
 * Gets available download formats for a book
 * @param {Object} formats - Book formats object
 * @returns {Array} Array of available formats
 */
export function getAvailableFormats(formats) {
  if (!formats) return [];
  
  const priorityFormats = [
    'text/html',
    'application/pdf',
    'application/epub+zip',
    'text/plain',
    'application/x-mobipocket-ebook'
  ];
  
  return priorityFormats.filter(format => formats[format]);
}

/**
 * Gets the best available download link
 * @param {Object} formats - Book formats object
 * @returns {string|null} Best download URL
 */
export function getBestDownloadLink(formats) {
  const preferredFormats = [
    'application/pdf',
    'text/html',
    'application/epub+zip',
    'text/plain'
  ];
  
  for (const format of preferredFormats) {
    if (formats?.[format]) {
      return formats[format];
    }
  }
  
  // Return any available format
  if (formats) {
    const firstFormat = Object.keys(formats)[0];
    return formats[firstFormat];
  }
  
  return null;
}

/**
 * Extracts subjects from book data
 * @param {Array} subjects - Array of subjects
 * @param {number} limit - Maximum number of subjects to return
 * @returns {Array} Filtered subjects array
 */
export function extractSubjects(subjects, limit = 5) {
  if (!subjects) return [];
  
  // Filter out very long subjects
  return subjects
    .filter(subject => subject.length < 50)
    .slice(0, limit);
}

/**
 * Creates a debounced function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}