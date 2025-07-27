import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const region = searchParams.get("region")
  const city = searchParams.get("city")
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const sort = searchParams.get("sort") || "recent"

  try {
    let query = supabase
      .from('articles')
      .select('*')

    // Apply filters
    if (region && region !== "all" && region !== "Global") {
      query = query.eq('region', region)
    }

    if (city && city !== "Multiple") {
      query = query.eq('city', city)
    }

    // Apply sorting
    if (sort === "recent") {
      query = query.order('published_at', { ascending: false })
    } else {
      query = query.order('created_at', { ascending: false })
    }

    // Apply limit
    query = query.limit(limit)

    const { data: articles, error } = await query

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ 
        success: false, 
        error: "Failed to fetch articles from database" 
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      articles: articles || [],
      total: articles?.length || 0,
      page: 1,
      limit: limit,
      hasMore: (articles?.length || 0) === limit
    })
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ 
      success: false, 
      error: "Failed to fetch news" 
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { region, city, sources } = body

    // In production, this would trigger n8n workflow:
    // 1. Send webhook to n8n with region/city parameters
    // 2. n8n scrapes news from specified sources
    // 3. AI processes and summarizes articles
    // 4. Data is stored in database
    // 5. Return updated news feed

    // Mock response
    return NextResponse.json({
      success: true,
      message: "News aggregation started",
      jobId: `job_${Date.now()}`,
    })
  } catch (error) {
    console.error("Error starting news aggregation:", error)
    return NextResponse.json({ success: false, error: "Failed to start news aggregation" }, { status: 500 })
  }
}
