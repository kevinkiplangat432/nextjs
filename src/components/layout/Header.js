'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { debounce } from '@/lib/utils';

/**
 * Main header component with navigation and search
 * @returns {JSX.Element} Header component
 */
export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  /**
   * Handles search form submission
   * @param {Event} e - Form submit event
   */
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  /**
   * Debounced search handler for instant search
   */
  const handleInstantSearch = debounce((query) => {
    if (query.trim()) {
      router.push(`/books?search=${encodeURIComponent(query.trim())}`);
    }
  }, 500);

  /**
   * Handles search input changes
   * @param {Event} e - Input change event
   */
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleInstantSearch(query);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Book Explorer</h1>
              <p className="text-sm text-gray-600">Discover free classics</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="w-full md:w-1/3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="search"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search books by title, author, or subject..."
                className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Search books"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Search
              </button>
            </form>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link href="/books" className="text-gray-700 hover:text-blue-600 font-medium">
              Browse
            </Link>
            <Link href="/favorites" className="text-gray-700 hover:text-blue-600 font-medium">
              Favorites
            </Link>
            <a
              href="https://www.gutenberg.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Project Gutenberg
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}