import React from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Clock, ChevronLeft } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../utils/cn';

// Temporary post data until we implement proper MDX loading
const POSTS = [
  {
    id: 'snorkeling-adventure',
    title: 'Ultimate Snorkeling Guide: Hidden Reefs of Cancún',
    content: `
      Welcome to your ultimate guide to snorkeling in Cancún! As a local marine enthusiast and experienced guide, 
      I'm excited to share some of the most breathtaking spots that often get overlooked by typical tourist routes.

      ## Best Hidden Spots

      ### Punta Nizuc
      Located at the southern tip of Cancún's Hotel Zone, this protected area offers:
      - Shallow reefs perfect for beginners
      - Abundant sea life including sea turtles
      - Crystal clear waters with 20m visibility
    `,
    date: '2024-03-15',
    readingTime: { minutes: 8 },
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2000&q=80',
    author: 'Marina Cruz',
    authorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
  },
  // Add more posts here
];

export function PostPage() {
  const { slug } = useParams();
  const post = POSTS.find((p) => p.id === slug);
  
  if (!post) {
    return (
      <div className="min-h-screen bg-caribbean-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-caribbean-900 mb-4">
            Post not found
          </h1>
          <p className="text-caribbean-600 mb-6">
            The post you're looking for doesn't exist or has been moved.
          </p>
          <a
            href="/experience"
            className="text-caribbean-500 hover:text-caribbean-600 flex items-center justify-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Experience
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative h-[60vh] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-3xl mx-auto px-4 pb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {format(new Date(post.date), 'MMMM dd, yyyy')}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {Math.ceil(post.readingTime.minutes)} min read
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="prose prose-lg prose-caribbean">
          {post.content}
        </div>

        {/* Author */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex items-center gap-4">
            <img
              src={post.authorImage}
              alt={post.author}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-display font-semibold text-lg text-caribbean-900">
                {post.author}
              </h3>
              <p className="text-caribbean-600">
                Local Expert & Adventure Guide
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}