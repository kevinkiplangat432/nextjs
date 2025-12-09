import { useState, useEffect } from 'react';

/**
 * Custom hook for managing localStorage
 * @param {string} key - LocalStorage key
 * @param {any} initialValue - Initial value
 * @returns {Array} [value, setValue]
 */
export function useLocalStorage(key, initialValue) {
  // State to store our value
  const [storedValue, setStoredValue] = useState(initialValue);

  // Initialize from localStorage on mount
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }
  }, [key]);

  /**
   * Update localStorage and state
   * @param {any} value - New value
   */
  const setValue = (value) => {
    try {
      // Allow value to be a function
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

/**
 * Hook for managing favorite books
 * @returns {Object} Favorite books functions
 */
export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage('book-favorites', []);

  /**
   * Adds a book to favorites
   * @param {number} bookId - Book ID
   */
  const addFavorite = (bookId) => {
    if (!favorites.includes(bookId)) {
      setFavorites([...favorites, bookId]);
    }
  };

  /**
   * Removes a book from favorites
   * @param {number} bookId - Book ID
   */
  const removeFavorite = (bookId) => {
    setFavorites(favorites.filter(id => id !== bookId));
  };

  /**
   * Checks if a book is favorited
   * @param {number} bookId - Book ID
   * @returns {boolean} True if book is favorited
   */
  const isFavorite = (bookId) => {
    return favorites.includes(bookId);
  };

  /**
   * Toggles favorite status
   * @param {number} bookId - Book ID
   */
  const toggleFavorite = (bookId) => {
    if (isFavorite(bookId)) {
      removeFavorite(bookId);
    } else {
      addFavorite(bookId);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite
  };
}