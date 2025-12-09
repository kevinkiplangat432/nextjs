'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { debounce } from '@/lib/utils';

/**
 * Search bar component with instant search
 * @param {Object} props - Component props
 * @param {string} props.initialQuery - Initial search query
 * @param {Function} props.onSearch - Search callback function
 * @returns {JSX.Element} Search bar component
 */
export default function SearchBar({ initialQuery = '', onSearch }) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  // Debounced search function
  const debouncedSearch = debounce((searchQuery) => {
    if (onSearch) {
      onSearch(searchQuery);
    } else if (searchQuery.trim()) {
      router.push(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  }, 500);

  /**
   * Handles input changes
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  /**
   * Handles form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    debouncedSearch.cancel(); // Cancel any pending debounced calls
    if (onSearch) {
      onSearch(query);
    } else if (query.trim()) {
      router.push(`/books?search=${encodeURIComponent(query.trim())}`);
    }
  };

  /**
   * Clears search query
   */
  const clearSearch = () => {
    setQuery('');
    if (onSearch) {
      onSearch('');
    } else {
      router.push('/books');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <input
          type="search"
          value={query}
          onChange={handleChange}
          placeholder="Search books by title, author, or subject..."
          className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          aria-label="Search books"
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="p-1 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Search
          </button>
        </div>
      </div>
      
      {/* Search tips */}
      <div className="mt-2 text-sm text-gray-500 flex flex-wrap items-center">
        <span className="mr-2">Try:</span>
        {['Science Fiction', 'Shakespeare', 'History', 'Poetry'].map((tip) => (
          <button
            key={tip}
            type="button"
            onClick={() => setQuery(tip)}
            className="mr-2 px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200"
          >
            {tip}
          </button>
        ))}
      </div>
    </form>
  );
}