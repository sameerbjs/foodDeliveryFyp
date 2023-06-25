import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import OrderFilter from "./OrderFilter";
import Api from "../../services/api";
import {useSelector} from "react-redux";
import moment from "moment";
import Loader from "../../components/loader/Loader";

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

    if (isLoading) {
        return (
            <div className="flex justify-center h-[calc(100vh-70px)] items-center">
                <Loader width="w-16" height="h-16" />
            </div>
        );
    }

    return (
        <>
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
                    <h2 className="text-2xl font-bold mb-4">Orders</h2>
                    {orders?.length !== 0 ? (
                        orders?.map((order, index) => {
                            return (
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
                                                ).format("D MMMM hh:mm a")}
                                            </p>
                                        </div>
                                        <div className="mt-4">
                                            <h4 className="text-lg leading-6 font-medium text-gray-900">
                                                Products
                                            </h4>
                                            <ul className="mt-2 space-y-4">
                                                {order?.products?.map(
                                                    (prod, index) => {
                                                        return (
                                                            <>
                                                                <li
                                                                    className="text-sm text-gray-800"
                                                                    key={index}
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
                                                                        <p>
                                                                            Size
                                                                            :{" "}
                                                                            {
                                                                                prod
                                                                                    ?.product
                                                                                    ?.size
                                                                            }
                                                                        </p>
                                                                        <p>
                                                                            Status
                                                                            :{" "}
                                                                            {
                                                                                order?.status
                                                                            }
                                                                        </p>
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
                                                        value={order?.status}
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
                            );
                        })
                    ) : (
                        <div className="flex justify-center items-center mt-20">
                            <h1 className="text-2xl">No order found</h1>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Orders;
