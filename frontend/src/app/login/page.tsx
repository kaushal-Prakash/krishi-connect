'use client';
import React, { useState } from 'react';

function Login() {
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      email,
      password,
      rememberMe,
    };

    console.log('Form Data:', formData);

    // Example: Send data to backend
    // fetch('/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log('Success:', data))
    //   .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Welcome Back!
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Remember Me and Forgot Password */}
          {/* <div className="flex items-center justify-between">
            <a href="#" className="text-green-600 text-lg hover:underline">
              Forgot password?
            </a>
          </div> */}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-300 text-lg"
          >
            Login
          </button>
        </form>

        {/* Additional Login Options */}
        <div className="mt-6 flex justify-between">
          <button className="text-green-600 border border-green-500 px-6 py-3 rounded-md hover:bg-green-100 transition duration-300 text-lg">
            Login as Farmer
          </button>
          <button className="text-green-600 border border-green-500 px-6 py-3 rounded-md hover:bg-green-100 transition duration-300 text-lg">
            Login as Admin
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-lg">
            Don't have an account?{' '}
            <a href="#" className="text-green-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;