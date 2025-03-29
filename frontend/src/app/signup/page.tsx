"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

function Signup() {
  // State for form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword) {
      toast.error("Please fill all the fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    // Phone number validation (basic)
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phoneNumber)) {
      toast.error("Please enter a valid phone number (10-15 digits)");
      return;
    }

    if (!process.env.NEXT_PUBLIC_API_URL) {
      toast.error("API URL is not defined");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/user-signup`,
        { 
          firstName, 
          lastName, 
          email, 
          phNumber : phoneNumber, 
          password 
        },
        { withCredentials: true }
      );

      if (res.status === 201) {
        toast.success("Signup Successful");
        localStorage.setItem("role", "user");
        window.location.href = "/user-home";
      } else {
        toast.error(res.data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data.message || "An error occurred");
        } else if (error.request) {
          toast.error("No response from the server");
        } else {
          toast.error("An error occurred during signup");
        }
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 pt-32 pb-32">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Create Your Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* First Name Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
              placeholder="Enter your first name"
              required
            />
          </div>

          {/* Last Name Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
              placeholder="Enter your last name"
              required
            />
          </div>

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

          {/* Phone Number Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
              placeholder="Enter your phone number"
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
              placeholder="Create a password"
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-300 text-lg disabled:bg-green-300"
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* Additional Signup Options */}
        <div className="mt-6 flex justify-center">
          <Link 
            href="/signup/farmer-signup" 
            className="text-green-600 border border-green-500 px-6 py-3 rounded-md hover:bg-green-100 transition duration-300 text-lg"
          >
            Signup as Farmer
          </Link>
        </div>

        {/* Login Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-lg">
            Already have an account?{" "}
            <Link href="/login" className="text-green-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;