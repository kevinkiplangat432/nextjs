import './globals.css';
import Layout from '@/components/layout/Layout';

/**
 * Root layout component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Root layout
 */
export const metadata = {
  title: 'Book Explorer | Discover Free Classics',
  description: 'Explore thousands of free books from Project Gutenberg. Read and download literary classics at no cost.',
  keywords: 'free books, Project Gutenberg, classics, ebooks, public domain',
  openGraph: {
    title: 'Book Explorer',
    description: 'Discover free classics from Project Gutenberg',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}