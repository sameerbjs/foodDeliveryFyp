import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addToCartProduct, removeToCartProduct} from "../../redux/CartSlice.js";
import {ToastContainer} from "react-toastify";
import {Helmet} from "react-helmet";
import Api from "../../services/api.js";
import Loader from "../../components/loader/Loader.jsx";
import notify from "../../helper/notify.js";

const ProductDetail = () => {
    const [productDetail, setProductDetail] = React.useState();
    const [isLoading, setIsloading] = useState(false);

    const dispatch = useDispatch();
    const cur_user = useSelector((store) => store.authUser?.userAuth);
    const cartProducts = useSelector((store) => store.cart.cartProducts);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsloading(true);
        const getProduct = async () => {
            const response = await Api.getSpecificProduct(id);
            setProductDetail(response?.data);
            setIsloading(false);
        };
        getProduct();
    }, [id]);

    const handleAddCart = (product) => {
        if (cur_user.address !== product.resturant.city) {
            const errorMessage = `Invalid restaurant location.\nPlease choose products from ${cur_user.address}.`;
            notify("error", errorMessage);
            return;
        }
        dispatch(
            addToCartProduct({
                product: product,
                restCity: product.resturant.city,
            })
        );
    };
    const handleRemoveCart = (id) => {
        dispatch(removeToCartProduct({id: id}));
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
            <Helmet>
                <title>Rapid Cravings - Detail</title>
            </Helmet>
            <ToastContainer
                position="top-right"
                theme="dark"
                autoClose={1500}
            />
            <section className="text-gray-600 overflow-hidden">
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
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <div className="lg:w-1/2 w-full lg:h-auto h-64">
                            <img
                                src={`${productDetail?.productPic}`}
                                className=" object-contain h-full w-full object-center rounded"
                                alt={productDetail?.title}
                            />
                        </div>
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <span className="text-sm text-gray-500 tracking-widest">
                                Product Name
                            </span>
                            <h1 className="text-[#212245] text-3xl  font-medium mb-1">
                                {productDetail?.title}
                            </h1>

                            <p className="leading-relaxed break-all items-center border-b-2 border-gray-100 pb-5">
                                {productDetail?.description}.
                            </p>
                            {productDetail?.size && (
                                <p className="leading-relaxed items-center pt-2 pb-3">
                                    Size : {productDetail?.size}
                                </p>
                            )}
                            <div className="flex justify-between items-center pt-4">
                                <span className=" font-medium text-2xl text-gray-900">
                                    {productDetail?.price} pkr
                                </span>
                                <div className="flex items-center">
                                    {cartProducts?.length &&
                                    cartProducts.some(
                                        (el) => el._id === productDetail?._id
                                    ) ? (
                                        <>
                                            <h1 className="text-[#212245]">
                                                Remove from cart
                                            </h1>
                                            <button
                                                onClick={() =>
                                                    handleRemoveCart(
                                                        productDetail?._id
                                                    )
                                                }
                                                className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="#df2020"
                                                    className="w-5 h-5"
                                                >
                                                    <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                                </svg>
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <h1 className="text-[#212245]">
                                                Add to cart
                                            </h1>
                                            <button
                                                onClick={() =>
                                                    handleAddCart(productDetail)
                                                }
                                                className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="w-5 h-5"
                                                >
                                                    <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                                </svg>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductDetail;
