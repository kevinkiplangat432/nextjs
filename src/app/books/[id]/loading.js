import LoadingSpinner from '@/components/ui/LoadingSpinner';

/**
 * Book details loading component
 * @returns {JSX.Element} Loading skeleton
 */
export default function BookDetailLoading() {
  return (
    <div className="animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="flex space-x-2 mb-8">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded w-4"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
        <div className="h-4 bg-gray-200 rounded w-4"></div>
        <div className="h-4 bg-gray-200 rounded w-48"></div>
      </div>

      <div className="md:flex">
        {/* Left column skeleton */}
        <div className="md:w-1/3 p-8 bg-gray-50">
          <div className="mb-6">
            <div className="w-full h-64 bg-gray-300 rounded-lg"></div>
          </div>
          <div className="space-y-4">
            <div className="h-12 bg-gray-300 rounded-lg"></div>
            <div className="h-40 bg-gray-300 rounded-lg"></div>
            <div className="h-24 bg-gray-300 rounded-lg"></div>
          </div>
        </div>

        {/* Right column skeleton */}
        <div className="md:w-2/3 p-8">
          <div className="mb-6">
            <div className="h-10 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          </div>

          <div className="mb-6">
            <div className="h-6 bg-gray-300 rounded w-32 mb-3"></div>
            <div className="flex flex-wrap gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-300 rounded-full w-24"></div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="h-6 bg-gray-300 rounded w-24 mb-3"></div>
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}