import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, LogOut } from 'lucide-react';
import { PostList } from './PostList';
import { cn } from '../../utils/cn';

export function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-caribbean-50">
      <nav className="bg-caribbean-900 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-display font-semibold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/posts/new')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md",
                "bg-caribbean-600 text-white",
                "hover:bg-caribbean-700 transition-colors"
              )}
            >
              <PlusCircle className="w-5 h-5" />
              New Post
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-caribbean-100 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <PostList />
      </main>
    </div>
  );
}