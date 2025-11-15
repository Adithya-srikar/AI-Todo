import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  constructor() {
    this.genAI = null;
    this.model = null;
  }

  initialize(apiKey) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  }

  async generateQuestions(goal) {
    if (!this.model) {
      throw new Error('Gemini API not initialized');
    }

    const prompt = `You are a helpful task planning assistant. A user wants to: "${goal}"

Generate 3-5 clarifying questions to help create a better task plan. Ask about:
- Timeline/deadline
- Skill level or experience
- Resources available
- Specific preferences or constraints
- Scope or scale

Return ONLY a JSON array of question strings, no other text. Example format:
["Question 1?", "Question 2?", "Question 3?"]`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from the response
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // Fallback if JSON parsing fails
      return [
        "How much time do you have to complete this?",
        "What is your current skill level with this topic?",
        "Do you have any specific requirements or constraints?"
      ];
    } catch (error) {
      console.error('Error generating questions:', error);
      throw error;
    }
  }

  async generateTodoPlan(goal, answers) {
    if (!this.model) {
      throw new Error('Gemini API not initialized');
    }

    const answersText = answers.map((a, i) => `Q${i + 1}: ${a}`).join('\n');

    const prompt = `You are a task planning expert. Create a detailed, actionable todo plan.

User Goal: "${goal}"

User's Answers:
${answersText}

Create a step-by-step plan with 5-10 tasks. Each task should be specific and actionable.

Return ONLY a JSON array with this exact structure, no other text:
[
  {
    "title": "Task title",
    "description": "Detailed description of what to do",
    "timeEstimate": "estimated time (e.g., '2 hours', '1 day', '30 minutes')"
  }
]

Make the plan realistic, practical, and tailored to the user's answers.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from the response
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // Fallback plan if JSON parsing fails
      return [
        {
          title: "Define project scope and requirements",
          description: "Clearly outline what you want to achieve and list all requirements",
          timeEstimate: "1-2 hours"
        },
        {
          title: "Research and gather resources",
          description: "Find tutorials, documentation, and tools you'll need",
          timeEstimate: "2-3 hours"
        },
        {
          title: "Set up your development environment",
          description: "Install necessary software and configure your workspace",
          timeEstimate: "1 hour"
        },
        {
          title: "Create initial project structure",
          description: "Set up folders, files, and basic configuration",
          timeEstimate: "30 minutes"
        },
        {
          title: "Build core features",
          description: "Implement the main functionality step by step",
          timeEstimate: "Varies"
        }
      ];
    } catch (error) {
      console.error('Error generating todo plan:', error);
      throw error;
    }
  }
}

const geminiService = new GeminiService();
export default geminiService;

