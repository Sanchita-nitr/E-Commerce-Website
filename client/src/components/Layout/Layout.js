import React from 'react';
import { Helmet } from "react-helmet";
import Footer from './Footer';
import Header from './Header';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div className="flex flex-col min-h-screen"> {/* Flexbox for full height layout */}
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main className="flex-grow">{/* Allow main content to grow and take remaining space */}
        {children}
        <Toaster />
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "E-commerce Website Shopping",
  description: "Fullstack Project",
  keywords: "react,mongodb,tailwindcss",
  author: "Sanchita Priyadarshinee",
};

export default Layout;
