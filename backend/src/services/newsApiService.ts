import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { HttpsProxyAgent } from 'https-proxy-agent';

dotenv.config();

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const PROXY = process.env.HTTPS_PROXY;

export async function fetchAINews() {
  try {
    console.log('Making request to NewsAPI...');
    console.log('Using API key:', NEWS_API_KEY);
    console.log('Using proxy:', PROXY);
    
    const params = new URLSearchParams();
    params.append('category', 'technology');
    params.append('q', 'AI');
    params.append('language', 'en');
    params.append('pageSize', '20');
    if (NEWS_API_KEY) {
      params.append('apiKey', NEWS_API_KEY);
    }

    const agent = PROXY ? new HttpsProxyAgent(PROXY) : undefined;

    const response = await fetch(`${NEWS_API_URL}?${params}`, {
      method: 'GET',
      headers: {
        'User-Agent': 'ai-news-website'
      },
      agent,
      signal: AbortSignal.timeout(60000)
    });

    if (!response.ok) {
      throw new Error(`NewsAPI responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('NewsAPI response status:', response.status);
    console.log('Raw response data:', data);
    
    if (!data.articles) {
      console.error('No articles in response:', data);
      return [];
    }

    console.log('Number of articles:', data.articles.length);

    const mappedArticles = data.articles.map((article: any) => ({
      title: article.title || 'No title',
      description: article.description || 'No description',
      url: article.url || '',
      imageUrl: article.urlToImage || '',
      source: article.source?.name || 'Unknown source',
      date: article.publishedAt || new Date().toISOString()
    }));

    console.log('First mapped article:', mappedArticles[0]);
    return mappedArticles;
  } catch (error: unknown) {
    console.error('NewsAPI Error:', error instanceof Error ? error.message : 'Unknown error occurred');
    return [];
  }
} 