import express from 'express';
import Todo from '../models/Todo.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ order: 1, createdAt: 1 });
    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});


router.post('/', async (req, res) => {
  try {
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
    res.status(201).json(todo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});


router.post('/batch', async (req, res) => {
  try {
    const { todos } = req.body;

    if (!todos || !Array.isArray(todos)) {
      return res.status(400).json({ error: 'Todos array is required' });
    }

    const createdTodos = await Todo.insertMany(todos);
    res.status(201).json(createdTodos);
  } catch (error) {
    console.error('Error creating todos:', error);
    res.status(500).json({ error: 'Failed to create todos' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const todo = await Todo.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(todo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});


router.delete('/', async (req, res) => {
  try {
    await Todo.deleteMany({});
    res.json({ message: 'All todos deleted successfully' });
  } catch (error) {
    console.error('Error deleting todos:', error);
    res.status(500).json({ error: 'Failed to delete todos' });
  }
});

export default router;


