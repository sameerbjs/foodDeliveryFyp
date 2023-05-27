import React from 'react'
import { Tab } from '@headlessui/react'
import Login from './userAuth/Login'
import ResturantLogin from './resturantAuth/ResturantLogin'
import { useDispatch, useSelector } from 'react-redux'
import { LoginSelectedTabHandle } from '../../redux/SelectedTabSlice'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const AuthLoginProcess = () => {

    const selectedTab = useSelector(store => store.tab.LoginSelectedTab);
    const dispatch = useDispatch();
    const location = useLocation();
    const tabState = location.state?.tab;

    React.useEffect(() => {
        window.history.scrollRestoration = 'manual';
        window.scrollTo(0, 0);

        if (tabState !== null) {
            dispatch(LoginSelectedTabHandle({ tab: tabState }))
        }
    }, [dispatch,tabState]);
    return (
        <>
        <Helmet>
                <title>Rapid Cravings - Login</title>
            </Helmet>
        <div className="container px-5 py-7 mx-auto overflow-hidden">
            <Tab.Group selectedIndex={selectedTab} onChange={(index) => { dispatch(LoginSelectedTabHandle({ tab: index })) }}>
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
        </>
    )
}

export default AuthLoginProcess