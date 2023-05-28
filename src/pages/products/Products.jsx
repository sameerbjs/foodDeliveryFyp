import React, { useEffect } from 'react'
import products from '../../assets/data/Products'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Tab } from '@headlessui/react'
import Comments from './Comments'
import ReactStars from 'react-stars'
import { useState } from 'react'
import { Helmet } from 'react-helmet'

export const ProductRest = () => {
    const navigate = useNavigate();
    const [newRating, setNewRating] = useState(0)
    useEffect(() => {
        window.history.scrollRestoration = 'manual';
        window.scrollTo(0, 0);
    }, []);
    const ratingChanged = (newRating) => {
        setNewRating(newRating)
    }
    return (
        <React.Fragment>
            <Helmet>
                <title>Rapid Cravings - Products</title>
            </Helmet>
            <div className="container px-5 py-7 mx-auto overflow-hidden">
                <div>
                    <button onClick={() => navigate(-1)} className="rounded-xl bg-gray-200 hover:bg-gray-300 px-4 py-1 inline-flex gap-1 items-center justify-center text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        Back
                    </button>
                </div>
                <Tab.Group>
                    <Tab.List className={'flex gap-4 scrollbar-hide items-center lg:justify-center md:justify-center justify-start pt-5 pb-10 overflow-x-auto whitespace-nowrap'}>
                        <Tab>
                            {({ selected }) => (
                                <span className={!selected ? 'px-4 py-2 text-black bg-red-500/50 rounded-lg' : 'bg-red-500 px-4 py-2 text-white rounded-lg'}>
                                    Break fast
                                </span>

                            )}
                        </Tab>
                        <Tab>
                            {({ selected }) => (

                                <span className={!selected ? 'px-4 py-2 text-black bg-red-500/50 rounded-lg' : 'bg-red-500 px-4 py-2 text-white rounded-lg'}>
                                    Burgers
                                </span>
                            )}

                        </Tab>
                        <Tab>
                            {({ selected }) => (

                                <span className={!selected ? 'px-4 py-2 text-black bg-red-500/50 rounded-lg' : 'bg-red-500 px-4 py-2 text-white rounded-lg'}>
                                    Desi
                                </span>
                            )}

                        </Tab>
                        <Tab>
                            {({ selected }) => (

                                <span className={!selected ? 'px-4 py-2 text-black bg-red-500/50 rounded-lg' : 'bg-red-500 px-4 py-2 text-white rounded-lg'}>
                                    Beverages
                                </span>
                            )}

                        </Tab>
                        <Tab>
                            {({ selected }) => (

                                <span className={!selected ? 'px-4 py-2 text-black bg-red-500/50 rounded-lg' : 'bg-red-500 px-4 py-2 text-white rounded-lg'}>
                                    Sandwiches
                                </span>
                            )}

                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
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
                                                        <p className="tracking-widest text-sm font-medium text-gray-600 mb-1">CATEGORY</p>
                                                        <span className="text-lg font-medium text-gray-900 mb-3">{data.category}</span>
                                                        <p className="leading-relaxed mb-3">{data.desc.split(' ').slice(0, 20).join(' ')}...</p>
                                                        <div className="flex items-center justify-between">
                                                            <Link to={`/product/${data.id}`} className="text-red-500 inline-flex items-center md:mb-2 lg:mb-0">Show details
                                                                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path d="M5 12h14"></path>
                                                                    <path d="M12 5l7 7-7 7"></path>
                                                                </svg>
                                                            </Link>
                                                            <div>
                                                                <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-1    ">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                                                                    </svg>
                                                                    {data.price} Rs
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
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
                <div className='p-4'>
                    <div>
                        <span className='text-lg'>Rate our resturant</span>
                        <div className='flex gap-2 items-center'>
                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={24}
                                value={newRating}
                                color2={'#ffd700'}
                            />
                            <span className='text-base'>{newRating}</span>
                        </div>
                        <textarea name="" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" id="" rows="5"></textarea>
                        <div className='flex justify-end'>
                            <button
                                className="flex items-center bg-red-500 hover:bg-[#212245] text-white fs-14 px-3 py-2 rounded-lg shadow-md"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                    <div className='my-5'>
                        <p className='text-[#212245] text-xl'>
                            User Feedback
                        </p>
                    </div>
                    <Comments />
                </div>
            </div>
        </React.Fragment>
    )
}
