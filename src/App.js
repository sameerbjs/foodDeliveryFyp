import React from "react";
import { Routes, Route } from "react-router-dom";
import Header  from "./components/Header/Header";
import { HomePage } from "./pages/Home/Home";
import Register from "./pages/auth/userAuth/Register";
import Login from "./pages/auth/userAuth/Login";
import ContactUs from "./pages/contact/ContactUs";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* register and login for user routes */}
        <Route path="/user-register" element={<Register />} />
        <Route path="/user-login" element={<Login />} />

        {/* contact us */}
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </>
  );
}

export default App;
