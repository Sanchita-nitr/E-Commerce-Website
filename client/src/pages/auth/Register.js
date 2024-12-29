import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {
                name,
                email,
                password,
                phone,
                address,
                answer,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/login'); // Navigate only when registration is successful
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    return (
        <Layout title="Register to the Website">
            <div
                className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
                style={{
                    backgroundImage: 'url("/images/bg8.jpg")',
                }}
            >
                {/* Register Modal */}

                <div
                    className=" bg-cover text-center justify-center lg:w-full lg:max-w-xl max-w-sm p-10 shadow-black rounded-lg shadow-lg bg-transparent"
                >
                    <h2 className="flex text-center justify-center lg:text-4xl md:text-3xl text-xl font-serif font-bold mb-8">
                        Register a New Account
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter Your Name"
                                required
                                className="border rounded p-3 w-full bg-slate-50 hover:bg-slate-100 shadow-gray-500 shadow-md"
                            />
                        </div>
                        <div>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your Email"
                                required
                                className="border rounded p-3 w-full bg-slate-50 hover:bg-slate-100 shadow-gray-500 shadow-md"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter Your password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border rounded p-3 w-full bg-slate-50 hover:bg-slate-100 shadow-gray-500 shadow-md"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                id="mobile"
                                name="mobile"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                maxLength={10}
                                placeholder="Enter Your Phone Number"
                                pattern="^[0-9]{10}$"
                                title="Enter a valid 10-digit mobile number"
                                required
                                className="border rounded p-3 w-full bg-slate-50 hover:bg-slate-100 shadow-gray-500 shadow-md"
                            />
                        </div>
                        <div>
                            <input
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                type="text"
                                id="address"
                                name="address"
                                placeholder="Enter Your Address"
                                required
                                className="border rounded p-3 w-full bg-slate-50 hover:bg-slate-100 shadow-gray-500 shadow-md"
                            />
                        </div>
                        <div>
                            <input
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                type="text"
                                id="answer"
                                name="answer"
                                placeholder="What is your favorite food?"
                                required
                                className="border rounded p-3 w-full bg-slate-50 hover:bg-slate-100 shadow-gray-500 shadow-md"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-950 font-semibold text-white p-3 px-5 rounded hover:bg-yellow-200 hover:text-black"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Register;
