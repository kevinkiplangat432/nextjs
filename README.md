Book Explorer 📚
https://img.shields.io/badge/Next.js-14-black?logo=next.js
https://img.shields.io/badge/React-18-blue?logo=react
https://img.shields.io/badge/Tailwind_CSS-3-blue?logo=tailwind-css
https://img.shields.io/badge/License-MIT-green.svg

A modern, responsive book exploration application that allows you to discover and read thousands of free books from Project Gutenberg's collection. Built with Next.js 14 and powered by the Gutendex API.

https://via.placeholder.com/800x450/3b82f6/ffffff?text=Book+Explorer+Screenshot

🌟 Features
📖 Book Discovery
Search Books: Find books by title, author, or subject with instant search

Advanced Filtering: Filter by language, genre, copyright status, and popularity

Popular Books: Discover trending and highly downloaded books

Pagination: Browse through extensive collections efficiently

📚 Book Details
Comprehensive Information: View complete book metadata including authors, subjects, and languages

Multiple Formats: Download books in PDF, EPUB, HTML, MOBI, and plain text formats

Book Statistics: See download counts, language availability, and publication details

Related Suggestions: Discover similar books based on subjects and authors

❤️ Personalization
Favorites System: Save books to your favorites using local storage

Recent Searches: Quick access to your recent search queries

Responsive Design: Seamless experience across desktop, tablet, and mobile devices

⚡ Performance
Fast Loading: Optimized API calls with caching

Image Optimization: Automatic image optimization with Next.js

Progressive Enhancement: Works with JavaScript disabled

Accessibility: WCAG compliant with proper ARIA labels

🚀 Live Demo
👉 Try Book Explorer Live

📸 Screenshots
Homepage	Search Results	Book Details
https://via.placeholder.com/300x200/3b82f6/ffffff?text=Home	https://via.placeholder.com/300x200/10b981/ffffff?text=Search	https://via.placeholder.com/300x200/8b5cf6/ffffff?text=Details
Favorites	Mobile View	Filters
https://via.placeholder.com/300x200/ef4444/ffffff?text=Favorites	https://via.placeholder.com/300x200/f59e0b/ffffff?text=Mobile	https://via.placeholder.com/300x200/06b6d4/ffffff?text=Filters
🛠️ Technology Stack
Frontend
Next.js 14 - React framework with App Router

React 18 - UI library with latest features

Tailwind CSS - Utility-first CSS framework

ESLint - Code quality and consistency

APIs & Data
Gutendex API - Project Gutenberg book data

Project Gutenberg - Source of free eBooks

Local Storage - Client-side data persistence

Development Tools
npm - Package manager

Vercel - Deployment platform (recommended)

Git - Version control

📁 Project Structure
text
book-explorer/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (routes)/          # Route groups
│   │   ├── api/               # API routes
│   │   ├── books/             # Book listing and details
│   │   ├── favorites/         # Favorites page
│   │   ├── layout.js          # Root layout
│   │   ├── page.js            # Homepage
│   │   ├── globals.css        # Global styles
│   │   ├── loading.js         # Loading component
│   │   └── error.js           # Error boundary
│   ├── components/            # Reusable components
│   │   ├── books/            # Book-related components
│   │   ├── search/           # Search and filter components
│   │   ├── ui/               # UI components
│   │   └── layout/           # Layout components
│   ├── hooks/                # Custom React hooks
│   └── lib/                  # Utilities and configurations
├── public/                   # Static assets
├── tailwind.config.js       # Tailwind CSS configuration
├── next.config.mjs          # Next.js configuration
├── postcss.config.mjs       # PostCSS configuration
└── package.json             # Dependencies and scripts
🚀 Quick Start
Prerequisites
Node.js 18.17 or later

npm 9.x or later

Installation
Clone the repository

bash
git clone https://github.com/yourusername/book-explorer.git
cd book-explorer
Install dependencies

bash
npm install
Set up environment variables (optional)

bash
# Create .env.local file
echo "NEXT_PUBLIC_APP_NAME='Book Explorer'" > .env.local
Run the development server

bash
npm run dev
Open your browser
Navigate to http://localhost:3000

Available Scripts
Script	Description
npm run dev	Start development server with hot reload
npm run build	Build for production
npm start	Start production server
npm run lint	Run ESLint for code quality
📖 How to Use
Searching for Books
Use the search bar on the homepage or header

Type title, author, or subject keywords

Results appear instantly with debounced search

Filtering Books
Click "Show Advanced" in the filter panel

Select languages, subjects, or sort options

Active filters show with remove options

Viewing Book Details
Click any book card or "View Details" button

