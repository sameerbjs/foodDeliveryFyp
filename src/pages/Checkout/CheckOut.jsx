import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CheckOut = () => {
    const navigate = useNavigate();
    const totalPrice = useSelector(store => store.cart.totalPrice)
    const [isOpen, setIsOpen] = useState(false);
    const [deliveryCharges, setDeliveryCharges] = useState(200)

    useEffect(() => {
        window.history.scrollRestoration = 'manual';
        window.scrollTo(0, 0);
        setDeliveryCharges(200);
    }, []);
    return (
        <div className="container px-5 py-7 mx-auto">
            <div className='mb-5'>
                <button onClick={() => navigate(-1)} className="rounded-xl bg-gray-200 hover:bg-gray-300 px-4 py-1 inline-flex gap-1 items-center justify-center text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Back
                </button>
            </div>
            <div className='overflow-hidden'>
                <div className='flex justify-between items-center whitespace-nowrap flex-wrap'>
                    <h1 className='font-semibold text-[#212245] lg:text-3xl md:text-2xl text-xl'>
                        Products Checkout
                    </h1>
                </div>

                <div className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 mt-4 gap-5'>
                    <div className="relative">
                        <label htmlFor="name" className="leading-7 text-[15px] font-semibold text-[#212245]">Name</label>
                        <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative">
                        <label htmlFor="email" className="leading-7 text-[15px] font-semibold text-[#212245]">Email</label>
                        <input type="text" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative">
                        <label htmlFor="city" className="leading-7 text-[15px] font-semibold text-[#212245]">City</label>
                        <input type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative">
                        <label htmlFor="street_house" className="leading-7 text-[15px] font-semibold text-[#212245]">Street & House No</label>
                        <input type="text" id="street_house" name="street_house" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative">
                        <label htmlFor="full_address" className="leading-7 text-[15px] font-semibold text-[#212245]">Full address</label>
                        <input type="text" id="full_address" name="full_address" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative">
                        <label htmlFor="number" className="leading-7 text-[15px] font-semibold text-[#212245]">Phone No</label>
                        <input type="text" id="number" name="number" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className='max-w-max ml-auto space-y-2 mt-5 rounded-lg text-left'>
                    <h1 className='font-semibold text-[#212245]'>
                        Payment : Cash on Delivery
                    </h1>
                    <h1 className='font-semibold text-[#212245]'>
                        Delivery charges : {deliveryCharges}
                    </h1>
                    <h1 className='font-semibold text-[#212245]'>
                        Total Price : {totalPrice + deliveryCharges} {""}
                    </h1>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="relative bg-red-500 hover:bg-[#212245] text-white font-medium flex justify-center py-2.5 px-4 border border-transparent rounded-lg focus:outline-none "
                    >
                        Place Order
                    </button>
                </div>
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="p"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Order Confirmation
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-800">
                                            Are you sure to place this order ?
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            type="button"
                                            className="inline-flex mr-2 justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        >
                                            Confirm
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default CheckOut