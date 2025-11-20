import connectDB from '../db.js';
import Todo from '../models/Todo.js';

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
    await connectDB();

    const { todos } = req.body || {};

    if (!todos || !Array.isArray(todos)) {
      return res.status(400).json({ error: 'Todos array is required' });
    }

    const createdTodos = await Todo.insertMany(todos);
    return res.status(201).json(createdTodos);
  } catch (error) {
    console.error('Error creating todos:', error);
    return res.status(500).json({ error: 'Failed to create todos' });
  }
}

