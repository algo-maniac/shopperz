"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import StarIcon from "@mui/icons-material/Star";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/store/authSlice";

function ProductCard({
  id,
  title,
  thumbnail,
  brand,
  category,
  description,
  discount,
  images,
  price,
  rating,
  stock,
  quantity,
  length,
  cart_page,
}) {
  const globalUser = useSelector((state) => state.auth.userData);
  const cartItems = useSelector((state) => state.auth.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cartItems) console.log(cartItems);
  }, [cartItems]);
  return (
    <div
      id={`${title.toLowerCase()}`}
      className={`flex flex-col shadow-lg shadow-neutral-800 rounded-md ${
        length === 1 ? "w-[70%]" : "sm:w-[32%] w-[45%]"
      } h-[700px] p-2 my-3`}
    >
      <div className="text-xl border-2 rounded-lg shadow-lg shadow-neutral-200 flex justify-center">
        <img src={thumbnail} className="h-[200px]" />
      </div>
      <div className="text-lg md:text-xl h-[80px] flex justify-center items-center my-3 capitalize">
        {title}
      </div>
      <div className="text-xs md:text-sm h-[25px] flex justify-start">
        Brand - {brand}
      </div>
      <div className="text-xs md:text-sm h-[25px] flex justify-start mb-10">
        Category - {category}
      </div>
      <div className="text-xs md:text-sm h-[180px] flex justify-start">
        {description}
      </div>

      <div className="h-[100px] md:h-[50px] flex md:flex-row flex-col justify-around items-center cursor-pointer">
        <div className="shadow-md shadow-neutral-800 text-xl border-2 border-blue-500 rounded-lg bg-blue-500 flex justify-around items-center py-1 w-[80%] md:w-[60%]">
          <CurrencyRupeeIcon />
          {price}
          <div className="text-xs text-red-700 font-bold">{discount}%off</div>
        </div>
        {cart_page === 0 ? (
          <div
            className="shadow-md shadow-neutral-800 border-red-400 text-xs w-[30%] flex justify-around items-center border-2 rounded-lg bg-red-500 m-2 p-2 px-10 cursor-pointer"
            onClick={() => {
              if (globalUser) {
                dispatch(
                  addToCart({
                    id,
                  })
                );
              }
            }}
          >
            Add to Cart <ShoppingCartIcon />
          </div>
        ) : (
          <div
            className="shadow-md shadow-neutral-800 border-red-400 text-xs w-[30%] flex justify-around items-center border-2 rounded-lg bg-red-500 m-2 p-2 px-10 cursor-pointer"
            onClick={() => {
              if (globalUser) {
                dispatch(removeFromCart({ id }));
              }
            }}
          >
            Remove from cart <DeleteIcon />
          </div>
        )}
      </div>

      <div className="mt-3 text-xs md:text-lg p-1 flex justify-center items-center">
        Rating - {rating} <StarIcon className="text-amber-500" />
      </div>
      <div className="text-xs md:text-lg p-1 flex justify-center items-center">
        <InventoryIcon className="text-amber-950" /> Stock - {stock}
      </div>
      {quantity ? (
        <div className="text-xs md:text-lg p-1 flex justify-center items-center">
          Quantity added : {quantity}
        </div>
      ) : null}
    </div>
  );
}

export default ProductCard;
