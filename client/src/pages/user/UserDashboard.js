
import React, { useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import UserMenu from '../../components/Layout/UserMenu';

const UserDashboard = () => {
    const [auth] = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth?.token) {
            navigate('/login');
        }
    }, [auth, navigate]);

    return (
        <Layout title={'User-Dashboard'}>
            <div className="flex flex-col sm:flex-row min-h-screen">
                {/* Sidebar */}
                <div className="bg-gray-100">
         <UserMenu/>
                </div>
                {/* Main Content */}
                <div className="p-4 md:p-6">
                    <div className="bg-white p-4 md:p-6 shadow rounded-md">
                        <h1>User Name: {auth?.user?.name}</h1>
                        <h1>User Email: {auth?.user?.email}</h1>
                        <h1>User Contact: {auth?.user?.phone}</h1>
                        <h1>User Address: {auth?.user?.address}</h1>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UserDashboard;
