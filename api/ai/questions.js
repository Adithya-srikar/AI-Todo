import connectDB from '../db.js';
import geminiService from '../services/geminiService.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { goal } = req.body || {};

    if (!goal) {
      return res.status(400).json({ error: 'Goal is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY environment variable is not set' });
    }

    // Connect to database
    await connectDB();

    // Initialize Gemini with API key from env
    if (!geminiService.model) {
      geminiService.initialize(process.env.GEMINI_API_KEY);
    }

    const questions = await geminiService.generateQuestions(goal);

    return res.status(200).json({ questions });
  } catch (error) {
    console.error('Error in /api/ai/questions:', error);
    return res.status(500).json({ 
      error: 'Failed to generate questions',
      message: error.message || 'Unknown error',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

