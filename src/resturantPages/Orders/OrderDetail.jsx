import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Api from "../../services/api";
import moment from "moment";

const OrderDetail = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [orderDetail, setOrderDetail] = useState({});

    useEffect(() => {
        const fetchOrderDetail = async () => {
            const response = await Api.getOrderDetail(id);
            setOrderDetail(response?.data?.order);
        };
        fetchOrderDetail();
    }, [id]);

    return (
        <div className="container px-5 py-7 mx-auto overflow-hidden">
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
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Order ID: {orderDetail?._id}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Placed on{" "}
                        {moment(orderDetail?.createdAt).format(
                            "D MMMM hh:mm a"
                        )}
                    </p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">
                                Customer Name
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {orderDetail?.user?.name}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">
                                Shipping Address
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {orderDetail?.address}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">
                                Contact Email
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {orderDetail?.user?.email}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">
                                Contact Number
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {orderDetail?.phone}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">
                                Payment Method
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                Cash on delivery
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">
                                Total Amount
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {orderDetail?.overAllPrice}
                            </dd>
                        </div>
                    </dl>
                </div>
                <div className="border-t border-gray-200">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Order Items
                        </h3>
                    </div>
                    <div className="px-4 py-3 sm:px-6">
                        <ul className="space-y-4">
                            {orderDetail?.products?.map((item, index) => (
                                <li
                                    key={index}
                                    className="border-t border-gray-200 py-2"
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={`${
                                                    process.env
                                                        .REACT_APP_SERVER_URL
                                                }/${item?.product?.productPath.replace(
                                                    /\\/g,
                                                    "/"
                                                )}`}
                                                alt="Product"
                                                className="h-12 w-12 rounded-md"
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h4 className="text-lg font-medium text-gray-900">
                                                {item?.product?.title}
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                Price: {item?.product?.price},
                                                Quantity: {item?.quantity},
                                                Size: {item?.product?.size}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
