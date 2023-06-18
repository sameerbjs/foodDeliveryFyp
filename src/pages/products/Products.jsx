import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {Tab} from "@headlessui/react";
import {useState} from "react";
import {Helmet} from "react-helmet";
import FoodCategory from "../../assets/data/FoodCategory";
import Api from "../../services/api";
import Loader from "../../components/loader/Loader";
import PostComments from "./PostComments";
import {notify} from "../../helper";
import {ToastContainer} from "react-toastify";

export const ProductRest = () => {
    const navigate = useNavigate();
    const [allProducts, setAllProducts] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [page, setPage] = useState(1);
    const limit = 10; // Number of products to fetch per page
    const {id} = useParams();
    useEffect(() => {
        window.history.scrollRestoration = "manual";
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setIsloading(true);
        const fetchAllProducts = async () => {
            const {name} = FoodCategory.find(
                (category) => parseInt(category.id) === selectedIndex + 1
            );
            const response = await Api.getAllProducts(page, limit, id, name);
            if (response?.data?.products) {
                setIsloading(false);
                const newProducts = response?.data?.products;
                setAllProducts((prevProducts) =>
                    page === 1 ? newProducts : [...prevProducts, ...newProducts]
                );
            } else {
                setIsloading(false);
                notify("error", response?.data?.error);
                setTimeout(() => {
                    navigate('/auth-login')
                }, 3000);
            }
        };

        fetchAllProducts();
    }, [page, id, selectedIndex,navigate]);

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handleTabChange = async (index) => {
        setSelectedIndex(index);
        const {name} = FoodCategory.find(
            (category) => parseInt(category.id) === index + 1
        );

        setIsloading(true);
        try {
            const response = await Api.getAllProducts(page, limit, id, name);
            if (response?.data?.products) {
                setIsloading(false);
            }
            const newProducts = response?.data?.products;
            setAllProducts((prevProducts) =>
                page === 1 ? newProducts : [...prevProducts, ...newProducts]
            );
        } catch (error) {
            setIsloading(false);
            console.log("Error fetching products", error);
        }
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>Rapid Cravings - Products</title>
            </Helmet>
            <ToastContainer autoClose={2000} theme="dark" />
            <div className="container px-5 py-7 mx-auto overflow-hidden">
                <div>
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
                <Tab.Group
                    selectedIndex={selectedIndex}
                    onChange={(index) => handleTabChange(index)}
                >
                    <Tab.List
                        className={
                            "flex gap-4 scrollbar-hide items-center lg:justify-center justify-start pt-5 pb-10 overflow-x-auto whitespace-nowrap"
                        }
                    >
                        {FoodCategory.map((category, index) => {
                            return (
                                <Tab key={index}>
                                    {({selected}) => (
                                        <span
                                            className={
                                                !selected
                                                    ? "px-4 py-2 text-black bg-red-500/50 rounded-lg"
                                                    : "bg-red-500 px-4 py-2 text-white rounded-lg"
                                            }
                                        >
                                            {category.name}
                                        </span>
                                    )}
                                </Tab>
                            );
                        })}
                    </Tab.List>
                </Tab.Group>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 -m-4">
                    {isLoading ? (
                        <div className="flex justify-center items-center col-span-3 overflow-hidden">
                            <Loader width="w-16" height="h-16" />
                        </div>
                    ) : allProducts && allProducts.length !== 0 ? (
                        allProducts.map((product, index) => {
                            return (
                                <div className="p-4" key={index}>
                                    <div className="rounded-lg overflow-hidden">
                                        <div className="h-64">
                                            <img
                                                className="w-full object-contain h-full"
                                                src={`${
                                                    process.env
                                                        .REACT_APP_SERVER_URL
                                                }/${product.productPath.replace(
                                                    /\\/g,
                                                    "/"
                                                )}`}
                                                alt={product.title}
                                            />
                                        </div>
                                        <div className="p-6">
                                            <p className="tracking-widest text-sm font-medium text-gray-600 mb-1">
                                                NAME
                                            </p>
                                            <span className="text-lg font-medium text-gray-900 mb-3">
                                                {product.title}
                                            </span>
                                            <p className="leading-relaxed mb-3">
                                                {product.description
                                                    .split(" ")
                                                    .slice(0, 20)
                                                    .join(" ")}
                                                ...
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <Link
                                                    to={`/product/${product._id}`}
                                                    className="text-red-500 inline-flex items-center md:mb-2 lg:mb-0"
                                                >
                                                    Show details
                                                    <svg
                                                        className="w-4 h-4 ml-2"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        fill="none"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="M5 12h14"></path>
                                                        <path d="M12 5l7 7-7 7"></path>
                                                    </svg>
                                                </Link>
                                                <div>
                                                    <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="w-4 h-4 mr-1    "
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                                                            />
                                                        </svg>
                                                        {product.price} Rs
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center col-span-3 my-10">
                            <h1 className="text-[#212245] font-semibold text-xl">
                                No Product Found with this category
                            </h1>
                        </div>
                    )}
                </div>
                {allProducts && allProducts.length >= 10 && (
                    <div className="text-center">
                        <button
                            className="bg-red-500 hover:bg-[#212245] text-white fs-14 px-3 py-2 rounded-lg shadow-md"
                            onClick={handleLoadMore}
                        >
                            Load More
                        </button>
                    </div>
                )}

                {selectedIndex === 0 && (
                    <div className="p-4">
                        <PostComments id={id} />
                    </div>
                )}
            </div>
        </React.Fragment>
    );
};
