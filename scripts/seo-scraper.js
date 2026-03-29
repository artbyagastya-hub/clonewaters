const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

const COMPETITORS_FILE = path.join(__dirname, 'seo-competitors.json');
const OUTPUT_FILE = path.join(__dirname, 'competitor-data.json');

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.5'
};

async function scrapeCompetitors() {
  console.log('🔄 Starting competitor SEO scraping...');
  
  if (!fs.existsSync(COMPETITORS_FILE)) {
    console.error('❌ Competitors list not found:', COMPETITORS_FILE);
    process.exit(1);
  }

  const urls = JSON.parse(fs.readFileSync(COMPETITORS_FILE, 'utf-8'));
  const results = [];

  for (const url of urls) {
    try {
      console.log(`Scraping: ${url}`);
      const response = await axios.get(url, { headers, timeout: 10000 });
      const html = response.data;
      const $ = cheerio.load(html);

      const title = $('title').text().trim() || '';
      const metaDescription = $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || '';
      const h1s = [];
      $('h1').each((_, el) => {
        const text = $(el).text().trim();
        if (text) h1s.push(text);
      });

      // rudimentary keyword extraction (visible text body)
      const bodyText = $('body').text().replace(/\s+/g, ' ').toLowerCase();

      results.push({
        url,
        status: 'success',
        seo: {
          title,
          description: metaDescription,
          h1: h1s
        }
      });
    } catch (error) {
      console.warn(`⚠️ Failed to scrape ${url}: ${error.message}`);
      results.push({
        url,
        status: 'failed',
        error: error.message
      });
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
  console.log(`✅ Completed scraping. Data saved to ${OUTPUT_FILE}`);
}

scrapeCompetitors();
