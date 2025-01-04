"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { LuMenu } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import SearchInput from "../Form/SearchInput";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: '',
    });
    localStorage.removeItem('auth');
    toast.success('Logout Successfully');
  };

  return (
    <div className="shadow-lg w-full shadow-zinc-300 border-b-2 bg-white">
      <nav className="flex flex-col md:flex-row justify-between items-center py-4 px-6">
        {/* Left side - Website name */}
        <span className="text-2xl font-bold text-blue-700 hover:text-blue-900 transition duration-300">
          <NavLink to="/">My Website</NavLink>
        </span>

        {/* Mobile Menu and Search Input */}
        <div className="w-full md:w-auto flex flex-col md:flex-row items-center md:space-x-6">
          {/* Toggle button for mobile */}
          <div className="w-full md:w-auto flex justify-end md:hidden">
            <button
              className="flex items-center px-2 py-1 border rounded hover:bg-gray-200 transition"
              onClick={() => setIsOpen(!isOpen)}
            >
              <LuMenu className="text-xl" />
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <ul className="absolute top-16 right-4 w-48 bg-white shadow-lg rounded-lg z-10">
              <li className="py-2 px-4 hover:bg-gray-100">
                <NavLink to="/">Home</NavLink>
              </li>

              {!auth.user ? (
                <>
                  <li className="py-2 px-4 hover:bg-gray-100">
                    <NavLink to="/register">Register</NavLink>
                  </li>
                  <li className="py-2 px-4 hover:bg-gray-100">
                    <NavLink to="/login">Login</NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="py-2 px-4 hover:bg-gray-100">
                    <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>Dashboard</NavLink>
                  </li>
                  <li className="py-2 px-4 hover:bg-gray-100">
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </>
              )}
              <li className="py-2 px-4 hover:bg-gray-100">
                <NavLink to="/service">Service</NavLink>
              </li>
            </ul>
          )}

          {/* Search Input - Full width on mobile, below the menu */}
          <div className="w-full md:w-auto mt-4 md:mt-0">
            <SearchInput />
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6">
          <li>
            <NavLink
              className="text-lg font-medium hover:text-blue-700 transition"
              to="/"
            >
              Home
            </NavLink>
          </li>

          {!auth.user ? (
            <>
              <li>
                <NavLink
                  className="text-lg font-medium hover:text-blue-700 transition"
                  to="/register"
                >
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="text-lg font-medium hover:text-blue-700 transition"
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
            </>
          ) : (
            <li className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-lg font-medium hover:text-blue-700 transition"
              >
                Account
              </button>
              {isDropdownOpen && (
                <ul className="absolute right-0 bg-white text-gray-700 mt-2 rounded shadow-lg w-40">
                  <li className="p-2 hover:bg-gray-100">
                  
                    <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>Dashboard</NavLink>
                  </li>
                  <li className="p-2 hover:bg-gray-100">
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              )}
            </li>
          )}
          <li>
            <NavLink
              className="text-lg font-medium hover:text-blue-700 transition"
              to="/service"
            >
              Service
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;