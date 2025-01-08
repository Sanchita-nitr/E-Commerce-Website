import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [savedForLater, setSavedForLater] = useState([]);
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );


  // Calculate total items
  const totalItems = cart.reduce((acc, product) => acc + product.quantity, 0);

  // Handle product removal
  const handleRemove = (productId) => {
    const updatedCart = cart.filter((product) => product._id !== productId);
    setCart(updatedCart);
    toast.success('Product removed from cart');
  };

  // Handle save for later
  const handleSaveForLater = (product) => {
    const updatedCart = cart.filter((item) => item._id !== product._id);
    setCart(updatedCart);
    setSavedForLater((prev) => [...prev, product]);
    toast.success('Product saved for later');
  };

  // Handle move back to cart
  const handleMoveToCart = (product) => {
    const updatedSaved = savedForLater.filter((item) => item._id !== product._id);
    setSavedForLater(updatedSaved);
    setCart((prev) => [...prev, product]);
    toast.success('Product moved back to cart');
  };

  // Handle quantity increment
  const handleIncrement = (productId) => {
    const updatedCart = cart.map((product) =>
      product._id === productId
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
    setCart(updatedCart);
  };

  // Handle quantity decrement
  const handleDecrement = (productId) => {
    const updatedCart = cart.map((product) =>
      product._id === productId && product.quantity > 1
        ? { ...product, quantity: product.quantity - 1 }
        : product
    );
    setCart(updatedCart);
  };

  return (
    <Layout title="Cart - E-Commerce">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 ">
        {/* Products Section */}
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            Your Cart
          </h1>
          {cart.length > 0 ? (
            <div className="space-y-6">
              {cart.map((product) => (
                <div
                  key={product._id}
                  className="flex flex-col sm:flex-row items-center sm:items-start bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  {/* Product Image */}
                  <img
                    src={`/api/v1/products/get-product-photo/${product._id}`}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  {/* Product Details */}
                  <div className="sm:ml-4 flex-1 text-center sm:text-left mt-4 sm:mt-0">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {product.description}
                    </p>
                    <p className="text-lg font-bold text-gray-800 mt-4">
                      ₹{(product.price * product.quantity).toFixed(2)}
                    </p>
                  </div>
                  {/* Quantity Controls */}
                  <div className="flex items-center justify-center sm:justify-start space-x-2 mt-4 sm:mt-0">
                    <button
                      onClick={() => handleDecrement(product._id)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold">
                      {product.quantity}
                    </span>
                    <button
                      onClick={() => handleIncrement(product._id)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  {/* Buttons */}
                  <div className="flex flex-col space-y-2 mt-4 sm:mt-0 sm:ml-4">
                    <button
                      onClick={() => handleRemove(product._id)}
                      className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => handleSaveForLater(product)}
                      className="py-2 px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                    >
                      Save for Later
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-medium text-gray-800 mb-4">
                Your cart is empty!
              </h2>
              <button
                onClick={() => navigate('/')}
                className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Shop Now
              </button>
            </div>
          )}
        </div>

        {/* Saved for Later Section */}
        {savedForLater.length > 0 && (
          <div className="col-span-2 bg-white p-6 rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Saved for Later
            </h2>
            <div className="space-y-6">
              {savedForLater.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  {/* Product Image */}
                  <img
                    src={`/api/v1/products/get-product-photo/${product._id}`}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  {/* Product Details */}
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {product.description}
                    </p>
                    <p className="text-lg font-bold text-gray-800 mt-4">
                      ₹{product.price}
                    </p>
                  </div>
                  {/* Move to Cart Button */}
                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                  >
                    Move to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payment Section */}
        <div className="bg-white p-6 rounded-lg shadow-md items-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Payment Summary
          </h2>
          <div className="text-lg text-gray-700">
          <p className="mb-4">Total Items: {totalItems}</p>
            <p className="font-bold">Total Price: ₹{totalPrice.toFixed(2)}</p>
          </div>
          <button
            onClick={() => {
              if (!auth?.token) {
                toast.error('Please log in to proceed to payment');
                navigate('/login');
              } else {
                toast.success('Proceeding to payment...');
                navigate('/paymentdetails');
              }
            }}
            disabled={cart.length === 0}
            className={`w-full mt-6 py-3 px-4 ${
              cart.length > 0
                ? 'bg-blue-500 hover:bg-blue-600'
                : 'bg-gray-300 cursor-not-allowed'
            } text-white rounded-md transition`}
          >
            {auth?.token ? 'Proceed to Pay' : 'Login to Pay'}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
