"use client";

import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import store from "@/store/store";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { redirect } from "next/navigation";

export default function Home() {
  const [productList, setProductList] = useState([]);
  const [enableFilterDiv, setEnableFilterDiv] = useState(0);
  const [minPriceValue, setMinPriceValue] = useState(0);
  const [maxPriceValue, setMaxPriceValue] = useState(500);

  const globalUser = useSelector((state) => state.auth.userData);

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
    if (!globalUser) redirect("/login");
  }, [globalUser]);

  const filterHandler = async () => {
    const response = await axios.get("https://dummyjson.com/products");
    const products = response.data.products;
    let newProductList = [];
    for (let product of products) {
      if (product.price >= minPriceValue && product.price <= maxPriceValue) {
        newProductList.push(product);
        console.log(product);
      }
    }
    setEnableFilterDiv((prev) => !prev);
    setProductList(newProductList);
  };
  return (
    <div className="">
      <Toaster position="top-right" reverseOrder={false} className="absolute" />
      <div
        className={`${
          enableFilterDiv ? "visible" : "invisible"
        } p-4 shadow-xl shadow-slate-600 absolute top-[80px] left-[30%] w-[50%] h-[200px] rounded-xl bg-blue-300 z-40 flex justify-around items-center flex-col`}
      >
        <div className="text-xl">Price Range</div>
        <div className="text-xs md:text-lg">
          <header className="mb-4">
            <p>Enter the min and max price</p>
          </header>
          <div className="flex justify-around mb-2">
            <div className="field">
              <span>Min</span>
              <input
                type="number"
                className="outline-none w-[50px] md:w-[60px] lg:w-[80px] px-1 text-center border-1 rounded-lg mx-1 "
                onChange={(e) => {
                  setMinPriceValue(e.target.value);
                }}
                value={minPriceValue}
              />
            </div>
            <div className="separator">-</div>
            <div className="field">
              <span>Max</span>
              <input
                type="number"
                className="outline-none w-[50px] md:w-[60px] lg:w-[80px] px-1 text-center border-1 rounded-lg mx-1 "
                onChange={(e) => {
                  setMaxPriceValue(e.target.value);
                }}
                value={maxPriceValue}
              />
            </div>
          </div>
          {/* <div className="slider">
            <div className="progress"></div>
          </div>
          <div className="range-input">
            <input
              type="range"
              className="range-min"
              min="0"
              max="10000"
              value="2500"
              step="100"
            />
            <input
              type="range"
              className="range-max"
              min="0"
              max="10000"
              value="7500"
              step="100"
            />
          </div> */}
        </div>
        <button
          onClick={filterHandler}
          className="border-2 border-blue-500 bg-blue-500 p-2 rounded-xl"
        >
          Apply Filter
        </button>
      </div>
      <div className="h-[300px] md:h-[450px] lg:h-[600px] xl:h-[730px] w-full relative shadow-md shadow-neutral-400">
        <Image src="/landing_page.jpg" fill alt="Error Loading" />
      </div>
      <div className="flex flex-col justify-center items-center p-3 my-2">
        <div className="flex justify-center items-center text-2xl">
          Make Your Purchase{" "}
          <button
            onClick={() => {
              setEnableFilterDiv((prev) => !prev);
            }}
            className="shadow-lg shadow-slate-300 text-lg border-2 border-blue-500 bg-blue-500 rounded-xl px-2 ml-4"
          >
            Filter <FilterAltIcon />
          </button>
        </div>
        <div className="flex flex-wrap justify-around">
          {productList.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              thumbnail={product.thumbnail}
              title={product.title}
              brand={product.brand}
              category={product.category}
              description={product.description}
              discount={product.discountPercentage}
              price={product.price}
              rating={product.rating}
              stock={product.stock}
              images={product.images}
              length={productList.length}
              cart_page={0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
