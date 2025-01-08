import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import News from '../models/News';
import { fetchAINews } from '../services/newsApiService';

dotenv.config();
const router = express.Router();
const NEWS_API_KEY = process.env.NEWS_API_KEY;

// Get all news
router.get('/', async (req, res) => {
  try {
    console.log('Getting all news from database...');
    const news = await News.find().sort({ date: -1 });
    console.log(`Found ${news.length} articles in database`);
    if (news.length === 0) {
      console.log('Database is empty');
    } else {
      console.log('First article:', news[0]);
    }
    res.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'Error fetching news' });
  }
});

// Fetch and store latest news
router.post('/fetch', async (req, res) => {
  try {
    console.log('Starting to fetch news from NewsAPI...');
    const articles = await fetchAINews();
    console.log(`Fetched ${articles.length} articles from NewsAPI:`, articles[0]); // Log first article
    
    // Clear existing news
    await News.deleteMany({});
    console.log('Cleared existing news');
    
    // Store new articles
    if (articles.length > 0) {
      await News.insertMany(articles);
      console.log(`Stored ${articles.length} new articles`);
    } else {
      console.log('No articles to store');
    }
    
    res.json({ message: 'News updated successfully' });
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(500).json({ message: 'Error updating news' });
  }
});

// Add this route to test the connection
router.get('/test', async (req, res) => {
  try {
    console.log('Testing NewsAPI connection...');
    const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=' + NEWS_API_KEY);
    const data = await response.json();
    res.json({ status: 'success', data });
  } catch (error: unknown) {
    console.error('Test failed:', error);
    res.status(500).json({ 
      status: 'error', 
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
});

export default router; 