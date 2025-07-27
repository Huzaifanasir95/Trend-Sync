# TrendSync n8n Integration Setup Guide

## Overview
This guide will help you set up n8n workflows to automatically scrape news articles, process them with AI, and store them in your database.

## Prerequisites
1. n8n installed and running (locally or cloud)
2. Supabase database set up with the schema
3. News API keys (NewsAPI, GNews)
4. AI API keys (OpenAI or Anthropic)

## Setup Steps

### 1. Install n8n
```bash
# Option 1: Using npm
npm install -g n8n

# Option 2: Using Docker
docker run -it --rm --name n8n -p 5678:5678 -v ~/.n8n:/home/node/.n8n n8nio/n8n

# Option 3: Using npx (no installation)
npx n8n
```

### 2. Start n8n
```bash
n8n start
```
Access n8n at: http://localhost:5678

### 3. Import the Workflow
1. Open n8n in your browser
2. Click "Import from File"
3. Upload the workflow file: `scripts/n8n-workflows/news-aggregation-workflow.json`

### 4. Configure Credentials
In n8n, set up the following credentials:

#### A. NewsAPI Credentials
- Type: HTTP Request
- Name: `newsApi`
- URL: `https://newsapi.org/v2/top-headlines`
- Headers: `X-API-Key: YOUR_NEWSAPI_KEY`

#### B. GNews API Credentials
- Type: HTTP Request  
- Name: `gNewsApi`
- URL: `https://gnews.io/api/v4/top-headlines`
- Authentication: None (API key in URL)

#### C. Supabase Database
- Type: Postgres
- Name: `supabase-connection`
- Host: Your Supabase host
- Database: postgres
- User: postgres
- Password: Your Supabase password
- Port: 5432
- SSL: true

#### D. AI Service (OpenAI/Anthropic)
- Type: OpenAI
- Name: `openai-api`
- API Key: Your OpenAI API key

### 5. Configure Webhook
1. In the workflow, note the webhook URL
2. Update your `.env` file:
   ```
   N8N_WEBHOOK_URL=http://localhost:5678/webhook/news-scraping
   ```

### 6. Test the Workflow

#### Manual Trigger
Send a POST request to trigger news scraping:
```bash
curl -X POST http://localhost:3000/api/news/scrape \
  -H "Content-Type: application/json" \
  -d '{
    "region": "Global",
    "country": "us", 
    "category": "technology"
  }'
```

#### Automatic Trigger
The workflow includes a cron trigger that runs every 2 hours automatically.

### 7. Workflow Components

The n8n workflow includes these nodes:

1. **Webhook Trigger**: Receives requests from your Next.js app
2. **Schedule Trigger**: Automatically runs every 2 hours  
3. **Fetch NewsAPI**: Gets articles from NewsAPI
4. **Fetch GNews API**: Gets articles from GNews
5. **Merge News Sources**: Combines articles from both sources
6. **AI Summarize Content**: Uses AI to create summaries
7. **Process Articles**: Cleans and formats article data
8. **Save to Database**: Stores articles in Supabase
9. **Webhook Response**: Returns success response

### 8. Monitoring & Debugging

#### Check Workflow Executions
- In n8n, go to "Executions" to see workflow runs
- Check for errors and debug failed executions

#### Check Database
Query your Supabase database to verify articles are being stored:
```sql
SELECT COUNT(*) FROM articles;
SELECT * FROM articles ORDER BY created_at DESC LIMIT 10;
```

#### Frontend Verification
- Visit your Next.js app at http://localhost:3000
- Articles should now appear on the homepage

### 9. Customization Options

#### Modify News Sources
Edit the workflow to add more news sources:
- RSS feeds
- Custom scrapers
- Additional APIs

#### Adjust AI Processing
- Change summarization prompts
- Add sentiment analysis
- Extract keywords/tags

#### Schedule Changes
Modify the cron trigger to change scraping frequency:
- Every hour: `0 * * * *`
- Every 30 minutes: `*/30 * * * *`
- Daily at 9 AM: `0 9 * * *`

### 10. Troubleshooting

#### Common Issues:
1. **Webhook not responding**: Check n8n is running and webhook URL is correct
2. **Database connection failed**: Verify Supabase credentials
3. **API rate limits**: Check your NewsAPI/GNews quotas
4. **AI processing errors**: Verify OpenAI/Anthropic API keys

#### Debug Steps:
1. Test each node individually in n8n
2. Check node execution data
3. Verify credentials are properly set
4. Check n8n logs for detailed errors

## Next Steps
Once news aggregation is working:
1. Set up social media posting workflow
2. Add caption generation with AI
3. Configure video creation for TikTok
4. Set up posting schedules

## Support
- n8n Documentation: https://docs.n8n.io/
- Supabase Documentation: https://supabase.com/docs
- NewsAPI Documentation: https://newsapi.org/docs
