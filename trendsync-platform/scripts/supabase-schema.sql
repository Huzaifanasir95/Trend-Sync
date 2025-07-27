-- TrendSync Pakistan News Database Schema
-- Run this in Supabase SQL Editor

-- Create articles table
CREATE TABLE IF NOT EXISTS public.articles (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    summary TEXT,
    content TEXT,
    source TEXT NOT NULL,
    source_url TEXT UNIQUE,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    image_url TEXT,
    region TEXT DEFAULT 'Pakistan',
    city TEXT,
    slug TEXT UNIQUE,
    tags TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON public.articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_source ON public.articles(source);
CREATE INDEX IF NOT EXISTS idx_articles_region ON public.articles(region);
CREATE INDEX IF NOT EXISTS idx_articles_city ON public.articles(city);
CREATE INDEX IF NOT EXISTS idx_articles_tags ON public.articles USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);

-- Create social_posts table for tracking shared content
CREATE TABLE IF NOT EXISTS public.social_posts (
    id BIGSERIAL PRIMARY KEY,
    article_id BIGINT REFERENCES public.articles(id) ON DELETE CASCADE,
    platform TEXT NOT NULL, -- 'twitter', 'facebook', 'linkedin'
    post_content TEXT NOT NULL,
    post_url TEXT,
    scheduled_at TIMESTAMPTZ,
    posted_at TIMESTAMPTZ,
    status TEXT DEFAULT 'pending', -- 'pending', 'posted', 'failed'
    engagement_stats JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for social_posts
CREATE INDEX IF NOT EXISTS idx_social_posts_article_id ON public.social_posts(article_id);
CREATE INDEX IF NOT EXISTS idx_social_posts_platform ON public.social_posts(platform);
CREATE INDEX IF NOT EXISTS idx_social_posts_status ON public.social_posts(status);
CREATE INDEX IF NOT EXISTS idx_social_posts_posted_at ON public.social_posts(posted_at DESC);

-- Create dashboard_stats table for analytics
CREATE TABLE IF NOT EXISTS public.dashboard_stats (
    id BIGSERIAL PRIMARY KEY,
    date DATE DEFAULT CURRENT_DATE,
    total_articles INTEGER DEFAULT 0,
    articles_today INTEGER DEFAULT 0,
    social_posts_today INTEGER DEFAULT 0,
    top_sources JSONB DEFAULT '[]',
    top_regions JSONB DEFAULT '[]',
    engagement_summary JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create unique constraint on date for dashboard_stats
CREATE UNIQUE INDEX IF NOT EXISTS idx_dashboard_stats_date ON public.dashboard_stats(date);

-- Enable Row Level Security (RLS)
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dashboard_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust as needed for your security requirements)
CREATE POLICY "Allow public read access on articles" ON public.articles
    FOR SELECT USING (true);

CREATE POLICY "Allow service role full access on articles" ON public.articles
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow public read access on social_posts" ON public.social_posts
    FOR SELECT USING (true);

CREATE POLICY "Allow service role full access on social_posts" ON public.social_posts
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow public read access on dashboard_stats" ON public.dashboard_stats
    FOR SELECT USING (true);

CREATE POLICY "Allow service role full access on dashboard_stats" ON public.dashboard_stats
    FOR ALL USING (auth.role() = 'service_role');

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON public.articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_social_posts_updated_at BEFORE UPDATE ON public.social_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dashboard_stats_updated_at BEFORE UPDATE ON public.dashboard_stats
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial dashboard stats record
INSERT INTO public.dashboard_stats (date, total_articles, articles_today, social_posts_today)
VALUES (CURRENT_DATE, 0, 0, 0)
ON CONFLICT (date) DO NOTHING;

-- Create a view for recent articles (last 7 days)
CREATE OR REPLACE VIEW public.recent_articles AS
SELECT 
    id, title, summary, source, source_url, published_at, image_url, region, city, tags
FROM public.articles 
WHERE published_at >= NOW() - INTERVAL '7 days'
ORDER BY published_at DESC;

-- Create a view for article statistics
CREATE OR REPLACE VIEW public.article_stats AS
SELECT 
    COUNT(*) as total_articles,
    COUNT(CASE WHEN published_at >= CURRENT_DATE THEN 1 END) as articles_today,
    COUNT(CASE WHEN published_at >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as articles_this_week,
    COUNT(DISTINCT source) as unique_sources,
    COUNT(DISTINCT region) as unique_regions
FROM public.articles;
