import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Api from "../../services/api";
import {notify} from "../../helper";
import {ToastContainer} from "react-toastify";
import DeleteProductModel from "./DeleteModel";
import {useSelector} from "react-redux";
import Loader from "../../components/loader/Loader";

const AllProducts = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [productId, setProductId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const [page, setPage] = useState(1);
    const limit = 10; // Number of products to fetch per page
    const rest_id = useSelector((store) => store.authUser?.resturantAuth?._id);

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
                <div class="relative overflow-x-auto mt-5">
                    <table className="min-w-full divide-y divide-gray-300 text-left">
                        <thead className="bg-gray-200">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total sale
                                </th>
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
                                allProducts.map((item) => {
                                    return (
                                        <>
                                            <tr key={item.id}>
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-normal whitespace-nowrap"
                                                >
                                                    {item.title}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {item.category}
                                                </td>
                                                <td className="px-6 py-4">
                                                    20
                                                </td>
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
                                        </>
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
