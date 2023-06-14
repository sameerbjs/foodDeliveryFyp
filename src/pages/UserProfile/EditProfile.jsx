import React, {useEffect, useState} from "react";
import {BsEye, BsEyeSlash} from "react-icons/bs";
import {notify} from "../../helper";
import {Helmet} from "react-helmet";
import Loader from "../../components/loader/Loader";
import {useParams} from "react-router-dom";
import Api from "../../services/api";
import {handleUserAuth} from "../../redux/AuthSlice";
import {useDispatch} from "react-redux";
import {ToastContainer} from "react-toastify";

const EditProfile = () => {
    const [info, setinfo] = useState({
        username: "",
        email: "",
        address: "",
        dateOfBirth: "",
        password: "",
        c_password: "",
    });
    const [pswdType, setPswdType] = useState(true);
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        setIsLoading(true);
        const fetchUserDetail = async () => {
            const response = await Api.userDetail(id);
            if (response?.data) {
                setinfo({
                    username: response?.data?.name,
                    email: response?.data?.email,
                    address: response?.data?.address,
                    dateOfBirth: response?.data?.dob,
                });

                setImageUrl(
                    `${process.env.REACT_APP_SERVER_URL}/${response?.data?.profilePath}`
                );
                setFile(
                    `${process.env.REACT_APP_SERVER_URL}/${response?.data?.profilePath}`
                );
                setIsLoading(false);
            } else {
                notify("error", response?.data?.error);
            }
        };
        fetchUserDetail();
    }, [id]);

    const showEyePswd = () => {
        setPswdType(!pswdType);
    };

    const handleChangeText = (event) => {
        setinfo({
            ...info,
            [event.target.name]: event.target.value,
        });
    };

    const handleUserEdit = async () => {
        if (
            !info.username ||
            !info.email ||
            !info.address ||
            !info.dateOfBirth ||
            !file
        ) {
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

        setIsLoading(true);
        const formData = new FormData();
        formData.append("name", info.username);
        formData.append("email", info.email);
        if (info.password) {
            formData.append("password", info.password);
            formData.append("current_password", info.c_password);
        }
        formData.append("dob", info.dateOfBirth);
        formData.append("address", info.address);
        formData.append("profilePic", file);

        const response = await Api.userEdit(formData, id);
        if (response?.data?.finalData) {
            setIsLoading(false);
            notify("success", "User update successfully");
            dispatch(
                handleUserAuth({
                    user: response?.data?.finalData,
                    isUser: response?.data?.finalData?.isUser,
                })
            );
        } else {
            setIsLoading(false);
            notify("error", response?.data?.error);
        }
    };

    const onUploadImages = (event) => {
        const fileType = event.target.files[0].type;
        if (
            fileType === "image/png" ||
            fileType === "image/jpg" ||
            fileType === "image/jpeg"
        ) {
            setFile(event.target.files[0]);
            setImageUrl(URL.createObjectURL(event.target.files[0]));
        } else {
            setFile(null);
            setImageUrl(null);
            event.target.files = null;
            notify("error", "File Format is not valid");
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-100px)] overflow-hidden">
                <Loader width="w-16" height="h-16" />
            </div>
        );
    }
    return (
        <>
            <Helmet>
                <title>Rapid Cravings - Profile</title>
            </Helmet>
            <ToastContainer
                position="top-right"
                theme="dark"
                autoClose={1500}
            />
            <div className="flex items-center flex-grow overflow-hidden">
                <div className="md:grid md:grid-cols-2 flex-grow">
                    <div className="intro-y mb-5 md:mb-0 flex flex-col justify-center items-center relative">
                        <h2 className="text-center lg:text-6xl text-[#212245] text-3xl font-bold italic">
                            User Profile Setting
                        </h2>
                    </div>
                    <div className="lg:p-10 md:p-6 p-0 rounded-xl intro-y">
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
                                    disabled
                                    required
                                    value={info.email}
                                    onChange={handleChangeText}
                                    className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                            <div className="intro-x">
                                <label
                                    htmlFor="address"
                                    className="leading-7 text-[15px] font-semibold text-[#212245]"
                                >
                                    Address
                                </label>
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    autoComplete="address"
                                    required
                                    value={info.address}
                                    onChange={handleChangeText}
                                    className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                            <div className="intro-x">
                                <label
                                    htmlFor="dob"
                                    className="leading-7 text-[15px] font-semibold text-[#212245]"
                                >
                                    Date of birth
                                </label>
                                <input
                                    id="dob"
                                    name="dateOfBirth"
                                    type="date"
                                    required
                                    value={info.dateOfBirth}
                                    onChange={handleChangeText}
                                    className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                            <div className="intro-x">
                                <label
                                    htmlFor="c_password"
                                    className="leading-7 text-[15px] font-semibold text-[#212245]"
                                >
                                    Current password
                                </label>
                                <div className="flex items-center relative">
                                    <input
                                        id="c_password"
                                        name="c_password"
                                        value={info.c_password}
                                        onChange={handleChangeText}
                                        type={pswdType ? "password" : "text"}
                                        autoComplete="c_password"
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
                                    htmlFor="password"
                                    className="leading-7 text-[15px] font-semibold text-[#212245]"
                                >
                                    Password
                                </label>
                                <div className="flex items-center relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={pswdType ? "password" : "text"}
                                        value={info.password}
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
                            <div className="rounded-lg intro-x">
                                <div className="flex items-center">
                                    <h2 className="leading-7 text-[15px] font-semibold text-[#212245]">
                                        Profile Photo
                                    </h2>
                                </div>
                                <div className="pb-5 pt-2">
                                    <div className="border-2 border-dashed rounded-md pt-4 bg-white">
                                        <div className="flex flex-wrap px-4">
                                            <div className="flex items-center">
                                                {file && imageUrl && (
                                                    <div className="relative w-24 h-24 rounded-lg shadow-xl mb-5 mr-5">
                                                        <img
                                                            src={imageUrl}
                                                            alt="no Data"
                                                            className="rounded-md object-cover max-w-sm max-h-sm h-full w-full"
                                                        />
                                                        <div
                                                            onClick={() => {
                                                                setFile(null);
                                                                setImageUrl(
                                                                    null
                                                                );
                                                            }}
                                                            className="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-red-700 right-0 top-0 -mr-2 -mt-2 cursor-pointer"
                                                        >
                                                            <svg
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                className="feather feather-x w-4 h-4"
                                                            >
                                                                <line
                                                                    x1="18"
                                                                    y1="6"
                                                                    x2="6"
                                                                    y2="18"
                                                                ></line>
                                                                <line
                                                                    x1="6"
                                                                    y1="6"
                                                                    x2="18"
                                                                    y2="18"
                                                                ></line>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="px-4 pb-4 flex flex-wrap items-center relative text-zinc-500">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-4 h-4 mr-2"
                                            >
                                                <rect
                                                    x="3"
                                                    y="3"
                                                    width="18"
                                                    height="18"
                                                    rx="2"
                                                    ry="2"
                                                ></rect>
                                                <circle
                                                    cx="8.5"
                                                    cy="8.5"
                                                    r="1.5"
                                                ></circle>
                                                <polyline points="21 15 16 10 5 21"></polyline>
                                            </svg>
                                            <span className="fs-14 text-cyan-600 mr-1">
                                                Upload a Photo
                                            </span>
                                            <span className="fs-14">
                                                or drag and drop
                                            </span>
                                            <input
                                                type="file"
                                                name="photo"
                                                onChange={onUploadImages}
                                                className="w-full h-full top-0 left-0 absolute opacity-0"
                                                accept="image/jpeg,image/jpg,image/png,image/gif"
                                                multiple={false}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={handleUserEdit}
                                className="relative intro-x w-full bg-red-500 hover:bg-[#212245] text-white font-medium tracking-widest flex justify-center py-2.5 px-4 border border-transparent rounded-lg focus:outline-none "
                            >
                                {isLoading ? (
                                    <Loader width="w-8" height="h-8" />
                                ) : (
                                    "Edit Prodile"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditProfile;
