import { React, useState } from "react";
import { ToastContainer } from "react-toastify";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { notify } from "../../../helper";

const ResturantLogin = () => {
    const [info, setinfo] = useState({
        email: "",
        password: "",
    });
    const [pswdType, setPswdType] = useState(true);
    const navigate = useNavigate();
    const showEyePswd = () => {
        setPswdType(!pswdType);
    };

    const handleChangeText = (event) => {
        setinfo({
            ...info,
            [event.target.name]: event.target.value,
        });
    };

    const handleLogin = async () => {
        if (!info.email || !info.password) {
            notify("error", "Please fill all the fields");
            return;
        }
        if (info.email) {
            var pattern = new RegExp(
                /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
            );
            if (!pattern.test(info.email)) {
                notify("error", "Please enter valid email address");
                return;
            }
        }
        navigate('/user-register')
    };
    return (
        <>
            <div className="container px-4 sm:px-6 lg:px-8 lg:mt-0 mt-10 lg:h-[calc(100vh-230px)] md:h-[calc(100vh-170px)] h-[calc(100vh-400px)] flex items-start justify-start lg:justify-center lg:items-center">
                <ToastContainer
                    position="top-right"
                    theme="dark"
                    autoClose={2000}
                />
                <div className="flex items-center flex-grow">
                    <div className="md:grid md:grid-cols-2 flex-grow">
                        <div className="intro-y mb-5 md:mb-0 flex flex-col justify-center items-center relative">
                            <h2 className="text-center lg:text-6xl text-[#212245] text-3xl font-bold italic">
                                Resturant Login
                            </h2>
                        </div>
                        <div className="lg:p-10 md:p-6 p-0 rounded-xl intro-y">
                            <div className="space-y-4">
                                <div className="intro-x">
                                    <label
                                        htmlFor="email-address"
                                        className="leading-7 text-[15px] font-semibold text-[#212245]"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={info.email}
                                        onChange={handleChangeText}
                                        className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                                <div className="intro-x">
                                    <label
                                        htmlFor="password"
                                        className="leading-7 text-[15px] font-semibold text-[#212245]"
                                    >
                                        Password
                                    </label>
                                    <div className="flex items-center relative">
                                        <input
                                            id="password"
                                            name="password"
                                            value={info.password}
                                            onChange={handleChangeText}
                                            type={
                                                pswdType ? "password" : "text"
                                            }
                                            autoComplete="current-password"
                                            required
                                            maxLength={16}
                                            className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        />
                                        <div
                                            onClick={showEyePswd}
                                            className="cursor-pointer h-12 w-12 flex items-center justify-center absolute right-0"
                                        >
                                            {pswdType ? (
                                                <BsEye size={20} />
                                            ) : (
                                                <BsEyeSlash size={20} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="intro-x">
                                    <span
                                        className="leading-7 text-[15px] font-semibold text-[#212245]"
                                    >
                                        Don't have an account <Link to={'/auth-register'} state={{ tab: 1 }} className="text-blue-500 hover:underline"> Register here</Link>
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogin}
                                    className="relative intro-x w-full bg-red-500 hover:bg-[#212245] text-white font-medium tracking-widest flex justify-center py-2.5 px-4 border border-transparent rounded-lg focus:outline-none "
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResturantLogin;
