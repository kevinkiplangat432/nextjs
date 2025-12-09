import { fetchPopularBooks } from '@/lib/api';
import BookGrid from '@/components/books/BookGrid';
import SearchBar from '@/components/search/SearchBar';
import Link from 'next/link';

/**
 * Homepage component
 * @returns {JSX.Element} Homepage
 */
export default async function HomePage() {
  // Fetch popular books for the homepage
  let popularBooks = [];
  let error = null;
  
  try {
    popularBooks = await fetchPopularBooks(12);
  } catch (err) {
    console.error('Error fetching popular books:', err);
    error = err.message;
  }

  return (
    <div className="space-y-12">
      {/* Hero section */}
      <section className="text-center py-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Discover Free Classics
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Explore thousands of free books from Project Gutenberg&apos;s collection. 
          Read, download, and enjoy literary classics at no cost.
        </p>
        
        {/* Search bar */}
        <div className="max-w-3xl mx-auto">
          <SearchBar />
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>Over 60,000 free eBooks • No registration required • Multiple formats available</p>
        </div>
      </section>

      {/* Featured books */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Popular Books</h2>
          <Link 
            href="/books" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View All →
          </Link>
        </div>
        
        <BookGrid 
          books={popularBooks} 
          loading={false} 
          error={error} 
        />
      </section>

      {/* Features section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
        <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-xl font-bold mb-2">Free Forever</h3>
          <p className="text-gray-600">
            All books are in the public domain and completely free to read and download.
          </p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
          <div className="text-4xl mb-4">📱</div>
          <h3 className="text-xl font-bold mb-2">Multiple Formats</h3>
          <p className="text-gray-600">
            Read on any device with EPUB, PDF, HTML, and plain text formats available.
          </p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
          <div className="text-4xl mb-4">🌍</div>
          <h3 className="text-xl font-bold mb-2">Multiple Languages</h3>
          <p className="text-gray-600">
            Books available in English, French, Spanish, German, and many more languages.
          </p>
        </div>
      </section>

      {/* Call to action */}
      <section className="text-center py-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Explore?
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Browse our complete collection of free books. Find your next favorite read today.
        </p>
        <div className="space-x-4">
          <Link
            href="/books"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700"
          >
            Browse All Books
          </Link>
          <Link
            href="https://www.gutenberg.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50"
          >
            Visit Project Gutenberg
          </Link>
        </div>
      </section>
    </div>
  );
}