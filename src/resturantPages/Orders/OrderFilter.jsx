import React, {Fragment} from "react";
import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid";

const OrderFilter = ({
    filters,
    setFilters,
    orderFilterSearch,
    fetchOrdersAgain,
}) => {
    const handleChangeFilter = (data) => {
        setFilters(data?.name);
        if (data?.name === "All") {
            fetchOrdersAgain();
        } else {
            fetchOrdersAgain(data?.name);
        }
    };
    return (
        <div className="intro-x">
            <Listbox value={filters} onChange={handleChangeFilter}>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default bg-white rounded-lg border-2 py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-400">
                        <span className="block truncate">{filters}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 scrollbar-hide text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {orderFilterSearch.map((order, index) => (
                                <Listbox.Option
                                    key={index}
                                    className={({active}) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active
                                                ? "bg-[#fde4e4] text-red-500"
                                                : "text-gray-900"
                                        }`
                                    }
                                    value={order}
                                >
                                    {({selected}) => (
                                        <>
                                            <span
                                                className={`block truncate ${
                                                    selected
                                                        ? "font-medium"
                                                        : "font-normal"
                                                }`}
                                            >
                                                {order.name}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-500">
                                                    <CheckIcon
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
};

export default OrderFilter;
