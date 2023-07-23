import React from "react";
import {HomeExplore} from "./HomeExplore";
import {Link} from "react-router-dom";
import TypingAnimation from "../../components/TypingEffect/TypingEffect";
import "./Home.css";
import {Helmet} from "react-helmet";
import {useSelector} from "react-redux";

export const HomePage = () => {
    const words = ["Family", "Friends"];
    const isUserLogin = useSelector((store) => store.authUser.isLogin);
    return (
        <>
            <Helmet>
                <title>Rapid Cravings</title>
            </Helmet>
            <div className="mx-auto w-full overflow-hidden">
                <div className="relative h-full">
                    <div className="banner lg:h-[700px] md:h-[500px] h-[400px]">
                        <div className="flex justify-center p-4 bg-black/70 h-full">
                            <div className="h-full flex flex-col justify-center items-center">
                                <h1 className="lg:text-6xl md:text-2xl text-lg font-semibold lg:mb-8 mb-5 text-white">
                                    Enjoy your favorite food with{" "}
                                    <TypingAnimation
                                        words={words}
                                        delay={1000}
                                    />
                                </h1>
                                <h5 className="lg:text-3xl md:text-2xl text-base text-white font-semibold whitespace-nowrap">
                                    Easy order & Delicious food & Fast delivery
                                </h5>
                                {!isUserLogin && (
                                    <div className="lg:mt-10 md:mt-7 mt-5 group flex gap-3 justify-center flex-wrap">
                                        <Link to={"/auth-register"}>
                                            <button className="bg-red-500 flex items-center text-white px-5 lg:py-3 py-2 rounded-lg hover:bg-[#212245] tracking-widest">
                                                Register
                                            </button>
                                        </Link>
                                        <Link to={"/auth-login"}>
                                            <button className="bg-red-500 flex items-center text-white px-5 lg:py-3 py-2 rounded-lg hover:bg-[#212245] tracking-widest">
                                                Login
                                            </button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-5 py-10">
                    <HomeExplore />
                </div>
            </div>
        </>
    );
};
