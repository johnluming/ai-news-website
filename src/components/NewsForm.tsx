import { useState } from 'react';
import axios from 'axios';

interface NewsFormProps {
  onNewsAdded: () => void;
}

export default function NewsForm({ onNewsAdded }: NewsFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/news', { title, description });
      setTitle('');
      setDescription('');
      onNewsAdded();
    } catch (error) {
      console.error('Error creating news:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-50 rounded-lg">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Add News
      </button>
    </form>
  );
} 