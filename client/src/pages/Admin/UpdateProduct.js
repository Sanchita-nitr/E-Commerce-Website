import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';

const UpdateProduct = () => {
    const params = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [shipping, setShipping] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState('');
    const [id, setId] = useState('');
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    // Fetch single product details
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/products/get-product/${params.slug}`);
            setName(data.product.name);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setShipping(data.product.shipping);
            setCategory(data.product.category?._id || '');
            setPhoto(data.product.photo);
            setId(data.product._id);
        } catch (error) {
            console.error('Error fetching product:', error);
            toast.error('Failed to fetch product details');
        }
    };

    useEffect(() => {
        getSingleProduct();
    }, []);

    // Fetch all categories
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

    // Handle form submission to update a product
    const handleUpdate = async (e) => {
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

            const { data } = await axios.put(`/api/v1/products/update-product/${id}`, productData);
            if (data?.success) {
                toast.success('Product updated successfully');
                navigate('/dashboard/admin/products');
            } else {
                toast.error(data.error || 'Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            if (error.response) {
                toast.error(error.response.data.error || 'Something went wrong');
            } else {
                toast.error('Something went wrong');
            }
        }
    };

    // Handle product deletion
    const handleDelete = async () => {
        try {
            const confirmDelete = window.confirm('Are you sure you want to delete this product?');
            if (!confirmDelete) return;

            const { data } = await axios.delete(`/api/v1/products/delete-product/${id}`);
            if (data.success) {
                toast.success(data.message);
                navigate('/dashboard/admin/products');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Something went wrong while deleting the product');
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
                        <form onSubmit={handleUpdate}>
                            <div className="mt-4 rounded-md space-y-3">
                                <select
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="block w-full border rounded-md shadow-sm sm:text-sm p-4"
                                >
                                    <option value="" disabled>
                                        Select a category
                                    </option>
                                    {categories.map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="border block w-full rounded-md shadow-sm sm:text-sm p-4">
                                    <div
                                        className="cursor-pointer"
                                        onClick={() => fileInputRef.current.click()}
                                    >
                                        {photo ? photo.name : 'Upload Photo'}
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
                                        placeholder="Enter the description"
                                        className="p-4 w-full border rounded-md shadow-sm sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="Enter the price (₹)"
                                        className="p-4 w-full border rounded-md shadow-sm sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        placeholder="Enter the quantity"
                                        className="p-4 w-full border rounded-md shadow-sm sm:text-sm"
                                    />
                                </div>
                                
                                <div>
                                    <select
                                        value={shipping}
                                        onChange={(e) => setShipping(e.target.value)}
                                        className="p-4 w-full border rounded-md shadow-sm sm:text-sm"
                                    >
                                        <option value="" disabled>
                                            Select shipping
                                        </option>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                                <div className="space-x-5">
                                    <button
                                        type="submit"
                                        className="p-3 border rounded-md shadow-sm sm:text-sm font-bold bg-slate-100 hover:bg-slate-200"
                                    >
                                        Update Product
                                    </button>
                                    <button
                                        type="button"
                                        className="p-3 border rounded-md shadow-sm sm:text-sm font-bold bg-red-600 hover:bg-red-700 text-white"
                                        onClick={handleDelete}
                                    >
                                        Delete Product
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

export default UpdateProduct;
