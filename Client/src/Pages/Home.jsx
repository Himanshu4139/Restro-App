import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdQrCodeScanner } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import QrReader from "react-qr-reader";
import Signup from "../Auth/Signup";
import Login from "../Auth/Login";
import Model from "../Components/Model";
import { CiStar, CiTimer, CiLocationOn } from "react-icons/ci";

const Home = () => {
  const [showModel, setShowModel] = useState(false);
  const [showModel1, setShowModel1] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const handleClick = () => setShowModel(true);
  const handleClick1 = () => setShowModel1(true);
  const handleClose = () => setShowModel(false);
  const handleClose1 = () => setShowModel1(false);
  const navigate = useNavigate();

  const scan = () => setShowScanner(true);

  const handleScan = (result) => {
    if (result) {
      setShowScanner(false);
      navigate(`/user/${result}`);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", showModel || showModel1);
  }, [showModel, showModel1]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E1E1E] to-[#2A2A2A] overflow-x-hidden">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center relative z-50">
        <h1 className="text-[#FFA500] text-4xl font-bold font-serif tracking-wider">Restro</h1>
        {/* Enter Icon (Top-right in Mobile View) */}
        <button
          onClick={handleClick1}
          className="md:hidden text-[#FFA500] rounded-full p-2 hover:text-[#FF8C00] transition-transform duration-300"
        >
          <FiLogIn className="w-6 h-6" />
        </button>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center relative">
        <div className="md:w-1/2 relative z-10 flex flex-col items-center justify-center text-center md:items-start md:text-left space-y-10 h-full">
          <div className="space-y-4">
            <h2 className="text-white text-2xl italic font-light">Are You Hungry?</h2>
            <h1 className="text-white text-7xl font-bold leading-tight">
              Don't <span className="text-[#FFA500]">Wait!</span>
            </h1>
            <p className="text-[#FFA500] text-2xl font-light">Let's start to order food now</p>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            {/* Scan Button */}
            <button
              onClick={scan}
              className="block md:hidden px-8 py-6 bg-[#FFA500] text-black rounded-full hover:bg-[#FF8C00] transition-colors duration-300 flex items-center gap-x-6 transform hover:scale-105"
            >
              <MdQrCodeScanner className="w-6 h-6 text-black" />
              <span className="font-semibold text-xl">Scan the QR</span>
            </button>
            {/* Login Button (Below Scan in Mobile View) */}
            <button
              onClick={handleClick}
              className="block md:hidden px-8 py-6 border-2 border-white text-white rounded-full hover:bg-white hover:text-[#1E1E1E] transition-all duration-300"
            >
              Login
            </button>
            {/* Login and Create Shop for Larger Screens */}
            <button
              onClick={handleClick}
              className="hidden md:block px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white hover:text-[#1E1E1E] transition-all duration-300"
            >
              Login
            </button>
            <button
              onClick={handleClick1}
              className="hidden md:block px-8 py-4 bg-[#FFA500] text-black rounded-full hover:bg-[#FF8C00] transition-transform duration-300"
            >
              Create Shop
            </button>
          </div>
          {/* Rating, Delivery, and Distance (Visible in both mobile and desktop) */}
          <div className="flex space-x-8 mt-12">
            <div className="flex items-center space-x-2">
              <CiStar className="w-8 h-8 text-white" />
              <div>
                <p className="text-white font-bold">4.8/5</p>
                <p className="text-white text-sm">Rating</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <CiTimer className="w-8 h-8 text-white" />
              <div>
                <p className="text-white font-bold">10 min</p>
                <p className="text-white text-sm">Delivery</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <CiLocationOn className="w-8 h-8 text-white" />
              <div>
                <p className="text-white font-bold">0.2Km</p>
                <p className="text-white text-sm">Distance</p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 mt-12 md:mt-0 relative">
          <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#FFA500] to-[#FF8C00] absolute -right-32 -top-32 animate-pulse"></div>
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80"
            alt="Featured Dish"
            className="w-[500px] h-[500px] rounded-full object-cover relative shadow-2xl transform hover:scale-105 transition-transform duration-300"
          />
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80"
            alt="Dish 1"
            className="w-32 h-32 rounded-full object-cover absolute -bottom-10 left-0 border-4 border-white shadow-lg transform hover:scale-110 transition-transform duration-300"
          />
          <img
            src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80"
            alt="Dish 2"
            className="w-32 h-32 rounded-full object-cover absolute bottom-20 -left-20 border-4 border-white shadow-lg transform hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Scanner Box */}
      {showScanner && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            facingMode="environment"
            style={{ width: "100%", maxHeight: "100%" }}
          />
          <button
            className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full"
            onClick={() => setShowScanner(false)}
          >
            Close
          </button>
        </div>
      )}

      {/* Modals */}
      {showModel && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
          <div className="bg-transparent w-11/12 md:w-1/3 p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-6 right-8 text-gray-500 hover:text-black"
              onClick={handleClose}
            >
              ✕
            </button>
            <Login setShowModel={setShowModel} setShowModel1={setShowModel1} />
          </div>
        </div>
      )}
      {showModel1 && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
          <div className="bg-transparent w-11/12 md:w-1/3 p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-6 right-8 text-gray-500 hover:text-black"
              onClick={handleClose1}
            >
              ✕
            </button>
            <Signup setShowModel={setShowModel1} setShowModel1={setShowModel} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
