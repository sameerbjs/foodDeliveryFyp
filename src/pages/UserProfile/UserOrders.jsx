import React, {useEffect} from "react";
import Api from "../../services/api";
import {useSelector} from "react-redux";
import {useState} from "react";
import notify from "../../helper/notify";
import {ToastContainer} from "react-toastify";
import moment from "moment";
import Loader from "../../components/loader/Loader";

const UserOrders = () => {
    const user_id = useSelector((store) => store.authUser?.userAuth?._id);
    const [orders, setAllOrders] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            setIsLoading(true);
            const response = await Api.getUserAllOrders(user_id);
            if (response?.data?.orders) {
                setIsLoading(false);
                setAllOrders(response?.data?.orders);
            } else {
                notify("error", "Internal server error");
                setIsLoading(false);
            }
        };
        fetchOrder();
    }, [user_id]);

    return (
        <>
            <ToastContainer
                position="top-right"
                theme="dark"
                autoClose={1500}
            />
            <div className="relative overflow-x-auto intro-x shadow-xl">
                {isLoading ? (
                    <div className="flex justify-center items-center">
                        <Loader width="w-16" height="h-16" />
                    </div>
                ) : (
                    <>
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
                                                                        className="flex justify-between items-center"
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
                                                                                    prod?.quantity + 200}{" "}
                                                                                PKR
                                                                            </p>
                                                                            <p>
                                                                                Quantity
                                                                                :{" "}
                                                                                {
                                                                                    prod?.quantity
                                                                                }
                                                                            </p>
                                                                            {
                                                                                prod
                                                                                ?.product
                                                                                ?.size && 
                                                                            <p>
                                                                                Size
                                                                                :{" "}
                                                                                {
                                                                                    prod
                                                                                        ?.product
                                                                                        ?.size
                                                                                }
                                                                            </p>
                                                                            }
                                                                            <p>
                                                                                Status
                                                                                :{" "}
                                                                                {
                                                                                    order?.status
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                        <div className="w-28 h-28">
                                                                            <img src={prod.product?.productPic} alt="product" className="w-full h-full object-contain" />
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        Delivery charges are include in price.
                                                                    </li>
                                                                    <hr className="h-px my-8 bg-gray-400 border-0" />
                                                                </>
                                                            );
                                                        }
                                                    )}
                                                </ul>
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
                    </>
                )}
            </div>
        </>
    );
};

export default UserOrders;
