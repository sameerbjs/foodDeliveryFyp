import {Dialog, Transition} from "@headlessui/react";
import React, {Fragment, useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Api from "../../services/api";
import {handleDeleteProductOrderPlace} from "../../redux/CartSlice";
import Loader from "../../components/loader/Loader";
import {notify} from "../../helper";
import {ToastContainer} from "react-toastify";

const CheckOut = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const totalPriceProducts = useSelector((store) => store.cart.totalPrice);
    const cur_user = useSelector((store) => store.authUser?.userAuth);
    const cartProducts = useSelector((store) => store.cart.cartProducts);
    const [isOpen, setIsOpen] = useState(false);
    const [deliveryCharges, setDeliveryCharges] = useState(200);
    console.log('cartProducts :>> ', cartProducts);
    const [isLoading, setIsLoading] = useState(false);
    const [orderDetail, setOrderDetail] = useState({
        name: "",
        email: "",
        city: "",
        streethouse: "",
        phone: "",
    });

    useEffect(() => {
        window.history.scrollRestoration = "manual";
        window.scrollTo(0, 0);
        setDeliveryCharges(200);
    }, []);

    useEffect(() => {
        setOrderDetail({
            name: cur_user.name,
            email: cur_user.email,
            city: cur_user.address,
            streethouse : "",
            phone : ""
        });
    }, [cur_user]);

    const handleChangeText = (event) => {
        setOrderDetail({
            ...orderDetail,
            [event.target.name]: event.target.value,
        });
    };

    const handlePlaceOrder = async () => {
        if (
            !orderDetail.city ||
            !orderDetail.streethouse ||
            !orderDetail.phone
        ) {
            return notify("error", "Please fill all the fields");
        }
        setIsLoading(true);
        const data = {
            products: cartProducts?.map((item) => ({
                productId: item?._id,
                quantity: item.quantity,
                totalPrice: item.price,
                size: item?.size,
            })),
            city: orderDetail.city,
            price: totalPriceProducts,
            phone: orderDetail.phone,
            address: orderDetail.streethouse,
            userId: cur_user?._id,
        };
        const response = await Api.placeOrder(data);
        let itemToDelete = [];
        for (let index = 0; index < data.products?.length; index++) {
            itemToDelete.push(data.products[index].productId);
        }
        if (response?.data?.success) {
            dispatch(
                handleDeleteProductOrderPlace({itemToDelete: itemToDelete})
            );
            setIsOpen(false);
            navigate(`/profile/${cur_user._id}`, {
                state: {tab: 1, order: true},
            });
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    };
    return (
        <>
            <Helmet>
                <title>Rapid Cravings - Checkout</title>
            </Helmet>
            <ToastContainer
                position="top-right"
                theme="dark"
                autoClose={1500}
            />
            <div className="container px-5 py-7 mx-auto">
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
                <div className="overflow-hidden">
                    <div className="flex justify-between items-center whitespace-nowrap flex-wrap">
                        <h1 className="font-semibold text-[#212245] lg:text-3xl md:text-2xl text-xl">
                            Products Checkout
                        </h1>
                    </div>

                    <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 mt-4 gap-5">
                        <div className="relative">
                            <label
                                htmlFor="name"
                                className="leading-7 text-[15px] font-semibold text-[#212245]"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={orderDetail.name}
                                onChange={handleChangeText}
                                name="name"
                                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <div className="relative">
                            <label
                                htmlFor="email"
                                className="leading-7 text-[15px] font-semibold text-[#212245]"
                            >
                                Email
                            </label>
                            <input
                                type="text"
                                id="email"
                                value={orderDetail.email}
                                onChange={handleChangeText}
                                name="email"
                                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <div className="relative">
                            <label
                                htmlFor="city"
                                className="leading-7 text-[15px] font-semibold text-[#212245]"
                            >
                                City
                            </label>
                            <input
                                type="text"
                                value={orderDetail.city}
                                onChange={handleChangeText}
                                id="city"
                                disabled
                                name="city"
                                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <div className="relative">
                            <label
                                htmlFor="streethouse"
                                className="leading-7 text-[15px] font-semibold text-[#212245]"
                            >
                                Area & Street & House No
                            </label>
                            <input
                                type="text"
                                id="streethouse"
                                onChange={handleChangeText}
                                value={orderDetail.streethouse}
                                name="streethouse"
                                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <div className="relative">
                            <label
                                htmlFor="number"
                                className="leading-7 text-[15px] font-semibold text-[#212245]"
                            >
                                Phone No
                            </label>
                            <input
                                type="text"
                                id="number"
                                value={orderDetail.phone}
                                onChange={handleChangeText}
                                name="phone"
                                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                    </div>
                    <div className="max-w-max ml-auto space-y-2 mt-5 rounded-lg text-left">
                        <h1 className="font-semibold text-[#212245]">
                            Total items : {cartProducts?.length}
                        </h1>
                        <h1 className="font-semibold text-[#212245]">
                            Payment : Cash on Delivery
                        </h1>
                        <h1 className="font-semibold text-[#212245]">
                            Delivery charges : {deliveryCharges}
                        </h1>
                        <h1 className="font-semibold text-[#212245]">
                            Total Price : {totalPriceProducts + deliveryCharges}{" "}
                            {""}
                        </h1>
                        <button
                            onClick={() => setIsOpen(true)}
                            className="relative bg-red-500 hover:bg-[#212245] text-white font-medium flex justify-center py-2.5 px-4 border border-transparent rounded-lg focus:outline-none "
                        >
                            Place Order
                        </button>
                    </div>
                </div>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={setIsOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="p"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Order Confirmation
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-800">
                                                Are you sure to place this order
                                                ?
                                            </p>
                                        </div>

                                        <div className="mt-4 flex gap-3">
                                            <button
                                                onClick={() => setIsOpen(false)}
                                                type="button"
                                                className="mr-2 rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handlePlaceOrder}
                                                type="button"
                                                className="rounded-md px-5 border border-transparent bg-red-100 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            >
                                                {isLoading ? (
                                                    <Loader
                                                        width="w-8"
                                                        height="h-8"
                                                    />
                                                ) : (
                                                    "Confirm"
                                                )}
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </>
    );
};

export default CheckOut;
