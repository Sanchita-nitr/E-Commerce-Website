import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';
import { useWishlist } from '../context/wishlist';
import { useCart } from '../context/cart';
import { AiFillHeart } from 'react-icons/ai';

const WishlistPage = () => {
    const [auth] = useAuth();
    const [wishlist, setWishlist] = useWishlist();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

    // Handle product removal from wishlist
    const handleRemove = (productId) => {
        const updatedWishlist = wishlist.filter((product) => product._id !== productId);
        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        toast.success('Product removed from Wishlist');
    };

    return (
        <Layout title="Wishlist - E-Commerce">
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">My Wishlist</h2>
                {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {wishlist.map((product) => (
                            <div
                                key={product._id}
                                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="relative border-b p-4">
                                    <img
                                        src={`/api/v1/products/get-product-photo/${product._id}`}
                                        alt={product.name}
                                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                                    <p className="text-sm text-gray-600 truncate">{product.description}</p>
                                    <div className="flex justify-between items-center mt-2">
                                        <p className="text-sm text-gray-600">₹{product.price}</p>
                                        <button
                                            onClick={() => handleRemove(product._id)}
                                            className="text-red-500 hover:text-red-600 text-xl transition duration-300"
                                            title="Remove from Wishlist"
                                        >
                                            <AiFillHeart />
                                        </button>
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            onClick={() => navigate(`/products/${product.slug}`)}
                                            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                                        >
                                            View Details
                                        </button>
                                        <button
                                            onClick={() => {
                                                setCart([...cart, { ...product, quantity: 1 }]); // Set quantity to 1
                                                localStorage.setItem('cart', JSON.stringify([...cart, { ...product, quantity: 1 }]));
                                                toast.success('Item added to cart');
                                            }}
                                            type="button"
                                            className="w-full py-2 mt-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center">
                        <h2 className="text-2xl font-medium text-gray-800 mb-4">Your Wishlist is empty!</h2>
                        <p className="text-gray-600 mb-6">Start adding your favorite items to your wishlist!</p>
                        <button
                            onClick={() => navigate('/')}
                            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                        >
                            Shop Now
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default WishlistPage;