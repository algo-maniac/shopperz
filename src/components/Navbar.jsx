"use client";

import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout as authLogout } from "@/store/authSlice";
import { redirect } from "next/navigation";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { delete_token } from "@/app/action";

function Navbar() {
  const [search, setSearch] = useState("");

  const [dropdownListActivity, setDropDownListActivity] = useState(0);
  const [productList, setProductList] = useState([]);
  const [totalCartItems, setTotalCartItems] = useState(0);
  const dispatch = useDispatch();

  const globalUser = useSelector((state) => state.auth.userData);
  const cartItems = useSelector((state) => state.auth.cartItems);

  useEffect(() => {
    const getAllProducts = async () => {
      const response = await axios.get("https://dummyjson.com/products");
      const products = response.data.products;
      setProductList(products);
      console.log(products);
    };

    getAllProducts();
  }, []);

  useEffect(() => {
    let cnt = 0;
    for (const key in cartItems) {
      cnt += cartItems[key];
    }
    setTotalCartItems(cnt);
  }, [cartItems]);

  const searchHandler = () => {
    setSearch((prev) => prev.toLowerCase());
    let pos = "";
    console.log(productList);
    for (let i = 0; i < productList.length; i++) {
      let element = productList[i];
      let string = element.title.toLowerCase();
      // console.log(string);

      if (string.includes(search)) {
        pos = element.title.toLowerCase();
        break;
      }
    }

    let access = document.getElementById(pos);
    if (access) {
      console.log(access);
      access.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <nav className="shadow-md shadow-neutral-200 bg-blue-300 flex flex-row items-center w-full py-3 sticky top-0 z-50">
      <DensityMediumIcon
        className="md:invisible md:w-0 pl-1 cursor-pointer"
        onClick={(e) => {
          setDropDownListActivity((prev) => !prev);
        }}
      />
      {dropdownListActivity ? (
        <ul className="border-2 border-blue-400 absolute top-16 z-30 bg-blue-300 md:invisible rounded-lg">
          <li className="p-2 w-[150px] flex justify-center border-y-2 border-blue-400">
            <Link
              href="/"
              className="h-full w-full flex justify-center items-center"
            >
              Home
            </Link>
          </li>
          <li className="p-2 w-[150px] flex justify-center border-y-2 border-blue-400">
            <Link
              href="/"
              className="h-full w-full flex justify-center items-center"
            >
              About
            </Link>
          </li>
          <li className="p-2 w-[150px] flex justify-center border-y-2 border-blue-400">
            <Link
              href={`${globalUser ? "/cart" : "/"}`}
              className="ml-3 h-full w-full flex justify-center items-center"
            >
              Cart
              <div
                className={`${
                  totalCartItems === 0 ? "hidden" : "visible"
                } visible md:invisible flex justify-center items-center relative top-[10px] left-[2px] text-[15px] w-[20px] h-[20px] rounded-full bg-red-600`}
              >
                {totalCartItems}
              </div>
            </Link>
          </li>
        </ul>
      ) : null}

      <div className="text-2xl font-extrabold  basis-1/3 md:basis-[20%] flex items-center justify-center">
        Shopperz
      </div>
      <ul className="flex flex-row justify-center basis-0 md:basis-[40%] invisible w-0 md:visible">
        <li className="hover:underline underline-offset-4 px-2 mx-2 cursor-pointer">
          <Link
            href="/"
            className="h-full w-full flex justify-center items-center"
          >
            Home
          </Link>
        </li>
        <li className="hover:underline underline-offset-4 px-2 mx-2 cursor-pointer">
          <Link
            href="/"
            className="h-full w-full flex justify-center items-center"
          >
            About
          </Link>
        </li>
        <li className="hover:underline underline-offset-4 px-2 mx-2 cursor-pointer">
          <Link
            href={`${globalUser ? "/cart" : "/"}`}
            className="h-full w-full flex justify-center items-center"
          >
            Cart
            <div
              className={`${
                totalCartItems === 0 ? "hidden" : "visible"
              } invisible md:visible flex justify-center items-center relative top-[10px] left-[2px] text-[15px] w-[20px] h-[20px] rounded-full bg-red-600`}
            >
              {totalCartItems}
            </div>
          </Link>
        </li>
      </ul>
      <div className=" basis-2/3 md:basis-[40%] flex flex-row justify-around">
        <div className="bg-white pl-2 w-[60%] flex flex-row justify-center cursor-pointer rounded-xl items-center">
          <input
            type="text"
            placeholder="Search by title..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
            className="w-[80%] p-1 outline-0"
          />
          <SearchIcon onClick={searchHandler} />
        </div>
        <div
          className={`cursor-pointer w-[30%] flex flex-row justify-center items-center ${
            globalUser ? "bg-blue-300" : "bg-blue-700 border-2 border-blue-700"
          } rounded-xl font-bold`}
        >
          <Link
            href={`${globalUser ? "/" : "/login"}`}
            className={`h-full flex ${
              globalUser ? "justify-end w-[50%]" : "justify-center w-[30%]"
            } items-center`}
          >
            {globalUser ? (
              <img
                src={globalUser.image}
                alt="No Image"
                className="w-[20px] h-[20px] md:h-[25px] md:w-[25px] rounded-full border-2 border-white bg-white"
              />
            ) : (
              "Login"
            )}
          </Link>
          {globalUser ? (
            <button
              className="text-xs md:text-sm md:p-1 flex justify-center items-center bg-blue-700 border-2 border-blue-700 ml-2 p-1 rounded-lg"
              onClick={() => {
                dispatch(authLogout());
                delete_token();
                toast.success("Successfully Logged out!");
              }}
            >
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
