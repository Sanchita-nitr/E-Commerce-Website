import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { useSearch } from '../context/search';

const Search = () => {
    const [values, setValues] = useSearch();
    const results = Array.isArray(values?.results) ? values.results : [];
    const navigate = useNavigate()

    return (
        <Layout>
            <div className="text-center my-6">
                <p className="md:text-4xl text-2xl font-extrabold text-purple-700 underline">
                    Search Results
                </p>
                <h6 className="mt-4 text-xl text-gray-600">
                    {results.length === 0
                        ? 'Oops! No products match your search.'
                        : `We found ${results.length} ${results.length === 1 ? 'result' : 'results'} for you!`}
                </h6>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
                {results.length > 0 ? (
                    results.map((p) => (
                        <div
                            key={p._id}
                            className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
                        >
                            <div className="relative border-b p-4">
                                <img
                                    src={`/api/v1/products/get-product-photo/${p._id}`}
                                    alt={p.name}
                                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="text-lg font-bold text-gray-800">{p.name}</h2>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{p.description}</p>
                                <p className="text-md font-semibold text-green-600 mt-2">₹{p.price}</p>
                                <div className="mt-4">
                                    <button
                                        type="button"
                                        onClick={() => navigate(`/products/${p.slug}`)}
                                        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                                    >
                                        View Details
                                    </button>
                                    <button
                                        type="button"
                                        className="w-full py-2 mt-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500 text-lg">
                        Try searching for something else.
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Search;
