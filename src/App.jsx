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
export const currency = "Ksh.";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Toaster
        toastOptions={{
          className:
            "font-imprima bg-gray-100 shadow-md rounded-md border border-gray-300", // General toast styling
          loading: {
            style: {
              background: "#3B82F6", // A soft blue for loading toasts
              color: "#ffffff",
              borderRadius: "8px",
              padding: "12px",
              border: "1px solid #3B82F6",
            },
            iconTheme: {
              primary: "#ffffff",
              secondary: "#3B82F6",
            },
          },
          success: {
            style: {
              background: "#10B981", // A green for success toasts
              color: "#ffffff",
              borderRadius: "8px",
              padding: "12px",
              border: "1px solid #10B981",
            },
            iconTheme: {
              primary: "#ffffff",
              secondary: "#10B981",
            },
          },
          error: {
            style: {
              background: "#EF4444", // A red for error toasts
              color: "#ffffff",
              borderRadius: "8px",
              padding: "12px",
              border: "1px solid #EF4444",
            },
            iconTheme: {
              primary: "#ffffff",
              secondary: "#EF4444",
            },
          },
        }}
      />

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
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
