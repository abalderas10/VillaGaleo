import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { cn } from '../../utils/cn';

export function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      localStorage.setItem('adminToken', data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-caribbean-900 to-caribbean-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-caribbean-100 mb-4">
              <Lock className="w-8 h-8 text-caribbean-600" />
            </div>
            <h2 className="text-2xl font-display font-bold text-caribbean-900">
              Acceso Administrativo
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-caribbean-700 mb-2">
                Usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={cn(
                  "w-full px-4 py-2 rounded-md border",
                  "focus:ring-2 focus:ring-caribbean-500 focus:border-transparent",
                  "placeholder:text-gray-400"
                )}
                placeholder="admin@villagaleon.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-caribbean-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={cn(
                  "w-full px-4 py-2 rounded-md border",
                  "focus:ring-2 focus:ring-caribbean-500 focus:border-transparent",
                  "placeholder:text-gray-400"
                )}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className={cn(
                "w-full py-3 px-4 rounded-md",
                "bg-caribbean-600 text-white",
                "hover:bg-caribbean-700 transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-caribbean-500"
              )}
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}