import React, {Fragment, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Api from "../../services/api";
import {notify} from "../../helper";
import {ToastContainer} from "react-toastify";
import DeleteProductModel from "./DeleteModel";
import {useSelector} from "react-redux";
import Loader from "../../components/loader/Loader";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid";

const AllProducts = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [productId, setProductId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFood, setSelectedFood] = useState();
    const [allCategories, setAllCategories] = useState([
        {id: "1", name: "All"},
    ]);
    const [isLoading, setIsloading] = useState(false);
    const [page, setPage] = useState(1);
    const limit = 10; // Number of products to fetch per page
    const rest_id = useSelector((store) => store.authUser?.resturantAuth?._id);
    const selectedCategory = allCategories[0];

    useEffect(() => {
        setIsloading(true);
        const fetchAllCategories = async () => {
            const response = await Api.getCategory(rest_id);
            setAllCategories((prevCate) => [
                ...prevCate,
                ...response.data?.data,
            ]);
            setSelectedFood(selectedCategory);
            setIsloading(false);
        };
        fetchAllCategories();
    }, [rest_id,selectedCategory]);

    useEffect(() => {
        setIsloading(true);
        const fetchAllProducts = async () => {
            try {
                const response = await Api.getAllProducts(page, limit, rest_id);
                if (response?.data) {
                    setIsloading(false);
                }
                const newProducts = response?.data?.products;

                // If it's the first page, replace the existing products with newProducts
                // Otherwise, append the newProducts to the existing products
                setAllProducts((prevProducts) =>
                    page === 1 ? newProducts : [...prevProducts, ...newProducts]
                );
            } catch (error) {
                setIsloading(false);
                console.log("Error fetching products", error);
            }
        };

        fetchAllProducts();
    }, [page, rest_id]);

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handleDeleteModel = (id) => {
        setProductId(id);
        setIsOpen(true);
    };

    const handleDeleteProduct = async () => {
        setIsloading(true);
        const response = await Api.deleteProduct(productId);
        if (response?.data?.message) {
            setAllProducts((prevProducts) =>
                prevProducts.filter((product) => product._id !== productId)
            );
            notify("success", response?.data?.message);
            setIsloading(false);
            setIsOpen(false);
        } else {
            setIsloading(false);
            notify("success", response?.data?.error);
        }
    };

    const handleChangeCategory = async (data) => {
        setSelectedFood(data);
        try {
            const response =
                data?.name === "All"
                    ? await Api.getAllProducts(page, limit, rest_id)
                    : await Api.getAllProducts(
                          page,
                          limit,
                          rest_id,
                          data?.name
                      );
            if (response?.data) {
                setIsloading(false);
            }
            const newProducts = response?.data?.products;

            // If it's the first page, replace the existing products with newProducts
            // Otherwise, append the newProducts to the existing products
            setAllProducts((prevProducts) =>
                page === 1 ? newProducts : [...prevProducts, ...newProducts]
            );
        } catch (error) {
            setIsloading(false);
            console.log("Error fetching products", error);
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
            <ToastContainer
                position="top-right"
                theme="dark"
                autoClose={1500}
            />
            <div className="container px-5 py-7 mx-auto overflow-hidden">
                <div className="flex justify-between items-center flex-wrap gap-3">
                    <h1 className="lg:text-2xl md:text-xl text-lg font-semibold text-[#212245]">
                        Here is your all products
                    </h1>
                    <Link
                        to={"/add-pro"}
                        className="flex items-center bg-red-500 hover:bg-[#212245] text-white fs-14 px-3 py-2 rounded-lg shadow-md"
                    >
                        Add New Product
                    </Link>
                </div>
                <div className="space-y-3 !z-50 mt-10">
                    <p className="text-[#212245]">Sort by category</p>
                    <Listbox
                        value={selectedFood}
                        onChange={(data) => handleChangeCategory(data)}
                    >
                        <div className="relative mt-1">
                            <Listbox.Button className="relative w-full lg:max-w-sm cursor-default bg-white rounded-lg border-gray-300 border py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-400">
                                <span className="block truncate">
                                    {selectedFood?.name}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute lg:max-w-sm z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 scrollbar-hide text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {allCategories &&
                                        allCategories.length !== 0 &&
                                        allCategories.map((food, index) => (
                                            <Listbox.Option
                                                key={index}
                                                className={({active}) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                        active
                                                            ? "bg-[#fde4e4] text-red-500"
                                                            : "text-gray-900"
                                                    }`
                                                }
                                                value={food}
                                            >
                                                {({selected}) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${
                                                                selected
                                                                    ? "font-medium"
                                                                    : "font-normal"
                                                            }`}
                                                        >
                                                            {food.name}
                                                        </span>
                                                        {selected ? (
                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-500">
                                                                <CheckIcon
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                </div>
                <div className="relative overflow-x-auto mt-5">
                    <table className="min-w-full divide-y divide-gray-300 text-left">
                        <thead className="bg-gray-200">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                {/* <th scope="col" className="px-6 py-3">
                                    Total sale
                                </th> */}
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {allProducts && allProducts.length ? (
                                allProducts.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-normal whitespace-nowrap"
                                            >
                                                {item.title}
                                            </th>
                                            <td className="px-6 py-4">
                                                {item.category}
                                            </td>
                                            {/* <td className="px-6 py-4">20</td> */}
                                            <td className="px-6 py-4">
                                                {item.price} pkr
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2 items-center">
                                                    <Link
                                                        to={`/edit-pro/${item._id}`}
                                                        className="border px-2 py-1 hover:bg-slate-200/60"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        to={`/pro-view/${item._id}`}
                                                        className="border px-2 py-1 hover:bg-slate-200/60"
                                                    >
                                                        View
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteModel(
                                                                item._id
                                                            )
                                                        }
                                                        className="border px-2 py-1 hover:bg-slate-200/60"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        className="px-6 py-4 text-center font-bold"
                                        colSpan="100%"
                                    >
                                        No Product Found
                                    </td>
                                </tr>
                            )}
                            {allProducts && allProducts.length >= 10 && (
                                <tr>
                                    <td
                                        className="px-6 py-4 text-center"
                                        colSpan="100%"
                                    >
                                        <button
                                            className="bg-red-500 hover:bg-[#212245] text-white fs-14 px-3 py-2 rounded-lg shadow-md"
                                            onClick={handleLoadMore}
                                        >
                                            Load More
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <DeleteProductModel
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                handleDeleteProduct={handleDeleteProduct}
            />
        </>
    );
};

export default AllProducts;
