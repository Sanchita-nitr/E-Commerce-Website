import React, { useEffect, useState } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('/api/v1/products/get-product');
            console.log('Fetched Products:', data.products);
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <Layout title={'Dashboard - Categories'}>
            <div className="flex flex-col sm:flex-row min-h-screen">
                <div className="bg-gray-100 min-w-max">
                    <AdminMenu />
                </div>
                <div className="w-full p-4 md:p-6">
                    <div className="bg-white p-4 md:p-6 shadow rounded-md ">
                        <h1 className="text-xl font-bold mb-4">All products lists</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                            {products?.map((p) => (
                                <Link key={p._id} to={`/dashboard/admin/products/${p.slug}`}>
                                    <div className="bg-white  shadow-lg rounded-md overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1 border">
                                        {/* Image Section */}
                                        <div className="relative border-b p-6">
                                            <img
                                                src={`/api/v1/products/get-product-photo/${p._id}`}
                                                alt={p.name}
                                                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                                            />
                                        </div>
                                        {/* Description Section */}
                                        <div className="p-4">
                                            <h2 className="text-lg font-semibold mb-2 text-gray-800">{p.name}</h2>
                                            <p className="text-sm text-gray-600 truncate">{p.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Products;
