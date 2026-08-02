import React from 'react';
import { Link } from 'react-router-dom';
import { FaFrownOpen } from 'react-icons/fa';

export const NotFound = () => {
  return (
    <div className="py-24 text-center max-w-md mx-auto space-y-6">
      <div className="text-secondary/40 flex justify-center">
        <FaFrownOpen size={64} />
      </div>
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold font-serif text-secondary-dark leading-tight m-0">404 - Page Not Found</h1>
        <p className="text-xs text-secondary/60 leading-relaxed font-light m-0">The page you are looking for does not exist or has been moved to another link.</p>
      </div>
      <Link to="/" className="bg-primary hover:bg-primary-light text-white font-bold text-xs px-8 py-3.5 rounded-full shadow-md inline-block">
        Back to homepage
      </Link>
    </div>
  );
};

export default NotFound;
