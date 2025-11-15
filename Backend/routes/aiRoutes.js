import express from 'express';
import geminiService from '../services/geminiService.js';

const router = express.Router();


router.post('/questions', async (req, res) => {
  try {
    const { goal } = req.body;

    if (!goal) {
      return res.status(400).json({ error: 'Goal is required' });
    }

    // Initialize Gemini with API key from env
    if (!geminiService.model) {
      geminiService.initialize(process.env.GEMINI_API_KEY);
    }

    const questions = await geminiService.generateQuestions(goal);

    res.json({ questions });
  } catch (error) {
    console.error('Error in /api/ai/questions:', error);
    res.status(500).json({ error: 'Failed to generate questions' });
  }
});


router.post('/generate-plan', async (req, res) => {
  try {
    const { goal, answers } = req.body;

    if (!goal || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'Goal and answers array are required' });
    }

    // Initialize Gemini with API key from env
    if (!geminiService.model) {
      geminiService.initialize(process.env.GEMINI_API_KEY);
    }

    const plan = await geminiService.generateTodoPlan(goal, answers);

    res.json({ plan });
  } catch (error) {
    console.error('Error in /api/ai/generate-plan:', error);
    res.status(500).json({ error: 'Failed to generate plan' });
  }
});

export default router;


