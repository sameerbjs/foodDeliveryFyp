import React from 'react'
import deliveryGuy from '../../assets/images/delivery-guy.png'
import { HomeExplore } from './HomeExplore'

export const HomePage = () => {
    return (
        <>
            <div className='px-8 py-8 w-full'>
                <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-10 justify-center bg-[#fde4e4]/50 p-4 rounded-lg'>
                    <div className='h-full flex justify-center flex-col lg:items-start items-center'>
                        <h5 className='lg:text-2xl text-xl text-[#212245] font-medium whitespace-nowrap'>
                            Easy order & fast delivery
                        </h5>
                        <h1 className='lg:text-4xl md:text-2xl text-xl font-semibold mt-5 text-[#212245]'> <span className='text-[#df2020]'>Enjoy</span> your favorite FOOD</h1>
                        <div className='mt-10 group'>
                            <button className='bg-[#df2020] flex items-center text-white px-5 py-4 rounded-lg font-semibold hover:bg-[#212245] tracking-widest'>
                                Explore
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 group-hover:translate-x-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className='flex justify-center lg:items-start items-center'>
                        <div className='lg:w-3/4 md:w-1/2 w-full lg:h-1/2 h-full'>
                            <img src={deliveryGuy} alt="deliveryGuy" />
                        </div>
                    </div>
                </div>

                <div className='mt-10'>
                    <HomeExplore />
                </div>
            </div>
        </>
    )
}
