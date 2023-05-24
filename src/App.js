import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import { HomePage } from "./pages/Home/Home";
import Register from "./pages/auth/userAuth/Register";
import Login from "./pages/auth/userAuth/Login";
import ContactUs from "./pages/contact/ContactUs";
import { ProductRest } from "./pages/products/Products";
import ProductDetail from "./pages/products/ProductDetail";
import Cart from "./pages/Cart/Cart";
import Footer from "./components/Footer/Footer";
import ResturantRegister from "./pages/auth/resturantAuth/ResturantRegister";
import ResturantLogin from "./pages/auth/resturantAuth/ResturantLogin";
import AuthRegisterProcess from "./pages/auth/AuthRegisterProcess";
import AuthLoginProcess from "./pages/auth/AuthLoginProcess";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Resturants from "./pages/Resturants/Resturants";
import CheckOut from "./pages/Checkout/CheckOut";
import Aboutus from "./pages/Aboutus/Aboutus";
import Profile from "./pages/UserProfile/Profile";

function App() {
	useEffect(() => {
		window.history.scrollRestoration = 'manual';
		window.scrollTo(0, 0);
	}, []);
	return (
		<>
			<div className="relative min-h-screen flex flex-col">
				<Header />
				<main className="flex-grow">
					<Routes>
						<Route path="/" element={<HomePage />} />

						{/* authentication */}
						<Route path="/auth-register" element={<AuthRegisterProcess />} />
						<Route path="/auth-login" element={<AuthLoginProcess />} />

						{/* register and login for user routes */}
						<Route path="/user-register" element={<Register />} />
						<Route path="/user-login" element={<Login />} />

						{/* register and login for resturants */}
						<Route path="/resturant-register" element={<ResturantRegister />} />
						<Route path="/resturant-login" element={<ResturantLogin />} />

						{/*user profile */}
						<Route path="/profile" element={<Profile />} />


						{/* contact us */}
						<Route path="/contact" element={<ContactUs />} />

						{/* resturants */}
						<Route path="/resturants/:city" element={<Resturants />} />

						{/* products of res */}
						<Route path="/products/:name" element={<ProductRest />} />
						<Route path="/product/:id" element={<ProductDetail />} />

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
		</>
	);
}

export default App;
