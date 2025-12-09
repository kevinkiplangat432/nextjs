'use client';

import { useEffect } from 'react';

/**
 * Global error component
 * @param {Object} props - Component props
 * @param {Error} props.error - Error object
 * @param {Function} props.reset - Reset function
 * @returns {JSX.Element} Error component
 */
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div className="text-red-500 text-4xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Something went wrong!
      </h2>
      <p className="text-gray-600 text-center mb-8 max-w-md">
        We apologize for the inconvenience. Please try refreshing the page or
        contact support if the problem persists.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => reset()}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Try Again
        </button>
        <a
          href="/"
          className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}