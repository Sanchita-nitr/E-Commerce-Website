import { Checkbox, Radio } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiFillHeart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Prices } from '../components/Form/Prices'; // Ensure this file exists and exports Prices properly
import Layout from '../components/Layout/Layout';
import { useCart } from '../context/cart';
import { useWishlist } from '../context/wishlist';

const HomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState('');
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [wishlist, setWishlist] = useWishlist(); // Wishlist state
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    
    const getTotal = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/count-product`);
            setTotal(data?.total);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getTotal();
    }, []);

    // Fetch products based on the page number
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/product-list/${page}`);
            setProducts((prevProducts) => [...prevProducts, ...data?.products]);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);

    const carouselImages = [
        // '/images/about.jpg',
        '/images/bg2.png',
        '/images/bg5.jpg',
    ];

    // Fetch categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/getall-category`);
            if (data?.success) {
                setCategories(data.category);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    // Fetch products based on filters
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/product-list/${page}`);
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, [page]);

    // Handle filter changes
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };

    useEffect(() => {
        if (!checked.length && !radio) getAllProducts();
    }, [checked.length, radio]);

    useEffect(() => {
        if (checked.length || radio) filterProduct();
    }, [checked, radio]);

    const filterProduct = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/products/filter-product`, {
                checked,
                radio,
            });
            setProducts(data?.products);
        } catch (error) {
            console.error(error);
        }
    };

    // Auto slideshow
    useEffect(() => {
        const autoSlide = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
        }, 5000); // Auto-slide every 5 seconds

        return () => clearInterval(autoSlide); // Cleanup on component unmount
    }, [carouselImages.length]);

    // Manual navigation
    const handleNext = () => {
        setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    };

    const handlePrev = () => {
        setCurrentSlide((prev) =>
            prev === 0 ? carouselImages.length - 1 : prev - 1
        );
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
        <Layout title="All products - E-Commerce">
            {/* Carousel */}
            <div className="relative w-full h-96 mb-8 mt-16 overflow-hidden rounded-lg shadow-lg">
                <div className="absolute inset-0">
                    {carouselImages.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Slide ${index}`}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                        />
                    ))}
                </div>
                {/* Manual Navigation */}
                <button
                    onClick={handlePrev}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
                >
                    &lt;
                </button>
                <button
                    onClick={handleNext}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
                >
                    &gt;
                </button>
                {/* Indicator Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {carouselImages.map((_, index) => (
                        <span
                            key={index}
                            className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-blue-500' : 'bg-gray-300'}`}
                        ></span>
                    ))}
                </div>
            </div>

            {/* Filter Sidebar */}
            <div className="grid grid-cols-12 gap-6 px-6">
                <div className="col-span-12 md:col-span-3 bg-gray-100 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Filter by Category</h2>
                    <div className="flex flex-col">
                        {categories?.map((c) => (
                            <label
                                key={c._id}
                                className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 rounded-md px-3 py-2 transition"
                            >
                                <Checkbox
                                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                                    className="text-blue-500"
                                />
                                <span className="text-gray-700">{c.name}</span>
                            </label>
                        ))}
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4 border-b pb-2">Filter by Price</h2>
                    <div className="flex flex-col">
                        <Radio.Group
                            onChange={(e) => setRadio(e.target.value)}
                            className=""
                        >
                            {Prices?.map((p) => (
                                <div
                                    key={p._id}
                                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 rounded-md px-3 py-2 transition"
                                >
                                    <Radio value={p.range} className="text-blue-500" />
                                    <span className="text-gray-700">{p.name}</span>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                    <div className="mt-6">
                        <button
                            className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                            onClick={() => window.location.reload()}
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="col-span-12 md:col-span-9">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products?.map((p) => (
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
                                        <button
                                            type="button"
                                            onClick={() => navigate(`/products/${p.slug}`)}
                                            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                                        >
                                            View Details
                                        </button>
                                        <button
                                            onClick={() => {
                                                setCart([...cart, p]);
                                                localStorage.setItem('cart', JSON.stringify([...cart, p]));
                                                toast.success("Item added to cart");
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
                    <div className="p-3 m-2 text-center">
                        {products && products.length < total ? (
                            <button
                                type="button"
                                onClick={() => setPage(page + 1)}
                                className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                            >
                                {loading ? 'Loading...' : 'Load More'}
                            </button>
                        ) : (
                            <p className="text-gray-600">No more products to display</p>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
