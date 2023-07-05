import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import OrderFilter from "./OrderFilter";
import Api from "../../services/api";
import {useSelector} from "react-redux";
import moment from "moment";
import Loader from "../../components/loader/Loader";
import notify from "../../helper/notify";
import {ToastContainer} from "react-toastify";

const Orders = () => {
    const orderFilterSearch = [
        {
            id: "1",
            name: "All",
        },
        {
            id: "2",
            name: "Pending",
        },
        {
            id: "3",
            name: "Shipped",
        },
        {
            id: "4",
            name: "Delivered",
        },
    ];
    const [orders, setAllOrders] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const rest_id = useSelector((store) => store.authUser?.resturantAuth?._id);
    const [filters, setFilters] = useState(orderFilterSearch[0].name);
    const [orderId, setOrderId] = useState("");
    const [typingTimeout, setTypingTimeout] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        const fetchOrders = async () => {
            const response = await Api.getResturantAllOrders(rest_id);
            if (response?.data?.orders) {
                setAllOrders(response?.data?.orders);
                setIsLoading(false);
            }
        };
        fetchOrders();
    }, [rest_id]);

    const fetchOrdersAgain = async (status) => {
        setIsLoading(true);
        const response = await Api.getResturantAllOrders(rest_id, status);
        if (response?.data?.orders) {
            setAllOrders(response?.data?.orders);
            setIsLoading(false);
        }
    };

    const changeOrderStatus = async (e, id) => {
        setIsLoading(true);
        const response = await Api.changeOrderStatus(id, {
            data: e.target.value,
        });
        if (response?.status === 200) {
            if (filters === "All") {
                fetchOrdersAgain();
            } else {
                fetchOrdersAgain(filters);
            }
            setIsLoading(false);
        }
    };

    const handleSearch = async (event) => {
        setOrderId(event.target.value);
        setIsLoading(true);
        clearTimeout(typingTimeout);
        // Delay the API call by 500ms after the user stops typing
        const timeout = setTimeout(() => {
            if (filters === "All") {
                fetchSearchData(rest_id, event.target.value);
            } else {
                fetchSearchData(rest_id, event.target.value, filters);
            }
        }, 500);

        setTypingTimeout(timeout);
    };

    const fetchSearchData = async (rest_id, id, status) => {
        const response = await Api.getOrderById(rest_id, id, status);
        if (response?.data?.orders) {
            setAllOrders(response?.data?.orders);
            setIsLoading(false);
        } else {
            notify("error", `${response?.data?.error}`);
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                theme="dark"
                autoClose={1500}
            />
            <section className="container px-5 py-7 mx-auto overflow-hidden">
                <div className="text-center">
                    <h1 className="lg:text-2xl md:text-xl text-lg font-semibold text-[#212245]">
                        Here you can see your Orders
                    </h1>
                </div>
                <div className="max-w-sm my-3 ml-auto">
                    <OrderFilter
                        setFilters={setFilters}
                        filters={filters}
                        orderFilterSearch={orderFilterSearch}
                        fetchOrdersAgain={fetchOrdersAgain}
                    />
                </div>
                <div>
                    <div className="flex flex-col mb-3">
                        <label
                            htmlFor="orderId"
                            className="leading-7 text-[15px] font-semibold text-[#212245]"
                        >
                            Search Order by Id
                        </label>
                        <input
                            id="orderId"
                            name="orderId"
                            type="text"
                            placeholder="Enter the order id"
                            value={orderId}
                            onChange={handleSearch}
                            className="bg-white lg:max-w-md w-full rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center">
                            <Loader width="w-16" height="h-16" />
                        </div>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold mb-4">Orders</h2>
                            {orders?.length !== 0 ? (
                                orders?.map((order, index) => {
                                    return order?.products?.some(
                                        (item) =>
                                            item?.product?.rest_id === rest_id
                                    ) ? (
                                        <div
                                            className="flex flex-col space-y-4 mb-3"
                                            key={index}
                                        >
                                            <div className="bg-white shadow-md overflow-hidden sm:rounded-lg px-4 py-4 sm:px-6">
                                                <div className="flex justify-between flex-wrap gap-3">
                                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                                        Order Id: {order._id}
                                                    </h3>
                                                    <p className="mt-1 max-w-2xl text-sm text-gray-800">
                                                        Date:{" "}
                                                        {moment(
                                                            order?.createdAt
                                                        ).format(
                                                            "D MMMM hh:mm a"
                                                        )}
                                                    </p>
                                                </div>
                                                <div className="mt-4">
                                                    <h4 className="text-lg leading-6 font-medium text-gray-900">
                                                        Products
                                                    </h4>
                                                    <ul className="mt-2 space-y-4">
                                                        {order?.products?.map(
                                                            (prod, index) => {
                                                                return prod?.product ===
                                                                    null ? null : (
                                                                    <>
                                                                        <li
                                                                            className="ttext-gray-800 flex justify-between items-center"
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            <div className="space-y-2">
                                                                                <p>
                                                                                    {
                                                                                        prod
                                                                                            ?.product
                                                                                            ?.title
                                                                                    }
                                                                                </p>
                                                                                <p>
                                                                                    Price
                                                                                    :{" "}
                                                                                    {prod?.totalPrice *
                                                                                        prod?.quantity}{" "}
                                                                                    PKR
                                                                                </p>
                                                                                <p>
                                                                                    Quantity
                                                                                    :{" "}
                                                                                    {
                                                                                        prod?.quantity
                                                                                    }
                                                                                </p>
                                                                                {prod
                                                                                    ?.product
                                                                                    ?.size && (
                                                                                    <p>
                                                                                        Size
                                                                                        :{" "}
                                                                                        {
                                                                                            prod
                                                                                                ?.product
                                                                                                ?.size
                                                                                        }
                                                                                    </p>
                                                                                )}
                                                                                <p>
                                                                                    Status
                                                                                    :{" "}
                                                                                    {
                                                                                        order?.status
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                            <div className="w-28 h-28">
                                                                                <img
                                                                                    src={
                                                                                        prod
                                                                                            .product
                                                                                            ?.productPic
                                                                                    }
                                                                                    alt="product"
                                                                                    className="w-full h-full object-contain"
                                                                                />
                                                                            </div>
                                                                        </li>
                                                                        <hr className="h-px my-8 bg-gray-400 border-0" />
                                                                    </>
                                                                );
                                                            }
                                                        )}
                                                    </ul>
                                                    <div className="mt-4 flex justify-between items-center flex-wrap gap-3">
                                                        <div>
                                                            <Link
                                                                to={`/order-detail/${order._id}`}
                                                                className="relative bg-red-500 hover:bg-[#212245] text-white font-medium flex justify-center py-1.5 px-4 border border-transparent rounded-lg focus:outline-none"
                                                            >
                                                                Go to detail
                                                            </Link>
                                                        </div>
                                                        <div>
                                                            <span className="leading-7 mr-2 text-[15px] text-[#212245]">
                                                                Change Status
                                                            </span>
                                                            <select
                                                                name="status"
                                                                value={
                                                                    order?.status
                                                                }
                                                                onChange={(e) =>
                                                                    changeOrderStatus(
                                                                        e,
                                                                        order?._id
                                                                    )
                                                                }
                                                                className="bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                            >
                                                                <option value="Pending">
                                                                    Pending
                                                                </option>
                                                                <option value="Shipped">
                                                                    Shipped
                                                                </option>
                                                                <option value="Delivered">
                                                                    Delivered
                                                                </option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null;
                                })
                            ) : (
                                <div className="flex justify-center items-center mt-20">
                                    <h1 className="text-2xl">No order found</h1>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    );
};

export default Orders;
