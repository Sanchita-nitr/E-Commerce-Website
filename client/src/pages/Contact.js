import React from 'react'
import Layout from '../components/Layout/Layout'
import { AiTwotoneMail } from "react-icons/ai";
import { PiPhoneCallDuotone } from "react-icons/pi";
import { BiSupport } from "react-icons/bi";


const Contact = () => {
  return (
    <Layout title={"Contact Us"}>
         <div className='pl-9 mt-20 flex flex-row space-x-6'>
             <img src="/images/contact.jpg" alt="Contact" style={{ width: "60%" }} />
             <div className=' text-2xl space-y-5 mt-40'>
            
             <p className='flex'><AiTwotoneMail /> : www.help@CustomerCare.com </p>
               <p className='flex'><PiPhoneCallDuotone /> : 012-3456987</p>
               <p className='flex'><BiSupport /> : 1800-0000-0000(toll free)</p>
             </div>
               
                </div>
          

    </Layout>
  )
}

export default Contact
