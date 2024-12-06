import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2, Image } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../../utils/cn';
import type { Post } from '../../types/post';

export function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete post');
      setPosts(posts.filter(post => post.id !== id));
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-caribbean-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-caribbean-900">Title</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-caribbean-900">Category</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-caribbean-900">Date</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-caribbean-900">Photos</th>
            <th className="px-6 py-3 text-right text-sm font-medium text-caribbean-900">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-caribbean-100">
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-caribbean-50/50">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-10 h-10 rounded object-cover mr-3"
                  />
                  <div className="text-sm text-caribbean-900">{post.title}</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-caribbean-100 text-caribbean-800">
                  {post.category}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-caribbean-600">
                {format(new Date(post.date), 'MMM dd, yyyy')}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1">
                  <Image className="w-4 h-4 text-caribbean-500" />
                  <span className="text-sm text-caribbean-600">
                    {post.photos.length}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => navigate(`/admin/posts/${post.id}/edit`)}
                    className={cn(
                      "p-1 rounded-md",
                      "hover:bg-caribbean-100 text-caribbean-600",
                      "transition-colors"
                    )}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className={cn(
                      "p-1 rounded-md",
                      "hover:bg-red-100 text-red-600",
                      "transition-colors"
                    )}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}