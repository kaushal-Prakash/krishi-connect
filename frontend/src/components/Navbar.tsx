import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/user-logout`, {
        withCredentials: true
      });
      if(res.status === 200){
        localStorage.clear();
        toast.success("Logout Successful");
        setIsLogedIn(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchLogedInState = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/is-loged-in`, {
          withCredentials: true
        });
        if(res.status === 200){
          setIsLogedIn(true);
        }else{
          setIsLogedIn(false);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchLogedInState();
  }, [])

  return (
    <div className="absolute z-50">
      <button
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 p-4 text-white bg-green-600 focus:outline-none hover:bg-green-700 transition-colors rounded-full"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <div
        className={`fixed inset-0 bg-green-500/50 backdrop-blur-md transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex items-center justify-center h-full">
          <ul className="space-y-6 text-center">
            <li>
              <Link
                href="/about-us"
                className="text-white text-3xl md:text-4xl hover:text-green-200 transition-colors"
                onClick={toggleMenu}
              >
                About Us
              </Link>
            </li>
            {isLogedIn && (
              <>
                <li>
                  <Link
                    href="/home"
                    className="text-white text-3xl md:text-4xl hover:text-green-200 transition-colors"
                    onClick={toggleMenu}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="text-white text-3xl md:text-4xl hover:text-green-200 transition-colors"
                    onClick={toggleMenu}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/market"
                    className="text-white text-3xl md:text-4xl hover:text-green-200 transition-colors"
                    onClick={toggleMenu}
                  >
                    Market
                  </Link>
                </li>
                <li>
                  <Link
                    href="/forums"
                    className="text-white text-3xl md:text-4xl hover:text-green-200 transition-colors"
                    onClick={toggleMenu}
                  >
                    Forums
                  </Link>
                </li>
                <li>
                  <button
                    className="text-white text-3xl md:text-4xl hover:text-green-200 transition-colors"
                    onClick={() => {
                      toggleMenu();
                      handleLogout();
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
            {!isLogedIn && (
              <>
                <li>
                  <Link
                    href="/login"
                    className="text-white text-3xl md:text-4xl hover:text-green-200 transition-colors"
                    onClick={() => {
                      toggleMenu();
                    }}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="text-white text-3xl md:text-4xl hover:text-green-200 transition-colors"
                    onClick={toggleMenu}
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
