import { GUTENDEX_API, BOOKS_PER_PAGE } from './constants';

/**
 * Fetches books from Gutendex API with optional parameters
 * @param {Object} params - Search parameters
 * @param {string} params.search - Search query
 * @param {number} params.page - Page number (1-indexed)
 * @param {string} params.languages - Filter by language codes (comma-separated)
 * @param {string} params.topic - Filter by subject/topic
 * @returns {Promise<Object>} API response with books data
 */
export async function fetchBooks(params = {}) {
  const { search, page = 1, languages, topic } = params;
  
  const queryParams = new URLSearchParams();
  
  if (search && search.trim()) queryParams.append('search', search.trim());
  if (page > 1) queryParams.append('page', page);
  if (languages) queryParams.append('languages', languages);
  if (topic) queryParams.append('topic', topic);
  
  // Add limit parameter
  queryParams.append('limit', BOOKS_PER_PAGE);
  
  const url = queryParams.toString() 
    ? `${GUTENDEX_API}?${queryParams.toString()}`
    : GUTENDEX_API;
  
  console.log('Fetching books from:', url);
  
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      ...data,
      currentPage: page,
      totalPages: Math.ceil(data.count / BOOKS_PER_PAGE)
    };
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
}

/**
 * Fetches a single book by ID
 * @param {number|string} id - Book ID
 * @returns {Promise<Object>} Book data
 */
export async function fetchBookById(id) {
  try {
    const response = await fetch(`${GUTENDEX_API}/${id}/`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching book ${id}:`, error);
    throw error;
  }
}

/**
 * Fetches popular books (high download count)
 * @param {number} limit - Number of books to fetch
 * @returns {Promise<Array>} Array of popular books
 */
export async function fetchPopularBooks(limit = 12) {
  try {
    const response = await fetch(`${GUTENDEX_API}?sort=download_count&limit=${limit}`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching popular books:', error);
    throw error;
  }
}

/**
 * Fetches books by multiple IDs
 * @param {Array<number>} ids - Array of book IDs
 * @returns {Promise<Array>} Array of books
 */
export async function fetchBooksByIds(ids) {
  try {
    const promises = ids.map(id => fetchBookById(id));
    return await Promise.all(promises);
  } catch (error) {
    console.error('Error fetching books by IDs:', error);
    throw error;
  }
}