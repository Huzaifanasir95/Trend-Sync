import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Article {
  id: string
  title: string
  summary: string
  content?: string
  source: string
  source_url?: string
  published_at: string
  image_url?: string
  region?: string
  city?: string
  slug: string
  tags?: string[]
  created_at: string
  updated_at: string
}

export interface SocialPost {
  id: string
  article_id: string
  platform: "tiktok" | "instagram" | "facebook"
  post_id?: string
  caption: string
  hashtags?: string[]
  status: "pending" | "scheduled" | "posted" | "failed"
  scheduled_at?: string
  posted_at?: string
  video_url?: string
  engagement_data?: {
    likes?: number
    shares?: number
    comments?: number
    views?: number
    saves?: number
  }
  error_message?: string
  created_at: string
  updated_at: string
}

export interface WorkflowJob {
  id: string
  job_type: string
  status: "pending" | "running" | "completed" | "failed"
  parameters?: Record<string, any>
  result?: Record<string, any>
  error_message?: string
  started_at?: string
  completed_at?: string
  created_at: string
}

// Database functions
export const db = {
  // Articles
  async getArticles(filters?: {
    region?: string
    city?: string
    limit?: number
    offset?: number
  }) {
    let query = supabase.from("articles").select("*").order("published_at", { ascending: false })

    if (filters?.region && filters.region !== "all") {
      query = query.eq("region", filters.region)
    }

    if (filters?.city) {
      query = query.ilike("city", `%${filters.city}%`)
    }

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
    }

    const { data, error } = await query

    if (error) throw error
    return data as Article[]
  },

  async getArticleBySlug(slug: string) {
    const { data, error } = await supabase.from("articles").select("*").eq("slug", slug).single()

    if (error) throw error
    return data as Article
  },

  async createArticle(article: Omit<Article, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase.from("articles").insert(article).select().single()

    if (error) throw error
    return data as Article
  },

  // Social Posts
  async getSocialPosts(filters?: {
    article_id?: string
    platform?: string
    status?: string
    limit?: number
  }) {
    let query = supabase
      .from("social_posts")
      .select(`
        *,
        articles (
          title,
          slug
        )
      `)
      .order("created_at", { ascending: false })

    if (filters?.article_id) {
      query = query.eq("article_id", filters.article_id)
    }

    if (filters?.platform) {
      query = query.eq("platform", filters.platform)
    }

    if (filters?.status) {
      query = query.eq("status", filters.status)
    }

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query

    if (error) throw error
    return data as (SocialPost & { articles: { title: string; slug: string } })[]
  },

  async createSocialPost(post: Omit<SocialPost, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase.from("social_posts").insert(post).select().single()

    if (error) throw error
    return data as SocialPost
  },

  async updateSocialPost(id: string, updates: Partial<SocialPost>) {
    const { data, error } = await supabase.from("social_posts").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data as SocialPost
  },

  // Workflow Jobs
  async createWorkflowJob(job: Omit<WorkflowJob, "id" | "created_at">) {
    const { data, error } = await supabase.from("workflow_jobs").insert(job).select().single()

    if (error) throw error
    return data as WorkflowJob
  },

  async updateWorkflowJob(id: string, updates: Partial<WorkflowJob>) {
    const { data, error } = await supabase.from("workflow_jobs").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data as WorkflowJob
  },
}
