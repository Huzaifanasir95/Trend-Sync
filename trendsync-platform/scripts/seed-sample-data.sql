-- Seed sample data for TrendSync platform
-- This script populates the database with sample articles and social posts

-- Insert sample articles
INSERT INTO articles (title, summary, content, source, source_url, published_at, image_url, region, city, slug, tags) VALUES
(
    'AI Revolution Transforms Global Healthcare Systems',
    'Artificial intelligence is revolutionizing healthcare delivery worldwide, with new diagnostic tools and treatment protocols showing remarkable success rates across major medical centers.',
    'The healthcare industry is experiencing an unprecedented transformation as artificial intelligence technologies become increasingly integrated into medical practice. From diagnostic imaging to treatment planning, AI is reshaping how healthcare professionals deliver care to patients worldwide.',
    'TechHealth Today',
    'https://example.com/ai-healthcare',
    '2024-01-15 10:30:00+00',
    '/placeholder.svg?height=400&width=600',
    'Global',
    'Multiple',
    'ai-revolution-healthcare',
    ARRAY['AI', 'Healthcare', 'Technology', 'Medical Innovation']
),
(
    'Climate Summit Reaches Historic Agreement',
    'World leaders at the latest climate summit have reached a groundbreaking agreement on carbon reduction targets, marking a significant step forward in global environmental policy.',
    'In a landmark decision that could reshape global environmental policy, world leaders have reached consensus on ambitious carbon reduction targets at the latest climate summit.',
    'Environmental News Network',
    'https://example.com/climate-summit',
    '2024-01-15 08:15:00+00',
    '/placeholder.svg?height=400&width=600',
    'Europe',
    'Geneva',
    'climate-summit-agreement',
    ARRAY['Climate', 'Environment', 'Politics', 'Sustainability']
),
(
    'Tech Giants Announce Quantum Computing Breakthrough',
    'Major technology companies have unveiled significant advances in quantum computing capabilities, potentially accelerating the timeline for practical quantum applications.',
    'The quantum computing landscape has been transformed by recent breakthroughs announced by leading technology companies, bringing practical quantum applications closer to reality.',
    'Quantum Tech Weekly',
    'https://example.com/quantum-breakthrough',
    '2024-01-15 06:45:00+00',
    '/placeholder.svg?height=400&width=600',
    'Americas',
    'San Francisco',
    'quantum-computing-breakthrough',
    ARRAY['Quantum Computing', 'Technology', 'Innovation', 'Science']
),
(
    'Space Mission Discovers New Exoplanets',
    'The latest space exploration mission has identified several potentially habitable exoplanets, expanding our understanding of planetary systems beyond our solar system.',
    'A groundbreaking space mission has yielded remarkable discoveries, identifying multiple exoplanets that could potentially harbor life, revolutionizing our understanding of the universe.',
    'Space Discovery Journal',
    'https://example.com/space-discovery',
    '2024-01-14 22:20:00+00',
    '/placeholder.svg?height=400&width=600',
    'Global',
    'Multiple',
    'space-mission-exoplanets',
    ARRAY['Space', 'Astronomy', 'Science', 'Discovery']
),
(
    'Renewable Energy Milestone Achieved',
    'Several countries have reached significant renewable energy milestones, with solar and wind power now accounting for over 50% of their total energy production.',
    'The renewable energy sector has achieved a historic milestone as multiple countries report that clean energy sources now provide the majority of their electricity generation.',
    'Green Energy Today',
    'https://example.com/renewable-milestone',
    '2024-01-14 16:10:00+00',
    '/placeholder.svg?height=400&width=600',
    'Europe',
    'Copenhagen',
    'renewable-energy-milestone',
    ARRAY['Renewable Energy', 'Sustainability', 'Environment', 'Technology']
);

