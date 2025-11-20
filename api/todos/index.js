import connectDB from '../db.js';
import Todo from '../Backend/models/Todo.js';

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

  try {
    await connectDB();

    if (req.method === 'GET') {
      const todos = await Todo.find().sort({ order: 1, createdAt: 1 });
      return res.status(200).json(todos);
    }

    if (req.method === 'POST') {
      const { title, description, timeEstimate, goal, order } = req.body;

      if (!title) {
        return res.status(400).json({ error: 'Title is required' });
      }

      const todo = new Todo({
        title,
        description,
        timeEstimate,
        goal,
        order: order || 0
      });

      await todo.save();
      return res.status(201).json(todo);
    }

    if (req.method === 'DELETE') {
      await Todo.deleteMany({});
      return res.status(200).json({ message: 'All todos deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in /api/todos:', error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
}

