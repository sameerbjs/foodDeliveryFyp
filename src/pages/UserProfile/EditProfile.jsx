import React, { useState } from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { notify } from '../../helper';
import { Helmet } from 'react-helmet';


const EditProfile = ({ navigate }) => {
    const [pswdType, setPswdType] = useState(true);
    const [info, setinfo] = useState({
        username: "Sameer",
        email: "abc@gmail.com",
        password: "123456789",
        c_password: "123456789",
    });
    const showEyePswd = () => {
        setPswdType(!pswdType);
    };

    const handleChangeText = (event) => {
        setinfo({
            ...info,
            [event.target.name]: event.target.value,
        });
    };

    const handleRegister = async () => {
        if (!info.username || !info.email || !info.password) {
            notify("error", "Please fill all the fields");
            return;
        }
        if (info.password !== info.c_password) {
            notify(
                "error",
                "Password dose not match with current password"
            );
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
        navigate('/')
    };
    return (
        <>
            <Helmet>
                <title>Rapid Cravings - Profile</title>
            </Helmet>
            <div className="flex items-center flex-grow overflow-hidden">
                <div className="md:grid md:grid-cols-2 flex-grow">
                    <div className="intro-y mb-5 md:mb-0 flex flex-col justify-center items-center relative">
                        <h2 className="text-center lg:text-6xl text-[#212245] text-3xl font-bold italic">
                            User Profile Setting
                        </h2>
                    </div>
                    <div className="lg:px-10 md:px-6 p-0 rounded-xl intro-y">
                        <div className="space-y-4">
                            <div className="intro-x">
                                <label
                                    htmlFor="email-address"
                                    className="leading-7 text-[15px] font-semibold text-[#212245]"
                                >
                                    User Name
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    maxLength={26}
                                    value={info.username}
                                    onChange={handleChangeText}
                                    autoComplete="User Name"
                                    required
                                    className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
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
                                <label
                                    htmlFor="confirm_password"
                                    className="leading-7 text-[15px] font-semibold text-[#212245]"
                                >
                                    Confirm Password
                                </label>
                                <div className="flex items-center relative">
                                    <input
                                        id="confirm_password"
                                        name="c_password"
                                        type={
                                            pswdType ? "password" : "text"
                                        }
                                        value={info.c_password}
                                        onChange={handleChangeText}
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
                            <button
                                onClick={handleRegister}
                                className="relative intro-x w-full bg-red-500 hover:bg-[#212245] text-white font-medium tracking-widest flex justify-center py-2.5 px-4 border border-transparent rounded-lg focus:outline-none "
                            >
                                Edit profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProfile