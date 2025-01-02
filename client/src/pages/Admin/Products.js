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
                    <div className="bg-white p-4 md:p-6 shadow rounded-md">
                        <h1 className="text-xl font-bold mb-4">All products lists</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                            {products?.map((p) => (
                                <Link key={p._id} to ={`/dashboard/admin/products/${p.slug}`}>
                                      <div
                                 
                                 className="bg-white p-4 shadow rounded-md"
                             >
                                <div className='flex justify-center'>
                                <img src={`/api/v1/products/get-product-photo/${p._id}`} alt={p.name} className='size-48' srcset="" />
                                </div>
                                
                                 <p className="text-xl font-bold mb-2">Name: {p.name}</p>
                                 <p className="text-gray-600 text-sm mb-4">
                                     Description: {p.description}
                                 </p>
                                
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
