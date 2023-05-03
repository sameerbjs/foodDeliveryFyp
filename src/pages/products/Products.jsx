import React, { useEffect } from 'react'
import products from '../../assets/data/Products'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export const ProductRest = () => {
    const navigate = useNavigate();
    useEffect(() => {
        window.history.scrollRestoration = 'manual';
        window.scrollTo(0, 0);
    }, []);
    return (
        <React.Fragment>
            <div className="container px-5 py-7 mx-auto">
                <div className='mb-5'>
                    <button onClick={() => navigate(-1)} className="rounded-xl bg-gray-200 hover:bg-gray-300 px-4 py-1 inline-flex gap-1 items-center justify-center text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        Back
                    </button>
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 -m-4">
                    {
                        products.map((data) => {
                            return (
                                <div className="p-4" key={data.id}>
                                    <div className="rounded-lg overflow-hidden">
                                        <div className='h-64'>
                                            <img className="w-full object-contain h-full" src={data.image03} alt="blog" />
                                        </div>
                                        <div className="p-6">
                                            <h2 className="tracking-widest text-xs font-medium text-gray-400 mb-1">CATEGORY</h2>
                                            <h1 className="text-lg font-medium text-gray-900 mb-3">{data.category}</h1>
                                            <p className="leading-relaxed mb-3">{data.desc.split(' ').slice(0, 20).join(' ')}...</p>
                                            <div className="flex items-center justify-between">
                                                <Link to={`/product/${data.id}`} className="text-red-500 inline-flex items-center md:mb-2 lg:mb-0">Show details
                                                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M5 12h14"></path>
                                                        <path d="M12 5l7 7-7 7"></path>
                                                    </svg>
                                                </Link>
                                                <div>
                                                    <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-1    ">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                                                        </svg>
                                                        {data.price} Rs
                                                    </span>
                                                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                                                        <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                                        </svg>6
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </React.Fragment>
    )
}
