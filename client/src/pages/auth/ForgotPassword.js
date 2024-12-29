import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, { email, newPassword, answer })
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/login')
            }
            else {
                toast.error(res.data.message)
            }
        }
        catch (error) {
            console.log(error)
            toast.error("Something went Wrong. Please try again later")
        }
    }
    return (
        <Layout title="Forgot Password to the Website">
            <div
                className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
                style={{
                    backgroundImage: 'url("/images/bg2.png")',
                }}
            >
                {/* Overlay for fading effect */}
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className=" p-16 relative bg-cover text-center justify-center lg:w-full max-w-lg shadow-black shadow-lg rounded-lg " style={{
                    backgroundImage: 'url("/images/reg1.jpg.avif")',
                }}>
                    <p className="flex text-center justify-center text-white lg:text-4xl md:text-3xl text-xl font-serif font-bold mb-10"
                    >
                        Reset Your Password
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
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                type="text"
                                id="answer"
                                name="answer"
                                placeholder='Enter your favorite food'
                                required
                                className="border rounded p-3 w-full bg-slate-50 hover:bg-slate-100 shadow-gray-500 shadow-md "
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                placeholder='Enter Your New Password'
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="border rounded p-3 w-full bg-slate-50 hover:bg-slate-100 shadow-gray-500 shadow-md"
                            />
                        </div>
                        <button
                            type="submit"
                            className=" bg-teal-300 p-3 px-5  font-semibold text-black rounded hover:bg-yellow-200 hover:text-black"
                        >
                            Reset
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default ForgotPassword
