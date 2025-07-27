import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check if n8n workflow is running or get status
    const n8nStatusUrl = process.env.N8N_STATUS_URL || 'http://localhost:5678/api/v1/workflows'
    
    // This would require n8n API authentication
    // For now, we'll return a simple status
    
    return NextResponse.json({
      success: true,
      status: 'ready',
      message: 'News scraping workflow is ready',
      lastRun: null, // You can implement this by storing last run time in database
      nextScheduled: 'Every 3 hours' // Based on your cron schedule
    })

  } catch (error) {
    console.error('Error checking workflow status:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to check workflow status'
      },
      { status: 500 }
    )
  }
}
