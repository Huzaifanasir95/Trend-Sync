import { NextResponse } from 'next/server'

// Default Pakistani news keywords
const defaultKeywords = {
  politics: ['imran khan', 'pti', 'pmln', 'ppp', 'parliament', 'election', 'government', 'minister', 'prime minister', 'chief minister'],
  economy: ['rupee', 'inflation', 'gdp', 'economic', 'finance', 'budget', 'stock exchange', 'investment', 'business'],
  security: ['terrorism', 'security', 'army', 'police', 'operation', 'attack', 'blast', 'military'],
  international: ['china', 'india', 'usa', 'afghanistan', 'cpec', 'foreign ministry', 'embassy', 'border'],
  sports: ['cricket', 'hockey', 'football', 'olympics', 'babar azam', 'psl', 'fifa', 'match'],
  education: ['university', 'school', 'education', 'students', 'exams', 'hec', 'admissions'],
  health: ['covid', 'health', 'hospital', 'medicine', 'vaccine', 'doctor', 'pandemic'],
  technology: ['internet', 'mobile', 'tech', 'digital', 'app', 'software', 'pakistan tech'],
  society: ['culture', 'social', 'women', 'youth', 'family', 'community', 'rights']
}

const priorityKeywords = [
  'breaking', 'urgent', 'exclusive', 'latest', 'developing',
  'karachi', 'lahore', 'islamabad', 'punjab', 'sindh', 'kpk', 'balochistan'
]

export async function GET() {
  return NextResponse.json({
    success: true,
    keywords: defaultKeywords,
    priorityKeywords: priorityKeywords,
    totalCategories: Object.keys(defaultKeywords).length,
    totalKeywords: Object.values(defaultKeywords).flat().length
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { category, keywords, priority = false } = body

    if (!category || !keywords) {
      return NextResponse.json(
        { success: false, error: 'Category and keywords are required' },
        { status: 400 }
      )
    }

    // For now, we'll just return the updated keywords
    // In a real app, you'd save these to a database
    const updatedKeywords = { ...defaultKeywords }
    
    if (priority) {
      // Add to priority keywords
      const newPriorityKeywords = [...priorityKeywords, ...keywords].filter((item, index, arr) => arr.indexOf(item) === index)
      
      return NextResponse.json({
        success: true,
        message: 'Priority keywords updated',
        priorityKeywords: newPriorityKeywords
      })
    } else {
      // Add to category keywords
      const updatedKeywords: Record<string, string[]> = { ...defaultKeywords }
      
      if (updatedKeywords[category]) {
        updatedKeywords[category] = [...updatedKeywords[category], ...keywords].filter((item, index, arr) => arr.indexOf(item) === index)
      } else {
        updatedKeywords[category] = keywords
      }

      return NextResponse.json({
        success: true,
        message: `Keywords added to ${category} category`,
        category: category,
        keywords: updatedKeywords[category]
      })
    }

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update keywords' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { n8nWebhookUrl, keywords } = body

    if (!n8nWebhookUrl) {
      return NextResponse.json(
        { success: false, error: 'n8n webhook URL is required' },
        { status: 400 }
      )
    }

    // Trigger n8n workflow with custom keywords
    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: 'tribune',
        customKeywords: keywords || defaultKeywords,
        priorityKeywords: priorityKeywords,
        timestamp: new Date().toISOString(),
        trigger: 'keyword-based'
      })
    })

    if (!response.ok) {
      throw new Error(`n8n workflow failed: ${response.statusText}`)
    }

    const result = await response.json()

    return NextResponse.json({
      success: true,
      message: 'Keyword-based news scraping triggered',
      data: result,
      keywordsUsed: keywords || defaultKeywords
    })

  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to trigger keyword-based scraping',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
