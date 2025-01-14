
import React, { useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [auth] = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth?.token) {
            navigate('/login');
        }
    }, [auth, navigate]);

    return (
        <Layout title={"Admin Dashboard"}>
            <div className="flex flex-col sm:flex-row min-h-screen">
                {/* Sidebar */}
                <div className="bg-gray-100">
                    <AdminMenu />
                </div>
                {/* Main Content */}
                <div className="p-4 md:p-6">
                    <div className="bg-white p-4 md:p-6 shadow rounded-md">
                        <h1>Admin Name: {auth?.user?.name}</h1>
                        <h1>Admin Email: {auth?.user?.email}</h1>
                        <h1>Admin Contact: {auth?.user?.phone}</h1>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
