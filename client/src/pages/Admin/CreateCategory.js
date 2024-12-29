
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';
// import CategoryForm from '../../components/Form/CategoryForm';
// import AdminMenu from '../../components/Layout/AdminMenu';
// import Layout from '../../components/Layout/Layout';

// const CreateCategory = () => {
//     const [categories, setCategories] = useState([]);
//     const [name, setName] = useState("");
//     const [editingCategory, setEditingCategory] = useState(null);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const { data } = editingCategory
//                 ? await axios.put(`/api/v1/category/update-category/${editingCategory._id}`, { name })
//                 : await axios.post('/api/v1/category/create-category', { name });

//             if (data.success) {
//                 toast.success(data.message);
//                 getAllCategories();
//                 setEditingCategory(null);
//                 setName("");
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error('Something went wrong in Category Form');
//         }
//     };

//     const getAllCategories = async () => {
//         try {
//             const { data } = await axios.get('/api/v1/category/getall-category');
//             if (data?.success) {
//                 setCategories(data.category);
//             } else {
//                 toast.error('Failed to fetch categories');
//             }
//         } catch (error) {
//             console.error('Error fetching categories:', error);
//             toast.error('Something went wrong while fetching categories');
//         }
//     };

//     const handleEdit = (category) => {
//         setEditingCategory(category);
//         setName(category.name);
//     };

//     useEffect(() => {
//         getAllCategories();
//     }, []);

//     return (
//         <Layout title={'Dashboard - Categories'}>
//             <div className="flex flex-col sm:flex-row min-h-screen">
//                 <div className="bg-gray-100 min-w-max">
//                     <AdminMenu />
//                 </div>
//                 <div className="w-full p-4 md:p-6">
//                     <div className="bg-white p-4 md:p-6 shadow rounded-md">
//                         <h1 className="text-xl font-bold mb-4">Manage Categories</h1>
//                         <div>
//                             <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
//                         </div>
//                         <table className="w-full border-collapse border border-gray-200">
//                             <thead>
//                                 <tr className="bg-gray-100">
//                                     <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
//                                     <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {categories.length > 0 ? (
//                                     categories.map((category) => (
//                                         <tr key={category._id}>
//                                             <td className="border border-gray-300 px-4 py-2">{category.name}</td>
//                                             <td className="border border-gray-300 px-4 py-2 space-x-4">
//                                                 <button
//                                                     className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                                                     onClick={() => handleEdit(category)}
//                                                 >
//                                                     Edit
//                                                 </button>
//                                                 <button
//                                                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                                                 >
//                                                     Delete
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="2" className="border border-gray-300 px-4 py-2 text-center">
//                                             No categories found
//                                         </td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//             {editingCategory && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
//                     <div className="bg-white p-6 rounded shadow-md w-1/3">
//                         <h2 className="text-xl font-bold mb-4">Edit Category</h2>
//                         <form onSubmit={handleSubmit}>
//                             <div className="mb-4">
//                                 <label htmlFor="categoryName" className="block text-gray-700 font-medium mb-2">
//                                     Category Name
//                                 </label>
//                                 <input
//                                     id="categoryName"
//                                     type="text"
//                                     className="w-full border border-gray-300 px-3 py-2 rounded-md"
//                                     value={name}
//                                     onChange={(e) => setName(e.target.value)}
//                                 />
//                             </div>
//                             <div className="flex justify-end space-x-4">
//                                 <button
//                                     type="button"
//                                     className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
//                                     onClick={() => {
//                                         setEditingCategory(null);
//                                         setName("");
//                                     }}
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                                 >
//                                     Save
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </Layout>
//     );
// };

// export default CreateCategory;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CategoryForm from '../../components/Form/CategoryForm';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [editingCategory, setEditingCategory] = useState(null);
    const [deletingCategory, setDeletingCategory] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = editingCategory
                ? await axios.put(`/api/v1/category/update-category/${editingCategory._id}`, { name })
                : await axios.post('/api/v1/category/create-category', { name });

            if (data.success) {
                toast.success(data.message);
                getAllCategories();
                setEditingCategory(null);
                setName("");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in Category Form');
        }
    };

    const handleDelete = async (categoryId) => {
        try {
            const { data } = await axios.delete(`/api/v1/category/delete-category/${categoryId}`);
            if (data.success) {
                toast.success(data.message);
                getAllCategories();
                setDeletingCategory(null);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            toast.error('Something went wrong while deleting the category');
        }
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

    const handleEdit = (category) => {
        setEditingCategory(category);
        setName(category.name);
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <Layout title={'Dashboard - Categories'}>
            <div className="flex flex-col sm:flex-row min-h-screen">
                <div className="bg-gray-100 min-w-max">
                    <AdminMenu />
                </div>
                <div className="w-full p-4 md:p-6">
                    <div className="bg-white p-4 md:p-6 shadow rounded-md">
                        <h1 className="text-xl font-bold mb-4">Manage Categories</h1>
                        <div>
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <table className="w-full border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.length > 0 ? (
                                    categories.map((category) => (
                                        <tr key={category._id}>
                                            <td className="border border-gray-300 px-4 py-2">{category.name}</td>
                                            <td className="border border-gray-300 px-4 py-2 sm:space-x-4 space-y-1">
                                                <button
                                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                                    onClick={() => handleEdit(category)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                    onClick={() => setDeletingCategory(category)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2" className="border border-gray-300 px-4 py-2 text-center">
                                            No categories found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {editingCategory && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-md w-1/3">
                        <h2 className="text-xl font-bold mb-4">Edit Category</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="categoryName" className="block text-gray-700 font-medium mb-2">
                                    Category Name
                                </label>
                                <input
                                    id="categoryName"
                                    type="text"
                                    className="w-full border border-gray-300 px-3 py-2 rounded-md"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                                    onClick={() => {
                                        setEditingCategory(null);
                                        setName("");
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {deletingCategory && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-md w-1/3">
                        <h2 className="text-xl font-bold mb-4">Delete Category</h2>
                        <p className="mb-4">Are you sure you want to delete the category "{deletingCategory.name}"?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                                onClick={() => setDeletingCategory(null)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={() => handleDelete(deletingCategory._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default CreateCategory;

