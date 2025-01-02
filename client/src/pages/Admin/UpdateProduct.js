

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';

const UpdateProduct = () => {
    // State hooks for various fields
    const params = useParams()
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [shipping, setShipping] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState('');
    const [id, setId] = useState('')
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const [deletingCategory, setDeletingCategory] = useState("");

    //Get Single Product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/products/get-product/${params.slug}`)
            setName(data.product.name)
            setDescription(data.product.description)
            setPrice(data.product.price)
            setQuantity(data.product.quantity)
            setShipping(data.product.shipping)
            setCategory(data.product.category)
            setPhoto(data.product.photo)
            setId(data.product._id)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getSingleProduct();
    }, []);
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
            photo && productData.append('photo', photo);

            const { data } = await axios.post('/api/v1/products/create-product', productData);
            if (data?.success) {
                toast.success("Product Updated Successfully");
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

    // delete product
    const handleDelete = async () => {
        try {
            let answer = window.confirm('Are you sure you want to delete this product?');
            if (!answer) return
            const { data } = await axios.delete(`/api/v1/products/delete-product/${id}`);
            if (data.success) {
                toast.success(data.message);
                getAllCategories();
                setDeletingCategory(null);
                navigate('/dashboard/admin/products')
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            toast.error('Something went wrong while deleting the category');
        }
    };

    return (
        <Layout title={'Dashboard - Update Products'}>
            <div className="flex flex-col sm:flex-row min-h-screen">
                <div className="bg-gray-100 min-w-max">
                    <AdminMenu />
                </div>
                <div className="w-full p-4 md:p-6">
                    <div className="bg-white p-4 md:p-6 shadow rounded-md">
                        <h1 className="text-xl font-bold mb-4">Update Products</h1>

                        {/* Form for creating a product */}
                        <form onSubmit={handleCreate}>
                            {/* Dropdown for Categories */}
                            <div className="mt-4 rounded-md space-y-3">
                                <select
                                    id="category"
                                    placeholder="Choose the Category"

                                    onChange={(e) => setCategory(e.target.value)}
                                    className="block w-full border rounded-md shadow-sm sm:text-sm p-4"
                                >
                                    value={category.name}
                                    <option value="" disabled>Select a category</option>
                                    {categories.map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </option>
                                    ))}
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
                                    {photo ? (
                                        <div className="text-center flex justify-center">
                                            <img
                                                src={URL.createObjectURL(photo)}
                                                alt="Product Photo"
                                                className="w-32 h-32 object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="text-center flex justify-center">
                                            <img
                                                src={`/api/v1/products/get-product-photo/${id}`}
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
                                        placeholder="Select Shipping"
                                        onChange={(e) => setShipping(e.target.value)}
                                        className="p-4 w-full border rounded-md shadow-sm sm:text-sm"
                                    >
                                        value = {shipping ? "yes" : "no"}
                                        <option value="" disabled>Select the Shipping</option>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                                <div className=' space-x-5'>
                                    <button type="submit" className="p-3 border rounded-md shadow-sm sm:text-sm font-bold bg-slate-100 hover:bg-slate-200">
                                        <h1 className=' text-lg'> Update Product</h1>
                                    </button>
                                    <button
                                        type="button"
                                        className="p-3 border rounded-md shadow-sm sm:text-sm font-bold bg-red-600 hover:bg-red-700"
                                        onClick={() => handleDelete(deletingCategory._id)}
                                    >
                                        <h1 className=' text-lg text-white'> Delete Product</h1>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct
