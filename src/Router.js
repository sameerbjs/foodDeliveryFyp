import {
    Profile,
    Aboutus,
    CheckOut,
    Resturants,
    AuthLoginProcess,
    AuthRegisterProcess,
    ResturantLogin,
    ResturantRegister,
    Cart,
    ProductDetail,
    ProductRest,
    ContactUs,
    Login,
    Register,
    HomePage,
} from "./pages";

import {
    RestHome,
    AllProducts,
    ProductView,
    AddProduct,
    EditProduct,
    Orders,
} from "./resturantPages";

export const UserRoutes = [
    {path: "/", component: <HomePage />},
    {path: "/about-us", component: <Aboutus />},
    {path: "/checkout", component: <CheckOut />},
    {path: "/cart", component: <Cart />},
    {path: "/product/:id", component: <ProductDetail />},
    {path: "/products/:name", component: <ProductRest />},
    {path: "/resturants/:city", component: <Resturants />},
    {path: "/contact", component: <ContactUs />},
    {path: "/profile", component: <Profile />},
    {path: "/resturant-login", component: <ResturantLogin />},
    {path: "/resturant-register", component: <ResturantRegister />},
    {path: "/user-login", component: <Login />},
    {path: "/user-register", component: <Register />},
    {path: "/auth-login", component: <AuthLoginProcess />},
    {path: "/auth-register", component: <AuthRegisterProcess />},
];

export const ResturantsRoutes = [
    {path: "/", component: <RestHome />},
    {path: "/products", component: <AllProducts />},
    {path: "/pro-view/:id", component: <ProductView />},
    {path: "/add-pro", component: <AddProduct />},
    {path: "/edit-pro/:id", component: <EditProduct />},
    {path: "/orders", component: <Orders />},
];
