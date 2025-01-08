import { useEffect, useState } from 'react';
import axios from 'axios';
import NewsCard from './components/NewsCard';
import { getNews } from './services/newsService';
import { NewsItem } from './types/news';

function App() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    const newsData = await getNews();
    setNews(newsData);
    setLoading(false);
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      console.log('Starting refresh...');
      await axios.post('/news/fetch');
      console.log('Fetch completed, getting news...');
      await fetchNews();
      console.log('News updated!');
    } catch (error) {
      console.error('Error refreshing news:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">AI News Today</h1>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Refreshing...' : 'Refresh News'}
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-gray-600">Loading news...</div>
        </div>
      ) : news.length === 0 ? (
        <div className="text-center text-gray-600">No news articles found</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {news.map((newsItem, index) => (
            <NewsCard key={index} {...newsItem} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App;
