import React, {useEffect, useState} from "react";
import {BsFillBoxFill} from "react-icons/bs";
import {RiShoppingCart2Line} from "react-icons/ri";
import Api from "../../services/api";

const RestHome = () => {
    const [totalLength, setTotalLenght] = useState(0);

    useEffect(() => {
        const fetchProductLength = async () => {
            const response = await Api.getProductsLength();
            if (response?.data?.message) {
                setTotalLenght(response?.data?.message);
            } else {
                setTotalLenght(0);
            }
        };
        fetchProductLength();
    }, []);
    return (
        <div>
            <section className="container px-5 py-7 mx-auto overflow-hidden">
                <div className="mx-auto">
                    <div className="flex flex-col mb-10 text-center">
                        <h1 className="sm:text-3xl text-2xl font-medium mb-4 text-gray-900">
                            Welcome to rapid cravings resturant dashboard
                        </h1>
                    </div>
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 text-center">
                        <div className="p-4 bg-white rounded-lg shadow">
                            <div className="px-4 py-6">
                                <RiShoppingCart2Line className="w-12 h-12 mb-3 inline-block" />
                                <h2 className="font-medium text-3xl text-gray-900">
                                    {totalLength}
                                </h2>
                                <p className="leading-relaxed">Products</p>
                            </div>
                        </div>
                        <div className="p-4 bg-white rounded-lg shadow">
                            <div className="px-4 py-6">
                                <BsFillBoxFill className="w-12 h-12 mb-3 inline-block" />
                                <h2 className="font-medium text-3xl text-gray-900">
                                    10
                                </h2>
                                <p className="leading-relaxed">Orders</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RestHome;
