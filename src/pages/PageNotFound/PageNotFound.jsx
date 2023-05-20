import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)]">
            <p className="text-5xl font-bold text-gray-800">404</p>
            <p className="text-2xl font-semibold text-gray-600 mb-4">Page Not Found</p>
            <Link to="/" className="relative bg-red-500 hover:bg-red-500/70 text-white font-medium tracking-widest flex justify-center py-2.5 px-4 border border-transparent rounded-lg focus:outline-none "
            >
                Go Home
            </Link>
        </div>
    );
}

export default PageNotFound;