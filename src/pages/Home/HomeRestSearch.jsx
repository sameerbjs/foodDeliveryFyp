import React, { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const HomeRestSearch = ({ selectedCity, setSelectedCity, cities }) => {

    return (
        <>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 mt-5 items-center'>
                <div className='intro-x'>
                    <p className="font-semibold text-[14px] text-[#212245]">Search by city</p>
                    <Listbox value={selectedCity} onChange={setSelectedCity}>
                        <div className="relative mt-1">
                            <Listbox.Button className="relative w-full cursor-default bg-white rounded-lg border py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-400">
                                <span className="block truncate">{selectedCity.name}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto scrollbar-hide rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {cities.map((city, index) => (
                                        <Listbox.Option
                                            key={index}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-[#fde4e4] text-red-500' : 'text-gray-900'
                                                }`
                                            }
                                            value={city}
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                            }`}
                                                    >
                                                        {city.name}
                                                    </span>
                                                    {selected ? (
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-500">
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                </div>
            </div>
        </>
    )
}

export default HomeRestSearch