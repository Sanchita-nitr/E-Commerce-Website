
import React from 'react';
import { NavLink } from 'react-router-dom';

const UserMenu = () => {
    return (
        <div className="border-r border-gray-300 max-h-screen px-4 py-6 bg-gray-100">
            <h1 className="text-xl font-bold mb-6 text-center">User Panel</h1>
            <ul className="space-y-4">
                <li>
                    <NavLink
                        to="/dashboard/user/profile"
                        className="block text-gray-700 hover:bg-blue-800 hover:text-white px-4 py-2 rounded-md transition"
                    >
                        Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/user/orders"
                        className="block text-gray-700 hover:bg-blue-800 hover:text-white px-4 py-2 rounded-md transition"
                    >
                        Orders
                    </NavLink>
                </li>
              
            </ul>
        </div>
    );
};

export default UserMenu;
