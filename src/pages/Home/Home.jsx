import React, { useEffect, useState } from 'react'
import { HomeExplore } from './HomeExplore'
import { Link } from 'react-router-dom'

export const HomePage = () => {
    const [text, setText] = useState('');

    useEffect(() => {
        const intervalId = setInterval(() => {
            setText(' family');
            setTimeout(() => {
                setText(' friends');
            }, 2000);
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);
    return (
        <>
            <div className="mx-auto w-full overflow-hidden">
                <div className='relative'>
                    <div className='banner lg:h-[650px] md:h-[500px] h-[400px]'>
                        <div className='flex justify-center p-4 bg-black/70 h-full'>
                            <div className='h-full flex flex-col justify-center items-center'>
                                <h1 className='lg:text-6xl md:text-2xl text-xl font-semibold mb-8 text-white'> <span className='text-[#df2020]'>Enjoy</span> your favorite food with<span className='animate'>{text}</span></h1>
                                <h5 className='lg:text-3xl md:text-2xl text-base text-white font-semibold whitespace-nowrap'>
                                    Easy order & Delicious food & Fast delivery
                                </h5>
                                <div className='mt-10 group flex gap-3'>
                                    <Link to={'/user-register'}>
                                        <button className='bg-[#df2020] flex items-center text-white px-5 py-4 rounded-lg font-semibold hover:bg-[#212245] tracking-widest'>
                                            Register
                                        </button>
                                    </Link>
                                    <Link to={'/user-login'}>
                                        <button className='bg-[#df2020] flex items-center text-white px-5 py-4 rounded-lg font-semibold hover:bg-[#212245] tracking-widest'>
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
