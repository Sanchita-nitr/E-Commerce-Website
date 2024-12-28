import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'

const PagenotFound = () => {
  return (
   <Layout title={"Page not found"}>
   <div className=' lg:mt-32 mt-24 text-center lg:space-y-10 md:space-y-5 space-y-4 text-red-600 '>
    <p className=' lg:font-bold md:font-medium md:text-6xl lg:text-7xl font-normal text-5xl'>404</p>
    <p className=' md:font-medium md:text-4xl lg:text-5xl font-normal text-3xl'>Oops! Page Not Found</p>
    <button className='lg:font-medium md:font-normal font-light  bg-slate-50 hover:bg-slate-100 lg:p-3 md:p-2 p-1 text-xl md:text-2xl lg:text-3xl border-2 hover:border-red-500' type="button">
        <Link to="/">Go Back</Link></button>
   </div>
   </Layout>
  )
}

export default PagenotFound
