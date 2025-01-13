import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import newsRoutes from './routes/newsRoutes';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-news')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// API Routes
app.use('/news', newsRoutes);

// Serve static files from the React app
const distPath = path.join(__dirname, '..', '..', 'dist');
console.log('Static files path:', distPath);
app.use(express.static(distPath));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  console.log('Serving index.html from:', indexPath);
  res.sendFile(indexPath);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
}); 