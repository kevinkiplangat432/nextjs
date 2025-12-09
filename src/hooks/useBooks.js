import { useState, useEffect, useCallback } from 'react';
import { fetchBooks } from '@/lib/api';

/**
 * Custom hook for fetching and managing books data
 * @param {Object} initialParams - Initial search parameters
 * @returns {Object} Books data and control functions
 */
export function useBooks(initialParams = {}) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);
  const [pagination, setPagination] = useState({
    count: 0,
    currentPage: 1,
    totalPages: 1,
    next: null,
    previous: null
  });

  /**
   * Fetches books based on current parameters
   */
  const loadBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchBooks(params);
      
      setBooks(data.results || []);
      setPagination({
        count: data.count,
        currentPage: data.currentPage || 1,
        totalPages: data.totalPages || 1,
        next: data.next,
        previous: data.previous
      });
    } catch (err) {
      console.error('Error loading books:', err);
      setError(err.message || 'Failed to load books');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, [params]);

  // Load books when params change
  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  /**
   * Updates search parameters
   * @param {Object} newParams - New parameters to merge
   */
  const updateParams = useCallback((newParams) => {
    setParams(prev => ({
      ...prev,
      ...newParams,
      page: newParams.page !== undefined ? newParams.page : 1
    }));
  }, []);

  /**
   * Goes to next page
   */
  const nextPage = useCallback(() => {
    if (pagination.currentPage < pagination.totalPages) {
      updateParams({ page: pagination.currentPage + 1 });
    }
  }, [pagination, updateParams]);

  /**
   * Goes to previous page
   */
  const prevPage = useCallback(() => {
    if (pagination.currentPage > 1) {
      updateParams({ page: pagination.currentPage - 1 });
    }
  }, [pagination, updateParams]);

  /**
   * Goes to specific page
   * @param {number} page - Page number
   */
  const goToPage = useCallback((page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      updateParams({ page });
    }
  }, [pagination, updateParams]);

  return {
    books,
    loading,
    error,
    pagination,
    params,
    updateParams,
    nextPage,
    prevPage,
    goToPage,
    reload: loadBooks
  };
}