See complete book information

Download in preferred format

Saving Favorites
Click the heart icon on any book card

View saved books in the "Favorites" page

Favorites persist across browser sessions

🔧 Configuration
Tailwind CSS
Customize colors, fonts, and styles in tailwind.config.js:

javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          // ... custom color palette
        },
      },
    },
  },
};
Next.js Configuration
Modify build settings in next.config.mjs:

javascript
const nextConfig = {
  images: {
    domains: ['www.gutenberg.org', 'gutendex.com'],
  },
};
🌐 API Integration
Gutendex API
The app uses the Gutendex API which provides access to Project Gutenberg's collection.

Key Endpoints Used:

GET /books - List books with pagination

GET /books/{id} - Get single book details

Query parameters: search, languages, topic, page

Example API Call:

javascript
// Fetch books with search and filters
const response = await fetch('https://gutendex.com/books?search=shakespeare&languages=en');
Local API Routes
Custom API routes are available at /api/books for server-side fetching if needed.

📱 Responsive Design
The application is fully responsive with breakpoints:

Device	Breakpoint	Features
Mobile	< 640px	Stacked layout, touch-friendly buttons
Tablet	640px - 1024px	Adaptive grids, optimized spacing
Desktop	> 1024px	Full features, side-by-side layouts
♿ Accessibility
Semantic HTML: Proper heading hierarchy and landmarks

ARIA Labels: Screen reader support throughout

Keyboard Navigation: Full tab navigation support

Color Contrast: WCAG AA compliant color combinations

Focus Management: Visible focus indicators

🧪 Testing
Manual Testing Checklist
Search functionality with various queries

Filter application and removal

Pagination navigation

Book details page loading

Favorite system persistence

Download links functionality

Mobile responsive behavior

Browser compatibility (Chrome, Firefox, Safari)

Performance Metrics
Lighthouse score: 95+ Performance

First Contentful Paint: < 1.5s

Time to Interactive: < 3s

Bundle size: < 150KB gzipped

🚢 Deployment
Vercel (Recommended)
bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
Netlify
Connect your Git repository

Set build command: npm run build

Set publish directory: .next

Self-hosting
bash
# Build the application
npm run build

# Start production server
npm start
🔄 Development Workflow
Branch Strategy
text
main           # Production releases
develop        # Integration branch
feature/*      # New features
bugfix/*       # Bug fixes
release/*      # Release preparation
Commit Convention
feat: New features

fix: Bug fixes

docs: Documentation changes

style: Code formatting

refactor: Code restructuring

test: Testing related

chore: Maintenance tasks

🐛 Troubleshooting
Common Issues
Issue: "Module not found" errors

bash
# Solution: Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
Issue: Font loading errors

bash
# Solution: Update font configuration
# Use Google Fonts CDN instead of next/font
Issue: API rate limiting

bash
# Solution: Implement client-side caching
# The app already includes 1-hour cache headers
Debug Mode
Enable debug logging:

javascript
// In development, check browser console for:
// - API request URLs
// - Response times
// - Error details
📈 Performance Optimization
Implemented Optimizations
Image Optimization: Next.js Image component with WebP conversion

Code Splitting: Automatic route-based code splitting

API Caching: 1-hour revalidation for book data

Bundle Analysis: Tree-shaking and minification

Lazy Loading: Components load on demand

Monitoring
Web Vitals: Core Web Vitals tracking

Error Tracking: Uncaught error monitoring

Analytics: User behavior tracking (optional)

🔗 Related Projects
Project Gutenberg - Source of free eBooks

Gutendex - Project Gutenberg API

Next.js Documentation - Framework docs

Tailwind CSS - Styling framework

👥 Contributing
We welcome contributions! Here's how:

Fork the repository

Create a feature branch: git checkout -b feature/amazing-feature

Commit your changes: git commit -m 'Add amazing feature'

Push to the branch: git push origin feature/amazing-feature

Open a Pull Request

Development Guidelines
Follow existing code style and patterns

Add tests for new features

Update documentation as needed

Ensure responsive design compatibility

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Project Gutenberg for providing free eBooks

Gutendex for the excellent API

Next.js Team for the amazing framework

Tailwind CSS for the utility-first CSS

All Contributors who help improve this project

📞 Support
For support, please:

Check the Issues page

Create a new issue if your problem isn't documented

Include browser version, error messages, and steps to reproduce

Happy Reading! 📖✨

Built with ❤️ by [Your Name] using Next.js and Gutendex API.

https://img.shields.io/github/stars/yourusername/book-explorer.svg?style=social
https://img.shields.io/twitter/follow/yourhandle.svg?style=social

