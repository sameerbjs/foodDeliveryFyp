import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {BsFillStarFill} from "react-icons/bs";
import {convertToSlug, getRatingAverage, notify} from "../../helper";
import {Helmet} from "react-helmet";
import Api from "../../services/api";
import Loader from "../../components/loader/Loader";
import {ToastContainer} from "react-toastify";
import moment from "moment/moment";

const Resturants = () => {
    const [allResturants, setAllResturants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const cityName = useParams().city;
    const cityTranslations = {
        Lahore: "لاہور",
        Islamabad: "اسلام آباد",
        Sialkot: "سیالکوٹ",
        Multan: "ملتان",
        Karachi: "کراچی",
        Rawalpindi: "راولپنڈی",
        Quetta: "کوئٹہ",
    };
    const navigate = useNavigate();

    useEffect(() => {
        window.history.scrollRestoration = "manual";
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        const getResturant = async () => {
            const response = await Api.getResturantsByCity(cityName);
            if (response.status === 200) {
                setAllResturants(response.data?.resturants);
                setIsLoading(false);
            } else {
                setIsLoading(false);
                notify("error", response.data?.error);
            }
        };
        getResturant();
    }, [cityName]);

    return (
        <>
            <Helmet>
                <title>Rapid Cravings - Resturants</title>
            </Helmet>
            <ToastContainer
                position="top-right"
                theme="dark"
                autoClose={1500}
            />
            <div className="px-5 py-7 mx-auto container">
                <div className="mb-5">
                    <button
                        onClick={() => navigate(-1)}
                        className="rounded-xl bg-gray-200 hover:bg-gray-300 px-4 py-1 inline-flex gap-1 items-center justify-center text-gray-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                            />
                        </svg>
                        Back
                    </button>
                </div>
                <div className="text-center">
                    {/* <p className='font-semibold text-[#212245] lg:text-3xl md:text-2xl text-xl'>Explore foods on different resturants</p> */}
                    <p className="font-semibold text-[#212245] lg:text-3xl md:text-2xl text-xl">
                        Food delivery from {cityTranslations[cityName]}’s best
                        restaurants
                    </p>
                    <p className="text-[#212245] font-normal lg:text-lg text-base mt-4">
                        Take a deep dive and browse foods for family, friends,
                        parties that is healty and tasty for you.
                    </p>
                </div>
                <div className="mt-10">
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-5">
                        {isLoading ? (
                            <div className="flex justify-center items-center col-span-4 overflow-hidden">
                                <Loader width="w-16" height="h-16" />
                            </div>
                        ) : allResturants && allResturants.length !== 0 ? (
                            allResturants.map((rest, index) => {
                                return (
                                    <>
                                    <div
                                        className="cursor-pointer overflow-hidden group py-4"
                                        key={index}
                                    >
                                        <Link
                                            to={`/products/${convertToSlug(
                                                rest.name
                                            )}/${rest._id}`}
                                        >
                                            <div className="relative w-full">
                                                <img
                                                    src={`${
                                                        process.env
                                                            .REACT_APP_SERVER_URL
                                                    }/${rest.profilePath.replace(
                                                        /\\/g,
                                                        "/"
                                                    )}`}
                                                    alt={rest.name}
                                                    className="transition-transform duration-300 w-full ease-linear object-contain group-hover:scale-[1.04]"
                                                />
                                            </div>
                                        </Link>
                                        <div className="relative px-4 -mt-16">
                                            <div className="bg-white rounded-lg shadow-md p-6">
                                                <div className="flex items-center justify-between">
                                                    <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                                                        {rest.city}
                                                    </span>
                                                    <span className="text-xs px-2 inline-flex rounded-full gap-2 uppercase font-semibold tracking-wide">
                                                        <BsFillStarFill
                                                            color="#ffb413"
                                                            size={15}
                                                        />{" "}
                                                        {getRatingAverage(
                                                            allResturants
                                                        ) || 0}
                                                        /5
                                                    </span>
                                                </div>
                                                <h4 className="mt-1 text-lg font-semibold uppercase leading-tight truncate">
                                                    {rest.name}
                                                </h4>
                                                <div className="mt-2">
                                                    <span className="text-teal-600 text-md font-semibold">
                                                        Created at{" "}
                                                    </span>
                                                    <span className="text-sm text-gray-600">
                                                        {moment(
                                                            rest.createdDate
                                                        ).format(
                                                            "Do MMMM YYYY"
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </>
                                );
                            })
                        ) : (
                            <div className="text-center col-span-4">
                                <h1 className="text-[#212245] font-semibold text-xl">
                                    No Resturant Found
                                </h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Resturants;
