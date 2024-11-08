import axios from "axios";
import React from "react";
import { backendUrl } from "../App";
import toast from "react-hot-toast";

export default function Login({ setToken }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        toast.success(response.data.message, {
          id: "success",
        });
      } else {
        toast.error(response.data.message, {
          id: "error",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        id: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="font-muktaVaani text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="font-yantramanav text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="font-imprima rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="font-yantramanav text-sm font-medium text-gray-700 mb-2">
              Password
            </p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="font-imprima rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          <button className="font-yantramanav mt-2 w-full py-2 px-4 rounded-md text-white bg-black">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
