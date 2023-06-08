import React, {useEffect, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
import Api from "../../services/api";
import Loader from "../loader/Loader";

const EmailVerification = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    useEffect(() => {
        setLoading(true);
        const verifyEmail = async () => {
            // Send a GET request to the backend to verify the email
            const response = await Api.emailVerificationRest(token);
            if (response?.data?.message) {
                setLoading(false);
                setMessage(response?.data?.message);
            } else {
                setLoading(false);
                setError(true);
                setMessage(response?.data?.error);
            }
        };

        verifyEmail();
    }, [token]);

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <Loader width="w-16" height="h-16" />
            </div>
        );
    }

    if(error){
        return (
            <>
                <div className="flex justify-center items-center h-[calc(100vh-200px)] flex-col gap-5">
                    <h1 className="text-xl font-semibold">{message}</h1>
                    <div>
                        <Link to={"/auth-register"} className="rounded-xl bg-gray-200 hover:bg-gray-300 px-4 py-2 inline-flex gap-1 items-center justify-center text-gray-700">
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
                            Go Back
                        </Link>
                    </div>
                </div>
            </>
        );
    }else{
        return (
            <>
                <div className="flex justify-center items-center h-[calc(100vh-200px)] flex-col gap-5">
                    <h1 className="text-xl font-semibold">{message}</h1>
                    <div>
                        <Link to={"/auth-login"} className="relative intro-x bg-red-500 hover:bg-[#212245] text-white font-medium tracking-widest flex justify-center py-2.5 px-4 border border-transparent rounded-lg focus:outline-none ">
                            Login
                        </Link>
                    </div>
                </div>
            </>
        );
    }

};

export default EmailVerification;
