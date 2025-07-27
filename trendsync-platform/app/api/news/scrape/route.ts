import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { region = 'Global', country = 'us', category = 'general' } = body

    // n8n webhook URL - you'll need to replace this with your actual n8n webhook URL
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/news-scraping'

    // Trigger the n8n workflow
    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        region,
        country,
        category,
        timestamp: new Date().toISOString()
      })
    })

    if (!response.ok) {
      throw new Error(`n8n workflow failed: ${response.statusText}`)
    }

    const result = await response.json()

    return NextResponse.json({
      success: true,
      message: 'News aggregation started successfully',
      jobId: `scraping_${Date.now()}`,
      n8nResponse: result
    })
  } catch (error) {
    console.error('Error triggering news aggregation:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to trigger news aggregation',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  // Health check endpoint
  return NextResponse.json({
    status: 'active',
    message: 'News aggregation service is running',
    timestamp: new Date().toISOString()
  })
}
