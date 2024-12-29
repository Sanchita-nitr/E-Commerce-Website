import React from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';

const HomePage = () => {
    const [auth, setAuth] = useAuth();

    return (
        <Layout title={"Welcome to E-Commerce Website"}>
            <div className="pt-20 min-h-screen bg-gray-100 p-6 font-serif">
                {/* Title */}
                <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
                    HomePage
                </h1>

                {/* Token Display */}
                <div className="bg-white p-4 rounded shadow-lg overflow-auto max-h-96 border border-gray-300">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700">
                        {JSON.stringify(auth, null, 4)}
                    </pre>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
