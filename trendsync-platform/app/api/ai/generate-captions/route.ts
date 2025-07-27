import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, summary, tags, platforms } = body

    // In production, this would use AI SDK with Claude/GPT:
    // import { generateText } from 'ai'
    // import { openai } from '@ai-sdk/openai'

    // const { text } = await generateText({
    //   model: openai('gpt-4'),
    //   prompt: `Generate social media captions for: ${title}...`
    // })

    // Mock AI-generated captions
    const captions = {
      tiktok: `🔥 ${title.slice(0, 50)}... ${tags.map((tag) => `#${tag.toLowerCase().replace(/\s+/g, "")}`).join(" ")} #fyp #viral #trending`,

      instagram: `${summary}\n\n${tags.map((tag) => `#${tag.toLowerCase().replace(/\s+/g, "")}`).join(" ")} #news #technology #innovation`,

      facebook: `${title}\n\n${summary}\n\nWhat are your thoughts on this development? Share your opinions below! 👇\n\n${tags.map((tag) => `#${tag}`).join(" ")}`,
    }

    // Filter captions based on requested platforms
    const filteredCaptions = Object.fromEntries(
      Object.entries(captions).filter(([platform]) => platforms.includes(platform)),
    )

    return NextResponse.json({
      success: true,
      data: {
        captions: filteredCaptions,
        hashtags: tags.map((tag) => `#${tag.toLowerCase().replace(/\s+/g, "")}`),
        generatedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Error generating captions:", error)
    return NextResponse.json({ success: false, error: "Failed to generate captions" }, { status: 500 })
  }
}
