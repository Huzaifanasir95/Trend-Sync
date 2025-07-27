// Enhanced Tribune scraping with keyword filtering
const cheerio = require('cheerio');
const articles = [];

// Pakistani news keywords for filtering
const newsKeywords = {
  politics: ['imran khan', 'pti', 'pmln', 'ppp', 'parliament', 'election', 'government', 'minister', 'prime minister', 'chief minister'],
  economy: ['rupee', 'inflation', 'gdp', 'economic', 'finance', 'budget', 'stock exchange', 'investment', 'business'],
  security: ['terrorism', 'security', 'army', 'police', 'operation', 'attack', 'blast', 'military'],
  international: ['china', 'india', 'usa', 'afghanistan', 'cpec', 'foreign ministry', 'embassy', 'border'],
  sports: ['cricket', 'hockey', 'football', 'olympics', 'babar azam', 'psl', 'fifa', 'match'],
  education: ['university', 'school', 'education', 'students', 'exams', 'hec', 'admissions'],
  health: ['covid', 'health', 'hospital', 'medicine', 'vaccine', 'doctor', 'pandemic'],
  technology: ['internet', 'mobile', 'tech', 'digital', 'app', 'software', 'pakistan tech'],
  society: ['culture', 'social', 'women', 'youth', 'family', 'community', 'rights']
};

// Priority keywords (articles with these get higher priority)
const priorityKeywords = [
  'breaking', 'urgent', 'exclusive', 'latest', 'developing',
  'karachi', 'lahore', 'islamabad', 'punjab', 'sindh', 'kpk', 'balochistan'
];

// Function to check if content matches keywords
function matchesKeywords(text, keywords) {
  const lowerText = text.toLowerCase();
  return keywords.some(keyword => lowerText.includes(keyword.toLowerCase()));
}

// Function to get article priority score
function getArticlePriority(title, content) {
  let score = 0;
  
  // Check for priority keywords
  priorityKeywords.forEach(keyword => {
    if (title.toLowerCase().includes(keyword.toLowerCase())) {
      score += 10;
    }
    if (content.toLowerCase().includes(keyword.toLowerCase())) {
      score += 5;
    }
  });
  
  // Check for category keywords
  Object.values(newsKeywords).flat().forEach(keyword => {
    if (title.toLowerCase().includes(keyword.toLowerCase())) {
      score += 3;
    }
  });
  
  return score;
}

// Function to categorize article
function categorizeArticle(title, content) {
  const fullText = (title + ' ' + content).toLowerCase();
  const categories = [];
  
  for (const [category, keywords] of Object.entries(newsKeywords)) {
    if (matchesKeywords(fullText, keywords)) {
      categories.push(category);
    }
  }
  
  return categories.length > 0 ? categories : ['general'];
}

for (const item of $input.all()) {
  const html = item.json.data || item.json;
  const $ = cheerio.load(html);
  
  // Enhanced Tribune.com.pk article selectors
  const selectors = [
    'article, .story, .post',
    '.story-list .story-item',
    '.news-item, .article-item',
    '.featured-story',
    '.latest-news li',
    '.home-story',
    '.top-story'
  ];
  
  selectors.forEach(selector => {
    $(selector).each((index, element) => {
      const $article = $(element);
      
      // Extract comprehensive article data
      const title = $article.find('h1, h2, h3, h4, .title, .headline, .story-title, .news-title, a').first().text().trim();
      const link = $article.find('a').first().attr('href');
      const summary = $article.find('p, .excerpt, .summary, .story-excerpt, .news-excerpt').first().text().trim();
      const image = $article.find('img').first().attr('src') || $article.find('img').first().attr('data-src');
      const timeElement = $article.find('time, .date, .timestamp, .story-time, .published-time');
      const publishedDate = timeElement.attr('datetime') || timeElement.text().trim();
      const category = $article.find('.category, .section, .tag').first().text().trim();
      
      // Enhanced content extraction
      let content = summary;
      const additionalContent = $article.find('.content, .description, .lead, .intro').text().trim();
      if (additionalContent && additionalContent.length > content.length) {
        content = additionalContent;
      }
      
      // Apply keyword filtering
      const fullText = title + ' ' + content;
      const hasRelevantKeywords = Object.values(newsKeywords).flat().some(keyword =>
        fullText.toLowerCase().includes(keyword.toLowerCase())
      );
      
      // Only process articles that:
      // 1. Have a meaningful title (>10 chars)
      // 2. Match our Pakistani news keywords
      // 3. Are not duplicates
      if (title && 
          title.length > 10 && 
          hasRelevantKeywords &&
          !articles.find(a => a.title === title)) {
        
        const fullUrl = link && link.startsWith('http') ? link : `https://tribune.com.pk${link}`;
        const priority = getArticlePriority(title, content);
        const categories = categorizeArticle(title, content);
        
        // Enhanced article object
        const article = {
          title: title,
          summary: content || title.substring(0, 200) + '...',
          source_url: fullUrl,
          source: 'The Express Tribune',
          image_url: image && image.startsWith('http') ? image : (image ? `https://tribune.com.pk${image}` : null),
          published_at: publishedDate || new Date().toISOString(),
          region: 'Pakistan',
          city: 'Multiple',
          content: content || title,
          category: category || categories[0] || 'general',
          categories: categories,
          priority_score: priority,
          keywords_matched: Object.values(newsKeywords).flat().filter(keyword =>
            fullText.toLowerCase().includes(keyword.toLowerCase())
          ).slice(0, 5)
        };
        
        articles.push(article);
      }
    });
  });
}

// Sort by priority score (highest first) and limit to top articles
const prioritizedArticles = articles
  .sort((a, b) => b.priority_score - a.priority_score)
  .slice(0, 20);

return prioritizedArticles.map(article => ({ json: article }));
