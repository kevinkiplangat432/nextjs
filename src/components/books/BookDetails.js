'use client';

import { useState } from 'react';
import { 
  formatNumber, 
  getAuthorYears,
  getAvailableFormats,
  extractSubjects,
  truncateText
} from '@/lib/utils';
import { FORMAT_ICONS, FORMAT_NAMES, POPULAR_SUBJECTS } from '@/lib/constants';
import { useFavorites } from '@/hooks/useLocalStorage';

/**
 * Detailed view component for a single book
 * @param {Object} props - Component props
 * @param {Object} props.book - Book data object
 * @returns {JSX.Element} Book details component
 */
export default function BookDetails({ book }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [selectedFormat, setSelectedFormat] = useState(null);
  const isFavorited = isFavorite(book.id);

  // Get available formats
  const availableFormats = getAvailableFormats(book.formats);
  
  // Get cover image
  const coverImage = book.formats?.['image/jpeg'] || 
                     book.formats?.['image/png'] || 
                     '/book-placeholder.png';

  // Extract subjects
  const subjects = extractSubjects(book.subjects, 10);
  const bookshelves = extractSubjects(book.bookshelves, 5);

  // Handle download
  const handleDownload = (format) => {
    const url = book.formats[format];
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="md:flex">
        {/* Left column - Cover image and quick actions */}
        <div className="md:w-1/3 p-8 bg-gray-50">
          <div className="sticky top-8">
            {/* Book cover */}
            <div className="mb-6">
              <img
                src={coverImage}
                alt={`Cover of ${book.title}`}
                className="w-full max-w-xs mx-auto rounded-lg shadow-md"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/book-placeholder.png';
                }}
              />
            </div>

            {/* Quick actions */}
            <div className="space-y-4">
              {/* Favorite button */}
              <button
                onClick={() => toggleFavorite(book.id)}
                className={`w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2 ${
                  isFavorited 
                    ? 'bg-red-50 text-red-600 border border-red-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <svg 
                  className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} 
                  fill={isFavorited ? "currentColor" : "none"} 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}</span>
              </button>

              {/* Download formats */}
              <div className="bg-white rounded-lg border p-4">
                <h4 className="font-bold text-gray-800 mb-3">Download Formats</h4>
                <div className="space-y-2">
                  {availableFormats.map((format) => (
                    <button
                      key={format}
                      onClick={() => handleDownload(format)}
                      className="w-full flex items-center justify-between p-3 rounded-md hover:bg-gray-50 border"
                    >
                      <div className="flex items-center">
                        <span className="text-lg mr-3">{FORMAT_ICONS[format] || '📄'}</span>
                        <span className="font-medium">{FORMAT_NAMES[format] || format}</span>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              {/* Statistics */}
              <div className="bg-blue-50 rounded-lg border border-blue-100 p-4">
                <h4 className="font-bold text-blue-800 mb-2">Statistics</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Downloads:</span>
                    <span className="font-bold">{formatNumber(book.download_count)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Languages:</span>
                    <span className="font-bold">{book.languages?.length || 1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Copyright:</span>
                    <span className="font-bold">{book.copyright ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Book details */}
        <div className="md:w-2/3 p-8">
          {/* Title and author */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-lg">
                {book.authors?.map((author, index) => (
                  <span key={author.name}>
                    {author.name} {getAuthorYears(author)}
                    {index < book.authors.length - 1 ? ', ' : ''}
                  </span>
                )) || 'Unknown Author'}
              </span>
            </div>
          </div>

          {/* Subjects */}
          {subjects.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-2">Subjects</h3>
              <div className="flex flex-wrap gap-2">
                {subjects.map((subject, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bookshelves */}
          {bookshelves.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {bookshelves.map((shelf, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                  >
                    {shelf}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {book.languages && book.languages.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-2">Available Languages</h3>
              <div className="flex flex-wrap gap-2">
                {book.languages.map((lang, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                  >
                    {lang.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description (if available) */}
          {book.description && (
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-2">Description</h3>
              <div className="prose max-w-none text-gray-700">
                <p>{book.description}</p>
              </div>
            </div>
          )}

          {/* Related subjects suggestions */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="font-bold text-gray-800 mb-4">Explore Similar Topics</h3>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SUBJECTS.slice(0, 8).map((subject) => (
                <a
                  key={subject}
                  href={`/books?topic=${encodeURIComponent(subject.toLowerCase())}`}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {subject}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}