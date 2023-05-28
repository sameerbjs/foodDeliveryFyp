import React, { Fragment } from 'react'
import Avatar from '../../assets/images/ava-3.jpg'
import { Popover, Transition } from '@headlessui/react'
import { FiChevronDown } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { handleUserAuth } from '../../redux/AuthSlice';

const HeaderRest = () => {
    const dispatch = useDispatch();
    return (
        <header className="sticky top-0 bg-white border-b border-slate-200 z-30 py-3 flex items-center">
            <div className="px-4 sm:px-6 lg:px-8 ml-auto">
                <Popover className="relative">

                    <Popover.Button
                    >
                        <div className="flex items-center">
                            <img src={Avatar} alt="avatar" width="40" height="40" className="rounded-full object-cover" />
                            <div className="flex items-center truncate">
                                <span className="truncate ml-2 text-sm font-medium text-slate-800 Medium fs-14">Acme Inc</span>
                                <FiChevronDown size={20} className="shrink-0 ml-1 text-slate-400" />
                            </div>
                        </div>

                    </Popover.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className="absolute z-10 px-4 mt-3 transform right-0 sm:px-0">
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className='px-7 py-3'>
                                    <button onClick={() => dispatch(handleUserAuth({ user: true }))} className="font-normal">Logout</button>
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </Popover>
            </div>
        </header>
    )
}

export default HeaderRest;