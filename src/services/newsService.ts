import axios from 'axios';
import { NewsItem } from '../types/news';

const API_URL = '/news';

export const getNews = async (): Promise<NewsItem[]> => {
  try {
    console.log('Fetching news from API...');
    const response = await axios.get<NewsItem[]>(API_URL);
    console.log('News received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}; 