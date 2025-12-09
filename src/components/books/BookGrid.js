'use client';

import BookCard from './BookCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

/**
 * Grid layout for displaying multiple books
 * @param {Object} props - Component props
 * @param {Array} props.books - Array of book objects
 * @param {boolean} props.loading - Loading state
 * @param {string} props.error - Error message
 * @returns {JSX.Element} Book grid component
 */
export default function BookGrid({ books, loading, error }) {
  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="text-center py-20">
        <div className="text-red-500 text-4xl mb-4">⚠️</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Error Loading Books</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Show empty state
  if (!books || books.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-gray-400 text-4xl mb-4">📚</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">No Books Found</h3>
        <p className="text-gray-600">Try adjusting your search or filters</p>
      </div>
    );
  }

  // Show books grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}