import React from "react";
import { Routes, Route } from "react-router-dom";
import Header  from "./components/Header/Header";
import { HomePage } from "./pages/Home/Home";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
