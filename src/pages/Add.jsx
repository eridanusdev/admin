import React from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import toast from "react-hot-toast";

export default function Add({ token }) {
  const [image1, setImage1] = React.useState(false);
  const [image2, setImage2] = React.useState(false);
  const [image3, setImage3] = React.useState(false);
  const [image4, setImage4] = React.useState(false);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("Men");
  const [subCategory, setSubCategory] = React.useState("Topwear");
  const [bestSeller, setBestSeller] = React.useState(false);
  const [sizes, setSizes] = React.useState([]);

  const submitData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to add product");
      }

      return response.data.message; // Return success message
    } catch (error) {
      console.error(error);
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while adding the product"
      );
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    toast.promise(submitData(), {
      loading: "Adding product...",
      success: (message) => message || "Product added successfully!",
      error: (err) => err.message || "An error occurred",
    });
  };

  return (
    <form
      action=""
      className="flex flex-col w-full items-start gap-3"
      onSubmit={onSubmitHandler}
    >
      <div className="">
        <p className="font-yantramanav mb-2">Upload Image</p>

        <div className="flex gap-2">
          <label className="cursor-pointer" htmlFor="image1">
            <img
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
              className="w-20"
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label className="cursor-pointer" htmlFor="image2">
            <img
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
              className="w-20"
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label className="cursor-pointer" htmlFor="image3">
            <img
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
              className="w-20"
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label className="cursor-pointer" htmlFor="image4">
            <img
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
              className="w-20"
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <p className="font-yantramanav">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Type here..."
          required
        />
      </div>
      <div className="w-full">
        <p className="font-yantramanav">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
          type="text"
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Write the product description here!"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div className="">
          <p className="font-muktaVaani mb-2">Product category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            name=""
            id=""
            className="w-full px-3 py-2"
          >
            <option value="Men" className="font font-imprima">
              Men
            </option>
            <option value="Women" className="font font-imprima">
              Women
            </option>
            <option value="Kids" className="font font-imprima">
              Kids
            </option>{" "}
          </select>
        </div>

        <div className="">
          <p className="font-muktaVaani mb-2">Sub category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            name=""
            id=""
            className="w-full px-3 py-2"
          >
            <option value="Topwear" className="font font-imprima">
              Topwear
            </option>
            <option value="Bottomwear" className="font font-imprima">
              Bottomwear
            </option>
            <option value="Winterwear" className="font font-imprima">
              Winterwear
            </option>{" "}
          </select>
        </div>

        <div className="">
          <p className="font-muktaVaani mb-2">Product Price:</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            required
            type="number"
            className="font-imprima w-full px-3 py-2 sm:w-[120px]"
            placeholder="20"
          />
        </div>
      </div>

      <div className="">
        <p className="font-muktaVaani mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"]
              )
            }
            className=""
          >
            <p
              className={`${
                sizes.includes("S") ? "bg-slate-700 text-white" : "bg-slate-200"
              } bg-slate-200 cursor-pointer px-3 py-1 rounded-md`}
            >
              S
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"]
              )
            }
            className=""
          >
            <p
              className={`${
                sizes.includes("M") ? "bg-slate-700 text-white" : "bg-slate-200"
              } bg-slate-200 cursor-pointer px-3 py-1 rounded-md`}
            >
              M
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"]
              )
            }
            className=""
          >
            <p
              className={`${
                sizes.includes("L") ? "bg-slate-700 text-white" : "bg-slate-200"
              } bg-slate-200 cursor-pointer px-3 py-1 rounded-md`}
            >
              L
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"]
              )
            }
            className=""
          >
            <p
              className={`${
                sizes.includes("XL")
                  ? "bg-slate-700 text-white"
                  : "bg-slate-200"
              } bg-slate-200 cursor-pointer px-3 py-1 rounded-md `}
            >
              XL
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XXL")
                  ? prev.filter((item) => item !== "XXL")
                  : [...prev, "XXL"]
              )
            }
            className=""
          >
            <p
              className={`${
                sizes.includes("XXL")
                  ? "bg-slate-700 text-white"
                  : "bg-slate-200"
              } bg-slate-200 cursor-pointer px-3 py-1 rounded-md`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          className="font-muktaVaani cursor-pointer"
          id="bestseller"
          onChange={() => setBestSeller((prev) => !prev)}
          checked={bestSeller}
        />
        <label className="cursor-pointer font-imprima" htmlFor="bestSeller">
          Add to bestseller
        </label>
      </div>

      <button
        className="w-28 py-3 mt-4 bg-gray-700 hover:bg-gray-900 text-white font-yantramanav rounded-md"
        type="submit"
      >
        ADD
      </button>
    </form>
  );
}
