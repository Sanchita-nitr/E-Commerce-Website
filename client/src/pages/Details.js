
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const Details = () => {
  const params = useParams(); // Get slug from route parameters
  const [product, setProduct] = useState({});
  const [similarProduct, setSimilarProduct] = useState([]);

  // Fetch a single product based on the slug
  const getProduct = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/v1/products/get-product/${params.slug}`);
      if (data?.product) {
        setProduct(data.product);
      } else {
        console.error('Product data not found.');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }, [params.slug]);

  // Fetch similar products based on product ID and category ID
  const getSimilarProduct = async (pid, cid) => {
    if (!pid || !cid) {
      console.error('Invalid parameters for similar products:', { pid, cid });
      return;
    }
    try {
      const { data } = await axios.get(`/api/v1/products/similar-product/${pid}/${cid}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (data?.products) {
        setSimilarProduct(data.products);
        console.log('Similar products:', data.products);
      } else {
        console.error('No similar products found.');
      }
    } catch (error) {
      console.error('Error fetching similar products:', error.response?.data || error.message);
    }
  };

  // Fetch product data when slug changes
  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug, getProduct]);

  // Fetch similar products when product details are available
  useEffect(() => {
    if (product._id && product.category?._id) {
      console.log('Fetching similar products for:', { productId: product._id, categoryId: product.category._id });
      getSimilarProduct(product._id, product.category._id);
    }
  }, [product._id, product.category?._id]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section: Product Image */}
          <div className="space-y-4">
            <div className="border rounded-lg shadow-md overflow-hidden">
              {product._id ? (
                <img
                  src={`/api/v1/products/get-product-photo/${product._id}`}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
              ) : (
                <div className="text-center py-16 text-gray-500">
                  Product image not available.
                </div>
              )}
            </div>
          </div>

          {/* Right Section: Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{product.name || 'Product Name'}</h1>
            <p className="text-gray-600 mt-2">Category: {product.category?.name || 'N/A'}</p>
            <p className="text-gray-900 text-xl font-semibold mt-4">
              ₹{product.price || 'Price not available'}
            </p>
            <p className="text-gray-700 mt-6 leading-7">
              {product.description || 'No description available.'}
            </p>

            <button
              className="mt-6 py-3 px-6 bg-blue-500 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Similar Products */}
       <div className='mt-5'>
       <p className='font-bold text-3xl'>Similar Products</p>
        </div> 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {similarProduct?.length > 0 ? (
            similarProduct.map((p) => (
              <div
                key={p._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative border-b p-4">
                  <img
                    src={`/api/v1/products/get-product-photo/${p._id}`}
                    alt={p.name}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">{p.name}</h2>
                  <p className="text-sm text-gray-600 truncate">{p.description}</p>
                  <p className="text-sm text-gray-600 truncate">₹{p.price}</p>
                  <div className="mt-4">
                   
                    <button
                      type="button"
                      className="w-full py-2 mt-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No similar products available.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Details;




