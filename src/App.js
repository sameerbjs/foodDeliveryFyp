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

function App() {
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="min-h-screen relative">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* register and login for user routes */}
          <Route path="/user-register" element={<Register />} />
          <Route path="/user-login" element={<Login />} />

          {/* contact us */}
          <Route path="/contact" element={<ContactUs />} />

          {/* products of res */}
          <Route path="/products" element={<ProductRest />} />
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* cart */}
          <Route path="/cart" element={<Cart />} />

          {/* register and login for resturants */}
          <Route path="/resturant-register" element={<ResturantRegister />} />
          <Route path="/resturant-login" element={<ResturantLogin />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
