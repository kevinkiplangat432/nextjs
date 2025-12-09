'use client';

import Link from 'next/link';
import { 
  truncateText, 
  formatNumber, 
  getPrimaryAuthor,
  getBestDownloadLink,
  extractSubjects
} from '@/lib/utils';
import { FORMAT_ICONS, FORMAT_NAMES } from '@/lib/constants';
import { useFavorites } from '@/hooks/useLocalStorage';

/**
 * Book card component for displaying book preview
 * @param {Object} props - Component props
 * @param {Object} props.book - Book data object
 * @returns {JSX.Element} Book card component
 */
export default function BookCard({ book }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const author = getPrimaryAuthor(book.authors);
  const downloadLink = getBestDownloadLink(book.formats);
  const subjects = extractSubjects(book.subjects);
  const isFavorited = isFavorite(book.id);

  // Get cover image from formats
  const coverImage = book.formats?.['image/jpeg'] || 
                     book.formats?.['image/png'] || 
                     '/book-placeholder.png';

  // Get available formats
  const availableFormats = Object.keys(book.formats || {}).slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      {/* Favorite button */}
      <button
        onClick={() => toggleFavorite(book.id)}
        className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-red-50"
        aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      >
        <svg 
          className={`w-5 h-5 ${isFavorited ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
          fill={isFavorited ? "currentColor" : "none"} 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Book cover */}
      <Link href={`/books/${book.id}`} className="block">
        <div className="h-48 bg-gray-200 relative">
          <img
            src={coverImage}
            alt={`Cover of ${book.title}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/book-placeholder.png';
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <span className="text-white text-sm font-medium">
              {book.languages?.[0]?.toUpperCase() || 'EN'}
            </span>
          </div>
        </div>
      </Link>

      {/* Book info */}
      <div className="p-4 flex-grow flex flex-col">
        {/* Title */}
        <Link href={`/books/${book.id}`}>
          <h3 className="text-lg font-bold text-gray-800 hover:text-blue-600 mb-2 line-clamp-2">
            {truncateText(book.title, 60)}
          </h3>
        </Link>

        {/* Author */}
        <p className="text-gray-600 text-sm mb-3">
          by <span className="font-medium">{truncateText(author, 40)}</span>
        </p>

        {/* Subjects/Tags */}
        {subjects.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {subjects.slice(0, 3).map((subject, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                >
                  {truncateText(subject, 20)}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-3 border-t">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>{formatNumber(book.download_count)} downloads</span>
          </div>

          {/* Available formats */}
          <div className="flex items-center">
            {availableFormats.map((format, index) => (
              <span key={index} className="ml-1" title={FORMAT_NAMES[format] || format}>
                {FORMAT_ICONS[format] || '📄'}
              </span>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex space-x-2 mt-4">
          <Link
            href={`/books/${book.id}`}
            className="flex-1 bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
          {downloadLink && (
            <a
              href={downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-600 text-white text-center py-2 rounded-md hover:bg-green-700 transition-colors"
              download
            >
              Download
            </a>
          )}
        </div>
      </div>
    </div>
  );
}