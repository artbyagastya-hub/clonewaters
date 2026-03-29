const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const RECOMMENDATIONS_FILE = path.join(__dirname, 'seo-recommendations.json');
const HTML_FILE = path.join(__dirname, '../index.html');

function injectSeo() {
  console.log('💉 Injecting new AI Meta Tags into index.html...');
  if (!fs.existsSync(RECOMMENDATIONS_FILE)) {
    console.error(`❌ Recommendations not found: ${RECOMMENDATIONS_FILE}`);
    process.exit(1);
  }

  const recData = fs.readFileSync(RECOMMENDATIONS_FILE, 'utf-8');
  let seo = {};
  try {
    seo = JSON.parse(recData);
  } catch (e) {
    console.error('❌ Failed to parse SEO AI recommendations.');
    process.exit(1);
  }

  const html = fs.readFileSync(HTML_FILE, 'utf-8');
  const $ = cheerio.load(html, { decodeEntities: false });

  // Update Title
  if (seo.title) {
    $('head > title').replaceWith(`<title>${seo.title}</title>`);
  }

  // Update Meta Description
  if (seo.meta_description) {
    const selector = '<meta name="description" content="' + seo.meta_description + '">';
    const existing = $('meta[name="description"]');
    if (existing.length) {
      existing.replaceWith(selector);
    } else {
      $('head').append(selector);
    }
  }

  // Update Keywords (if it doesn't exist, we add it)
  if (seo.keywords) {
    const selector = '<meta name="keywords" content="' + seo.keywords + '">';
    const existing = $('meta[name="keywords"]');
    if (existing.length) {
      existing.replaceWith(selector);
    } else {
      $('head').append(selector);
    }
  }

  // Update OG Title
  if (seo.og_title) {
    const selector = '<meta property="og:title" content="' + seo.og_title + '">';
    const existing = $('meta[property="og:title"]');
    if (existing.length) {
      existing.replaceWith(selector);
    } else {
      $('head').append(selector);
    }
  }

  // Update OG Description
  if (seo.og_description) {
    const selector = '<meta property="og:description" content="' + seo.og_description + '">';
    const existing = $('meta[property="og:description"]');
    if (existing.length) {
      existing.replaceWith(selector);
    } else {
      $('head').append(selector);
    }
  }

  // Write changes
  fs.writeFileSync(HTML_FILE, $.html());
  console.log('✅ index.html updated beautifully.');
}

injectSeo();
