import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {XMarkIcon} from "@heroicons/react/20/solid";
import {
    decreaseQuantity,
    removeToCartProduct,
    increaseQuantity,
    handleTotalPrice,
} from "../../redux/CartSlice";
import {ToastContainer} from "react-toastify";
import {Helmet} from "react-helmet";

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartProducts = useSelector((store) => store.cart.cartProducts);

    useEffect(() => {
        window.history.scrollRestoration = "manual";
        window.scrollTo(0, 0);
    }, []);

    const handleRemoveCart = (proId) => {
        dispatch(removeToCartProduct({id: proId}));
    };
    const increaseQuantityHandle = (id) => {
        dispatch(increaseQuantity({id: id}));
    };
    const decreaseQuantityHandle = (id) => {
        dispatch(decreaseQuantity({id: id}));
    };
    const handleCartTotalPrice = (price) => {
        dispatch(handleTotalPrice({price: price}));
        navigate("/checkout");
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                theme="dark"
                autoClose={1000}
            />
            <Helmet>
                <title>Rapid Cravings - Cart</title>
            </Helmet>
            <React.Fragment>
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

                    <div className="mt-7 overflow-hidden">
                        <div className="grid grid-cols-12 gap-5">
                            <div
                                className={`${
                                    cartProducts.length !== 0
                                        ? "lg:col-span-9 col-span-12"
                                        : "col-span-12"
                                } w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 p-3`}
                            >
                                {cartProducts?.length ? (
                                    cartProducts.map((cart, index) => {
                                        return (
                                            <div key={index}>
                                                <div className="p-4 w-full relative border">
                                                    <Link className="block h-48 rounded overflow-hidden">
                                                        <img
                                                            alt="ecommerce"
                                                            className="object-contain h-full w-full"
                                                            src={`${cart?.productPic}`}
                                                        />
                                                    </Link>
                                                    <div className="mt-4">
                                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                                                            Name
                                                        </h3>
                                                        <h2 className="text-gray-900 title-font text-lg font-medium truncate">
                                                            {cart.title}
                                                        </h2>
                                                        <p className="mt-1">
                                                            {cart.price *
                                                                cart.quantity}{" "}
                                                            PKR
                                                        </p>
                                                        <p className="mt-1">
                                                            Size : {cart.size}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <p>Quantity</p>
                                                        <button
                                                            onClick={() =>
                                                                decreaseQuantityHandle(
                                                                    cart._id
                                                                )
                                                            }
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            type="text"
                                                            value={
                                                                cart.quantity
                                                            }
                                                            disabled
                                                            className="w-20 ml-2 bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                        />
                                                        <button
                                                            onClick={() =>
                                                                increaseQuantityHandle(
                                                                    cart._id
                                                                )
                                                            }
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            handleRemoveCart(
                                                                cart?._id
                                                            )
                                                        }
                                                        className="absolute -right-[10px] -top-[11px] bg-[#df2020] rounded-2xl"
                                                    >
                                                        <XMarkIcon className="w-5 h-5 text-white" />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <>
                                        <div className="col-span-3 h-[calc(100vh-240px)] flex justify-center items-center">
                                            <h1 className="lg:text-2xl md:text-xl text-lg">
                                                No products found in the cart 🛒
                                            </h1>
                                        </div>
                                    </>
                                )}
                            </div>
                            {cartProducts.length !== 0 && (
                                <div className="lg:col-span-3 md:col-span-6 col-span-12 border shadow-lg h-max p-4 rounded-lg lg:order-none order-first">
                                    <div className="font-semibold text-[#212245]">
                                        Total items : {cartProducts?.length}
                                        <br />
                                        Total items price :{" "}
                                        {cartProducts.reduce(
                                            (total, item) =>
                                                total +
                                                item.price * item.quantity,
                                            0
                                        )}{" "}
                                        PKR
                                    </div>
                                    <div className="mt-3">
                                        <button
                                            onClick={() =>
                                                handleCartTotalPrice(
                                                    cartProducts.reduce(
                                                        (total, item) =>
                                                            total +
                                                            item.price *
                                                                item.quantity,
                                                        0
                                                    )
                                                )
                                            }
                                            className="relative intro-x w-full bg-red-500 hover:bg-[#212245] text-white font-medium flex justify-center py-2.5 px-4 border border-transparent rounded-lg focus:outline-none "
                                        >
                                            Checkout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        </>
    );
};

export default Cart;
