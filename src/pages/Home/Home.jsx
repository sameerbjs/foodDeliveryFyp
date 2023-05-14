import React from 'react'
import { HomeExplore } from './HomeExplore'
import { Link } from 'react-router-dom'
import TypingAnimation from '../../components/TypingEffect/TypingEffect'
import './Home.css'
export const HomePage = () => {
    const words = ['Family', 'Friends'];
    const delay = 1000;
    return (
        <>
            <div className="mx-auto w-full overflow-hidden">
                <div className='relative h-full'>
                    <div className='banner lg:h-[700px] md:h-[500px] h-[400px]'>
                        <div className='flex justify-center p-4 bg-black/70 h-full'>
                            <div className='h-full flex flex-col justify-center items-center'>
                                <h1 className='lg:text-6xl md:text-2xl text-lg font-semibold lg:mb-8 mb-5 text-white'>Enjoy your favorite food  with <TypingAnimation words={words} delay={delay} />
                                </h1>
                                <h5 className='lg:text-3xl md:text-2xl text-base text-white font-semibold whitespace-nowrap'>
                                    Easy order & Delicious food & Fast delivery
                                </h5>
                                <div className='lg:mt-10 md:mt-7 mt-5 group flex gap-3'>
                                    <Link to={'/auth-register'}>
                                        <button className='bg-red-500 flex items-center text-white px-5 lg:py-3 py-2 rounded-lg font-semibold hover:bg-[#212245] tracking-widest'>
                                            Register
                                        </button>
                                    </Link>
                                    <Link to={'/auth-login'}>
                                        <button className='bg-red-500 flex items-center text-white px-5 lg:py-3 py-2 rounded-lg font-semibold hover:bg-[#212245] tracking-widest'>
                                            Login
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='container mx-auto px-5 py-10'>
                    <HomeExplore />
                </div>
                <div className='reviewbg lg:h-[400px] md:h-[400px] h-[500px] mt-8'>
                    <div className='h-full bg-black/60 flex justify-center items-center'>
                        <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-20 md:gap-10 gap-8'>
                            <div className='text-white text-center'>
                                <h1 className='text-2xl font-semibold whitespace-nowrap'>Total resturants</h1>
                                <p className='text-xl pt-2'>10</p>
                            </div>
                            <div className='text-white text-center'>
                                <h1 className='text-2xl font-semibold whitespace-nowrap'>Happy customers</h1>
                                <p className='text-xl pt-2'>110k</p>
                            </div>
                            <div className='text-white text-center'>
                                <h1 className='text-2xl font-semibold whitespace-nowrap'>Rating</h1>
                                <p className='text-xl pt-2'>8/10</p>
                            </div>
                            <div className='text-white text-center'>
                                <h1 className='text-2xl font-semibold whitespace-nowrap'>Popularity</h1>
                                <p className='text-xl pt-2'>WorldWide</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}