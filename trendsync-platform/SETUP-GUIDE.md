# Complete Setup Guide: Pakistani News Automation

## Overview
This guide will help you set up the complete Pakistani news aggregation system using n8n, Supabase, and Next.js.

## Step 1: n8n Setup

### 1.1 Install and Start n8n
```bash
# Install n8n globally
npm install -g n8n

# Start n8n
n8n start
```

### 1.2 Import the Workflow
1. Open n8n at `http://localhost:5678`
2. Go to **Workflows** → **Import**
3. Upload the `news-aggregation-workflow.json` file
4. The workflow will appear in your n8n instance

### 1.3 Configure Nodes

#### Webhook Trigger Node:
- **HTTP Method**: POST
- **Path**: `news-scraping`
- **Response Mode**: Response Node
- Copy the webhook URL (e.g., `http://localhost:5678/webhook/news-scraping`)

#### Scrape Tribune Node:
- **Method**: GET
- **URL**: `https://tribune.com.pk/`
- **Timeout**: 30000

#### Extract Tribune Articles Node:
- **Mode**: Run Once for All Items
- The JavaScript code is already configured

#### Basic LLM Chain (Gemini) Node:
- **Source for Prompt**: Define below
- **Prompt**: 
```text
You are a Pakistani news summarization AI for Express Tribune articles. Summarize the following news article in exactly 2-3 clear and concise sentences. Focus on the main facts and maintain objectivity.

Title: {{ $json.title }}
Content: {{ $json.content || $json.summary }}

Requirements:
- Keep it between 100-150 words
- Focus on key facts relevant to Pakistani readers
- Use professional, clear language
- No opinions, just facts

Provide only the summary text, nothing else.
```

#### Process Articles Node:
- The JavaScript code is already configured

#### Create a Row (Supabase) Node:
- **Credential**: TrendSync Supabase
- **Resource**: Row
- **Operation**: Create
- **Table**: articles
- **Fields**: Configure as per the supabase config file

### 1.4 Create Credentials

#### Supabase Credential:
- **Name**: TrendSync Supabase
- **Host**: `ymubvbnjkvamjfbssojl.supabase.co`
- **Service Role Secret**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltYnV2Ym5qa3ZhbWpmYnNzb2psIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzU5Njc1MywiZXhwIjoyMDY5MTcyNzUzfQ.kbg1xyD6cpz6RKL8mk6kGDTgy4xS8JFC6LsOhaYTybA`

#### Google Gemini Credential:
- **Name**: Google Gemini API
- **API Key**: Your Google AI API key

## Step 2: Supabase Setup

### 2.1 Run Database Schema
1. Go to your Supabase dashboard
2. Open **SQL Editor**
3. Copy and paste the content from `scripts/supabase-schema.sql`
4. Click **Run** to execute the schema

### 2.2 Verify Tables
Check that these tables were created:
- `articles`
- `social_posts`
- `dashboard_stats`

## Step 3: Next.js App Configuration

### 3.1 Environment Variables
1. Copy `.env.example` to `.env.local`
2. Update the values:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://ymubvbnjkvamjfbssojl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_from_supabase
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltYnV2Ym5qa3ZhbWpmYnNzb2psIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzU5Njc1MywiZXhwIjoyMDY5MTcyNzUzfQ.kbg1xyD6cpz6RKL8mk6kGDTgy4xS8JFC6LsOhaYTybA
N8N_WEBHOOK_URL=http://localhost:5678/webhook/news-scraping
GOOGLE_AI_API_KEY=your_gemini_api_key
```

### 3.2 Start the App
```bash
cd trendsync-platform
npm run dev
```

## Step 4: Testing the Complete Flow

### 4.1 Manual Trigger Test
1. Open your Next.js app at `http://localhost:3000`
2. Go to the Dashboard
3. Find the "Pakistani News Scraping Control" panel
4. Click "Trigger News Scraping"
5. Watch the n8n workflow execute
6. Check that articles appear in your app

### 4.2 Verify Data Flow
1. **n8n Execution**: Check n8n logs for successful execution
2. **Supabase Data**: Verify articles are stored in the `articles` table
3. **Next.js Display**: Confirm articles appear in the news grid

### 4.3 Check AI Summarization
- Verify that articles have AI-generated summaries
- Check that summaries are contextually relevant to Pakistani news

## Step 5: Automated Scheduling

The workflow includes a **Schedule Trigger** that runs every 3 hours:
- **Rule**: Every 3 hours
- **Type**: Interval
- Automatically scrapes and processes new articles

## Troubleshooting

### Common Issues:

1. **Webhook URL Error**:
   - Ensure n8n is running
   - Copy the correct webhook URL from n8n
   - Update N8N_WEBHOOK_URL in .env.local

2. **Supabase Connection Failed**:
   - Verify service role key is correct
   - Check database schema is properly created
   - Ensure RLS policies are set correctly

3. **Gemini API Error**:
   - Verify your Google AI API key
   - Check API quota and billing
   - Ensure the model name is correct

4. **No Articles Appearing**:
   - Check n8n execution logs
   - Verify Tribune website is accessible
   - Check JavaScript extraction selectors

### Logs to Check:
- n8n execution logs
- Next.js console logs
- Supabase logs
- Browser developer tools

## Success Indicators:
✅ n8n workflow executes without errors
✅ Articles are saved to Supabase
✅ AI summaries are generated
✅ Articles display in Next.js app
✅ Manual trigger works from dashboard
✅ Automatic scheduling is active

## Next Steps:
- Monitor the automatic scraping schedule
- Adjust AI prompts as needed
- Add more Pakistani news sources
- Implement social media posting features
