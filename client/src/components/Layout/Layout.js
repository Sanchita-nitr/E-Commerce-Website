import React from 'react';
import { Helmet } from "react-helmet";
import Footer from './Footer';
import Header from './Header';
import { Toaster } from 'react-hot-toast';

const Layout = ({ 
  children, 
  title = "E-commerce Website Shopping", 
  description = "Fullstack Project", 
  keywords = "react,mongodb,tailwindcss", 
  author = "Sanchita Priyadarshinee" 
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <Toaster />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
