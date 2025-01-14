"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { LuMenu, LuX } from "react-icons/lu"; // Added LuX for close icon
import { PiShoppingCartSimpleDuotone } from "react-icons/pi";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import useCategory from "../../hooks/useCategory";
import SearchInput from "../Form/SearchInput";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false); // State for category dropdown
  const categories = useCategory();

  // Assuming you have a cart context or state for cart items
  // const [cartItems, setCartItems] = useState(5); // Replace with actual cart count from state or context

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <div className="shadow-lg w-full shadow-zinc-300 border-b bg-white">
      <nav className="flex items-center justify-between py-4 px-6">
        {/* Left Side - Website name */}
        <span className="text-2xl font-bold text-blue-700 hover:text-blue-900 transition duration-300">
          <NavLink to="/">My Website</NavLink>
        </span>

        {/* Center - Search Input (Hidden on mobile) */}
        <div className="hidden md:block w-1/3 -mt-4">
          <SearchInput />
        </div>

        {/* Right Side - Menu Items */}
        <div className="flex items-center space-x-6">
          {/* Mobile Toggle Button */}
          <button
            className="md:hidden text-2xl focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <LuX /> : <LuMenu />}
          </button>


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
            <li>
              <NavLink className="text-lg font-medium hover:text-blue-700 transition" to="/wishlist">
                Wishlist
              </NavLink>
            </li>

            {/* Category Dropdown */}
            <li className="relative">
              <button
                className="text-lg font-medium hover:text-blue-700 transition"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                <Link to={'/'}>
                  <NavLink>
                    Category
                  </NavLink>
                </Link>
              </button>
              {isCategoryOpen && (
                <ul className="absolute bg-white shadow-lg rounded mt-2 w-40 z-50">
                  <li className="p-2 underline underline-offset-4 text-yellow-700">
                    <NavLink to={'/categories'}>All Categories</NavLink>
                  </li>
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      className="p-2 hover:bg-gray-100"
                    >
                      <NavLink to={`/category/${category.slug}`} >
                        {category.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
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
                  <ul className="absolute bg-white shadow-lg rounded mt-2 w-40 z-50">
                    <li className="p-2 hover:bg-gray-100">
                      <NavLink
                        to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                        className="block"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li className="p-2 hover:bg-gray-100">
                      <button onClick={handleLogout} className="block w-full text-left">
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            )}
          </ul>

          {/* Desktop Cart Icon with Item Count */}
          <NavLink to="/cart" className="relative">
            <div className="flex">
              <PiShoppingCartSimpleDuotone className="text-2xl" />
              <div className="-ml-1 ">
                <p className=" -mt-3 border rounded-full px-2">
                  {cart?.length}
                </p>

              </div>
            </div>

          </NavLink>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden w-full bg-white shadow-lg py-4 px-6">
          <ul className="space-y-4">
            <li>
              <NavLink
                className="text-lg font-medium hover:text-blue-700 transition"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="text-lg font-medium hover:text-blue-700 transition" to="/wishlist">
                Wishlist
              </NavLink>
            </li>

            {/* Mobile Category Dropdown */}
            <li>
              <button
                className="text-lg font-medium hover:text-blue-700 transition w-full text-left"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                Category
              </button>
              {isCategoryOpen && (
                <ul className="bg-white shadow-lg rounded mt-2 w-full">
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      className="p-2 hover:bg-gray-100"
                    >
                      <NavLink to={`/category/${category.slug}`}>
                        {category.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
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
              <>
                <li className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="text-lg font-medium hover:text-blue-700 transition"
                  >
                    Account
                  </button>
                  {isDropdownOpen && (
                    <ul className="absolute bg-white shadow-lg rounded mt-2 w-40 z-50">
                      <li className="p-2 hover:bg-gray-100">
                        <NavLink
                          to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                          className="block"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li className="p-2 hover:bg-gray-100">
                        <button onClick={handleLogout} className="block w-full text-left">
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
              </>
            )}
          </ul>
        </div>
      )}

      {/* Mobile Search Input - Always visible below header */}
      <div className="block md:hidden pb-4 -mt-4 px-5">
        <SearchInput />
      </div>
    </div>
  );
};

export default Header;
