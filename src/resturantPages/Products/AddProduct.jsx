import React, {Fragment, useState} from "react";
import {notify} from "../../helper";
import {Listbox, Transition} from "@headlessui/react";
import FoodCategory from "../../assets/data/FoodCategory";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Api from "../../services/api";
import {ToastContainer} from "react-toastify";
import Loader from "../../components/loader/Loader";

const AddProduct = () => {
    const rest_id = useSelector((store) => store.authUser?.resturantAuth?._id);
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [selectedFood, setSelectedFood] = useState(FoodCategory[0]);
    const navigate = useNavigate();
    const [dataInp, setDataInp] = useState({
        title: "",
        description: "",
        price: "",
        size: "Small",
    });

    const handleChange = (event) => {
        setDataInp({
            ...dataInp,
            [event.target.name]: event.target.value,
        });
    };

    const onUploadImages = (event) => {
        const fileType = event.target.files[0].type;
        if (
            fileType === "image/png" ||
            fileType === "image/jpg" ||
            fileType === "image/jpeg"
        ) {
            setFile(event.target.files[0]);
            setImageUrl(URL.createObjectURL(event.target.files[0]));
        } else {
            setFile(null);
            setImageUrl(null);
            event.target.files = null;
            notify("error", "File Format is not valid");
        }
    };

    const handleAddProduct = async () => {
        setIsLoading(true);
        const {title, description, price, size} = dataInp;

        const productData = new FormData();
        productData.append("rest_id", rest_id);
        productData.append("title", title);
        productData.append("description", description);
        productData.append("size", size);
        productData.append("price", price);
        productData.append("category", selectedFood?.name);
        productData.append("productPic", file);

        const response = await Api.addProduct(productData);
        if (response?.data?.message) {
            setIsLoading(false);
            notify("success", response.data.message);
            setDataInp({
                title: "",
                description: "",
                price: "",
            });
            setSelectedFood(FoodCategory[0]);
            setImageUrl(null);
            setFile(null);
            navigate("/products");
        } else {
            setIsLoading(false);
            notify("error", response?.data?.error);
        }
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                theme="dark"
                autoClose={1500}
            />
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
                <div className="mb-7 flex justify-center">
                    <h6 className="text-xl font-semibold">
                        Create a new Product
                    </h6>
                </div>
                <div className="mt-5 grid lg:grid-cols-2 grid-cols-1 gap-5">
                    <div className="intro-x space-y-3">
                        <label htmlFor="title" className="font-bold">
                            Title of the product
                        </label>
                        <input
                            id="title"
                            name="title"
                            onChange={handleChange}
                            value={dataInp.title}
                            type="text"
                            className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <div className="intro-x space-y-3">
                        <label htmlFor="size" className="font-bold">
                            Size
                        </label>
                        <select
                            className="appearance-none w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            id="size"
                            name="size"
                            value={dataInp.size}
                            onChange={handleChange}
                        >
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                        </select>
                        <p className="text-sm">
                            Default size of product is medium in case of when
                            size is not selected
                        </p>
                    </div>
                    <div className="intro-x space-y-3">
                        <label htmlFor="price" className="font-bold">
                            Price
                        </label>
                        <input
                            id="price"
                            name="price"
                            onChange={handleChange}
                            value={dataInp.price}
                            type="text"
                            className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <div className="intro-x space-y-3 !z-50">
                        <p className="font-semibold text-[14px] text-[#212245]">
                            Category
                        </p>
                        <Listbox
                            value={selectedFood}
                            onChange={setSelectedFood}
                        >
                            <div className="relative mt-1">
                                <Listbox.Button className="relative w-full cursor-default bg-white rounded-lg border py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-400">
                                    <span className="block truncate">
                                        {selectedFood.name}
                                    </span>
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
                                        {FoodCategory.map((food, index) => (
                                            <Listbox.Option
                                                key={index}
                                                className={({active}) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                        active
                                                            ? "bg-[#fde4e4] text-red-500"
                                                            : "text-gray-900"
                                                    }`
                                                }
                                                value={food}
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
                                                            {food.name}
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
                </div>
                <div className="mt-5">
                    <div className="rounded-lg intro-x">
                        <div className="flex items-center">
                            <h2 className="font-bold text-base mr-auto">
                                Photo
                            </h2>
                        </div>
                        <div className="pb-5 pt-2">
                            <div className="border-2 border-dashed rounded-md pt-4 bg-white">
                                <div className="flex flex-wrap px-4">
                                    <div className="flex items-center">
                                        {file && imageUrl && (
                                            <div className="relative w-24 h-24 rounded-lg shadow-xl mb-5 mr-5">
                                                <img
                                                    src={imageUrl}
                                                    alt="no Data"
                                                    className="rounded-md object-cover max-w-sm max-h-sm h-full w-full"
                                                />
                                                <div
                                                    onClick={() => {
                                                        setFile(null);
                                                        setImageUrl(null);
                                                    }}
                                                    className="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-red-700 right-0 top-0 -mr-2 -mt-2 cursor-pointer"
                                                >
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="feather feather-x w-4 h-4"
                                                    >
                                                        <line
                                                            x1="18"
                                                            y1="6"
                                                            x2="6"
                                                            y2="18"
                                                        ></line>
                                                        <line
                                                            x1="6"
                                                            y1="6"
                                                            x2="18"
                                                            y2="18"
                                                        ></line>
                                                    </svg>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="px-4 pb-4 flex flex-wrap items-center relative text-zinc-500">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-4 h-4 mr-2"
                                    >
                                        <rect
                                            x="3"
                                            y="3"
                                            width="18"
                                            height="18"
                                            rx="2"
                                            ry="2"
                                        ></rect>
                                        <circle
                                            cx="8.5"
                                            cy="8.5"
                                            r="1.5"
                                        ></circle>
                                        <polyline points="21 15 16 10 5 21"></polyline>
                                    </svg>
                                    <span className="fs-14 text-cyan-600 mr-1">
                                        Upload a Photo
                                    </span>
                                    <span className="fs-14">
                                        or drag and drop
                                    </span>
                                    <input
                                        type="file"
                                        name="photo"
                                        onChange={onUploadImages}
                                        className="w-full h-full top-0 left-0 absolute opacity-0"
                                        accept="image/jpeg,image/jpg,image/png,image/gif"
                                        multiple={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="intro-x space-y-3">
                        <label htmlFor="title" className="font-bold">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            onChange={handleChange}
                            value={dataInp.description}
                            rows={6}
                            type="text"
                            className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        ></textarea>
                    </div>
                    <div className="flex justify-end mt-3">
                        <div>
                            <button
                                onClick={handleAddProduct}
                                className="relative intro-x w-full bg-red-500 hover:bg-[#212245] text-white font-medium flex justify-center py-2.5 px-4 border border-transparent rounded-lg focus:outline-none "
                            >
                                {isLoading ? (
                                    <Loader width={"w-8"} height={"h-8"} />
                                ) : (
                                    "Create product"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddProduct;
