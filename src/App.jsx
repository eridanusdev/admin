import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import Orders from "./pages/Orders";
import List from "./pages/List";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Toaster />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px) my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" component={<Add />} />
                <Route path="/list" component={<List />} />
                <Route path="/orders" component={<Orders />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
