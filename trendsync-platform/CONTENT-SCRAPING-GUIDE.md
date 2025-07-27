# Pakistani News Content Scraping Guide

## 🎯 What Content Gets Scraped

### **Express Tribune Website Scraping**
The system scrapes from `https://tribune.com.pk/` and extracts:

#### **Article Elements:**
- **Headlines** - Main news titles (h1, h2, h3 tags)
- **Summaries** - Article excerpts and lead paragraphs
- **Full Content** - Complete article text when available
- **Images** - Featured article images and thumbnails
- **Publication Dates** - When articles were published
- **Categories** - Article sections (politics, sports, business, etc.)
- **Source URLs** - Direct links to original articles

#### **Pakistani Context Elements:**
- **Geographic Tags** - Karachi, Lahore, Islamabad, Punjab, Sindh, KPK, Balochistan
- **Political Keywords** - PTI, PMLN, PPP, government, elections
- **Economic Terms** - Rupee, inflation, stock exchange, business
- **Cultural References** - Pakistani-specific terms and context

## 🔍 Keyword-Based Filtering System

### **Category Keywords:**

#### **Politics** (15+ keywords)
- `imran khan`, `pti`, `pmln`, `ppp`, `parliament`, `election`, `government`
- `minister`, `prime minister`, `chief minister`, `assembly`, `senate`

#### **Economy** (12+ keywords)  
- `rupee`, `inflation`, `gdp`, `economic`, `finance`, `budget`
- `stock exchange`, `investment`, `business`, `trade`, `export`

#### **Security** (10+ keywords)
- `terrorism`, `security`, `army`, `police`, `operation`
- `attack`, `blast`, `military`, `defense`, `border`

#### **International** (10+ keywords)
- `china`, `india`, `usa`, `afghanistan`, `cpec`
- `foreign ministry`, `embassy`, `border`, `diplomatic`

#### **Sports** (8+ keywords)
- `cricket`, `hockey`, `football`, `olympics`, `babar azam`
- `psl`, `fifa`, `match`, `tournament`

#### **Education** (8+ keywords)
- `university`, `school`, `education`, `students`, `exams`
- `hec`, `admissions`, `scholarship`, `degree`

#### **Health** (8+ keywords)
- `covid`, `health`, `hospital`, `medicine`, `vaccine`
- `doctor`, `pandemic`, `medical`, `treatment`

#### **Technology** (8+ keywords)
- `internet`, `mobile`, `tech`, `digital`, `app`
- `software`, `pakistan tech`, `startup`, `innovation`

#### **Society** (8+ keywords)
- `culture`, `social`, `women`, `youth`, `family`
- `community`, `rights`, `society`, `development`

### **Priority Keywords** (Higher Ranking)
- `breaking`, `urgent`, `exclusive`, `latest`, `developing`
- `karachi`, `lahore`, `islamabad`, `punjab`, `sindh`, `kpk`, `balochistan`

## 🤖 AI Processing Pipeline

### **Content Enhancement:**
1. **Summarization** - Gemini AI creates 2-3 sentence summaries
2. **Categorization** - Automatic tagging based on keywords
3. **Priority Scoring** - Articles ranked by relevance and urgency
4. **Pakistani Context** - AI maintains local relevance and cultural sensitivity

### **Gemini AI Prompt:**
```
You are a Pakistani news summarization AI for Express Tribune articles. 
Summarize the following news article in exactly 2-3 clear and concise sentences. 
Focus on the main facts and maintain objectivity.

Requirements:
- Keep it between 100-150 words
- Focus on key facts relevant to Pakistani readers  
- Use professional, clear language
- No opinions, just facts
```

## 📊 Content Quality Filters

### **Article Selection Criteria:**
- ✅ Title length > 10 characters
- ✅ Contains Pakistani keywords
- ✅ Not duplicate content
- ✅ Has meaningful summary/content
- ✅ Valid source URL

### **Priority Scoring System:**
- **+10 points** - Priority keywords in title
- **+5 points** - Priority keywords in content
- **+3 points** - Category keywords in title
- **+1 point** - Category keywords in content

### **Content Limits:**
- **Maximum articles per scrape:** 20
- **Summary length:** 100-150 words
- **Keywords matched:** Top 5 per article
- **Categories per article:** 1-3 tags

## 🔄 Automated Workflow

### **Scheduling:**
- **Frequency:** Every 3 hours automatically
- **Manual Trigger:** Via dashboard button
- **Keyword-Based:** Custom keyword scraping

### **Data Flow:**
1. **Scrape** → Express Tribune website
2. **Extract** → Article elements using CSS selectors  
3. **Filter** → Apply keyword matching
4. **Process** → AI summarization with Gemini
5. **Score** → Priority ranking system
6. **Store** → Save to Supabase database
7. **Display** → Show in Next.js frontend

## 🎛️ Customization Options

### **Keyword Management:**
- Add new keywords to categories
- Create priority keywords
- Remove irrelevant terms
- Trigger custom keyword-based scraping

### **Content Types Scraped:**
- **Breaking News** - Urgent updates
- **Political Updates** - Government and election news
- **Economic Reports** - Business and financial news
- **Sports Coverage** - Cricket, football, Olympics
- **International News** - Foreign affairs affecting Pakistan
- **Social Issues** - Education, health, community news
- **Technology News** - Digital Pakistan initiatives

### **Geographic Focus:**
- **National** - Pakistan-wide news
- **Provincial** - Punjab, Sindh, KPK, Balochistan
- **Major Cities** - Karachi, Lahore, Islamabad, Peshawar
- **Regional** - Local news with national significance

The system ensures all content is relevant to Pakistani readers with proper cultural context and local significance!
