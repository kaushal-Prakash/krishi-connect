"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

function FarmerSignup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [kccId, setKccId] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !password ||
      !confirmPassword ||
      !kccId ||
      !username
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    // Phone number validation
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
        `${process.env.NEXT_PUBLIC_API_URL}/farmers/farmer-signup`,
        {
          firstName,
          lastName,
          email,
          phNumber: phoneNumber,
          password,
          kccId,
          username,
        },
        { withCredentials: true }
      );

      if (res.status === 201) {
        toast.success("Farmer Registration Successful");
        localStorage.setItem("role", "farmer");
        window.location.href = "/farmer-home";
      } else {
        toast.error(res.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data.message || "An error occurred");
        } else if (error.request) {
          toast.error("No response from the server");
        } else {
          toast.error("An error occurred during registration");
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
          Farmer Registration
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
              onChange={(e) =>
                setPhoneNumber(e.target.value.replace(/\D/g, ""))
              }
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* KCC ID Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              KCC ID
            </label>
            <input
              type="text"
              value={kccId}
              onChange={(e) => setKccId(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
              placeholder="Enter your KCC ID"
              required
            />
          </div>

          {/* Username Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
              placeholder="Choose a username"
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
            {isLoading ? "Registering..." : "Register as Farmer"}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-lg">
            Already have an account?{" "}
            <Link
              href="/login/farmer-login"
              className="text-green-600 hover:underline"
            >
              Login as Farmer
            </Link>
          </p>
        </div>

        {/* User Signup Link */}
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-lg">
            Not a farmer?{" "}
            <Link href="/signup" className="text-green-600 hover:underline">
              Signup as User
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FarmerSignup;
