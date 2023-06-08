import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { PageNotFound, Footer, Header } from "./pages";
import { connect, useSelector } from "react-redux";
import { HeaderRest } from "./resturantPages";
import { ResturantsRoutes, UserRoutes } from "./Router";
import Api from "./services/api";

function App(props) {
    const isUser = useSelector((store) => store.authUser.isUser);
    useEffect(() => {
        window.history.scrollRestoration = "manual";
        window.scrollTo(0, 0);
    }, []);

    const { token } = props;
    if (token) {
        Api.setResturantToken({ token });
    }

    return (
        <>
            {isUser ? (
                <div className="relative min-h-screen flex flex-col">
                    <Header />
                    <main className="flex-grow">
                        <Routes>
                            {UserRoutes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={route.component}
                                />
                            ))}
                            <Route path="*" element={<PageNotFound />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            ) : (
                <>
                    <div className="relative min-h-screen flex flex-col">
                        <HeaderRest />
                        <main className="flex-grow">
                            <Routes>
                                {ResturantsRoutes.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={route.component}
                                    />
                                ))}
                                <Route path="*" element={<PageNotFound />} />
                            </Routes>
                        </main>
                    </div>
                </>
            )}
        </>
    );
}

const mapStateToProps = (store) => {
    return {
        token: store.authUser?.resturantAuth?.token,
    };
};

export default connect(mapStateToProps, null)(App);
