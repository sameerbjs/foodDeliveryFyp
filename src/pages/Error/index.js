import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
    useEffect(() => {
        window.history.scrollRestoration = 'manual';
        window.scrollTo(0, 0);
    }, [])
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-150px)]">
            <p className="text-5xl font-bold text-gray-800 mb-4">Opps !!!</p>
            <p className="text-2xl font-semibold text-gray-600 mb-4">Internal Server Error 😐</p>
            <Link to="/" className="relative bg-red-500 hover:bg-[#212245] text-white font-medium tracking-widest flex justify-center py-2.5 px-4 border border-transparent rounded-lg focus:outline-none "
            >
                Go Home
            </Link>
        </div>
    );
}

export default ErrorPage;