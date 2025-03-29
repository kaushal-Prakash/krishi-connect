"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

function Login() {
  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all the fields");
      return;
    }

    if (!process.env.NEXT_PUBLIC_API_URL) {
      toast.error("API URL is not defined");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/user-login`,
        { email, password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success("Login Successful");
        localStorage.setItem("role","user");
        window.location.href = "/user-home"; 
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data.message || "An error occurred");
        } else if (error.request) {
          toast.error("No response from the server");
        } else {
          toast.error("An error occurred while logging in");
        }
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false); // Reset loading state
    }
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

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading} // Disable button while loading
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-300 text-lg disabled:bg-green-300"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Additional Login Options */}
        <div className="mt-6 flex justify-between">
          <Link href="/login/farmer-login" className="text-green-600 border border-green-500 px-6 py-3 rounded-md hover:bg-green-100 transition duration-300 text-lg">
            Login as Farmer
          </Link>
          <Link href="/login/admin-login" className="text-green-600 border border-green-500 px-6 py-3 rounded-md hover:bg-green-100 transition duration-300 text-lg">
            Login as Admin
          </Link>
        </div>

        {/* Sign Up Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-lg">
            Don't have an account?{" "}
            <Link href="/signup" className="text-green-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;