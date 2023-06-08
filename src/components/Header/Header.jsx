import React, {Fragment, useState} from "react";
import {Dialog, Popover, Transition} from "@headlessui/react";
import {Link, NavLink} from "react-router-dom";
import logo from "../../assets/images/res-logo.png";
import {useSelector} from "react-redux";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const totalCartProducts = useSelector(
        (store) => store.cart.totalCartProducts
    );
    const isUserLogin = useSelector((store) => store.authUser.userAuth);
    return (
        <div className="pb-[65px]">
            <nav className="bg-white shadow-md fixed w-full z-50">
                <div className="mx-auto px-4 sm:px-6 lg:px-10 w-full">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center justify-between w-full">
                            <Link to={"/"} className="flex items-center gap-3">
                                <img
                                    className="h-10 w-10"
                                    src={logo}
                                    alt="Workflow"
                                />
                                <h5 className="text-[#212245] font-semibold text-[1rem]">
                                    Rapid Cravings
                                </h5>
                            </Link>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <NavLink
                                        to={"/"}
                                        className={({isActive}) =>
                                            isActive
                                                ? "text-red-500 px-3 py-2 font-semibold leading-5 bg-[#fde4e4] rounded-lg"
                                                : "text-[#212245] hover:text-red-500 px-3 py-2 font-semibold leading-5 hover:bg-[#fde4e4] rounded-lg"
                                        }
                                    >
                                        Home
                                    </NavLink>
                                    <NavLink
                                        to={"/about-us"}
                                        className={({isActive}) =>
                                            isActive
                                                ? "text-red-500 px-3 py-2 font-semibold leading-5 bg-[#fde4e4] rounded-lg"
                                                : "text-[#212245] hover:text-red-500 px-3 py-2 font-semibold leading-5 hover:bg-[#fde4e4] rounded-lg"
                                        }
                                    >
                                        About us
                                    </NavLink>
                                    <NavLink
                                        to={"/contact"}
                                        className={({isActive}) =>
                                            isActive
                                                ? "text-red-500 px-3 py-2 font-semibold leading-5 bg-[#fde4e4] rounded-lg"
                                                : "text-[#212245] hover:text-red-500 px-3 py-2 font-semibold leading-5 hover:bg-[#fde4e4] rounded-lg"
                                        }
                                    >
                                        Contact us
                                    </NavLink>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 lg:mr-0 mr-7 flex-row-reverse">
                                {isUserLogin && isUserLogin.length !== 0 && (
                                    <Link to={"/cart"} className="relative">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-7 h-7 cursor-pointer"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                            />
                                        </svg>
                                        <div className="absolute -right-2 -top-2 text-center">
                                            <p className="w-5 h-5 bg-[#df2020] text-sm text-white rounded-xl">
                                                {totalCartProducts}
                                            </p>
                                        </div>
                                    </Link>
                                )}
                                <Popover className="relative mt-2" as="div">
                                    <Popover.Button>
                                        <div className="w-8 h-8">
                                            <img
                                                src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                                                alt="avatar"
                                                className="w-full rounded-3xl object-cover object-center h-full"
                                            />
                                        </div>
                                    </Popover.Button>
                                    <Transition
                                        enter="transition duration-100 ease-out"
                                        enterFrom="transform scale-95 opacity-0"
                                        enterTo="transform scale-100 opacity-100"
                                        leave="transition duration-75 ease-out"
                                        leaveFrom="transform scale-100 opacity-100"
                                        leaveTo="transform scale-95 opacity-0"
                                        className={"relative z-50"}
                                    >
                                        <Popover.Panel className="absolute z-10 bg-white px-2 min-w-[150px] py-3 shadow-md right-0 border rounded-md">
                                            {isUserLogin &&
                                            isUserLogin.length !== 0 ? (
                                                <div className="w-full">
                                                    <Link
                                                        to={"/profile"}
                                                        className="w-full"
                                                    >
                                                        <button className="text-white bg-red-500 hover:bg-[#212245] w-full px-4 py-2 rounded-lg">
                                                            Profile
                                                        </button>
                                                    </Link>
                                                    <div className="w-full mt-3">
                                                        <button className="text-white bg-red-500 hover:bg-[#212245] w-full px-4 py-2 rounded-lg">
                                                            Logout
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="w-full space-y-3">
                                                    <Link to={"/auth-register"}>
                                                        <button className="text-white bg-red-500 hover:bg-[#212245] w-full px-4 py-2 rounded-lg">
                                                            Register
                                                        </button>
                                                    </Link>
                                                    <Link to={"/auth-login"}>
                                                        <button className="text-white mt-3 bg-red-500 hover:bg-[#212245] w-full px-4 py-2 rounded-lg">
                                                            Login
                                                        </button>
                                                    </Link>
                                                </div>
                                            )}
                                        </Popover.Panel>
                                    </Transition>
                                </Popover>
                            </div>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="bg-red-500 inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-500 focus:ring-white"
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

                <Transition.Root show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-50"
                        onClose={setIsOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-500"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-500"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-hidden">
                            <div className="fixed right-0 w-3/4 flex max-w-full pointer-events-none">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="relative w-screen h-screen overflow-hidden pointer-events-auto">
                                        <div className="bg-white shadow-lg py-3 h-full px-4 sm:px-6 divide-y-2 divide-dashed divi">
                                            <div className="flex justify-between items-center pb-4">
                                                <p className="font-semibold text-lg pt-2">
                                                    Tasty Treat
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
                                            <div className="pt-5 pb-3 space-y-1">
                                                <NavLink
                                                    to={"/"}
                                                    className={({isActive}) =>
                                                        isActive
                                                            ? "text-red-500 px-3 py-2 font-semibold leading-5 bg-[#fde4e4] rounded-lg block"
                                                            : "text-[#212245] hover:text-red-500 px-3 py-2 font-semibold leading-5 block hover:bg-[#fde4e4] rounded-lg"
                                                    }
                                                >
                                                    Home
                                                </NavLink>
                                                <NavLink
                                                    to={"/about-us"}
                                                    className={({isActive}) =>
                                                        isActive
                                                            ? "text-red-500 px-3 py-2 font-semibold leading-5 bg-[#fde4e4] rounded-lg block"
                                                            : "text-[#212245] hover:text-red-500 px-3 py-2 font-semibold leading-5 block hover:bg-[#fde4e4] rounded-lg"
                                                    }
                                                >
                                                    About us
                                                </NavLink>
                                                <NavLink
                                                    to={"/contact"}
                                                    className={({isActive}) =>
                                                        isActive
                                                            ? "text-red-500 px-3 py-2 font-semibold leading-5 bg-[#fde4e4] rounded-lg block"
                                                            : "text-[#212245] hover:text-red-500 px-3 py-2 font-semibold leading-5 block hover:bg-[#fde4e4] rounded-lg"
                                                    }
                                                >
                                                    Contact us
                                                </NavLink>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
            </nav>
        </div>
    );
}

export default Header;
