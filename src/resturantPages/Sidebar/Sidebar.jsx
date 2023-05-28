import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { SiGoogleanalytics } from 'react-icons/si';
import { RiShoppingCart2Line } from 'react-icons/ri';
import { BsFillBoxFill } from 'react-icons/bs';
const Sidebar = () => {
    return (
        <>
            <div className="sidebar">
                <div className="h-screen bg-slate-800">
                    <div className="flex pt-8 px-4 pb-8 pr-3 sm:px-2 border-b border-white">
                        <Link to="/" className="text-white text-center flex justify-center items-center grow">
                            <SiGoogleanalytics size={50} />
                        </Link>
                    </div>
                    <div className="space-y-8 px-4">
                        <ul className="mt-3 space-y-3">
                            <li>
                                <NavLink to="/products"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "block text-slate-200 bg-slate-200/10 truncate transition duration-150 px-3 py-2 rounded-sm mb-0.5"
                                            : "block text-slate-200 hover:bg-slate-200/10 truncate transition duration-150 px-3 py-2 rounded-sm mb-0.5"
                                    }
                                >
                                    <div className="flex items-center ">
                                        <div className="shrink-0 text-slate-600">
                                            <RiShoppingCart2Line className="h-6 w-6" />
                                        </div>
                                        <span className="text-sm font-medium ml-3 duration-200 Medium">Products</span>
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/orders"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "block text-slate-200 bg-slate-200/10 truncate transition duration-150 px-3 py-2 rounded-sm mb-0.5"
                                            : "block text-slate-200 hover:bg-slate-200/10 truncate transition duration-150 px-3 py-2 rounded-sm mb-0.5"
                                    }
                                >
                                    <div className="flex items-center ">
                                        <div className="shrink-0 text-slate-600">
                                            <BsFillBoxFill className="h-6 w-6" />
                                        </div>
                                        <span className="text-sm font-medium ml-3 duration-200 Medium">Orders</span>
                                    </div>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar