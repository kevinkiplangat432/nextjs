/**
 * Footer component with app information and links
 * @returns {JSX.Element} Footer component
 */
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Book Explorer</h3>
            <p className="text-gray-300">
              Discover and explore thousands of free books from Project Gutenberg&apos;s collection.
              All books are in the public domain and available for free download.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.gutenberg.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  Project Gutenberg
                </a>
              </li>
              <li>
                <a
                  href="https://www.gutenberg.org/about/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  About Project Gutenberg
                </a>
              </li>
              <li>
                <a
                  href="https://www.gutenberg.org/policy/terms_of_use.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  Terms of Use
                </a>
              </li>
              <li>
                <a
                  href="https://www.gutenberg.org/help/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  Help & Support
                </a>
              </li>
            </ul>
          </div>

          {/* Data Source */}
          <div>
            <h3 className="text-xl font-bold mb-4">Data Source</h3>
            <p className="text-gray-300 mb-2">
              This app uses the Gutendex API to access Project Gutenberg&apos;s library.
            </p>
            <a
              href="https://gutendex.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-300 hover:text-blue-200"
            >
              Visit Gutendex API
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} Book Explorer. All books provided by{' '}
            <a
              href="https://www.gutenberg.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-200"
            >
              Project Gutenberg
            </a>
            . This is a fan-made interface.
          </p>
          <p className="mt-2 text-sm">
            Project Gutenberg eBooks are free and in the public domain in the United States.
          </p>
        </div>
      </div>
    </footer>
  );
}