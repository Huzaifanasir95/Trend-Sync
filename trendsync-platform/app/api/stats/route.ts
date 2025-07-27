import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // TODO: Replace with actual database queries
    // For now, return zero stats since we removed dummy data
    const stats = {
      articlesProcessed: 0,
      socialPosts: 0,
      regionsCovered: 0,
      activeUsers: 0
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
