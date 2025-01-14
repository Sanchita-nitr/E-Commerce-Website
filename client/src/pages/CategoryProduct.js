import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const CategoryProduct = () => {
    const { slug } = useParams(); // Extract slug from URL
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null); // Updated: Use null initially
    const navigate = useNavigate()

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
    }, [slug, getProductsCategoryWise]); // Depend only on slug

    return (
        <Layout title={category ? `${category.name} Products` : 'Category'}>
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold text-center mb-6">
                    {category ? category.name : 'Loading...'}
                </h1>
                <h6 className="mt-4 text-xl text-gray-600">
                    {products?.length === 0
                        ? 'Oops! No products match your search.'
                        : `We found ${products.length} ${products.length === 1 ? 'products' : 'products'} for you!`}
                </h6>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

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
                                <p className="text-sm text-gray-600 truncate">₹{p.price}</p>
                                <div className="mt-4">
                                    <button
                                        type="button"
                                        onClick={() => navigate(`/products/${p.slug}`)}
                                        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                                    >

                                        View Details
                                    </button>
                                    <button
                                        type="button"
                                        className="w-full py-2 mt-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {products?.length > 0 ? (
                        products.map((product) => (
                            <div
                                key={product._id}
                            >
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600 col-span-full">
                            No products found in this category.
                        </p>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default CategoryProduct;
