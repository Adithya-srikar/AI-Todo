import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import aiRoutes from './routes/aiRoutes.js';
import todoRoutes from './routes/todoRoutes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


connectDB();

app.use('/api/ai', aiRoutes);
app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
  res.json({ message: ' AI Todo Backend is running!' });
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


