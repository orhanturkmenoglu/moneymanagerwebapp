import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Filter from "./pages/Filter";
import Category from "./pages/Category";
import Expense from "./pages/Expense";
import Income from "./pages/Income";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";

export default function App() {
  const {token} = useContext(AppContext);
  console.log("Token :",token);
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/category" element={<Category />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/login" element={token ? <Home/>: <Login />} />
          <Route path="/signup" element={token ? <Home/>: <Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
