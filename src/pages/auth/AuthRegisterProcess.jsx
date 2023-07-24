import React from 'react'
import { Tab } from '@headlessui/react'
import Register from './userAuth/Register'
import ResturantRegister from './resturantAuth/ResturantRegister'
import { useSelector, useDispatch } from 'react-redux'
import { RegisterSelectedTabHandle } from '../../redux/SelectedTabSlice'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const AuthRegisterProcess = () => {

    const selectedTab = useSelector(store => store.tab.RegisterSelectedTab);
    const dispatch = useDispatch();
    const location = useLocation();
    const tabState = location.state?.tab;

    React.useEffect(() => {
        window.history.scrollRestoration = 'manual';
        window.scrollTo(0, 0);
        if (tabState !== null) {
            dispatch(RegisterSelectedTabHandle({ tab: tabState }))
        }
    }, [dispatch, tabState]);

    return (
        <>
            <Helmet>
                <title>Rapid Cravings - Register</title>
            </Helmet>
            <div className="container px-5 py-7 mx-auto overflow-hidden">
                <Tab.Group selectedIndex={selectedTab} onChange={(index) => { dispatch(RegisterSelectedTabHandle({ tab: index })) }}>
                    <Tab.List className={'flex justify-center gap-4 items-center flex-wrap p-1'}>
                        <Tab>
                            {({ selected }) => (
                                <span className={!selected ? 'px-4 py-2 text-black bg-red-500/50 rounded-lg' : 'bg-red-500 px-4 py-2 text-white rounded-lg'}>
                                    Register as user
                                </span>

                            )}
                        </Tab>
                        <Tab>
                            {({ selected }) => (

                                <span className={!selected ? 'px-4 py-2 text-black bg-red-500/50 rounded-lg' : 'bg-red-500 px-4 py-2 text-white rounded-lg'}>
                                    Register as resturant manager
                                </span>
                            )}

                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <Register />
                        </Tab.Panel>
                        <Tab.Panel>
                            <ResturantRegister />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </>
    )
}

export default AuthRegisterProcess