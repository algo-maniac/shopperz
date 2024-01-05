"use client";
import React, { useEffect, useState } from "react";
import { login as authLogin } from "@/store/authSlice";
import { Provider, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { create_token } from "../action";

function page() {
  const dispatch = useDispatch();
  const globalUser = useSelector((state) => state.auth.userData);
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });

  const [userLoggedIn, setUserLoggedIn] = useState(0);
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      console.log(userDetails);
      const response = await axios.post(
        "https://dummyjson.com/auth/login",
        userDetails
      );
      const userData = response.data;
      if (userData) dispatch(authLogin({ userData }));
      create_token({ token: userData.token });
      setUserLoggedIn(1);
      console.log(globalUser);
      toast.success("Successfully Logged in!");
    } catch (error) {
      console.log("Could not store userdata");
      toast.error("Invalid User");
    }
  };

  useEffect(() => {
    if (globalUser) {
      redirect("/");
    }
  }, [globalUser]);

  return (
    <div className="w-full flex flex-col justify-around items-center">
      <Toaster position="top-right" reverseOrder={false} className="absolute" />
      <div className="flex flex-col justify-aroundw-[50%] m-10 p-5 shadow-md shadow-slate-700">
        <div className="text-3xl text-center border-2 border-blue-400 bg-blue-400 rounded-xl w-[60%] mx-auto py-2">
          Login
        </div>
        <form className="text-xl flex flex-col justify-around">
          <div className="flex flex-col my-2">
            <div>Username</div>
            <input
              type="text"
              onChange={(e) => {
                setUserDetails({ ...userDetails, username: e.target.value });
              }}
              className="p-1 px-2 rounded-lg outline-none border-2 border-blue-600 w-full"
            />
          </div>
          <div className="flex flex-col my-2">
            <div>Password</div>
            <input
              type="password"
              onChange={(e) => {
                setUserDetails({ ...userDetails, password: e.target.value });
              }}
              className="p-1 px-2 rounded-lg outline-none border-2 border-blue-600 w-full"
            />
          </div>
          <button
            type="submit"
            onClick={submitHandler}
            className="p-2 border-2 border-blue-400 bg-blue-400 rounded-xl w-[40%] mx-auto my-5"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default page;
