import React from 'react'
import { Link } from 'react-router-dom'
import cities from '../../assets/data/Cities'

export const HomeExplore = () => {
    // const [selectedCity, setSelectedCity] = useState(cities[0])
    // const [selectedFood, setSelectedFood] = useState(FoodCategory[0])

    return (
        <>
            <div>
                <div className='text-center'>
                    {/* <p className='font-semibold text-[#212245] lg:text-3xl md:text-2xl text-xl'>Explore foods on different resturants</p> */}
                    <p className='font-semibold text-[#212245] lg:text-3xl md:text-2xl text-xl'>Find us in these cities and many more!</p>
                    <p className='text-[#212245] font-normal lg:text-lg text-base mt-4'>Take a deep dive and browse foods for family, friends, parties that is healty and tasty for you.</p>
                </div>
                {/* <HomeRestSearch selectedCity={selectedCity} setSelectedCity={setSelectedCity} cities={cities} foodCategory={FoodCategory} selectedFood={selectedFood} setSelectedFood={setSelectedFood} /> */}
                <div className='mt-10'>
                    <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-5'>
                        {
                            cities.map((city, index) => {
                                return (
                                    <div className='cursor-pointer overflow-hidden rounded-lg' key={index}>
                                        <Link to={`/resturants/${city.name}`} className='w-full h-full relative group'>
                                            <img src={city.image} alt={city.image} className='transition-transform duration-300 ease-linear rounded-lg object-cover w-full h-full group-hover:scale-[1.06]' />
                                            <div className='absolute rounded-lg bg-black/60 top-0 z-10 flex justify-start items-end h-full w-full'>
                                                <h1 className='text-white font-semibold lg:text-2xl text-xl py-5 px-10'>
                                                    {city.name}
                                                </h1>
                                            </div>
                                            <div className='bottom-3 left-3 absolute hidden group-hover:block'>
                                                <h1 className='text-red-500 font-extrabold text-9xl'>{city.name.charAt(0)}</h1>
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
