import React, { useState } from 'react'
import rest1 from '../../assets/images/rest1.jpeg'
import rest2 from '../../assets/images/rest2.jpeg'
import rest3 from '../../assets/images/rest3.jpeg'
import { Link } from 'react-router-dom'
import HomeRestSearch from './HomeRestSearch'
import cities from '../../assets/data/Cities'
import FoodCategory from '../../assets/data/FoodCategory'

export const HomeExplore = () => {
    const [selectedCity, setSelectedCity] = useState(cities[0])
    const [selectedFood, setSelectedFood] = useState(FoodCategory[0])

    return (
        <>
            <div>
                <div className='text-center'>
                    <h6 className='font-medium text-[#212245] lg:text-3xl md:text-2xl text-xl'>Explore foods on different resturants</h6>
                    <p className='text-[#212245] font-normal text-lg mt-4'>Take a deep dive and browse foods for family, friends, parties that is healty and tasty for you.</p>
                </div>
                <HomeRestSearch selectedCity={selectedCity} setSelectedCity={setSelectedCity} cities={cities} foodCategory={FoodCategory} selectedFood={selectedFood} setSelectedFood={setSelectedFood} />
                <div className='mt-10'>
                    <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5'>
                        <div className='cursor-pointer'>
                            <Link to={'/products'} className='w-full h-full relative'>
                                <img src={rest1} alt="rest1" className='rounded-lg object-cover w-full h-full' />
                                <div className='absolute rounded-lg bg-black/60 top-0 z-10 flex justify-center items-center h-full w-full'>
                                    <h1 className='text-white font-semibold lg:text-2xl text-xl'>
                                        Ali baba food resturant
                                    </h1>
                                </div>
                            </Link>
                        </div>
                        <div className='cursor-pointer'>
                            <Link to={'/products'} className='w-full h-full relative'>
                                <img src={rest2} alt="rest1" className='rounded-lg object-cover w-full h-full' />
                                <div className='absolute rounded-lg bg-black/60 top-0 z-10 flex justify-center items-center h-full w-full'>
                                    <h1 className='text-white font-semibold lg:text-2xl text-xl'>
                                        Fresho fast food
                                    </h1>
                                </div>
                            </Link>
                        </div>
                        <div className='cursor-pointer'>
                            <Link to={'/products'} className='w-full h-full relative'>
                                <img src={rest3} alt="rest1" className='rounded-lg object-cover w-full h-full' />
                                <div className='absolute rounded-lg bg-black/60 top-0 z-10 flex justify-center items-center h-full w-full'>
                                    <h1 className='text-white font-semibold lg:text-2xl text-xl'>
                                        Ghani shinwari
                                    </h1>
                                </div>
                            </Link>
                        </div>
                        <div className='cursor-pointer'>
                            <Link to={'/products'} className='w-full h-full relative'>
                                <img src={rest1} alt="rest1" className='rounded-lg object-cover w-full h-full' />
                                <div className='absolute rounded-lg bg-black/60 top-0 z-10 flex justify-center items-center h-full w-full'>
                                    <h1 className='text-white font-semibold lg:text-2xl text-xl'>
                                        Khan baba resturant
                                    </h1>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
