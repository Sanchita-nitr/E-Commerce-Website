
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useCategory() {
    const [categories, setCategories] = useState([]);

    //get categories 
    const getCategories = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/getall-category');
            setCategories(data?.category);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    return categories;
}
