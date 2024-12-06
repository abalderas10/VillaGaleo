import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ChevronRight, Search, ChevronLeft, Sailboat, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../utils/cn';

type Category = 'All' | 'Adventure' | 'Luxury' | 'Culture' | 'Food' | 'Lifestyle';

const POSTS = [
  {
    id: 'snorkeling-adventure',
    title: 'Ultimate Snorkeling Guide: Hidden Reefs of Cancún',
    description: 'Discover the vibrant underwater world of Cancún\'s best-kept secret snorkeling spots',
    date: '2024-03-15',
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2000&q=80',
    author: 'Marina Cruz',
    authorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'yacht-sunset',
    title: 'Sunset Sailing: A Caribbean Dream',
    description: 'Experience the magic of Cancún\'s sunset aboard La Donostiarra',
    date: '2024-03-14',
    category: 'Luxury',
    image: 'https://images.unsplash.com/photo-1514649923863-ceaf75b7ec40?auto=format&fit=crop&w=2000&q=80',
    author: 'Carlos Mendoza',
    authorImage: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'isla-mujeres',
    title: 'Isla Mujeres: A Paradise Island Guide',
    description: 'Explore the enchanting Isla Mujeres, from pristine beaches to vibrant culture',
    date: '2024-03-16',
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1590080669222-134fa86d0dd7?auto=format&fit=crop&w=2000&q=80',
    author: 'Ana Martínez',
    authorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'mayan-ruins',
    title: 'Ancient Maya Wonders: Exploring Cancún\'s Archaeological Sites',
    description: 'Journey through time discovering the magnificent Maya ruins near Cancún',
    date: '2024-03-17',
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=2000&q=80',
    author: 'Dr. Miguel Ruiz',
    authorImage: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'local-gastronomy',
    title: 'Cancún\'s Culinary Journey: From Street Food to Fine Dining',
    description: 'Discover the rich flavors and culinary traditions of the Yucatán Peninsula',
    date: '2024-03-18',
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=2000&q=80',
    author: 'Chef Laura Torres',
    authorImage: 'https://images.unsplash.com/photo-1587241321921-91a834d6d191?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'cenotes-adventure',
    title: 'Secret Cenotes: Underground Paradise',
    description: 'Explore the mystical underwater caves and crystal-clear cenotes',
    date: '2024-03-19',
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1583149577728-9ab503747013?auto=format&fit=crop&w=2000&q=80',
    author: 'Juan Pérez',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
  },
  // Add more posts...
  {
    id: 'spa-wellness',
    title: 'Wellness Retreat: Caribbean Spa Experience',
    description: 'Indulge in luxurious spa treatments inspired by ancient Maya healing',
    date: '2024-03-20',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=2000&q=80',
    author: 'Sofia Blanco',
    authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
  },
  // Continue with more posts...
];

const POSTS_PER_PAGE = 9;

export function Experience() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-caribbean-50">
      {/* Navigation Bar */}
      <nav className="bg-caribbean-900 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white hover:text-caribbean-200 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5" />
            <Sailboat className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform duration-300" />
            <span className="font-display font-medium">Back to VillaGaleon</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative py-20 bg-caribbean-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-shell-pattern opacity-5" />
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Experience Paradise
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mb-12">
            Discover the magic of the Caribbean through our curated collection of adventures, 
            stories, and local insights.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-caribbean-400" />
            <input
              type="text"
              placeholder="Search adventures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white/10 backdrop-blur border border-white/20 
                         text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-caribbean-400"
            />
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {['All', 'Adventure', 'Luxury', 'Culture', 'Food', 'Lifestyle'].map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category as Category);
                  setCurrentPage(1);
                }}
                className={cn(
                  "px-6 py-2 rounded-full whitespace-nowrap transition-colors",
                  "hover:bg-caribbean-50 hover:text-caribbean-600",
                  selectedCategory === category
                    ? "bg-caribbean-500 text-white"
                    : "bg-transparent text-caribbean-600"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post) => (
            <Link
              key={post.id}
              to={`/experience/${post.id}`}
              className="group"
            >
              <article className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-caribbean-50 text-caribbean-600">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-2 text-caribbean-500 text-sm">
                      <Calendar className="w-4 h-4" />
                      {format(new Date(post.date), 'MMM dd, yyyy')}
                    </div>
                  </div>
                  <h2 className="text-xl font-display font-bold text-caribbean-900 mb-2 group-hover:text-caribbean-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-caribbean-600 mb-4">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={post.authorImage}
                      alt={post.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm text-caribbean-700">
                      {post.author}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={cn(
                "px-4 py-2 rounded-lg",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "hover:bg-caribbean-50 text-caribbean-600"
              )}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  "w-10 h-10 rounded-lg",
                  currentPage === page
                    ? "bg-caribbean-500 text-white"
                    : "hover:bg-caribbean-50 text-caribbean-600"
                )}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={cn(
                "px-4 py-2 rounded-lg",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "hover:bg-caribbean-50 text-caribbean-600"
              )}
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}