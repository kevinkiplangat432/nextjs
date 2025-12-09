import { fetchBookById } from '@/lib/api';
import BookDetails from '@/components/books/BookDetails';
import Link from 'next/link';
import { notFound } from 'next/navigation';

/**
 * Individual book details page
 * @param {Object} props - Page props
 * @param {Object} props.params - Route parameters
 * @returns {JSX.Element} Book details page
 */
export default async function BookDetailPage({ params }) {
  const { id } = params;
  
  try {
    // Fetch book data
    const book = await fetchBookById(id);
    
    if (!book) {
      notFound();
    }
    
    return (
      <div className="space-y-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>→</li>
            <li>
              <Link href="/books" className="hover:text-blue-600">
                Books
              </Link>
            </li>
            <li>→</li>
            <li className="text-gray-800 font-medium truncate max-w-xs">
              {book.title}
            </li>
          </ol>
        </nav>
        
        {/* Book details */}
        <BookDetails book={book} />
        
        {/* Related books section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-2">📖</div>
              <p className="text-sm text-gray-600">
                Browse more books by{' '}
                <Link 
                  href={`/books?search=${encodeURIComponent(book.authors?.[0]?.name || '')}`}
                  className="text-blue-600 hover:underline"
                >
                  {book.authors?.[0]?.name || 'this author'}
                </Link>
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-2">🏷️</div>
              <p className="text-sm text-gray-600">
                Explore{' '}
                <Link 
                  href={`/books?topic=${book.subjects?.[0]?.toLowerCase() || 'fiction'}`}
                  className="text-blue-600 hover:underline"
                >
                  {book.subjects?.[0] || 'similar'} books
                </Link>
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-2">🌐</div>
              <p className="text-sm text-gray-600">
                Read in{' '}
                <Link 
                  href={`/books?languages=${book.languages?.[0] || 'en'}`}
                  className="text-blue-600 hover:underline"
                >
                  {book.languages?.[0]?.toUpperCase() || 'English'}
                </Link>
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-2">⭐</div>
              <p className="text-sm text-gray-600">
                View{' '}
                <Link 
                  href="/books?sort=downloads"
                  className="text-blue-600 hover:underline"
                >
                  popular books
                </Link>
              </p>
            </div>
          </div>
        </div>
        
        {/* Project Gutenberg attribution */}
        <div className="mt-12 p-6 bg-blue-50 rounded-xl text-center">
          <p className="text-gray-700 mb-2">
            This book is provided by{' '}
            <a 
              href="https://www.gutenberg.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 font-medium hover:underline"
            >
              Project Gutenberg
            </a>
          </p>
          <p className="text-sm text-gray-500">
            Project Gutenberg eBooks are free and in the public domain in the United States.
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error(`Error loading book ${id}:`, error);
    
    return (
      <div className="text-center py-20">
        <div className="text-red-500 text-4xl mb-4">❌</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Book Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          We couldn&apos;t find the book you&apos;re looking for.
        </p>
        <Link
          href="/books"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Browse All Books
        </Link>
      </div>
    );
  }
}