-- Insert sample social media posts
INSERT INTO social_posts (article_id, platform, caption, hashtags, status, scheduled_at, engagement_data) VALUES
(
    (SELECT id FROM articles WHERE slug = 'ai-revolution-healthcare'),
    'tiktok',
    '🔥 AI is changing healthcare forever! New diagnostic tools are achieving 95% accuracy rates 🤖⚕️ #AI #Healthcare #Technology #Innovation #FYP',
    ARRAY['#AI', '#Healthcare', '#Technology', '#Innovation', '#FYP'],
    'posted',
    '2024-01-15 14:30:00+00',
    '{"likes": 1234, "shares": 89, "comments": 45, "views": 15678}'::jsonb
),
(
    (SELECT id FROM articles WHERE slug = 'ai-revolution-healthcare'),
    'instagram',
    'Artificial intelligence is revolutionizing healthcare delivery worldwide! 🏥✨ New diagnostic tools and treatment protocols are showing remarkable success rates across major medical centers. The future of medicine is here! 

#AI #Healthcare #Technology #MedicalInnovation #Innovation #TechNews #HealthTech #FutureOfMedicine',
    ARRAY['#AI', '#Healthcare', '#Technology', '#MedicalInnovation'],
    'posted',
    '2024-01-15 14:30:00+00',
    '{"likes": 892, "comments": 67, "saves": 234}'::jsonb
),
(
    (SELECT id FROM articles WHERE slug = 'climate-summit-agreement'),
    'facebook',
    'Historic Climate Summit Agreement Reached! 🌍

World leaders have reached a groundbreaking agreement on carbon reduction targets, marking a significant step forward in global environmental policy.

This could be the turning point we''ve been waiting for in the fight against climate change. What are your thoughts on these new commitments? 

#Climate #Environment #Sustainability #ClimateAction',
    ARRAY['#Climate', '#Environment', '#Sustainability'],
    'scheduled',
    '2024-01-15 18:00:00+00',
    NULL
),
(
    (SELECT id FROM articles WHERE slug = 'quantum-computing-breakthrough'),
    'tiktok',
    '🚀 QUANTUM COMPUTING BREAKTHROUGH! Tech giants just announced major advances that could change everything! The future is quantum ⚛️ #QuantumComputing #Technology #Innovation #TechNews #Science',
    ARRAY['#QuantumComputing', '#Technology', '#Innovation'],
    'failed',
    '2024-01-15 12:00:00+00',
    NULL
);

-- Insert sample user preferences
INSERT INTO user_preferences (user_id, preferred_regions, preferred_cities, auto_post_enabled, preferred_post_times) VALUES
(
    gen_random_uuid(),
    ARRAY['Americas', 'Europe'],
    ARRAY['New York', 'London', 'San Francisco'],
    true,
    '{"tiktok": ["14:00", "18:00", "21:00"], "instagram": ["12:00", "17:00", "20:00"], "facebook": ["09:00", "15:00", "19:00"]}'::jsonb
);

-- Insert sample workflow jobs
INSERT INTO workflow_jobs (job_type, status, parameters, result, started_at, completed_at) VALUES
(
    'news_scraping',
    'completed',
    '{"region": "Global", "sources": ["NewsAPI", "GNews"], "limit": 50}'::jsonb,
    '{"articles_found": 47, "articles_processed": 45, "articles_stored": 43}'::jsonb,
    '2024-01-15 09:00:00+00',
    '2024-01-15 09:15:00+00'
),
(
    'social_posting',
    'completed',
    '{"article_id": "ai-revolution-healthcare", "platforms": ["tiktok", "instagram", "facebook"]}'::jsonb,
    '{"posts_created": 3, "posts_scheduled": 3, "posts_successful": 2, "posts_failed": 1}'::jsonb,
    '2024-01-15 14:25:00+00',
    '2024-01-15 14:35:00+00'
),
(
    'caption_generation',
    'running',
    '{"article_id": "quantum-computing-breakthrough", "platforms": ["tiktok", "instagram"]}'::jsonb,
    NULL,
    '2024-01-15 16:00:00+00',
    NULL
);
