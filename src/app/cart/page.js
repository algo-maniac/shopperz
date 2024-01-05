"use client";
import ProductCard from "@/components/ProductCard";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { redirect } from "next/navigation";

function page() {
  const globalUser = useSelector((state) => state.auth.userData);
  const cartItems = useSelector((state) => state.auth.cartItems);
  const [cartProductList, setCartProductList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const getAllProducts = async () => {
      const response = await axios.get("https://dummyjson.com/products");
      const products = response.data.products;
      const productList = [];
      let price = 0;
      console.log(cartItems);
      for (let product of products) {
        if (product.id in cartItems) {
          console.log(product.id);
          productList.push({ ...product, quantity: cartItems[product.id] });
          let currPrice = product.price;
          let currDiscount = product.discountPercentage;
          price += currPrice - (currDiscount / 100) * currPrice;
        }
      }
      price = price.toFixed(2);
      setTotalPrice(price);
      setCartProductList(productList);
      console.log(productList);
    };

    getAllProducts();
  }, [cartItems]);

  useEffect(() => {
    if (!globalUser) redirect("/login");
  }, [globalUser]);
  return (
    <>
      {cartProductList.length > 0 ? (
        <div className="flex flex-col justify-center items-center p-3 my-2">
          <div className="flex text-center text-2xl">Cart Items</div>
          <div className="flex flex-wrap justify-around">
            {cartProductList.map((product) => (
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
                quantity={product.quantity}
                length={cartProductList.length}
                cart_page={1}
              />
            ))}
          </div>
          <div className="shadow-lg shadow-slate-600 flex text-center text-2xl m-5 border-2 border-blue-500 rounded-xl bg-blue-500 p-2">
            Total Purchase : {totalPrice}
          </div>
        </div>
      ) : (
        <div className="flex text-center text-2xl justify-center">
          No Item in Cart
        </div>
      )}
    </>
  );
}

export default page;
