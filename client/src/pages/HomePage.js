import { Checkbox, Radio } from 'antd';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiFillHeart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { ImMenu3 } from "react-icons/im";
import { useNavigate, useParams } from 'react-router-dom';
import { Prices } from '../components/Form/Prices'; // Ensure this file exists and exports Prices properly
import Layout from '../components/Layout/Layout';
import { useCart } from '../context/cart';
import { useWishlist } from '../context/wishlist';

const HomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState('');
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [wishlist, setWishlist] = useWishlist(); // Wishlist state
    const navigate = useNavigate();
    const { slug } = useParams();
    const [cart, setCart] = useCart();
    const [isVisible, setVisible] = useState(false);

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
        '/images/c1.jpg',
        '/images/c3.jpg',
        '/images/c6.jpg',
        '/images/c7.jpg',
        '/images/c4.jpg',
        '/images/c3.png',
        '/images/c8.jpg',
    ];
    const carouselImagesElectronics = [
        '/images/ce8.jpg',
        '/images/ce3.jpg',
        '/images/ce7.jpg',
        '/images/ce5.jpg',
        '/images/ce6.jpg',
        '/images/ce9.jpg',
        '/images/freepik__adjust__18175.png',
    ];
    const carouselImagesHomeAppliance = [
        '/images/ch1.webp',
        '/images/ch2.webp',
        '/images/ch8.jpg',
        '/images/ch4.jpg',
        '/images/ch9.jpg',
        '/images/ch6.webp',
        '/images/ch7.jpg',
    ];
    const carouselImagesBeautyPersonalCare = [
        '/images/cbp7.jpg',
        '/images/cbp1.jpg',
        '/images/cbp8.jpg',
        '/images/cbp5.jpg',
        '/images/cbp2.jpg',
        '/images/cbp3.jpg',
        '/images/cbp6.jpg',
    ];
    const carouselImagesBabyKids = [
        '/images/cb1.jpg',
        '/images/cb6.jpg',
        '/images/cb2.jpg',
        '/images/cb3.jpg',
        '/images/cb4.jpg',
        '/images/cb5.jpg',
        '/images/cb7.jpg',
    ];
    const carouselImagesSports = [
        '/images/cs1.jpg',
        '/images/cs2.jpg',
        '/images/cs3.jpg',
        '/images/cs4.png',
        '/images/cs5.jpg',
        '/images/cs6.jpg',
        '/images/cs7.jpg',
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
    const getProductsCategoryWise = useCallback(async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/products/category-wise-product/${slug}`
            );
            setProducts(data?.products || []);
            setCategory(data?.category || null);
        } catch (error) {
            console.error('Error fetching category-wise products:', error);
        }
    }, [slug]);

    useEffect(() => {
        if (slug) {
            getProductsCategoryWise();
        }
    }, [slug, getProductsCategoryWise]);



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
    useEffect(() => {
        filterProduct();
    }, []);

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

    useEffect(() => {
        if (isVisible) {
            document.body.classList.add("scroll-lock");
        }
        else {
            document.body.classList.remove("scroll-lock");
        }

        return () => document.body.classList.remove("scroll-lock");
    }, [isVisible])




    return (
        <Layout title="All products - E-Commerce">
            <div className="my-2">
                {/* Menu Button */}
                <button
                    onClick={() => setVisible(!isVisible)}
                    className="text-gray-800 p-2 shadow-lg left-4 relative z-50"
                >
                    <ImMenu3 size={24} />
                </button>
            </div>
            {/* Filter Sidebar */}
            {isVisible && (
                <div className="pt-16 absolute w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6 shadow-2xl z-50 overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-6 border-b border-gray-600 pb-2">
                        Filters
                    </h2>

                    <div className="space-y-6">
                        {/* Filter by Category */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Filter by Category</h3>
                            <div className="flex flex-col space-y-2">
                                {categories?.map((c) => (
                                    <label
                                        key={c._id}
                                        className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 rounded-md px-3 py-2 transition"
                                    >
                                        <Checkbox
                                            onChange={(e) => handleFilter(e.target.checked, c._id)}
                                            className="text-blue-500"
                                        />
                                        <span className="text-sm">{c.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Filter by Price */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Filter by Price</h3>
                            <div className="flex flex-col space-y-2">
                                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                                    {Prices?.map((p) => (
                                        <div
                                            key={p._id}
                                            className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 rounded-md px-3 py-2 transition"
                                        >
                                            <Radio value={p.range} className="text-blue-500" />
                                            <span className="text-sm">{p.name}</span>
                                        </div>
                                    ))}
                                </Radio.Group>
                            </div>
                        </div>

                        {/* Reset Button */}
                        <div>
                            <button
                                className="w-full py-2 bg-red-500 rounded-md hover:bg-red-600 transition"
                                onClick={() => window.location.reload()}
                            >
                                Reset Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}


            <div className="bg-gradient-to-r from-blue-950 via-black to-blue-950 min-h-screen ">
                <h2 className="text-2xl p-2 font-bold text-white">Fashion</h2>
                {/* Carousel */}
                <div className="relative w-full h-[550px] mb-8 overflow-hidden rounded-lg shadow-lg">
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
                <div className="col-span-12 md:col-span-9">

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
            </div>
            <div className="bg-gradient-to-r from-blue-950 via-black to-blue-950 min-h-screen">
                <h2 className="text-2xl text-white font-bold p-2">Electronics Products</h2>
                <div className="relative w-full h-[550px] mb-8 overflow-hidden rounded-lg shadow-lg">
                    <div className="absolute inset-0">
                        {carouselImagesElectronics.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Slide ${index}`}
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                                    }`}
                            />
                        ))}
                    </div>
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
                </div>
                <div className="col-span-12 md:col-span-9">
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
            <div className="bg-gradient-to-r from-blue-950 via-black to-blue-950 min-h-screen">
                <h2 className="text-2xl font-bold text-white p-2">Home Appliance</h2>
                {/* Carousel */}
                <div className="relative w-full h-[550px] mb-8 overflow-hidden rounded-lg shadow-lg">
                    <div className="absolute inset-0">
                        {carouselImagesHomeAppliance.map((image, index) => (
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
                <div className="col-span-12 md:col-span-9">

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
            <div className="bg-gradient-to-r from-blue-950 via-black to-blue-950 min-h-screen">
                <h2 className="text-2xl font-bold text-white p-2">Beauty & Personal Care</h2>

                {/* Carousel */}
                <div className="relative w-full h-[550px] mb-8 overflow-hidden rounded-lg shadow-lg">
                    <div className="absolute inset-0">
                        {carouselImagesBeautyPersonalCare.map((image, index) => (
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
                        {carouselImagesBeautyPersonalCare.map((_, index) => (
                            <span
                                key={index}
                                className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-blue-500' : 'bg-gray-300'}`}
                            ></span>
                        ))}
                    </div>
                </div>

                {/* Filtered products for Beauty & Personal Care */}
                <div className="col-span-12 md:col-span-9">
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
            <div className="bg-gradient-to-r from-blue-950 via-black to-blue-950 min-h-screen">
                <h2 className="text-2xl font-bold text-white p-2">Baby & Kids</h2>
                {/* Carousel */}
                <div className="relative w-full h-[550px] mb-8 overflow-hidden rounded-lg shadow-lg">
                    <div className="absolute inset-0">
                        {carouselImagesBabyKids.map((image, index) => (
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
                <div className="col-span-12 md:col-span-9">
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
            <div className="bg-gradient-to-r from-blue-950 via-black to-blue-950 min-h-screen">
                <h2 className="text-2xl font-bold text-white p-2">Sports & Outdoors</h2>
                {/* Carousel */}
                <div className="relative w-full h-[550px] mb-8 overflow-hidden rounded-lg shadow-lg">
                    <div className="absolute inset-0">
                        {carouselImagesSports.map((image, index) => (
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
                    <div className="col-span-12 md:col-span-9">

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
                </div>
            </div>

        </Layout>
    );
};

export default HomePage;

