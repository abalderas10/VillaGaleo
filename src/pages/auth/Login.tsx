import React from 'react';
import { Link } from 'react-router-dom';
import { Sailboat } from 'lucide-react';
import { cn } from '../../utils/cn';

export function Login() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-caribbean-900">
          <div className="absolute inset-0 bg-gradient-to-br from-caribbean-600 via-caribbean-900 to-caribbean-950 opacity-90" />
          <div className="absolute inset-0 bg-shell-pattern opacity-5" />
        </div>
        <Link to="/" className="relative z-20 flex items-center gap-2 group">
          <Sailboat className="h-8 w-8 transform group-hover:-translate-y-1 transition-transform duration-300" />
          <span className="text-2xl font-display font-semibold group-hover:text-caribbean-200 transition-colors">VillaGaleon</span>
        </Link>
        {/* Rest of the Login component remains the same */}
      </div>
      {/* Rest of the component remains the same */}
    </div>
  );
}