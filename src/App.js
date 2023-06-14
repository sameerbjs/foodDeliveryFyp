import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { PageNotFound, Footer, Header } from "./pages";
import { HeaderRest } from "./resturantPages";
import { ResturantsRoutes, UserRoutes } from "./Router";
import Api from "./services/api";
import { useSelector } from "react-redux";

function App() {
    const isUser = useSelector((store) => store.authUser.isUser);

    const restToken = useSelector((store) => store.authUser.restToken);
    const userToken = useSelector((store) => store.authUser.userToken);
    
    useEffect(() => {
        window.history.scrollRestoration = "manual";
        window.scrollTo(0, 0);
    }, []);

    if (restToken) {
        Api.setResturantToken(restToken);
    }
    if (userToken) {
        Api.setUserToken(userToken);
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

export default App;
