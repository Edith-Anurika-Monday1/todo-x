import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      <h2 className="text-6xl font-extrabold text-red-600 mb-4">404</h2>
      <p className="text-xl mb-6">Oops! The page you’re looking for does not exist.</p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go back home
      </Link>
    </div>
  );
}
