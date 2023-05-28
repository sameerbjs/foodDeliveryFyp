import React, {useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import {
    Profile,
    Aboutus,
    CheckOut,
    Resturants,
    PageNotFound,
    AuthLoginProcess,
    AuthRegisterProcess,
    ResturantLogin,
    ResturantRegister,
    Footer,
    Cart,
    ProductDetail,
    ProductRest,
    ContactUs,
    Login,
    Register,
    HomePage,
    Header,
} from "./pages";
import {useSelector} from "react-redux";
import {
    HeaderRest,
    RestHome,
    AllProducts,
    ProductView,
    AddProduct,
    EditProduct,
} from "./resturantPages";

function App() {
    const isUser = useSelector((store) => store.authUser.isUser);
    useEffect(() => {
        window.history.scrollRestoration = "manual";
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            {isUser ? (
                <div className="relative min-h-screen flex flex-col">
                    <Header />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<HomePage />} />

                            {/* authentication */}
                            <Route
                                path="/auth-register"
                                element={<AuthRegisterProcess />}
                            />
                            <Route
                                path="/auth-login"
                                element={<AuthLoginProcess />}
                            />

                            {/* register and login for user routes */}
                            <Route
                                path="/user-register"
                                element={<Register />}
                            />
                            <Route path="/user-login" element={<Login />} />

                            {/* register and login for resturants */}
                            <Route
                                path="/resturant-register"
                                element={<ResturantRegister />}
                            />
                            <Route
                                path="/resturant-login"
                                element={<ResturantLogin />}
                            />

                            {/*user profile */}
                            <Route path="/profile" element={<Profile />} />

                            {/* contact us */}
                            <Route path="/contact" element={<ContactUs />} />

                            {/* resturants */}
                            <Route
                                path="/resturants/:city"
                                element={<Resturants />}
                            />

                            {/* products of res */}
                            <Route
                                path="/products/:name"
                                element={<ProductRest />}
                            />
                            <Route
                                path="/product/:id"
                                element={<ProductDetail />}
                            />

                            {/* cart */}
                            <Route path="/cart" element={<Cart />} />

                            {/* Checkout */}
                            <Route path="/checkout" element={<CheckOut />} />

                            {/* About us */}
                            <Route path="/about-us" element={<Aboutus />} />

                            {/* Page not found */}
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
                                <Route path="/" element={<RestHome />} />
                                <Route
                                    path="/products"
                                    element={<AllProducts />}
                                />
                                <Route
                                    path="/pro-view/:id"
                                    element={<ProductView />}
                                />
                                <Route
                                    path="/add-pro"
                                    element={<AddProduct />}
                                />
                                <Route
                                    path="/edit-pro/:id"
                                    element={<EditProduct />}
                                />

                                {/* Page not found */}
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
