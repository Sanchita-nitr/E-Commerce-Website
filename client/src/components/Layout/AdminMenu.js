
import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
    return (
        <div className="border-r border-gray-300 max-h-screen px-4 py-6 bg-gray-100">
            <h1 className="text-xl font-bold mb-6 text-center">Admin Panel</h1>
            <ul className="space-y-4">
                <li>
                    <NavLink
                        to="/dashboard/admin/create-category"
                        className="block text-gray-700 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-md transition"
                    >
                        Create Category
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/admin/create-product"
                        className="block text-gray-700 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-md transition"
                    >
                        Create Product
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/admin/users"
                        className="block text-gray-700 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-md transition"
                    >
                        Users
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default AdminMenu;
