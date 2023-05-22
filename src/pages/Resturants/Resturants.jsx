import React, { useEffect } from 'react'
import resturantsData from '../../assets/data/Resturants'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BsFillStarFill } from 'react-icons/bs';

const Resturants = () => {
    const cityName = useParams().city;
    const cityTranslations = {
        Lahore: 'لاہور',
        Islamabad: 'اسلام آباد',
        Sialkot: 'سیالکوٹ',
        Multan: 'ملتان',
        Karachi: 'کراچی',
        Rawalpindi: 'راولپنڈی',
        Quetta : 'کوئٹہ'
    };
    const navigate = useNavigate();

    useEffect(()=>{
        window.history.scrollRestoration = 'manual';
        window.scrollTo(0, 0);
    },[])
    return (
        <>
            <div className='px-5 py-7 mx-auto container'>
            <div className='mb-5'>
                        <button onClick={() => navigate(-1)} className="rounded-xl bg-gray-200 hover:bg-gray-300 px-4 py-1 inline-flex gap-1 items-center justify-center text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                            Back
                        </button>
                    </div>
                <div className='text-center'>
                    {/* <p className='font-semibold text-[#212245] lg:text-3xl md:text-2xl text-xl'>Explore foods on different resturants</p> */}
                    <p className='font-semibold text-[#212245] lg:text-3xl md:text-2xl text-xl'>Food delivery from {cityTranslations[cityName]}’s best restaurants</p>
                    <p className='text-[#212245] font-normal lg:text-lg text-base mt-4'>Take a deep dive and browse foods for family, friends, parties that is healty and tasty for you.</p>
                </div>
                <div className='mt-10'>
                    <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-5'>
                        {
                            resturantsData.map((rest, index) => {
                                return (
                                    <div className='cursor-pointer overflow-hidden group' key={index}>
                                        <Link to={`/products`}>
                                            <div className='w-full'>
                                                <img src={rest.image} alt={rest.image} className='transition-transform duration-300 ease-linear object-contain object-center w-full h-full group-hover:scale-[1.04]' />
                                            </div>
                                        </Link>
                                        <div className='mt-2 flex justify-between items-center'>
                                            <span className='text-[#212245] font-semibold text-lg'>
                                                {rest.name}
                                            </span>
                                            <div className='flex items-center gap-2'>
                                                <BsFillStarFill color='#ffb413' size={15} /> {rest.rating}/5
                                            </div>
                                        </div>
                                        <div>
                                            $$$ {rest.city}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Resturants