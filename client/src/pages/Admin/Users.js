import React from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
const Users = () => {
    return (
        <Layout title={'Dashboard - Users'}>
            <div className="flex flex-col sm:flex-row min-h-screen">
                <div className=" bg-gray-100 min-w-max">
                    <AdminMenu />
                </div>
                <div className=" w-full p-4 md:p-6">
                    <div className="bg-white p-4 md:p-6 shadow rounded-md">  
                    <h1>User</h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Users
