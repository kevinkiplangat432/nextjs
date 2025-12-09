import LoadingSpinner from '@/components/ui/LoadingSpinner';

/**
 * Global loading component
 * @returns {JSX.Element} Loading component
 */
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-gray-600">Loading content...</p>
    </div>
  );
}