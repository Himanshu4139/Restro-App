import React from "react";
import Option from "../Components/Option";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useCookies } from "react-cookie";


const Profile = ({setMinus, minus}) => {

  const [data, setData] = useState({});
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    if (cookies) {
      const user = jwtDecode(cookies.token);
      axios.get(`${import.meta.env.VITE_URL}admin/profile/${user.id}`)
      .then(res=>{
        setData(res.data.admin);
      })
      .catch(err=>{
        console.log(err);
      })

    }}
  , []);

  useEffect(()=>{
    setMinus(false);
  },[])

  

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
      {/* Header */}
      <Header />

      {/* Profile Section */}
      <div className="w-full flex flex-col items-center bg-gradient-to-r from-emerald-400 to-purple-400 py-6 px-4 rounded-b-3xl shadow-lg">
        <legend className="rounded-full h-40 w-40 overflow-hidden border-4 border-white shadow-md">
          <img
            className="object-cover w-full h-full"
            src="https://c4.wallpaperflare.com/wallpaper/66/993/107/anime-scars-face-mask-hatake-kakashi-wallpaper-preview.jpg"
            alt="User Profile"
          />
        </legend>
        <div className="mt-4 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-white">{data.shopName}</h2>
          <p className="text-sm text-white mt-1">{data.email}</p>
        </div>
      </div>

      {/* Top Categories Section */}
      <div className="mt-8 px-4">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Top Categories
        </h3>
        <div className="flex overflow-x-auto gap-4 justify-evenly">
          <Option minus={minus}/>
        </div>
      </div>

      

      {/* Footer Section */}
      <div className="mt-4 text-center py-4 bg-gray-200 text-gray-600 text-sm">
        © {new Date().getFullYear()} Restro-App. All rights reserved.
      </div>
    </div>
  );
};

export default Profile;
