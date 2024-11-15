import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-hot-toast";
import { assets } from "../assets/assets";

export default function Orders({ token }) {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
        // console.log(response.data.orders[0]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        {
          orderId,
          status: e.target.value,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        await fetchAllOrders();
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="">
      <h3 className="font-muktaVaani">Orders Page</h3>
      <div>
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-x-gray-200 rounded-md hover:bg-gray-100 hover:shadow-md p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            key={index}
          >
            <img src={assets.parcel_icon} alt="" className="w-12" />
            <div className="">
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="font-muktaVaani py-0.5" key={index}>
                        {item.name} - {item.quantity}{" "}
                        <span className="">{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="font-muktaVaani py-0.5" key={index}>
                        {item.name} - {item.quantity}{" "}
                        <span className="">{item.size}</span> ,
                      </p>
                    );
                  }
                })}
              </div>
              <p className="font-muktaVaani mt-3 mb-2 font-medium">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div>
                <p className="font-muktaVaani">
                  {order.address.street.replace(".", "") + ","}
                </p>
                <p className="font-muktaVaani">{order.address.city}</p>
              </div>
              <p className="font-muktaVaani">{order.address.phone}</p>
            </div>
            <div>
              <p className="font-muktaVaani text-sm sm:text-[15px]">
                Items: {order.items.length}
              </p>
              <p className="font-muktaVaani mt-3">
                Method: {order.paymentMethod}
              </p>
              <p className="font-muktaVaani">
                Payment: {order.payment ? "Done" : "Pending"}
              </p>
              <p className="font-muktaVaani">
                Date: {new Date(order.date).toLocaleDateString()}
              </p>
            </div>
            <p className="font-yantramanav text-smsm:text-[15px]">
              {currency} {order.amount}
            </p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              className="p-2 font-semibold"
              value={order.status}
            >
              <option value="Order Placed" className="font-imprima">
                Order Placed
              </option>
              <option value="Packing" className="font-imprima">
                Packing
              </option>
              <option value="Shipped" className="font-imprima">
                Shipped
              </option>
              <option value="Out for delivery" className="font-imprima">
                Out for delivery
              </option>
              <option value="Delivered" className="font-imprima">
                Delivered
              </option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
