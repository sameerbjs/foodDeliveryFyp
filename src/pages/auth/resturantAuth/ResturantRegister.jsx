import { Fragment, React, useState } from "react";
import { ToastContainer } from "react-toastify";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { notify } from "../../../helper";
import Api from "../../../services/api";
import Loader from "../../../components/loader/Loader";
import cities from "../../../assets/data/Cities";
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const ResturantRegister = () => {
  const [info, setinfo] = useState({
    username: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    c_password: "",
  });
  const [pswdType, setPswdType] = useState(true);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState(cities[0]);

  const showEyePswd = () => {
    setPswdType(!pswdType);
  };

  const handleChangeText = (event) => {
    setinfo({
      ...info,
      [event.target.name]: event.target.value,
    });
  };

  const handleRegister = async () => {
    if (!info.username || !info.email || !info.password || !info.address || !info.phone) {
      notify("error", "Please fill all the fields");
      return;
    }
    if (info.email) {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(info.email)) {
        notify("error", "Please enter valid email address");
        return;
      }
    }
    if (info.password !== info.c_password) {
      notify(
        "error",
        "Password dose not match with confirm password"
      );
      return;
    }
    if (info.password.length < 8) {
      notify(
        "error",
        "Password must be 8 characters"
      );
      return;
    }
    setIsLoading(true)
    const formData = new FormData();
    formData.append('name', info.username);
    formData.append('email', info.email);
    formData.append('password', info.password);
    formData.append('city', selectedCity?.name);
    formData.append('address', info.address);
    formData.append('phone', info.phone);
    formData.append('profilePic', file);
    formData.append('isUser', false);

    const response = await Api.resturantRegister(formData);
    if (response?.data?.message) {
      setIsLoading(false)
      notify('success', `${response?.data?.message}`)
      setinfo({
        username: "",
        email: "",
        address: "",
        phone: "",
        password: "",
        c_password: "",
      })
      setImageUrl(null);
      setSelectedCity(cities[0])
      setFile(null);
    } else {
      setIsLoading(false)
      notify('error', response?.data?.error)
    }
  };

  const onUploadImages = (event) => {
    const fileType = event.target.files[0].type;
    if (fileType === "image/png" || fileType === "image/jpg" || fileType === "image/jpeg") {
      setFile(event.target.files[0]);
      setImageUrl(URL.createObjectURL(event.target.files[0]));
    } else {
      setFile(null);
      setImageUrl(null);
      event.target.files = null;
      notify("error", "File Format is not valid");
    }
  };
  return (
    <>
      <div className="min-h-full container px-4 sm:px-6 lg:px-8 lg:mt-0 mt-10 flex items-start justify-start lg:justify-center lg:items-center">
        <ToastContainer
          position="top-right"
          theme="dark"
          autoClose={1500}
        />
        <div className="flex items-center flex-grow">
          <div className="md:grid md:grid-cols-2 flex-grow">
            <div className="intro-y mb-5 md:mb-0 flex flex-col justify-center items-center relative">
              <h2 className="text-center lg:text-6xl text-[#212245] text-3xl font-bold italic">
                Resturant Registration
              </h2>
            </div>
            <div className="lg:p-10 md:p-6 p-0 rounded-xl intro-y">
              <div className="space-y-4">
                <div className="intro-x">
                  <label
                    htmlFor="email-address"
                    className="leading-7 text-[15px] font-semibold text-[#212245]"
                  >
                    Resturant Name
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    maxLength={26}
                    value={info.username}
                    onChange={handleChangeText}
                    autoComplete="User Name"
                    required
                    className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="intro-x">
                  <label
                    htmlFor="email-address"
                    className="leading-7 text-[15px] font-semibold text-[#212245]"
                  >
                    Business Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={info.email}
                    onChange={handleChangeText}
                    className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                {/* <div className="intro-x">
                  <label
                    htmlFor="city"
                    className="leading-7 text-[15px] font-semibold text-[#212245]"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="city"
                    required
                    value={info.city}
                    onChange={handleChangeText}
                    className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div> */}
                <div className='intro-x'>
                    <p className="leading-7 text-[15px] font-semibold text-[#212245]">City</p>
                    <Listbox value={selectedCity} onChange={setSelectedCity}>
                        <div className="relative mt-1">
                            <Listbox.Button className="relative w-full cursor-default bg-white rounded-lg border py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-400">
                                <span className="block truncate">{selectedCity.name}</span>
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
                                <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto scrollbar-hide rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {cities.map((city, index) => (
                                        <Listbox.Option
                                            key={index}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-[#fde4e4] text-red-500' : 'text-gray-900'
                                                }`
                                            }
                                            value={city}
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                            }`}
                                                    >
                                                        {city.name}
                                                    </span>
                                                    {selected ? (
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-500">
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
                <div className="intro-x">
                  <label
                    htmlFor="address"
                    className="leading-7 text-[15px] font-semibold text-[#212245]"
                  >
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    autoComplete="address"
                    required
                    value={info.address}
                    onChange={handleChangeText}
                    className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="intro-x">
                  <label
                    htmlFor="phone"
                    className="leading-7 text-[15px] font-semibold text-[#212245]"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    autoComplete="phone"
                    required
                    value={info.phone}
                    onChange={handleChangeText}
                    className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="intro-x">
                  <label
                    htmlFor="password"
                    className="leading-7 text-[15px] font-semibold text-[#212245]"
                  >
                    Password
                  </label>
                  <div className="flex items-center relative">
                    <input
                      id="password"
                      name="password"
                      value={info.password}
                      onChange={handleChangeText}
                      type={
                        pswdType ? "password" : "text"
                      }
                      autoComplete="current-password"
                      required
                      maxLength={16}
                      className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                    <div
                      onClick={showEyePswd}
                      className="cursor-pointer h-12 w-12 flex items-center justify-center absolute right-0"
                    >
                      {pswdType ? (
                        <BsEye size={20} />
                      ) : (
                        <BsEyeSlash size={20} />
                      )}
                    </div>
                  </div>
                </div>
                <div className="intro-x">
                  <label
                    htmlFor="confirm_password"
                    className="leading-7 text-[15px] font-semibold text-[#212245]"
                  >
                    Confirm Password
                  </label>
                  <div className="flex items-center relative">
                    <input
                      id="confirm_password"
                      name="c_password"
                      type={
                        pswdType ? "password" : "text"
                      }
                      value={info.c_password}
                      onChange={handleChangeText}
                      autoComplete="current-password"
                      required
                      maxLength={16}
                      className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                    <div
                      onClick={showEyePswd}
                      className="cursor-pointer h-12 w-12 flex items-center justify-center absolute right-0"
                    >
                      {pswdType ? (
                        <BsEye size={20} />
                      ) : (
                        <BsEyeSlash size={20} />
                      )}
                    </div>
                  </div>
                </div>
                <div className="rounded-lg intro-x">
                  <div className="flex items-center">
                    <h2 className="leading-7 text-[15px] font-semibold text-[#212245]">
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
                <div className="intro-x">
                  <span
                    className="leading-7 text-[15px] font-semibold text-[#212245]"
                  >
                    Have a account <Link to={'/auth-login'} state={{ tab: 1 }} className="text-blue-500 hover:underline">Login here</Link>
                  </span>
                </div>
                <button
                  onClick={handleRegister}
                  className="relative intro-x w-full bg-red-500 hover:bg-[#212245] text-white font-medium tracking-widest flex justify-center py-2.5 px-4 border border-transparent rounded-lg focus:outline-none "
                >
                  {
                    isLoading ? <Loader width="w-8" height="h-8" /> : 'Register'
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResturantRegister;
