import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Spinner = ({ path = "login" }) => {

    const [count, setCount] = useState(5)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue)

        }, 1000);
        count === 0 && navigate(`/${path}`, {
            state: location.pathname
        })
        return () =>
            clearInterval(interval)

    }, [count, navigate, location, path])
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="w-16 h-16 border-4 border-black border-dotted rounded-full animate-spin">
                </div>
                <h1 className=' text-xl font-medium'>Redirecting to you in {count}</h1>
            </div>


        </>
    )
}

export default Spinner;
