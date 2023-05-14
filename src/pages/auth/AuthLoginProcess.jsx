import React from 'react'
import { Tab } from '@headlessui/react'
import Login from './userAuth/Login'
import ResturantLogin from './resturantAuth/ResturantLogin'

const AuthLoginProcess = () => {
    React.useEffect(() => {
        window.history.scrollRestoration = 'manual';
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="container px-5 py-7 mx-auto overflow-hidden">
            <Tab.Group>
                <Tab.List className={'flex justify-center gap-4 items-center flex-wrap p-1'}>
                <Tab>
                        {({ selected }) => (
                            <button className={!selected ? 'px-4 py-2 text-black bg-red-500/50 rounded-lg' : 'bg-red-500 px-4 py-2 text-white rounded-lg'}>
                                Login as user
                            </button>

                        )}
                    </Tab>
                    <Tab>
                        {({ selected }) => (

                            <button className={!selected ? 'px-4 py-2 text-black bg-red-500/50 rounded-lg' : 'bg-red-500 px-4 py-2 text-white rounded-lg'}>
                                Login as resturant manager
                            </button>
                        )}

                    </Tab>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        <Login />
                    </Tab.Panel>
                    <Tab.Panel>
                        <ResturantLogin />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

export default AuthLoginProcess