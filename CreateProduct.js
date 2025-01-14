import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [shipping, setShipping] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState('');
    const [photoUrl, setPhotoUrl] = useState(''); // New state for photo URL
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const formatINR = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2,
        }).format(value || 0);
    };

    const handlePriceChange = (value) => {
        // Allow only digits and decimals for the price input
        const formattedValue = value.replace(/[^\d.]/g, '');
        setPrice(formattedValue);
    };

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
            if (photoUrl) productData.append('photoUrl', photoUrl); // Append photo URL

            const { data } = await axios.post('/api/v1/products/create-product', productData);
            if (data?.success) {
                toast.success(data.message);
                navigate('/dashboard/admin/products');
            } else {
                toast.error(data.error || 'Failed to create product');
            }
        } catch (error) {
            console.error('Error creating product:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
                toast.error(error.response.data.error || 'Something went wrong while creating product');
            } else {
                toast.error('Something went wrong while creating product');
            }
        }
    };

    const resetCategory = () => {
        setCategory('');
        setPhoto('');
        setPhotoUrl(''); // Reset photo URL
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
                        <form onSubmit={handleCreate}>
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
                                    <option
                                        value="reset"
                                        className="text-red-500"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            resetCategory();
                                        }}
                                    >
                                        Reset Category
                                    </option>
                                </select>

                                <div className="border block w-full rounded-md shadow-sm sm:text-sm p-4">
                                    <div
                                        className="cursor-pointer"
                                        onClick={() => fileInputRef.current.click()}
                                    >
                                        {photo ? photo.name : "Upload Photo"}
                                    </div>
                                    <input
                                        ref={fileInputRef}
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
                                                alt="Preview of the uploaded product image"
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
                                        type="text"
                                        value={price}
                                        onChange={(e) => handlePriceChange(e.target.value)}
                                        placeholder="Enter the Price"
                                        className="p-4 w-full border rounded-md shadow-sm sm:text-sm"
                                    />
                                    <div className="text-gray-500 mt-1">{formatINR(price)}</div>
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
                                    <input
                                        type="url"
                                        value={photoUrl}
                                        onChange={(e) => setPhotoUrl(e.target.value)}
                                        placeholder="Enter the Photo URL"
                                        className="p-4 w-full border rounded-md shadow-sm sm:text-sm"
                                    />
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