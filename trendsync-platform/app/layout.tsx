import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Navigation } from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TrendSync - AI-Powered News Aggregation & Social Media Automation",
  description:
    "Automate news aggregation, AI summarization, and social media crossposting across TikTok, Instagram, and Facebook.",
  keywords: ["news aggregation", "AI summarization", "social media automation", "TikTok", "Instagram", "Facebook"],
  authors: [{ name: "TrendSync Team" }],
  openGraph: {
    title: "TrendSync - AI-Powered News Platform",
    description: "Streamline news consumption with AI-powered summaries and automated social media engagement.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrendSync - AI-Powered News Platform",
    description: "Automate news aggregation and social media crossposting with AI.",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navigation />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
