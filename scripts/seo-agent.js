const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const COMPETITOR_DATA_FILE = path.join(__dirname, 'competitor-data.json');
const RECOMMENDATIONS_FILE = path.join(__dirname, 'seo-recommendations.json');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY is not set in the environment variables.');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function generateRecommendations() {
  console.log('🤖 Initializing SEO analysis with Gemini API...');

  if (!fs.existsSync(COMPETITOR_DATA_FILE)) {
    console.error(`❌ Data file not found: ${COMPETITOR_DATA_FILE}`);
    process.exit(1);
  }

  const rawData = fs.readFileSync(COMPETITOR_DATA_FILE, 'utf-8');
  let data = [];
  try {
     data = JSON.parse(rawData);
  } catch (e) {
     console.error('❌ Failed to parse competitor data JSON.');
     process.exit(1);
  }

  // Filter out failed scrapes
  const successfulScrapes = data.filter(d => d.status === 'success');
  
  if (successfulScrapes.length === 0) {
      console.warn('⚠️ No successful competitor data found. Aborting generation.');
      process.exit(1);
  }

  const prompt = `You are a world-class SEO strategist specialized in the craft beer and DTC beverage market in Vietnam. 
Here is a list of recent SEO metadata scraped from my competitors in the industry:
${JSON.stringify(successfulScrapes.slice(0, 10), null, 2)}

My brand is 'Clone Waters' - a psychedelic craft beer in Vietnam focusing on bold flavors, wild labels, DTC (Direct to Consumer), and a 'Wandering Bear' mascot. We have a dark theme, 3D cans, and an 'Inner Circle' loyalty club.

Please analyze the competitors' metadata (titles, h1s, descriptions) to find keyword gaps, then produce a highly optimized set of HTML Meta tags for my \`index.html\` page. 
Focus on:
- High CTR psychological hooks
- Avoiding clichés seen in competitors while matching search intent.

You MUST respond strictly with valid JSON conforming to this structure:
{
  "title": "Optimized Page Title | Clone Waters",
  "meta_description": "The exact description text",
  "keywords": "comma separated keywords",
  "og_title": "Social title (slightly different if it hooks better)",
  "og_description": "Social description"
}
Do NOT include markdown formatting wrappers, only the raw JSON.`;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
    
    console.log(`Sending data for ${successfulScrapes.length} competitors to Gemini...`);
    const result = await model.generateContent(prompt);
    let text = result.response.text();

    // Clean up if there are markdown blocks
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const parsedRecommendation = JSON.parse(text);

    fs.writeFileSync(RECOMMENDATIONS_FILE, JSON.stringify(parsedRecommendation, null, 2));
    console.log(`✅ AI processing complete. SEO recommendations saved to ${RECOMMENDATIONS_FILE}`);
  } catch (error) {
    console.error('❌ Failed to generate SEO recommendations:', error);
    process.exit(1);
  }
}

generateRecommendations();
