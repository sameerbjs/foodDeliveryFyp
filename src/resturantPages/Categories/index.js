import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import Loader from '../../components/loader/Loader';
import FoodCategory from '../../assets/data/FoodCategory';
import { useParams } from 'react-router-dom';
import Api from '../../services/api';
import { notify } from '../../helper';
import { ToastContainer } from 'react-toastify';

const Categories = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [allCategories, setAllCategories] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        setIsLoading(true);
        const fetchAllCategories = async () => {
            const response = await Api.getCategory(id);
            setAllCategories(response.data?.data);
            setIsLoading(false);
        }
        fetchAllCategories();
    }, [id])

    const handleAddCategory = useCallback(async (category) => {
        setIsLoading(true);
        const data = {
            cate_id: category.id,
            name: category.name,
            rest_id: id
        }

        const response = await Api.addCategory(data);
        if (response.status === 200) {
            setAllCategories((prevCategories) => [
                ...prevCategories,
                response.data?.data,
            ]);
            setIsLoading(false);
        } else {
            setIsLoading(false);
            notify("error", response.data?.error);
        }
    }, [id]);

    const handleRemoveCategory = async (id) => {
        const response = await Api.deleteCategory(id);
        if (response.status === 200) {
            setAllCategories((prevCategories) =>
                prevCategories.filter((category) => category._id !== id)
            );
        } else {
            notify("error", response.data?.error);
        }
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                theme="dark"
                autoClose={1500}
            />
            <div className="container px-5 py-7 mx-auto overflow-hidden">
                <div className="flex justify-between items-center flex-wrap gap-3">
                    <h1 className="lg:text-2xl md:text-xl text-lg font-semibold text-[#212245]">
                        Here is your all categories
                    </h1>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="flex items-center bg-red-500 hover:bg-[#212245] text-white fs-14 px-3 py-2 rounded-lg shadow-md"
                    >
                        Add New Category
                    </button>
                </div>

                <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mt-16'>
                    {
                        isLoading ? <div className="flex justify-center h-[calc(100vh-300px)] items-center col-span-4 overflow-hidden">
                            <Loader width="w-16" height="h-16" />
                        </div> :
                            allCategories && allCategories?.length !== 0 ? allCategories.map((item, index) => {
                                return (
                                    <div key={index} className='flex justify-between items-center rounded-md bg-red-500/20 px-3 py-3'>
                                        <h6>{item.name}</h6>
                                        <button onClick={() => handleRemoveCategory(item._id)} className='text-lg'>-</button>
                                    </div>
                                )
                            }) : <div className='flex justify-center items-center col-span-4 h-[calc(100vh-300px)]'><h1 className='font-semibold text-xl'>No Category Found</h1></div>
                    }
                </div>
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={setIsOpen}
                >
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

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="flex min-h-full lg:w-1/4 md:w-1/2 w-full items-center justify-start p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="-translate-x-full"
                                enterTo="-translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="-translate-x-0"
                                leaveTo="-translate-x-full"
                            >

                                <Dialog.Panel className="bg-white scrollbar-hide rounded-lg shadow-lg relative w-full h-[calc(100vh-200px)] overflow-y-auto pointer-events-auto">
                                    <div className="py-3 h-full px-4 sm:px-6 divide-y-2 divide-dashed">
                                        <div className="flex justify-between items-center pb-4">
                                            <p className="font-semibold text-lg pt-2">
                                                Categories
                                            </p>
                                            <button
                                                type="button"
                                                className="inline-flex items-center justify-center p-1 rounded-3xl text-black"
                                                onClick={() =>
                                                    setIsOpen(false)
                                                }
                                            >
                                                <svg
                                                    className="block h-6 w-6"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>

                                                <span className="sr-only">
                                                    Close panel
                                                </span>
                                            </button>
                                        </div>

                                        <div className='py-6'>
                                            {
                                                FoodCategory.map((category, index) => {
                                                    return (
                                                        allCategories?.some(item => item.id === parseInt(category.id)) ? null :
                                                            <div key={index} className='flex justify-between items-center rounded-md hover:bg-red-500/20 px-3 py-3'>
                                                                <h6>{category.name}</h6>
                                                                <button onClick={() => handleAddCategory(category)} className='text-lg'>+</button>
                                                            </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default Categories