import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiFillHeart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { useCart } from '../context/cart';
import { useWishlist } from '../context/wishlist'; // Import wishlist context

const Details = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [wishlist, setWishlist] = useWishlist(); // Use wishlist context
  const navigate = useNavigate();

  // Fetch product details
  const fetchProduct = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/v1/products/get-product/${params.slug}`);
      if (data?.product) {
        setProduct(data.product);
      } else {
        console.error('Product data not found.');
      }
    } catch (error) {
      console.error('Error fetching product:', error.message);
    }
  }, [params.slug]);

  // Fetch similar products
  const fetchSimilarProducts = async (productId, categoryId) => {
    if (!productId || !categoryId) return;
    try {
      const { data } = await axios.get(`/api/v1/products/similar-product/${productId}/${categoryId}`);
      if (data?.products) {
        setSimilarProducts(data.products);
      }
    } catch (error) {
      console.error('Error fetching similar products:', error.message);
    }
  };

  useEffect(() => {
    if (params.slug) fetchProduct();
  }, [params.slug, fetchProduct]);

  useEffect(() => {
    if (product._id && product.category?._id) {
      fetchSimilarProducts(product._id, product.category._id);
    }
  }, [product]);

  const addToCart = (item) => {
    const updatedCart = [...cart, { ...item, quantity: 1 }];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast.success('Item added to cart');
  };

  const addToWishlist = (item) => {
    const updatedWishlist = [...wishlist, item];
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    toast.success('Item added to wishlist');
  };

  const isInWishlist = (product) => wishlist.some((item) => item._id === product._id);
  const toggleWishlist = (product) => {
    let updatedWishlist;
    if (isInWishlist(product)) {
      // Remove the product from wishlist
      updatedWishlist = wishlist.filter((item) => item._id !== product._id);
      toast.success("Removed from Wishlist");
    } else {
      // Add the product to wishlist
      updatedWishlist = [...wishlist, product];
      toast.success("Added to Wishlist");
    }
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };


  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="border rounded-lg shadow-lg overflow-hidden">
            {product._id ? (
              <img
                src={`/api/v1/products/get-product-photo/${product._id}`}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            ) : (
              <div className="text-center py-16 text-gray-500">No image available</div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name || 'Product Name'}</h1>
            <p className="text-lg text-gray-600 mb-2">Category: {product.category?.name || 'N/A'}</p>
            <p className="text-2xl font-semibold text-gray-900 mb-4">₹{product.price || 'Price not available'}</p>
            <p className="text-gray-700 leading-6 mb-6">{product.description || 'No description available.'}</p>
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => addToCart(product)}
                type="button"
                className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
              >
                Add to Cart
              </button>
              <button
                onClick={() => addToWishlist(product)}
                type="button"
                className="w-full py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
              >
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Similar Products</h2>
          {similarProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {similarProducts.map((p) => (
                <div
                  key={p._id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <img
                    src={`/api/v1/products/get-product-photo/${p._id}`}
                    alt={p.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{p.name}</h3>
                    <p className="text-gray-600 mb-2 truncate">{p.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-gray-600">₹{p.price}</p>
                      <button
                        onClick={() => toggleWishlist(p)}
                        type="button"
                        className="text-sm text-red-500 hover:text-red-600 transition duration-300"
                      >
                        {isInWishlist(p) ? <AiFillHeart /> : <FaRegHeart />}
                      </button>

                    </div>
                    <div className="mt-4">
                      <div className="flex flex-col space-y-2">
                        <button
                          onClick={() => navigate(`/products/${p.slug}`)}
                          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => addToCart(p)}
                          type="button"
                          className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No similar products available.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Details;
