"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons for the hamburger menu
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to control mobile menu
  const pathname = usePathname();
  const isAdminPage = pathname.includes("admin");
  if(isAdminPage)return null
  return (
    <motion.nav
      className="bg-gray-600 bg-opacity-30 backdrop-blur-lg shadow-lg p-1 md:p-4 fixed w-full z-10 pr-20"
      style={{
        margin: "20px 0", // Add top and bottom margin
        borderRadius: "12px", // Rounded corners for glass effect
        border: "1px solid rgba(255, 255, 255, 0.3)", // Border for glass effect
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-10 lg:px-20">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <div className="text-2xl font-bold text-gray-800">
            <Link href="/">My Portfolio</Link>
          </div>
          <div
            className={`hidden md:flex space-x-8 ${
              isMobileMenuOpen ? "block" : "hidden"
            }`}
          >
            <Link
              href="/"
              className="text-lg text-gray-800 hover:text-blue-500"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-lg text-gray-800 hover:text-blue-500"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="text-lg text-gray-800 hover:text-blue-500"
            >
              Blog
            </Link>
            <Link
              href="/projects"
              className="text-lg text-gray-800 hover:text-blue-500"
            >
              Projects
            </Link>

            {/* Dropdown Menu for Achievements, etc. */}
            <div className="relative">
              <button
                className="text-lg text-gray-800 hover:text-blue-500 focus:outline-none"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                More
              </button>
              {isDropdownOpen && (
                <div
                  className="absolute left-0 mt-2 space-y-2 bg-white bg-opacity-80 backdrop-blur-lg text-gray-800 rounded-lg shadow-lg"
                  style={{
                    minWidth: "200px", // Set a minimum width for the dropdown
                    border: "1px solid rgba(255, 255, 255, 0.3)", // Border for glass effect
                  }}
                >
                  <Link
                    href="/achievements"
                    className="block px-4 py-2 text-sm hover:bg-blue-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Achievements
                  </Link>
                  <Link
                    href="/conferences"
                    className="block px-4 py-2 text-sm hover:bg-blue-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Conferences
                  </Link>
                  <Link
                    href="/research-papers"
                    className="block px-4 py-2 text-sm hover:bg-blue-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Research Papers
                  </Link>
                  <Link
                    href="/experience"
                    className="block px-4 py-2 text-sm hover:bg-blue-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Experience
                  </Link>
                  <Link
                    href="/award"
                    className="block px-4 py-2 text-sm hover:bg-blue-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Awards
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
            <div className="space-y-4">
              <Link
                href="/"
                className="block text-lg text-gray-800 hover:text-blue-500"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block text-lg text-gray-800 hover:text-blue-500"
              >
                About
              </Link>
              <Link
                href="/blog"
                className="block text-lg text-gray-800 hover:text-blue-500"
              >
                Blog
              </Link>
              <Link
                href="/projects"
                className="block text-lg text-gray-800 hover:text-blue-500"
              >
                Projects
              </Link>

              {/* Mobile Dropdown */}
              <div className="relative">
                <button
                  className="text-lg text-gray-800 hover:text-blue-500 focus:outline-none"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  More
                </button>
                {isDropdownOpen && (
                  <div
                    className="absolute left-0 mt-2 space-y-2 bg-white bg-opacity-80 backdrop-blur-lg text-gray-800 rounded-lg shadow-lg"
                    style={{
                      minWidth: "200px", // Set a minimum width for the dropdown
                      border: "1px solid rgba(255, 255, 255, 0.3)", // Border for glass effect
                    }}
                  >
                    <Link
                      href="/achievements"
                      className="block px-4 py-2 text-sm hover:bg-blue-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Achievements
                    </Link>
                    <Link
                      href="/conferences"
                      className="block px-4 py-2 text-sm hover:bg-blue-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Conferences
                    </Link>
                    <Link
                      href="/research-papers"
                      className="block px-4 py-2 text-sm hover:bg-blue-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Research Papers
                    </Link>
                    <Link
                      href="/experience"
                      className="block px-4 py-2 text-sm hover:bg-blue-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Experience
                    </Link>
                    <Link
                      href="/awards"
                      className="block px-4 py-2 text-sm hover:bg-blue-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Awards
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="md:hidden absolute top-2 right-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-800 focus:outline-none"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
