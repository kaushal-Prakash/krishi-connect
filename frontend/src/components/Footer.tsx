import Image from "next/image";
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div className="footer bg-gradient-to-r from-green-700 to-green-900 min-h-[30rem] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="footer-logo flex flex-col items-center mb-8">
          <Image src="/logo.png" height={100} width={100} alt="logo" />
          <p className="text-center max-w-md text-xl">
            Empowering farmers with technology and community support to
            transform agriculture.
          </p>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 font-para">
          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-green-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-300">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="footer-section">
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-300">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="hover:text-green-300">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="hover:text-green-300">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="hover:text-green-300">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>Email: support@krishiconnect.com</li>
              <li>Phone: +91 123 456 7890</li>
              <li>Address: 123 Farm Street, Agri City, India</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center border-t border-green-600 pt-8">
          <p>
            &#169; {new Date().getFullYear()} Krishi Connect. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
