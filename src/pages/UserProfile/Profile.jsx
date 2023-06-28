import React, {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Tab} from "@headlessui/react";
import EditProfile from "./EditProfile";
import UserOrders from "./UserOrders";
import {Helmet} from "react-helmet";
import {useState} from "react";

const Profile = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const [selected, setSelectedTab] = useState(0);
    useEffect(() => {
        if (state?.order === true) {
            setSelectedTab(state.order);
        } else {
            setSelectedTab(0);
        }
    }, [state]);

    return (
        <>
            <Helmet>
                <title>Rapid Cravings - Profile</title>
            </Helmet>
            <div className="px-5 py-7 mx-auto container">
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
                <Tab.Group
                    selectedIndex={selected}
                    onChange={(index) => {
                        setSelectedTab(index);
                    }}
                >
                    <Tab.List
                        className={
                            "flex gap-4 scrollbar-hide items-center py-5 justify-start overflow-x-auto whitespace-nowrap"
                        }
                    >
                        <Tab>
                            {({selected}) => (
                                <span
                                    className={
                                        !selected
                                            ? "px-4 py-2 text-black bg-red-500/50 rounded-lg"
                                            : "bg-red-500 px-4 py-2 text-white rounded-lg"
                                    }
                                >
                                    User setting
                                </span>
                            )}
                        </Tab>
                        <Tab>
                            {({selected}) => (
                                <span
                                    className={
                                        !selected
                                            ? "px-4 py-2 text-black bg-red-500/50 rounded-lg"
                                            : "bg-red-500 px-4 py-2 text-white rounded-lg"
                                    }
                                >
                                    Orders Detail
                                </span>
                            )}
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <EditProfile navigate={navigate} />
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="overflow-hidden">
                                <UserOrders />
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </>
    );
};

export default Profile;
