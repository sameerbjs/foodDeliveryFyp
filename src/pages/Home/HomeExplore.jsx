import React from 'react'
import rest1 from '../../assets/images/rest1.jpeg'
// import rest2 from '../../assets/images/rest2.jpeg'
import rest3 from '../../assets/images/rest3.jpeg'
import { Link } from 'react-router-dom'
// import HomeRestSearch from './HomeRestSearch'
import cities from '../../assets/data/Cities'
// import FoodCategory from '../../assets/data/FoodCategory'

export const HomeExplore = () => {
    // const [selectedCity, setSelectedCity] = useState(cities[0])
    // const [selectedFood, setSelectedFood] = useState(FoodCategory[0])

    return (
        <>
            <div>
                <div className='text-center'>
                    <p className='font-semibold text-[#212245] lg:text-3xl md:text-2xl text-xl'>Explore foods on different resturants</p>
                    <p className='text-[#212245] font-normal lg:text-lg text-base mt-4'>Take a deep dive and browse foods for family, friends, parties that is healty and tasty for you.</p>
                </div>
                {/* <HomeRestSearch selectedCity={selectedCity} setSelectedCity={setSelectedCity} cities={cities} foodCategory={FoodCategory} selectedFood={selectedFood} setSelectedFood={setSelectedFood} /> */}
                <div className='mt-10'>
                    <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5'>
                        {
                            cities.map((city, index) => {
                                return (
                                    <div className='cursor-pointer' key={index}>
                                        <Link to={'/products'} className='w-full h-full relative'>
                                            <img src={index % 2 === 0 ? rest3 : rest1} alt="rest1" className='rounded-lg object-cover w-full h-full' />
                                            <div className='absolute rounded-lg bg-black/60 top-0 z-10 flex justify-center items-center h-full w-full'>
                                                <h1 className='text-white font-semibold lg:text-2xl text-xl'>
                                                    {city.name}
                                                </h1>
                                            </div>
                                        </Link>
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
