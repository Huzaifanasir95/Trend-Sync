-- TrendSync Database Schema
-- This script creates the necessary tables for the TrendSync platform

-- Articles table to store news articles
CREATE TABLE IF NOT EXISTS articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    content TEXT,
    source VARCHAR(255) NOT NULL,
    source_url TEXT,
    published_at TIMESTAMP WITH TIME ZONE NOT NULL,
    image_url TEXT,
    region VARCHAR(100),
    city VARCHAR(100),
    slug VARCHAR(255) UNIQUE NOT NULL,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Social media posts table
CREATE TABLE IF NOT EXISTS social_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    platform VARCHAR(50) NOT NULL, -- 'tiktok', 'instagram', 'facebook'
    post_id VARCHAR(255), -- Platform-specific post ID
    caption TEXT NOT NULL,
    hashtags TEXT[],
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'scheduled', 'posted', 'failed'
    scheduled_at TIMESTAMP WITH TIME ZONE,
    posted_at TIMESTAMP WITH TIME ZONE,
    video_url TEXT, -- For TikTok/Instagram videos
    engagement_data JSONB, -- Store likes, shares, comments
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User preferences table (for future user management)
CREATE TABLE IF NOT EXISTS user_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    preferred_regions TEXT[],
    preferred_cities TEXT[],
    auto_post_enabled BOOLEAN DEFAULT false,
    preferred_post_times JSONB, -- Store optimal posting times for each platform
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workflow jobs table to track n8n automation jobs
CREATE TABLE IF NOT EXISTS workflow_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_type VARCHAR(100) NOT NULL, -- 'news_scraping', 'social_posting', 'caption_generation'
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'running', 'completed', 'failed'
    parameters JSONB, -- Store job parameters
    result JSONB, -- Store job results
    error_message TEXT,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_region ON articles(region);
CREATE INDEX IF NOT EXISTS idx_articles_city ON articles(city);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_social_posts_article_id ON social_posts(article_id);
CREATE INDEX IF NOT EXISTS idx_social_posts_platform ON social_posts(platform);
CREATE INDEX IF NOT EXISTS idx_social_posts_status ON social_posts(status);
CREATE INDEX IF NOT EXISTS idx_social_posts_scheduled_at ON social_posts(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_workflow_jobs_status ON workflow_jobs(status);
CREATE INDEX IF NOT EXISTS idx_workflow_jobs_type ON workflow_jobs(job_type);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_social_posts_updated_at BEFORE UPDATE ON social_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
