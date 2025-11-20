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

  try {
    await connectDB();

    const { id } = req.query;

    if (req.method === 'PUT') {
      const updates = req.body || {};

      const todo = await Todo.findByIdAndUpdate(
        id,
        updates,
        { new: true, runValidators: true }
      );

      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }

      return res.status(200).json(todo);
    }

    if (req.method === 'DELETE') {
      const todo = await Todo.findByIdAndDelete(id);

      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }

      return res.status(200).json({ message: 'Todo deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in /api/todos/[id]:', error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
}

