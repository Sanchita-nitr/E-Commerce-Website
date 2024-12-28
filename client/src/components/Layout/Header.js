
"use client";
import React, { useState } from "react";
import { LuMenu } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast, { Toast } from "react-hot-toast";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = ()=>{
    setAuth({
      ...auth,
      user:null,
      token:''
    })
    localStorage.removeItem('auth')
    toast.success('Logout Successfully')
  }
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" border-2 shadow-md">
      <nav className=" flex justify-between items-center">
        {/* Left side - Website name */}
        <span className="text-2xl font-semibold  ml-5"><NavLink to="/"> My Website</NavLink> </span>

        {/* Toggle button for mobile */}
        <div className="sm:block md:hidden">

          <button
            className="flex items-center ml-5 px-2 py-1 border rounded"
            onClick={() => setIsOpen(!isOpen)}
          >
            <LuMenu />
          </button>


          {/* Mobile Menu */}
          {isOpen && (
            <ul className=" md:hidden grid grid-rows-4 pt-10 rounded-xl bg-black-300 text-center">
              <li className="mb-10">
                <NavLink
                  className="p-4 rounded-2xl hover:underline font-medium font-serif bg-black-200"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="p-4 rounded-2xl hover:underline font-medium font-serif bg-black-200"
                  to="/register"
                >
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="p-4 rounded-2xl hover:underline font-medium font-serif bg-black-200"
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="p-4 rounded-2xl hover:underline font-medium font-serif bg-black-200"
                  to="/service"
                >
                  Service
                </NavLink>
              </li>
            </ul>
          )}
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:grid grid-cols-4 justify-end text-center rounded-xl p-5 bg-black-300 mr-5">
          <li>
            <NavLink
              className="p-4 rounded-2xl hover:underline font-medium font-serif bg-black-200"
              to="/"
            >
              Home
            </NavLink>
          </li>

          {
            !auth.user ? (<>
              <li>
                <NavLink
                  className="p-4 rounded-2xl hover:underline font-medium font-serif bg-black-200"
                  to="/register"
                >
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="p-4 rounded-2xl hover:underline font-medium font-serif bg-black-200"
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
            </>) : (<>
              <li>
                <NavLink onClick={handleLogout}
                  className="p-4 rounded-2xl hover:underline font-medium font-serif bg-black-200"
                  to="/login"
                >
                  Logout
                </NavLink>
              </li>

            </>)
          }
          <li>
            <NavLink
              className="p-4 rounded-2xl hover:underline font-medium font-serif bg-black-200"
              to="/service"
            >
              Service
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
