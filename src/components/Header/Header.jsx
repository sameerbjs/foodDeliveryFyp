import React, { useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/images/res-logo.png'
import avatar from '../../assets/images/ava-3.jpg'
import { useSelector } from "react-redux";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const totalCartProducts = useSelector(store => store.cart.totalCartProducts)
    return (
        <div className="pb-[65px]">
            <nav className="bg-white shadow-md fixed w-full z-50">
                <div className="mx-auto px-4 sm:px-6 lg:px-10 w-full">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-3">
                                <img
                                    className="h-10 w-10"
                                    src={logo}
                                    alt="Workflow"
                                />
                                <h5 className="text-[#212245] font-semibold text-[1rem]">Tasty Treat</h5>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <NavLink
                                        to={"/"}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-red-500 px-3 py-2 font-semibold leading-5 bg-[#fde4e4] rounded-lg"
                                                : "text-[#212245] hover:text-red-500 px-3 py-2 font-semibold leading-5 hover:bg-[#fde4e4] rounded-lg"
                                        }
                                    >
                                        Home
                                    </NavLink>
                                    <NavLink
                                        to={"/about-us"}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-red-500 px-3 py-2 font-semibold leading-5 bg-[#fde4e4] rounded-lg"
                                                : "text-[#212245] hover:text-red-500 px-3 py-2 font-semibold leading-5 hover:bg-[#fde4e4] rounded-lg"
                                        }
                                    >
                                        About us
                                    </NavLink>
                                    <NavLink
                                        to={"/contact"}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-red-500 px-3 py-2 font-semibold leading-5 bg-[#fde4e4] rounded-lg"
                                                : "text-[#212245] hover:text-red-500 px-3 py-2 font-semibold leading-5 hover:bg-[#fde4e4] rounded-lg"
                                        }
                                    >
                                        Contact
                                    </NavLink>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 lg:mr-0 mr-7 flex-row-reverse">
                                <Link to={"/cart"} className="relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 cursor-pointer">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                    </svg>
                                    <div className="absolute -right-2 -top-2 text-center">
                                        <p className="w-5 h-5 bg-[#df2020] text-sm text-white rounded-xl">{totalCartProducts}</p>
                                    </div>
                                </Link>
                                <Popover className="relative mt-2" as="div">
                                    <Popover.Button>
                                        <div className="w-8 h-8">
                                            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 cursor-pointer">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg> */}
                                            <img src={avatar} alt="avatar" className="w-full rounded-3xl object-cover object-center h-full" />
                                        </div>
                                    </Popover.Button>
                                    <Transition
                                        enter="transition duration-100 ease-out"
                                        enterFrom="transform scale-95 opacity-0"
                                        enterTo="transform scale-100 opacity-100"
                                        leave="transition duration-75 ease-out"
                                        leaveFrom="transform scale-100 opacity-100"
                                        leaveTo="transform scale-95 opacity-0"
                                        className={'relative z-50'}
                                    >
                                        <Popover.Panel className="absolute z-10 bg-white px-2 min-w-[150px] py-3 shadow-md right-0 border rounded-md">
                                            <div className="w-full">
                                                <div className="w-full">
                                                    <button className="text-white bg-[#df2020] hover:bg-[#df2020]/50 w-full px-4 py-2 rounded-lg">Profile</button>
                                                </div>
                                                <div className="w-full mt-3">
                                                    <button className="text-white bg-[#df2020] hover:bg-[#df2020]/50 w-full px-4 py-2 rounded-lg">Logout</button>
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </Popover>
                            </div>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="bg-[#df2020] inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#df2020] focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {!isOpen ? (
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
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                ) : (
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
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <Transition
                    show={isOpen}
                    enter="transition ease-out duration-100 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    {isOpen && (
                        <div className="w-full flex justify-center">
                            <div className="md:hidden absolute rounded-lg top-2 w-11/12 bg-white shadow-lg" id="mobile-menu">
                                <div className="px-2 pt-3 pb-3 space-y-1 sm:px-3">
                                    <NavLink
                                        to={"/"}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-red-500 px-3 py-2 font-semibold leading-5 bg-[#fde4e4] rounded-lg block"
                                                : "text-[#212245] hover:text-red-500 px-3 py-2 font-semibold leading-5 block hover:bg-[#fde4e4] rounded-lg"
                                        }
                                    >
                                        Home
                                    </NavLink>
                                    <NavLink
                                        to={"/about-us"}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-red-500 px-3 py-2 font-semibold leading-5 bg-[#fde4e4] rounded-lg block"
                                                : "text-[#212245] hover:text-red-500 px-3 py-2 font-semibold leading-5 block hover:bg-[#fde4e4] rounded-lg"
                                        }
                                    >
                                        About us
                                    </NavLink>
                                    <NavLink
                                        to={"/contact"}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-red-500 px-3 py-2 font-semibold leading-5 bg-[#fde4e4] rounded-lg block"
                                                : "text-[#212245] hover:text-red-500 px-3 py-2 font-semibold leading-5 block hover:bg-[#fde4e4] rounded-lg"
                                        }
                                    >
                                        Contact
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    )}
                </Transition>
            </nav>
        </div>
    );
}

export default Header;