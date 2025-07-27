import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, MapPin, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SocialSharePanel } from "@/components/social-share-panel"

// Mock function to get article by slug
async function getArticle(slug: string) {
  // In real app, this would fetch from your database
  return {
    id: "1",
    title: "AI Revolution Transforms Global Healthcare Systems",
    summary:
      "Artificial intelligence is revolutionizing healthcare delivery worldwide, with new diagnostic tools and treatment protocols showing remarkable success rates across major medical centers.",
    content: `
      <p>The healthcare industry is experiencing an unprecedented transformation as artificial intelligence technologies become increasingly integrated into medical practice. From diagnostic imaging to treatment planning, AI is reshaping how healthcare professionals deliver care to patients worldwide.</p>
      
      <p>Recent studies show that AI-powered diagnostic tools are achieving accuracy rates of over 95% in detecting various medical conditions, including cancer, cardiovascular diseases, and neurological disorders. This represents a significant improvement over traditional diagnostic methods and is helping to reduce both false positives and false negatives.</p>
      
      <p>Major medical centers across the globe are reporting substantial improvements in patient outcomes since implementing AI-driven protocols. The technology is particularly effective in analyzing complex medical imaging, such as MRI scans, CT scans, and X-rays, where subtle patterns might be missed by human observers.</p>
      
      <p>Healthcare professionals are embracing these tools not as replacements for human expertise, but as powerful assistants that enhance their ability to provide accurate diagnoses and effective treatments. The integration of AI is also helping to reduce the time required for diagnosis, enabling faster treatment initiation and better patient outcomes.</p>
      
      <p>Looking ahead, experts predict that AI will continue to play an increasingly important role in healthcare, with applications expanding to include personalized medicine, drug discovery, and predictive health analytics.</p>
    `,
    source: "TechHealth Today",
    publishedAt: "2024-01-15T10:30:00Z",
    imageUrl: "/placeholder.svg?height=400&width=800",
    region: "Global",
    city: "Multiple",
    slug: "ai-revolution-healthcare",
    tags: ["AI", "Healthcare", "Technology", "Medical Innovation"],
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticle(slug)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to News
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <div className="relative h-96">
              <Image src={article.imageUrl || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <Badge className="mb-4 bg-white/20 text-white border-white/30">{article.source}</Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {article.city}, {article.region}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <CardContent className="p-8">
              <div className="mb-6">
                <p className="text-lg text-gray-600 leading-relaxed">{article.summary}</p>
              </div>

              <div className="prose prose-lg max-w-none mb-8">
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="border-t pt-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Share this article</h3>
                    <p className="text-gray-600 text-sm">
                      Automatically create social media posts with AI-generated captions
                    </p>
                  </div>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share to Social Media
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <SocialSharePanel article={article} />
          </div>
        </div>
      </div>
    </div>
  )
}
