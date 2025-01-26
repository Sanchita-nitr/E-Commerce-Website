// /Users/sanchita/Documents/E-Commerce_Website/client/src/components/Form/SearchInput.js
import axios from 'axios';
import React from 'react';
import { IoSearch } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/search';


const SearchInput = () => {
    const [values, setValues] = useSearch()
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`/api/v1/products/search-product/${values.keyword}`);
            console.log("API Response:", data); // Debug
            setValues({ ...values, results: data.results });
            navigate("/search");
        } catch (error) {
            console.error("Search error:", error);
        }
    };



    return (
        <form onSubmit={handleSubmit}>
            <div className="flex justify-center items-center w-full mt-4">
                <div className="relative w-full max-w-md lg:max-w-xl">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={values.keyword}
                        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                        className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-500"
                    />
                    <button
                        type="submit"
                        className="absolute inset-y-0 right-0 flex items-center justify-center w-10 h-full bg-blue-900 text-white rounded-r-lg hover:bg-blue-950"
                    >
                        <IoSearch />
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SearchInput;
