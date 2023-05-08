import React from 'react'
import { HomeExplore } from './HomeExplore'
import { Link } from 'react-router-dom'
import TypingAnimation from '../../components/TypingEffect/TypingEffect'

export const HomePage = () => {
    const words = ['Family', 'Friends'];
    const delay = 1000;
    return (
        <>
            <div className="mx-auto w-full overflow-hidden">
                <div className='relative'>
                    <div className='banner lg:h-[650px] md:h-[500px] h-[400px]'>
                        <div className='flex justify-center p-4 bg-black/70 h-full'>
                            <div className='h-full flex flex-col justify-center items-center'>
                                <h1 className='lg:text-6xl md:text-2xl text-lg font-semibold lg:mb-8 mb-5 text-white'>Enjoy your favorite food  with <TypingAnimation words={words} delay={delay} />
                                </h1>
                                <h5 className='lg:text-3xl md:text-2xl text-base text-white font-semibold whitespace-nowrap'>
                                    Easy order & Delicious food & Fast delivery
                                </h5>
                                <div className='mt-10 group flex gap-3'>
                                    <Link to={'/user-register'}>
                                        <button className='bg-red-500 flex items-center text-white px-5 py-3 rounded-lg font-semibold hover:bg-[#212245] tracking-widest'>
                                            Register
                                        </button>
                                    </Link>
                                    <Link to={'/user-login'}>
                                        <button className='bg-red-500 flex items-center text-white px-5 py-3 rounded-lg font-semibold hover:bg-[#212245] tracking-widest'>
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
            </div>
        </>
    )
}
