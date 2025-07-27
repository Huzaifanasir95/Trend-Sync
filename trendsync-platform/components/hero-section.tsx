import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, Zap, Share2 } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            TrendSync
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Automate news aggregation, AI summarization, and social media crossposting
          </p>
          <p className="text-lg mb-10 text-blue-200 max-w-2xl mx-auto">
            Streamline news consumption with AI-powered summaries and automated social media engagement across TikTok,
            Instagram, and Facebook.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/dashboard">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
              View Demo
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <Globe className="h-12 w-12 mb-4 text-blue-200" />
              <h3 className="text-lg font-semibold mb-2">Global News</h3>
              <p className="text-blue-200 text-sm">Aggregate from multiple sources worldwide</p>
            </div>
            <div className="flex flex-col items-center">
              <Zap className="h-12 w-12 mb-4 text-blue-200" />
              <h3 className="text-lg font-semibold mb-2">AI Summaries</h3>
              <p className="text-blue-200 text-sm">Intelligent 50-100 word summaries</p>
            </div>
            <div className="flex flex-col items-center">
              <Share2 className="h-12 w-12 mb-4 text-blue-200" />
              <h3 className="text-lg font-semibold mb-2">Auto Posting</h3>
              <p className="text-blue-200 text-sm">Cross-post to all social platforms</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
