'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useBooks } from '@/hooks/useBooks';
import BookGrid from '@/components/books/BookGrid';
import Pagination from '@/components/ui/Pagination';
import FilterPanel from '@/components/search/FilterPanel';
import SearchBar from '@/components/search/SearchBar';
import { LANGUAGES } from '@/lib/constants';

/**
 * Books listing page with search and filters
 * @returns {JSX.Element} Books page
 */
export default function BooksPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get search parameters from URL
  const searchQuery = searchParams.get('search') || '';
  const pageParam = searchParams.get('page');
  const topicParam = searchParams.get('topic');
  const languageParam = searchParams.get('languages');
  
  // Convert URL parameters to initial state
  const initialParams = {
    search: searchQuery,
    page: pageParam ? parseInt(pageParam) : 1,
    topic: topicParam || '',
    languages: languageParam || ''
  };

  // Initialize books hook
  const {
    books,
    loading,
    error,
    pagination,
    params,
    updateParams,
    goToPage
  } = useBooks(initialParams);

  /**
   * Handles search
   * @param {string} search - Search query
   */
  const handleSearch = (search) => {
    updateParams({ search, page: 1 });
    updateURL({ search, page: 1 });
  };

  /**
   * Handles filter changes
   * @param {Object} filters - Filter object
   */
  const handleFilterChange = (filters) => {
    const languages = filters.languages?.join(',') || '';
    updateParams({ 
      languages,
      page: 1 
    });
    updateURL({ 
      languages,
      page: 1 
    });
  };

  /**
   * Handles page changes
   * @param {number} page - Page number
   */
  const handlePageChange = (page) => {
    goToPage(page);
    updateURL({ page });
  };

  /**
   * Updates URL with current parameters
   * @param {Object} updates - Parameter updates
   */
  const updateURL = (updates) => {
    const newParams = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    
    router.push(`/books?${newParams.toString()}`);
  };

  // Parse active filters for FilterPanel
  const activeFilters = {
    languages: languageParam ? languageParam.split(',') : [],
    subjects: topicParam ? [topicParam] : [],
    sort: searchParams.get('sort') || 'popular'
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Collection</h1>
        <p className="text-gray-600">
          Browse our collection of {pagination.count?.toLocaleString() || 'thousands of'} free books
        </p>
      </div>

      {/* Search bar */}
      <div className="max-w-3xl mx-auto">
        <SearchBar initialQuery={searchQuery} onSearch={handleSearch} />
      </div>

      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Filters sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <FilterPanel 
              onFilterChange={handleFilterChange} 
              activeFilters={activeFilters} 
            />
            
            {/* Current filters */}
            {(searchQuery || languageParam || topicParam) && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2">Active Filters</h4>
                <div className="space-y-1">
                  {searchQuery && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Search: {searchQuery}</span>
                      <button
                        onClick={() => {
                          updateParams({ search: '' });
                          updateURL({ search: '' });
                        }}
                        className="text-xs text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  {languageParam && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm">
                        Languages: {languageParam.split(',').map(lang => 
                          LANGUAGES.find(l => l.code === lang)?.name || lang
                        ).join(', ')}
                      </span>
                      <button
                        onClick={() => {
                          updateParams({ languages: '' });
                          updateURL({ languages: '' });
                        }}
                        className="text-xs text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  {topicParam && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Topic: {topicParam}</span>
                      <button
                        onClick={() => {
                          updateParams({ topic: '' });
                          updateURL({ topic: '' });
                        }}
                        className="text-xs text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Books grid */}
        <div className="lg:col-span-3">
          {/* Results info */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-gray-600">
                Showing {books.length} of {pagination.count?.toLocaleString() || '0'} books
                {params.page > 1 && ` • Page ${params.page} of ${pagination.totalPages}`}
              </p>
            </div>
            <div className="text-sm text-gray-500">
              Sort by: <span className="font-medium">Most Popular</span>
            </div>
          </div>

          {/* Books grid */}
          <BookGrid books={books} loading={loading} error={error} />

          {/* Pagination */}
          {pagination.totalPages > 1 && !loading && (
            <div className="mt-8">
              <Pagination
                currentPage={params.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}