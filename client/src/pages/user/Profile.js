

import React from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import Layout from '../../components/Layout/Layout'

const Profile = () => {
  return (
    <Layout title={'Dashboard - Profile'}>
    <div className="flex flex-col sm:flex-row min-h-screen">
        <div className=" bg-gray-100 min-w-max">
         <UserMenu/>
        </div>
        <div className=" w-full p-4 md:p-6">
            <div className="bg-white p-4 md:p-6 shadow rounded-md">  
            <h1>Profile</h1>
            </div>
        </div>
    </div>
</Layout>
  )
}

export default Profile
