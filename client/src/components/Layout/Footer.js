import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-gray-200 text-gray-600 font-light text-center mt-auto py-4">
      <div className="text-center">
        <p>© 2024 Sanchita Priyadarshinee</p>
        <p>All rights reserved</p>
      </div>
      <div className="space-x-1 font-light font-serif">
        <Link to="/about">About</Link> |
        <Link to="/contact">Contact</Link> |
        <Link to="/policy">Privacy Policy</Link>
      </div>
    </div>
  );
};

export default Footer;
