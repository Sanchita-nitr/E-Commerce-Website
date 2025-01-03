

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
    // State hooks for various fields
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [shipping, setShipping] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState('');
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    // Get all categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/getall-category');
            if (data?.success) {
                setCategories(data.category);
            } else {
                toast.error('Failed to fetch categories');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error('Something went wrong while fetching categories');
        }
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    // Handle form submission to create a product
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append('name', name);
            productData.append('description', description);
            productData.append('price', price);
            productData.append('quantity', quantity);
            productData.append('shipping', shipping);
            productData.append('category', category);
            if (photo) productData.append('photo', photo);
    
            const { data } = await axios.post('/api/v1/products/create-product', productData);
            if (data?.success) {
                toast.success(data.message);
                navigate('/dashboard/admin/products');
            } else {
                toast.error(data.error || 'Failed to create product');
            }
        } catch (error) {
            console.error('Error creating product:', error);
            // Log the error response for debugging
            if (error.response) {
                console.error('Error response data:', error.response.data);
                toast.error(error.response.data.error || 'Something went wrong while creating product');
            } else {
                toast.error('Something went wrong while creating product');
            }
        }
    };

    // Reset category and clear related states
    const resetCategory = () => {
        setCategory('');
        setPhoto(''); // Clear photo when resetting category
    };

    return (
        <Layout title={'Dashboard - Products'}>
                    <div className="flex flex-col sm:flex-row min-h-screen">
                <div className="bg-gray-100 min-w-max">
                    <AdminMenu />
                </div>
                <div className="w-full p-4 md:p-6">
                    <div className="bg-white p-4 md:p-6 shadow rounded-md">
                        <h1 className="text-xl font-bold mb-4">Create Products</h1>

                        {/* Form for creating a product */}
                        <form onSubmit={handleCreate}>
                            {/* Dropdown for Categories */}
                            <div className="mt-4 rounded-md space-y-3">
                                <select
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="block w-full border rounded-md shadow-sm sm:text-sm p-4"
                                >
                                    <option value="" disabled>Select a category</option>
                                    {categories.map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                    {/* Option to reset the category */}
                                    <option
                                        value="reset"
                                        className="text-red-500"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            resetCategory(); // Reset category without submitting form
                                        }}
                                    >
                                        Reset Category
                                    </option>
                                </select>

                                {/* File upload section */}
                                <div className="border block w-full rounded-md shadow-sm sm:text-sm p-4">
                                    <div
                                        className="cursor-pointer"
                                        onClick={() => fileInputRef.current.click()}  // Trigger file input click
                                    >
                                        {photo ? photo.name : "Upload Photo"}
                                    </div>
                                    <input
                                        ref={fileInputRef}  // Attach the ref to the file input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    />
                                </div>
                                <div>
                                    {photo && (
                                        <div className="text-center flex justify-center">
                                            <img
                                                src={URL.createObjectURL(photo)}
                                                alt="Product Photo"
                                                className="w-32 h-32 object-cover"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter the name"
                                        className="p-4 w-full border rounded-md shadow-sm sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Enter the Description"
                                        className="p-4 w-full border rounded-md shadow-sm sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="Enter the Price"
                                        className="p-4 w-full border rounded-md shadow-sm sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        placeholder="Enter the Quantity"
                                        className="p-4 w-full border rounded-md shadow-sm sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <select
                                        value={shipping}
                                        onChange={(e) => setShipping(e.target.value)}
                                        className="p-4 w-full border rounded-md shadow-sm sm:text-sm"
                                    >
                                        <option value="" disabled>Select the Shipping</option>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                                <div>
                                    <button type="submit" className="p-4 border rounded-md shadow-sm sm:text-sm">
                                        Create Product
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateProduct;

