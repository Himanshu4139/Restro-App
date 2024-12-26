import React, { useEffect, useState } from 'react'
import User_header from '../Components/User_header'
import { useParams } from 'react-router-dom'
import User_option from '../Components/User_option'

const User_profile = () => {


  const {id} = useParams();
  

  return (
    <>
        <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
      <User_header id={id}/>
      <div className="w-full flex flex-col items-center bg-gradient-to-r from-emerald-400 to-purple-400 py-6 px-4 rounded-b-3xl shadow-lg">
        <legend className="rounded-full h-40 w-40 overflow-hidden border-4 border-white shadow-md">
          <img
            className="object-cover w-full h-full"
            src="https://c4.wallpaperflare.com/wallpaper/66/993/107/anime-scars-face-mask-hatake-kakashi-wallpaper-preview.jpg"
            alt="User Profile"
          />
        </legend>
        <div className="mt-4 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-white">Username</h2>
          <p className="text-sm text-white mt-1">user@example.com</p>
        </div>
      </div>

      {/* Top Categories Section */}
      <div className="mt-8 px-4">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Top Categories
        </h3>
        <div className="flex overflow-x-auto gap-4 justify-evenly">
          <User_option id={id} />
        </div>
      </div>

      

      {/* Footer Section */}
      <div className="mt-4 text-center py-4 bg-gray-200 text-gray-600 text-sm">
        © {new Date().getFullYear()} Your Company Name. All rights reserved.
      </div>
    </div>
    </>
  )
}

export default User_profile