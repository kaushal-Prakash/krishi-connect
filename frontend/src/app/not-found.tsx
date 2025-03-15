"use client";
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full animate-fade-in-up">
        {/* Icon container with flex to center the icon */}
        <div className="flex justify-center items-center text-6xl text-green-600 mb-4 animate-bounce">
          <FaExclamationTriangle />
        </div>

        {/* Heading with fade-in animation */}
        <h1 className="text-3xl font-bold text-green-800 mb-4 animate-fade-in">
          404 - Page Not Found
        </h1>

        {/* Message with fade-in animation */}
        <p className="text-lg text-green-700 mb-6 animate-fade-in">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        {/* Home Button with pulse animation on hover */}
        <button
          onClick={() => router.back()} // Go back to the previous page
          className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-300 hover:animate-pulse"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default NotFound;