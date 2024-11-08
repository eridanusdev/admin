import React from "react";
import { assets } from "../assets/assets";

export default function Navbar({ setToken }) {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img src={assets.logo} alt="logo" className="w-[max(10%,80px)]" />
      <button
        className="bg-gray-600 text-white px-5 sm:px-7 sm:py-2 rounded-full font-muktaVaani"
        onClick={() => setToken("")}
      >
        Logout
      </button>
    </div>
  );
}
