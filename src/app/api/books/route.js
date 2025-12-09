import { NextResponse } from 'next/server';

/**
 * API route for fetching books
 * This can be used for server-side fetching if needed
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Build API URL
    const apiUrl = new URL('https://gutendex.com/books');
    
    // Copy query parameters
    for (const [key, value] of searchParams.entries()) {
      apiUrl.searchParams.append(key, value);
    }
    
    // Fetch from Gutendex API
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Gutendex API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Add CORS headers
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    
    return NextResponse.json(data, { headers });
    
  } catch (error) {
    console.error('API error:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch books', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * Handle OPTIONS request for CORS
 */
export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}