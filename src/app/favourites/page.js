'use client';

import { useState, useEffect } from 'react';
import { fetchBooksByIds } from '@/lib/api';
import BookGrid from '@/components/books/BookGrid';
import { useFavorites } from '@/hooks/useLocalStorage';

/**
 * Favorites page showing user's saved books
 * @returns {JSX.Element} Favorites page
 */
export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load favorite books
  useEffect(() => {
    async function loadFavoriteBooks() {
      if (favorites.length === 0) {
        setFavoriteBooks([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const books = await fetchBooksByIds(favorites);
        setFavoriteBooks(books);
      } catch (err) {
        console.error('Error loading favorite books:', err);
        setError('Failed to load favorite books');
      } finally {
        setLoading(false);
      }
    }

    loadFavoriteBooks();
  }, [favorites]);

  // No favorites
  if (favorites.length === 0 && !loading) {
    return (
      <div className="text-center py-20">
        <div className="text-gray-400 text-4xl mb-4">⭐</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          No Favorite Books Yet
        </h1>
        <p className="text-gray-600 mb-8">
          Books you mark as favorites will appear here.
        </p>
        <a
          href="/books"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Browse Books
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Favorites</h1>
        <p className="text-gray-600">
          {favorites.length} saved {favorites.length === 1 ? 'book' : 'books'}
        </p>
      </div>

      {/* Favorites grid */}
      <BookGrid 
        books={favoriteBooks} 
        loading={loading} 
        error={error} 
      />
    </div>
  );
}