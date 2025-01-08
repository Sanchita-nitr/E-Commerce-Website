import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-gray-600 font-light text-center py-4"> {/* Removed `h-screen` */}
      <div>
        <p>© 2024 Sanchita Priyadarshinee</p>
        <p>All rights reserved</p>
      </div>
      <div className="space-x-1 font-light font-serif mt-2">
        <Link to="/about" className="hover:text-blue-500 transition">About</Link> |
        <Link to="/contact" className="hover:text-blue-500 transition">Contact</Link> |
        <Link to="/policy" className="hover:text-blue-500 transition">Privacy Policy</Link>
      </div>
    </footer>
  );
};

export default Footer;
