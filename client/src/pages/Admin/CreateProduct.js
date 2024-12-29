import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
const CreateProduct = () => {
  return (
    <Layout title={'Dashboard - Products'}>
    <div className="flex flex-col sm:flex-row min-h-screen">
        <div className=" bg-gray-100 min-w-max">
            <AdminMenu />
        </div>
        <div className=" w-full p-4 md:p-6">
            <div className="bg-white p-4 md:p-6 shadow rounded-md">  
            <h1>Products</h1>
            </div>
        </div>
    </div>
</Layout>
  )
}

export default CreateProduct
