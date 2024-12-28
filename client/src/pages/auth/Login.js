import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../context/auth';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth,setAuth] = useAuth();

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password })

            if (res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token:res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate('/')
            }
            else {
                toast.error(res.data.message)
            }

        }
        catch (error) {
            console.log(error)
            toast.error("Something went Wrong")
        }
    }

    return (
        <div>
            <Layout title="Register to the Website">
                {/* <div className="flex items-center justify-center min-h-screen bg-red-200"> */}
                <div
                    className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
                    style={{
                        backgroundImage: 'url("/images/bg2.png")',
                    }}
                >
                    {/* Overlay for fading effect */}
                    <div className="absolute inset-0 bg-black opacity-30"></div>

                    <div className=" relative bg-cover text-center justify-center w-full max-w-lg p-10 shadow-black shadow-lg rounded-lg " style={{
                        backgroundImage: 'url("/images/reg1.jpg.avif")',
                    }}>

                        <p className="flex text-center justify-center text-white lg:text-4xl md:text-3xl text-xl font-serif font-bold mb-10"
                        >
                            Login Your Account
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-8">

                            <div>

                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder='Enter your Email'
                                    required
                                    className="border rounded p-3 w-full bg-slate-50 hover:bg-slate-100 shadow-gray-500 shadow-md "
                                />
                            </div>
                            <div>

                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder='Enter Your password'
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="border rounded p-3 w-full bg-slate-50 hover:bg-slate-100 shadow-gray-500 shadow-md"
                                />
                            </div>





                            <button
                                type="submit"
                                className=" bg-blue-950 font-semibold text-white p-3 px-5 rounded hover:bg-yellow-200 hover:text-black"
                            >
                                Login
                            </button>
                        </form>
                    </div>

                </div>
            </Layout>
        </div>
    )
}

export default Login
