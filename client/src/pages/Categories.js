import React from 'react';
import Layout from '../components/Layout/Layout';
import useCategory from '../hooks/useCategory';
import { NavLink } from 'react-router-dom';

const Categories = () => {
  const categories = useCategory(); // Fetch all categories

  return (
    <Layout title="All Categories">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-6">All Categories</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
          {categories?.map((category) => (
            <div 
              key={category._id} 
              className="border p-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <NavLink 
                to={`/category/${category.slug}`} 
                className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition"
              >
                {category.name}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
