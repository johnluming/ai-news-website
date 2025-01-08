import { NewsItem } from '../types/news';

export default function NewsCard({ title, description, url, imageUrl, source, date }: NewsItem) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-48 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 hover:text-blue-600">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <span>{source}</span>
          <span>{new Date(date).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
} 