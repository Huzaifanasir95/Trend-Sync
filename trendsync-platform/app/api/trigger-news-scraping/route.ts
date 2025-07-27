import { NextResponse } from 'next/server'

export async function POST() {
  try {
    // Replace this URL with your actual n8n webhook URL
    // You'll get this URL from your n8n webhook trigger node
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/news-scraping'
    
    // Trigger the n8n workflow
    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: 'tribune',
        timestamp: new Date().toISOString(),
        trigger: 'manual'
      })
    })

    if (!response.ok) {
      throw new Error(`n8n workflow failed: ${response.statusText}`)
    }

    const result = await response.json()

    return NextResponse.json({
      success: true,
      message: 'News scraping triggered successfully',
      data: result
    })

  } catch (error) {
    console.error('Error triggering news scraping:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to trigger news scraping',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST method to trigger news scraping',
    endpoints: {
      trigger: 'POST /api/trigger-news-scraping',
      status: 'GET /api/news-scraping-status'
    }
  })
}
